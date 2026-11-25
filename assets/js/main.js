import { CV_DATA } from "./cv-data.js";

const {
  profile,
  systemCategories,
  systems,
  domains,
  languages,
  distinctions,
  certificationsTable
} = CV_DATA;

let activeCategory = "all";

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
  showToast._timer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function withViewTransition(fn) {
  if (
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    document.startViewTransition(() => fn());
  } else {
    fn();
  }
}

/* =========================================================
   1. Esquema de Color Marfil / Carbón (Guía dark-mode-toggle)
   ========================================================= */
function initThemeControl() {
  const meta = document.querySelector('meta[name="color-scheme"]');
  const btn = document.getElementById("theme-toggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  const getStored = () => {
    try {
      const val = localStorage.getItem("color-scheme");
      return val === "light" || val === "dark" ? val : null;
    } catch {
      return null;
    }
  };

  const getRendered = () => getStored() ?? (systemDark.matches ? "dark" : "light");

  const syncAria = () => {
    btn.setAttribute("aria-pressed", String(getStored() !== null));
  };

  btn.addEventListener("click", () => {
    const target = getRendered() === "dark" ? "light" : "dark";
    const sys = systemDark.matches ? "dark" : "light";
    try {
      if (target === sys) {
        localStorage.removeItem("color-scheme");
        meta.setAttribute("content", "light dark");
      } else {
        localStorage.setItem("color-scheme", target);
        meta.setAttribute("content", target);
      }
    } catch {
      meta.setAttribute("content", target);
    }
    syncAria();
  });

  window.addEventListener("storage", (e) => {
    if (e.key === "color-scheme") {
      meta.setAttribute("content", getStored() ?? "light dark");
      syncAria();
    }
  });

  systemDark.addEventListener("change", syncAria);
  syncAria();
}

/* =========================================================
   2. Índice Lateral Scrollspy (Guía scrollspy)
   ========================================================= */
function initScrollspy() {
  const nav = document.querySelector(".index-rail-nav");
  if (!nav) return;

  if (CSS.supports("scroll-target-group: auto")) {
    const syncAriaCurrent = () => {
      const currentLink = nav.querySelector("a:target-current");
      nav.querySelectorAll("a").forEach((link) => {
        link.setAttribute("aria-current", link === currentLink ? "true" : "false");
      });
    };
    syncAriaCurrent();
    document.addEventListener("scrollend", syncAriaCurrent);
  } else {
    const links = nav.querySelectorAll("a");
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            links.forEach((link) => {
              const active = link.getAttribute("href") === `#${id}`;
              link.classList.toggle("target-current", active);
              link.setAttribute("aria-current", String(active));
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  }
}

/* =========================================================
   3. Diagrama SVG de Bloques de Arquitectura Real
   ========================================================= */
function buildFlowDiagramSvg(steps, title) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 820 96");
  svg.setAttribute("class", "flow-svg");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `Diagrama de bloques de arquitectura para ${title}`);

  const boxWidth = 178;
  const gap = 30;

  steps.forEach((step, idx) => {
    const x = 10 + idx * (boxWidth + gap);
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", String(x));
    rect.setAttribute("y", "14");
    rect.setAttribute("width", String(boxWidth));
    rect.setAttribute("height", "68");
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke", idx === steps.length - 1 ? "var(--copper)" : "currentColor");
    rect.setAttribute("stroke-width", "1.4");
    svg.appendChild(rect);

    const t1 = document.createElementNS(svgNS, "text");
    t1.setAttribute("x", String(x + 12));
    t1.setAttribute("y", "40");
    t1.setAttribute("font-family", "monospace");
    t1.setAttribute("font-size", "11");
    t1.setAttribute("font-weight", "700");
    t1.setAttribute("fill", idx === steps.length - 1 ? "var(--copper)" : "currentColor");
    t1.textContent = `${idx + 1}. ${step.stage}`;
    svg.appendChild(t1);

    const t2 = document.createElementNS(svgNS, "text");
    t2.setAttribute("x", String(x + 12));
    t2.setAttribute("y", "62");
    t2.setAttribute("font-family", "sans-serif");
    t2.setAttribute("font-size", "11");
    t2.setAttribute("fill", "currentColor");
    t2.textContent = step.detail;
    svg.appendChild(t2);

    if (idx < steps.length - 1) {
      const lineX1 = x + boxWidth;
      const lineX2 = lineX1 + gap - 6;
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", String(lineX1));
      line.setAttribute("y1", "48");
      line.setAttribute("x2", String(lineX2));
      line.setAttribute("y2", "48");
      line.setAttribute("stroke", "currentColor");
      line.setAttribute("stroke-width", "1.4");
      svg.appendChild(line);

      const arrow = document.createElementNS(svgNS, "polygon");
      arrow.setAttribute("points", `${lineX2},44 ${lineX2 + 6},48 ${lineX2},52`);
      arrow.setAttribute("fill", "currentColor");
      svg.appendChild(arrow);
    }
  });

  return svg;
}

/* =========================================================
   4. Expediente Lineal de Sistemas + Acordeón <details>
   ========================================================= */
function renderSystemFilters() {
  const container = document.getElementById("system-filters");
  container.textContent = "";
  systemCategories.forEach((cat) => {
    const btn = el("button", `ctrl-btn ${cat.id === activeCategory ? "is-active" : ""}`, cat.label);
    btn.type = "button";
    btn.setAttribute("aria-pressed", String(cat.id === activeCategory));
    btn.addEventListener("click", () => {
      activeCategory = cat.id;
      renderSystemFilters();
      withViewTransition(() => {
        renderSystemsLedger();
        syncToggleAllState();
      });
    });
    container.appendChild(btn);
  });
}

function renderSystemsLedger() {
  const container = document.getElementById("systems-accordion-group");
  container.textContent = "";

  const list =
    activeCategory === "all"
      ? systems
      : systems.filter((s) => s.category === activeCategory);

  list.forEach((sys) => {
    const article = el("article", "system-entry");
    article.style.viewTransitionName = `sys-${sys.id}`;

    const metaRow = el("div", "system-meta-row");
    metaRow.append(
      el("span", "system-cat", sys.categoryLabel),
      el("span", "", `${sys.repoName} · ${sys.year}`)
    );

    const titleRow = el("div", "system-title-row");
    titleRow.append(el("h3", "", sys.title));
    const linksWrap = el("div", "masthead-actions");
    const repoLink = el("a", "ctrl-btn", `GitHub &#8599;`);
    repoLink.textContent = `GitHub: ${sys.repoName} ↗`;
    repoLink.href = sys.repoUrl;
    repoLink.target = "_blank";
    repoLink.rel = "noopener noreferrer";
    linksWrap.appendChild(repoLink);

    if (sys.secondaryUrl) {
      const secLink = el("a", "ctrl-btn", `${sys.secondaryLabel} ↗`);
      secLink.href = sys.secondaryUrl;
      secLink.target = "_blank";
      secLink.rel = "noopener noreferrer";
      linksWrap.appendChild(secLink);
    }
    titleRow.appendChild(linksWrap);

    const subtitle = el("p", "system-subtitle", sys.subtitle);
    const summary = el("p", "system-summary", sys.summary);

    const techUl = el("ul", "tech-line");
    sys.stack.forEach((t) => techUl.appendChild(el("li", "", t)));

    // Desplegable nativo <details> (sin headings dentro de <summary>)
    const details = el("details", "system-details");
    const sum = el("summary", "", "Especificaciones de arquitectura y flujo de señal");
    const body = el("div", "details-body");
    const svgWrap = el("div", "svg-scroll");
    svgWrap.setAttribute("tabindex", "0");
    svgWrap.setAttribute("role", "region");
    svgWrap.setAttribute("aria-label", `Diagrama desplazable de arquitectura para ${sys.title}`);
    svgWrap.appendChild(buildFlowDiagramSvg(sys.flowSteps, sys.title));
    body.appendChild(svgWrap);

    const ul = el("ul", "spec-list");
    sys.specs.forEach((sp) => ul.appendChild(el("li", "", sp)));
    body.appendChild(ul);
    details.append(sum, body);

    article.append(metaRow, titleRow, subtitle, summary, techUl, details);
    container.appendChild(article);
  });
}

function syncToggleAllState() {
  const accordion = document.getElementById("systems-accordion-group");
  const button = document.getElementById("toggle-all-systems");
  if (!accordion || !button) return;
  const items = accordion.querySelectorAll("details.system-details");
  const allOpen = items.length > 0 && Array.prototype.every.call(items, (d) => d.open);
  button.setAttribute("aria-expanded", String(allOpen));
}

function initAccordionControls() {
  const accordion = document.getElementById("systems-accordion-group");
  const toggleAllBtn = document.getElementById("toggle-all-systems");

  const runToggleAll = () => {
    const expand = toggleAllBtn.getAttribute("aria-expanded") !== "true";
    accordion.querySelectorAll("details.system-details").forEach((d) => {
      d.open = expand;
    });
    syncToggleAllState();
  };

  if (Object.hasOwn(HTMLButtonElement.prototype, "commandForElement")) {
    document.addEventListener(
      "command",
      (event) => {
        if (event.command === "--toggle-all") runToggleAll();
      },
      { capture: true }
    );
  } else {
    toggleAllBtn.addEventListener("click", runToggleAll);
  }

  document.addEventListener(
    "toggle",
    (event) => {
      if (event.target.matches?.("#systems-accordion-group details.system-details")) {
        syncToggleAllState();
      }
    },
    { capture: true }
  );
}

/* =========================================================
   5. Dominios Técnicos, Idiomas, Distinciones y Tabla 21 Certs
   ========================================================= */
function renderEditorialSections() {
  const domainsGrid = document.getElementById("domains-grid");
  domains.forEach((d) => {
    const cell = el("article", "domain-cell");
    const ul = el("ul", "domain-list");
    d.items.forEach((item) => ul.appendChild(el("li", "", item)));
    cell.append(el("h3", "", d.title), el("p", "domain-sub", d.summary), ul);
    domainsGrid.appendChild(cell);
  });

  const langBox = document.getElementById("languages-container");
  languages.forEach((lang) => {
    const item = el("article", "cred-item");
    const head = el("div", "cred-head");
    head.append(el("h4", "", lang.name), el("span", "cred-badge", lang.badge));
    item.append(head, el("p", "cred-copy", lang.detail));

    if (lang.bars.length > 0) {
      const stack = el("div", "meter-stack");
      lang.bars.forEach((b) => {
        const row = el("div", "meter-row");
        const meta = el("div", "meter-meta");
        meta.append(el("span", "", b.label), el("strong", "", `${b.score}/100`));
        const prog = document.createElement("progress");
        prog.max = 100;
        prog.value = b.score;
        prog.setAttribute("aria-label", `${b.label}: ${b.score} sobre 100`);
        row.append(meta, prog);
        stack.appendChild(row);
      });
      item.appendChild(stack);
    }

    if (lang.verifyUrl) {
      const a = el("a", "", `${lang.verifyLabel} ↗`);
      a.href = lang.verifyUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      item.appendChild(a);
    }
    langBox.appendChild(item);
  });

  const distBox = document.getElementById("distinctions-container");
  distinctions.forEach((d) => {
    const item = el("article", "cred-item");
    const head = el("div", "cred-head");
    head.append(el("h4", "", d.title), el("span", "cred-badge", d.code));
    item.append(head, el("p", "cred-copy", d.detail));
    distBox.appendChild(item);
  });

  const tbody = document.getElementById("certs-tbody");
  certificationsTable.forEach((c) => {
    const tr = document.createElement("tr");
    const th = el("th", "", c.org);
    th.setAttribute("scope", "row");
    const tdArea = el("td", "", c.area);
    const tdTitle = document.createElement("td");
    if (c.url) {
      const a = el("a", "", `${c.title} ↗`);
      a.href = c.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      tdTitle.appendChild(a);
    } else {
      tdTitle.textContent = c.title;
    }
    const tdHours = el("td", "", c.hours);
    tr.append(th, tdArea, tdTitle, tdHours);
    tbody.appendChild(tr);
  });
}

/* =========================================================
   6. Formulario Accesible (Guías validate-input + accessible-error)
   ========================================================= */
function initAccessibleForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

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
      syncAria(target, true, !supportsUserInvalid && state.hasInteracted);
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
    feedback.textContent = "Mensaje preparado en tu cliente de correo.";
  });
}

/* =========================================================
   7. Acciones Generales
   ========================================================= */
function initGeneralActions() {
  document.getElementById("footer-year").textContent = String(new Date().getFullYear());
  document.getElementById("print-cv-btn").addEventListener("click", () => window.print());

  document.getElementById("copy-email-btn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      showToast(`Copiado: ${profile.email}`);
    } catch {
      showToast(profile.email);
    }
  });

  document.getElementById("copy-phone-btn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(profile.phone);
      showToast(`Copiado: ${profile.phone}`);
    } catch {
      showToast(profile.phone);
    }
  });
}

initThemeControl();
initScrollspy();
renderSystemFilters();
renderSystemsLedger();
initAccordionControls();
renderEditorialSections();
initAccessibleForm();
initGeneralActions();
