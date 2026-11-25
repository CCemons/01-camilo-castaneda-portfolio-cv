import { CV_DATA } from "./cv-data.js";
import { mountThesisCanvas, mountProjectSimulator } from "./simulators.js";

const {
  profile,
  thesisModes,
  projectCategories,
  projects,
  skillCategories,
  skills,
  experience,
  education,
  languages,
  distinctions,
  certifications
} = CV_DATA;

let activeProjectCategory = "all";
let projectSearchTerm = "";
let activeSkillCategory = "all";
let activeThesisMode = "spot";
let stopModalSim = null;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function withViewTransition(updateFn) {
  if (
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    document.startViewTransition(() => updateFn());
  } else {
    updateFn();
  }
}

/* =========================================================
   1. Control de Tema Claro / Oscuro (Guía dark-mode-toggle)
   ========================================================= */
function initThemeToggle() {
  const meta = document.querySelector('meta[name="color-scheme"]');
  const toggleBtn = document.getElementById("theme-toggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function getStoredScheme() {
    try {
      const value = localStorage.getItem("color-scheme");
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  }

  function applyMetaContent(stored) {
    meta.setAttribute("content", stored ?? "light dark");
  }

  function getRenderedScheme() {
    const stored = getStoredScheme();
    if (stored) return stored;
    return systemDark.matches ? "dark" : "light";
  }

  function syncButtonLabel() {
    const rendered = getRenderedScheme();
    const nextScheme = rendered === "dark" ? "light" : "dark";
    toggleBtn.setAttribute(
      "aria-label",
      nextScheme === "light" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
    );
    toggleBtn.setAttribute("aria-pressed", String(getStoredScheme() !== null));
  }

  toggleBtn.addEventListener("click", () => {
    const target = getRenderedScheme() === "dark" ? "light" : "dark";
    const systemCurrent = systemDark.matches ? "dark" : "light";
    try {
      if (target === systemCurrent) {
        localStorage.removeItem("color-scheme");
        applyMetaContent(null);
      } else {
        localStorage.setItem("color-scheme", target);
        applyMetaContent(target);
      }
    } catch {
      applyMetaContent(target);
    }
    syncButtonLabel();
  });

  window.addEventListener("storage", (e) => {
    if (e.key === "color-scheme") {
      applyMetaContent(getStoredScheme());
      syncButtonLabel();
    }
  });

  systemDark.addEventListener("change", () => {
    // No borramos preferencia explícita si coincide temporalmente con el SO
    syncButtonLabel();
  });

  syncButtonLabel();
}

/* =========================================================
   2. Consola Interactiva de Laboratorio RF / Embebidos
   ========================================================= */
function initLabConsole() {
  const output = document.getElementById("lab-console-output");
  const form = document.getElementById("lab-console-form");
  const input = document.getElementById("lab-console-input");

  let scrollScheduled = false;
  function printLine(text, tone = "") {
    const line = el("div", `console-line ${tone}`, text);
    output.appendChild(line);
    if (!scrollScheduled) {
      scrollScheduled = true;
      requestAnimationFrame(() => {
        output.scrollTop = output.scrollHeight;
        scrollScheduled = false;
      });
    }
  }

  function executeCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    printLine(`$ ${cmd}`, "is-cmd");

    switch (cmd) {
      case "help":
        printLine(
          "Comandos: whoami, thesis, sdr, projects, skills, saberpro, certs, contact, clear",
          "is-muted"
        );
        break;
      case "whoami":
        printLine(`${profile.name} — ${profile.role}`, "is-ok");
        printLine(`${profile.location} | Inglés MCER C1 (67/100) · Saber Pro P97`, "is-muted");
        break;
      case "thesis":
        printLine(
          "JammerUsco (2.4 GHz): ESP32 Dual-Core FreeRTOS + 2x nRF24L01+PA+LNA + SBB5089/SZP2026 (2 W / 33.5 dBm).",
          "is-ok"
        );
        printLine(
          "PCB monocara KiCad 10 -> CNC 6040 (G31 335 pts, 734.4 µm) -> STEP Fusion 360 -> BOM $396.500 COP.",
          "is-muted"
        );
        break;
      case "sdr":
        printLine(
          "ADALM-Pluto+ (AD9363 + Zynq-7000): pyadi-iio/libiio, 150k I/Q DMA, RRC α=0.35, Lazo de Costas.",
          "is-ok"
        );
        printLine(
          "Evaluación BER/PER a 5 m (FSPL=54.20 dB) en BPSK, QPSK, 16-QAM, GFSK, FHSS + Aaronia SPECTRAN.",
          "is-muted"
        );
        break;
      case "projects":
        projects.forEach((p, idx) =>
          printLine(`[0${idx + 1}] ${p.repoName} (${p.categoryLabel})`, "is-ok")
        );
        break;
      case "skills":
        skills.forEach((s) => printLine(`• ${s.categoryLabel}: ${s.items.slice(0, 4).join(", ")}`, "is-muted"));
        break;
      case "saberpro":
        printLine(
          "ICFES Saber Pro 2026 (EK202610024539): Global 175/300 (P85 Nac.) · Inglés P97 · Cuant. P92 · Ciud. P90.",
          "is-ok"
        );
        printLine("ICFES Saber 11 (2017): 372/500 (Percentil 100 Nacional) · XIII Olimpiada Física: Mejor Puntaje.", "is-muted");
        break;
      case "certs":
        printLine("21 certificaciones verificables: 8 MathWorks · 5 LinkedIn Learning · 8 SENA (306 h).", "is-ok");
        break;
      case "contact":
        printLine(`Email: ${profile.email} | Tel: ${profile.phone}`, "is-ok");
        printLine(`GitHub: ${profile.githubUrl} | LinkedIn: ${profile.linkedinUrl}`, "is-muted");
        break;
      case "clear":
        output.textContent = "";
        break;
      default:
        printLine(`Comando '${cmd}' no encontrado. Escribe 'help' para ver opciones.`, "is-muted");
    }
  }

  printLine("USCO RF & Embedded Lab Shell v2.4 — listo.", "is-muted");
  executeCommand("whoami");
  executeCommand("thesis");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    executeCommand(input.value);
    input.value = "";
  });

  document.querySelectorAll(".cmd-chip").forEach((chip) => {
    chip.addEventListener("click", () => executeCommand(chip.dataset.cmd));
  });
}

/* =========================================================
   3. Panel Interactivo del Proyecto Insignia (JammerUsco)
   ========================================================= */
function initThesisShowcase() {
  const modeButtons = document.querySelectorAll("[data-thesis-mode]");
  const titleEl = document.getElementById("thesis-mode-title");
  const descEl = document.getElementById("thesis-mode-desc");
  const freqEl = document.getElementById("thesis-mode-freq");
  const powerEl = document.getElementById("thesis-mode-power");
  const busEl = document.getElementById("thesis-mode-bus");
  const metricsEl = document.getElementById("thesis-mode-metrics");
  const readoutEl = document.getElementById("thesis-canvas-readout");
  const canvas = document.getElementById("thesis-canvas");

  function renderModeDetails() {
    const m = thesisModes[activeThesisMode];
    titleEl.textContent = m.label;
    descEl.textContent = m.description;
    freqEl.textContent = m.freqRange;
    powerEl.textContent = m.power;
    busEl.textContent = m.bus;

    metricsEl.textContent = "";
    m.metrics.forEach((item) => {
      const box = el("div", "thesis-metric-pill");
      box.append(el("span", "metric-label", item.label), el("strong", "metric-value", item.value));
      metricsEl.appendChild(box);
    });

    modeButtons.forEach((btn) => {
      const isSelected = btn.dataset.thesisMode === activeThesisMode;
      btn.setAttribute("aria-pressed", String(isSelected));
      btn.classList.toggle("is-active", isSelected);
    });
  }

  let thesisCanvasCtrl = null;
  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeThesisMode = btn.dataset.thesisMode;
      renderModeDetails();
      if (thesisCanvasCtrl) thesisCanvasCtrl.redraw();
    });
  });

  renderModeDetails();
  thesisCanvasCtrl = mountThesisCanvas(
    canvas,
    () => activeThesisMode,
    (txt) => {
      readoutEl.textContent = txt;
    }
  );
}

/* =========================================================
   4. Portafolio de 7 Proyectos + <dialog> Nativo
   ========================================================= */
function renderProjectFilters() {
  const container = document.getElementById("project-filters");
  container.textContent = "";
  projectCategories.forEach((cat) => {
    const btn = el(
      "button",
      `filter-chip ${cat.id === activeProjectCategory ? "is-active" : ""}`,
      cat.label
    );
    btn.type = "button";
    btn.setAttribute("aria-pressed", String(cat.id === activeProjectCategory));
    btn.addEventListener("click", () => {
      activeProjectCategory = cat.id;
      renderProjectFilters();
      withViewTransition(renderProjects);
    });
    container.appendChild(btn);
  });
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  const emptyMsg = document.getElementById("projects-empty");
  grid.textContent = "";

  const query = projectSearchTerm.trim().toLowerCase();
  const filtered = projects.filter((p) => {
    const matchCat = activeProjectCategory === "all" || p.category === activeProjectCategory;
    const matchQuery =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.repoName.toLowerCase().includes(query) ||
      p.stack.some((t) => t.toLowerCase().includes(query));
    return matchCat && matchQuery;
  });

  emptyMsg.hidden = filtered.length > 0;

  filtered.forEach((p) => {
    const card = el("article", `project-card ${p.featured ? "is-featured" : ""}`);
    card.style.viewTransitionName = `proj-${p.id}`;

    const top = el("div", "project-card-top");
    top.append(el("span", "badge-category", p.categoryLabel), el("span", "badge-year", p.year));

    const title = el("h3", "project-title", p.title);
    const sub = el("p", "project-sub", p.subtitle);
    const summary = el("p", "project-summary", p.summary);

    const stackList = el("ul", "tech-tags");
    p.stack.forEach((tech) => stackList.appendChild(el("li", "tech-tag", tech)));

    const actions = el("div", "project-actions");
    const inspectBtn = el("button", "btn btn-primary btn-sm", "Simulación y Arquitectura");
    inspectBtn.type = "button";
    inspectBtn.addEventListener("click", () => openProjectDialog(p));

    const repoLink = el("a", "btn btn-outline btn-sm", `GitHub: ${p.repoName}`);
    repoLink.href = p.repoUrl;
    repoLink.target = "_blank";
    repoLink.rel = "noopener noreferrer";

    actions.append(inspectBtn, repoLink);
    card.append(top, title, sub, summary, stackList, actions);
    grid.appendChild(card);
  });
}

/* =========================================================
   5. Modal Nativo <dialog closedby="any"> + Fallbacks
   ========================================================= */
let supportsDisplayTransitionCache;
function canTransitionDisplay() {
  if (supportsDisplayTransitionCache !== undefined) return supportsDisplayTransitionCache;
  if (!window.CSS?.supports?.("transition-behavior", "allow-discrete") || !document.body) {
    return false;
  }
  const probe = document.createElement("div");
  probe.style.cssText = "transition: display 1s allow-discrete !important; display: block;";
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = "none";
  supportsDisplayTransitionCache = getComputedStyle(probe).display === "block";
  probe.remove();
  return supportsDisplayTransitionCache;
}

function supportsTopLayerExit() {
  return window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay();
}

async function closeProjectDialog() {
  const dialog = document.getElementById("project-dialog");
  if (!dialog.open) return;

  if (!supportsTopLayerExit()) {
    dialog.setAttribute("data-closing", "");
    const animations = dialog.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((resolve) => setTimeout(resolve, 400))
      ]);
    }
    if (!dialog.hasAttribute("data-closing")) return;
    dialog.removeAttribute("data-closing");
  }
  dialog.close();
}

function openProjectDialog(project) {
  const dialog = document.getElementById("project-dialog");
  document.getElementById("dialog-category").textContent = `${project.categoryLabel} · ${project.year}`;
  document.getElementById("dialog-title").textContent = project.title;
  document.getElementById("dialog-summary").textContent = project.summary;
  document.getElementById("dialog-architecture").textContent = project.architecture;

  const metricsList = document.getElementById("dialog-metrics");
  metricsList.textContent = "";
  project.metrics.forEach((m) => metricsList.appendChild(el("li", "", m)));

  const repoLink = document.getElementById("dialog-repo-link");
  repoLink.href = project.repoUrl;

  const secondaryLink = document.getElementById("dialog-secondary-link");
  if (project.secondaryUrl) {
    secondaryLink.hidden = false;
    secondaryLink.href = project.secondaryUrl;
    secondaryLink.textContent = project.secondaryLabel || "Repositorio Relacionado";
  } else {
    secondaryLink.hidden = true;
  }

  if (stopModalSim) stopModalSim();
  dialog.showModal();

  const canvas = document.getElementById("dialog-canvas");
  const consoleEl = document.getElementById("dialog-console");
  stopModalSim = mountProjectSimulator(canvas, consoleEl, project.simType);
}

function initDialogControls() {
  const dialog = document.getElementById("project-dialog");
  const closeBtn = document.getElementById("dialog-close-btn");

  closeBtn.addEventListener("click", () => closeProjectDialog());

  dialog.addEventListener("close", () => {
    dialog.returnValue = "";
    if (stopModalSim) {
      stopModalSim();
      stopModalSim = null;
    }
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeProjectDialog();
  });

  // Fallback obligatorio de light-dismiss para navegadores sin closedBy
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    const isOutside = (e) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    let pressedOutside = false;
    dialog.addEventListener("pointerdown", (e) => {
      pressedOutside = isOutside(e);
    });
    dialog.addEventListener("pointerup", (e) => {
      if (pressedOutside && isOutside(e)) closeProjectDialog();
    });
  }
}

/* =========================================================
   6. Competencias Técnicas, Trayectoria, Idiomas y Certificaciones
   ========================================================= */
function renderSkillFilters() {
  const container = document.getElementById("skill-filters");
  container.textContent = "";
  skillCategories.forEach((cat) => {
    const btn = el(
      "button",
      `filter-chip ${cat.id === activeSkillCategory ? "is-active" : ""}`,
      cat.label
    );
    btn.type = "button";
    btn.setAttribute("aria-pressed", String(cat.id === activeSkillCategory));
    btn.addEventListener("click", () => {
      activeSkillCategory = cat.id;
      renderSkillFilters();
      withViewTransition(renderSkills);
    });
    container.appendChild(btn);
  });
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  grid.textContent = "";
  const list =
    activeSkillCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeSkillCategory);

  list.forEach((group) => {
    const card = el("article", "skill-domain-card");
    card.style.viewTransitionName = `skill-${group.id}`;
    const head = el("div", "skill-domain-head");
    head.append(el("h3", "", group.categoryLabel), el("span", "skill-highlight", group.highlight));
    const ul = el("ul", "skill-pill-list");
    group.items.forEach((item) => ul.appendChild(el("li", "skill-pill", item)));
    card.append(head, ul);
    grid.appendChild(card);
  });
}

function renderTimelineAndEducation() {
  const expBox = document.getElementById("experience-list");
  experience.forEach((item) => {
    const card = el("article", "timeline-card");
    const head = el("div", "timeline-head");
    head.append(el("span", "badge-category", item.type), el("span", "badge-year", item.period));
    const ul = el("ul", "bullet-list");
    item.bullets.forEach((b) => ul.appendChild(el("li", "", b)));
    card.append(head, el("h3", "", item.title), el("p", "timeline-org", item.org), ul);
    expBox.appendChild(card);
  });

  const eduBox = document.getElementById("education-list");
  education.forEach((item) => {
    const card = el("article", `timeline-card ${item.primary ? "is-primary-edu" : ""}`);
    const head = el("div", "timeline-head");
    head.append(
      el("span", "badge-category", item.primary ? "Pregrado" : "Técnico & Media"),
      el("span", "badge-year", item.period)
    );
    card.append(
      head,
      el("h3", "", item.title),
      el("p", "timeline-org", item.org),
      el("p", "timeline-detail", item.detail)
    );
    eduBox.appendChild(card);
  });
}

function renderLanguagesDistinctionsAndCerts() {
  const langBox = document.getElementById("languages-list");
  languages.forEach((lang) => {
    const card = el("article", "lang-card");
    const head = el("div", "lang-head");
    head.append(el("h3", "", lang.name), el("span", "badge-year", lang.badge));
    card.append(head, el("p", "lang-desc", lang.description));

    if (lang.bars.length > 0) {
      const barsWrap = el("div", "lang-bars");
      lang.bars.forEach((b) => {
        const row = el("div", "lang-bar-row");
        const labelRow = el("div", "lang-bar-meta");
        labelRow.append(el("span", "", b.label), el("strong", "", `${b.score}/100`));
        const progress = document.createElement("progress");
        progress.max = 100;
        progress.value = b.score;
        progress.setAttribute("aria-label", `${b.label}: ${b.score} de 100`);
        row.append(labelRow, progress);
        barsWrap.appendChild(row);
      });
      card.appendChild(barsWrap);
    }

    if (lang.verifyUrl) {
      const link = el("a", "verify-link", lang.verifyLabel);
      link.href = lang.verifyUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      card.appendChild(link);
    }
    langBox.appendChild(card);
  });

  const distBox = document.getElementById("distinctions-list");
  distinctions.forEach((d) => {
    const card = el("article", "distinction-card");
    const head = el("div", "lang-head");
    head.append(el("h3", "", d.title), el("span", "badge-category", d.tag));
    const chips = el("ul", "tech-tags");
    d.chips.forEach((c) => chips.appendChild(el("li", "tech-tag", c)));
    card.append(head, el("p", "lang-desc", d.summary), chips);
    distBox.appendChild(card);
  });

  const certsBox = document.getElementById("certs-grid");
  certifications.forEach((group) => {
    const card = el("article", "cert-card");
    const head = el("div", "cert-head");
    head.append(el("h3", "", group.provider), el("span", "badge-year", group.count));
    const meta = el("p", "cert-period", `Periodo: ${group.period}`);
    const list = el("ul", "cert-list");
    group.items.forEach((item) => {
      const li = el("li", "cert-item");
      if (item.url) {
        const a = el("a", "cert-link", item.name);
        a.href = item.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        li.appendChild(a);
      } else {
        li.appendChild(el("strong", "", item.name));
      }
      li.appendChild(el("span", "cert-item-meta", item.meta));
      list.appendChild(li);
    });
    card.append(head, meta, list);
    certsBox.appendChild(card);
  });
}

/* =========================================================
   7. Formulario Accesible (Guías validate-input + accessible-error)
   ========================================================= */
function initAccessibleContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  // Una única live region cortés para anunciar errores de campo tras interacción
  const announcer = document.createElement("div");
  announcer.setAttribute("aria-live", "polite");
  announcer.classList.add("visually-hidden");
  document.body.append(announcer);

  let announceTimer;
  let announcedField;
  const dirtyState = new WeakMap();
  const flagged = new WeakSet();
  const announced = new WeakSet();
  const supportsUserInvalid = CSS.supports("selector(:user-invalid)");

  const linkError = (field, shown) => {
    const errorId = field.dataset.error;
    if (!errorId) return;
    const ids = (field.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter((id) => id && id !== errorId);
    if (shown) ids.push(errorId);
    if (ids.length) field.setAttribute("aria-describedby", ids.join(" "));
    else field.removeAttribute("aria-describedby");
  };

  const spokenText = (node) => {
    const copy = node.cloneNode(true);
    copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
    copy.querySelectorAll('[role="img"][aria-label]').forEach((n) =>
      n.replaceWith(`${n.getAttribute("aria-label")}: `)
    );
    return copy.textContent.replace(/\s+/g, " ").trim();
  };

  const announceError = (field) => {
    const error = document.getElementById(field.dataset.error);
    if (!error) return;
    const label = field.labels?.[0] ? `${spokenText(field.labels[0])}: ` : "";
    clearTimeout(announceTimer);
    announcer.textContent = "";
    announcedField = field;
    announceTimer = setTimeout(() => {
      announcer.textContent = label + spokenText(error);
    }, 500);
  };

  const syncAria = (field, announce = false, forceCheck = false) => {
    if (!field.matches?.("input, select, textarea")) return;
    const isInvalid = supportsUserInvalid
      ? field.matches(":user-invalid") || (forceCheck && !field.validity.valid)
      : forceCheck
        ? !field.validity.valid
        : field.classList.contains("user-invalid-fallback");

    if (!supportsUserInvalid && forceCheck) {
      field.classList.toggle("user-invalid-fallback", !field.validity.valid);
      field.classList.toggle("user-valid-fallback", field.validity.valid);
    }

    if (isInvalid) {
      if (announce && !announced.has(field)) {
        announceError(field);
        announced.add(field);
      }
      field.setAttribute("aria-invalid", "true");
      linkError(field, true);
      flagged.add(field);
    } else if (flagged.has(field) || field.getAttribute("aria-invalid") !== "true") {
      field.setAttribute("aria-invalid", "false");
      linkError(field, false);
      flagged.delete(field);
      announced.delete(field);
      if (announcedField === field) {
        clearTimeout(announceTimer);
        announcer.textContent = "";
      }
    }
  };

  const fields = form.querySelectorAll("input, textarea");
  fields.forEach((f) => syncAria(f, false, false));

  form.addEventListener(
    "blur",
    (e) => {
      const target = e.target;
      if (!target.matches?.("input, textarea")) return;
      const state = dirtyState.get(target) || { hasInteracted: false, hasBlurred: false };
      state.hasBlurred = true;
      dirtyState.set(target, state);
      if (!supportsUserInvalid && state.hasInteracted) {
        syncAria(target, true, true);
      } else {
        syncAria(target, true, false);
      }
    },
    true
  );

  form.addEventListener("input", (e) => {
    const target = e.target;
    if (!target.matches?.("input, textarea")) return;
    const state = dirtyState.get(target) || { hasInteracted: false, hasBlurred: false };
    state.hasInteracted = true;
    dirtyState.set(target, state);
    if (!supportsUserInvalid && state.hasBlurred) {
      syncAria(target, false, true);
    } else if (target.hasAttribute("aria-invalid")) {
      syncAria(target, false, false);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const invalidFields = [...fields].filter((f) => !f.validity.valid);
    if (invalidFields.length > 0) {
      invalidFields.forEach((f) => {
        announced.add(f);
        dirtyState.set(f, { hasInteracted: true, hasBlurred: true });
        if (!supportsUserInvalid) f.classList.add("user-invalid-fallback");
        syncAria(f, false, true);
      });
      invalidFields[0].focus();
      feedback.textContent = "Revisa los campos marcados antes de preparar el correo.";
      return;
    }

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    const body = encodeURIComponent(`Hola Camilo,\n\nSoy ${name} (${email}).\n\n${message}`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    feedback.textContent = "Se preparó el mensaje en tu cliente de correo predeterminado.";
  });
}

/* =========================================================
   8. Inicialización General, Navegación y Acciones Rápidas
   ========================================================= */
function initGeneralActions() {
  document.getElementById("footer-year").textContent = String(new Date().getFullYear());

  // Menú móvil accesible
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Botón de impresión / exportación CV PDF
  document.getElementById("print-cv-btn").addEventListener("click", () => window.print());

  // Búsqueda instantánea en proyectos
  document.getElementById("project-search").addEventListener("input", (e) => {
    projectSearchTerm = e.target.value;
    renderProjects();
  });

  // Copiar correo y teléfono
  document.getElementById("copy-email-btn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      showToast(`Correo copiado: ${profile.email}`);
    } catch {
      showToast(profile.email);
    }
  });

  document.getElementById("copy-phone-btn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(profile.phone);
      showToast(`Teléfono copiado: ${profile.phone}`);
    } catch {
      showToast(profile.phone);
    }
  });
}

initThemeToggle();
initLabConsole();
initThesisShowcase();
renderProjectFilters();
renderProjects();
initDialogControls();
renderSkillFilters();
renderSkills();
renderTimelineAndEducation();
renderLanguagesDistinctionsAndCerts();
initAccessibleContactForm();
initGeneralActions();
