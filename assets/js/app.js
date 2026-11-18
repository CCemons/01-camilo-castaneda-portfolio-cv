/**
 * Lógica interactiva del Portafolio y Currículum Vitae de Camilo Castañeda.
 * Renderiza dinámicamente desde PORTFOLIO_DATA, gestiona filtros, terminal
 * interactiva, modo claro/oscuro, impresión PDF y simuladores en Canvas.
 */

(function () {
  "use strict";

  const { profile, skillCategories, skills, timeline, certifications, projectCategories, projects } =
    PORTFOLIO_DATA;

  let activeSkillCategory = "all";
  let activeProjectCategory = "all";
  let searchQuery = "";
  let simTimer = null;

  // Utilidad segura para crear elementos con texto
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  // ---------- 1. Inicialización de Perfil y Cabecera de Impresión ----------
  function renderProfile() {
    document.getElementById("brand-initials").textContent = profile.initials;
    document.getElementById("hero-name").textContent = profile.name;
    document.getElementById("hero-role").textContent = profile.role;
    document.getElementById("hero-tagline").textContent = profile.tagline;
    document.getElementById("hero-availability").textContent = profile.availability;
    document.getElementById("hero-github-link").href = profile.githubUrl;
    const heroLinkedin = document.getElementById("hero-linkedin-link");
    if (heroLinkedin) heroLinkedin.href = profile.linkedinUrl;
    document.getElementById("footer-year").textContent = new Date().getFullYear();
    document.getElementById("footer-name").textContent = profile.name;

    // Estadísticas Hero
    const statsContainer = document.getElementById("hero-stats");
    const stats = [
      { value: `${projects.length} Repos`, label: "Portafolio Activo" },
      { value: profile.yearsExperience, label: "Años en Electrónica & Sw" },
      { value: "4 Áreas", label: "Arduino · RPi · Web · DSP" }
    ];
    stats.forEach((s) => {
      const box = el("div", "stat-item");
      box.appendChild(el("span", "stat-value", s.value));
      box.appendChild(el("span", "stat-label", s.label));
      statsContainer.appendChild(box);
    });

    // Sobre Mí
    const aboutBox = document.getElementById("about-paragraphs");
    profile.aboutParagraphs.forEach((text) => aboutBox.appendChild(el("p", "", text)));

    const highlightsList = document.getElementById("highlights-list");
    profile.highlights.forEach((item) => {
      const li = el("li");
      li.appendChild(el("span", "", item.label));
      li.appendChild(el("strong", "", item.value));
      highlightsList.appendChild(li);
    });

    // Encabezado de impresión PDF
    const linkedinDisplay = profile.linkedinUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    document.getElementById("print-name").textContent = profile.name;
    document.getElementById("print-role").textContent = profile.role;
    document.getElementById("print-summary").textContent = profile.tagline;
    const printContact = document.getElementById("print-contact-info");
    printContact.innerHTML = `
      <div>${profile.location}</div>
      <div>${profile.email}</div>
      <div>github.com/${profile.githubUsername}</div>
      <div>${linkedinDisplay}</div>
    `;

    // Enlaces de Contacto
    const contactLinks = document.getElementById("contact-links");
    const channels = [
      { label: "Correo Electrónico", value: profile.email, href: `mailto:${profile.email}` },
      { label: "GitHub", value: `@${profile.githubUsername}`, href: profile.githubUrl },
      { label: "LinkedIn", value: linkedinDisplay, href: profile.linkedinUrl }
    ];
    channels.forEach((c) => {
      const a = el("a", "contact-link-item");
      a.href = c.href;
      if (!c.href.startsWith("mailto:")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.appendChild(el("span", "", c.label));
      a.appendChild(el("strong", "", c.value));
      contactLinks.appendChild(a);
    });
  }

  // ---------- 2. Terminal Interactiva ----------
  function initTerminal() {
    const output = document.getElementById("terminal-output");
    const form = document.getElementById("terminal-form");
    const input = document.getElementById("terminal-input");

    function printLine(text, cls = "") {
      const line = el("div", `term-line ${cls}`, text);
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
    }

    function runCommand(rawCmd) {
      const cmd = rawCmd.trim().toLowerCase();
      if (!cmd) return;
      printLine(`$ ${cmd}`, "term-cmd");

      switch (cmd) {
        case "help":
          printLine("Comandos disponibles: whoami, hardware, projects, dsp, contact, clear", "term-muted");
          break;
        case "whoami":
          printLine(`${profile.name} — ${profile.role}`, "term-ok");
          break;
        case "hardware":
          printLine("Placas: Arduino Uno/Mega, ESP32, Raspberry Pi 4/5, ADALM-PLUTO SDR", "term-ok");
          printLine("Protocolos: UART (115200bps), I2C, SPI, PWM, MQTT, REST/JSON", "term-muted");
          break;
        case "projects":
          projects.forEach((p, idx) => printLine(`[0${idx + 1}] ${p.repoName} -> ${p.categoryLabel}`, "term-ok"));
          break;
        case "dsp":
          printLine("Motor DSP: FFT Radix-2, Ventanas Hann/Blackman, SNR, THD, Filtros FIR.", "term-ok");
          break;
        case "contact":
          printLine(`Email: ${profile.email} | GitHub: ${profile.githubUrl} | LinkedIn: ${profile.linkedinUrl}`, "term-ok");
          break;
        case "clear":
          output.innerHTML = "";
          break;
        default:
          printLine(`Comando no reconocido: '${cmd}'. Escribe 'help'.`, "term-muted");
      }
    }

    // Arranque inicial simulado
    printLine("Inicializando entorno de portafolio...", "term-muted");
    runCommand("whoami");
    runCommand("hardware");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      runCommand(input.value);
      input.value = "";
    });

    document.querySelectorAll(".cmd-chip").forEach((btn) => {
      btn.addEventListener("click", () => runCommand(btn.dataset.cmd));
    });
  }

  // ---------- 3. Habilidades ----------
  function renderSkillFilters() {
    const container = document.getElementById("skill-filters");
    container.innerHTML = "";
    skillCategories.forEach((cat) => {
      const btn = el("button", `filter-btn ${cat.id === activeSkillCategory ? "active" : ""}`, cat.label);
      btn.type = "button";
      btn.addEventListener("click", () => {
        activeSkillCategory = cat.id;
        renderSkillFilters();
        renderSkills();
      });
      container.appendChild(btn);
    });
  }

  function renderSkills() {
    const grid = document.getElementById("skills-grid");
    grid.innerHTML = "";
    const filtered =
      activeSkillCategory === "all"
        ? skills
        : skills.filter((s) => s.category === activeSkillCategory);

    filtered.forEach((s) => {
      const card = el("div", "skill-card");
      const top = el("div", "skill-top");
      top.appendChild(el("span", "skill-name", s.name));
      top.appendChild(el("span", "skill-pct", `${s.level}%`));

      const bar = el("div", "skill-bar");
      const fill = el("div", "skill-bar-fill");
      fill.style.width = `${s.level}%`;
      bar.appendChild(fill);

      const tags = el("div", "tag-row");
      s.tags.forEach((t) => tags.appendChild(el("span", "tag", t)));

      card.append(top, bar, tags);
      grid.appendChild(card);
    });
  }

  // ---------- 4. Experiencia y Certificaciones ----------
  function renderTimelineAndCerts() {
    const tl = document.getElementById("timeline-container");
    timeline.forEach((item) => {
      const box = el("article", "timeline-item");
      box.appendChild(el("span", "timeline-period", item.period));
      box.appendChild(el("h3", "", item.title));
      box.appendChild(el("div", "timeline-org", item.organization));
      box.appendChild(el("p", "", item.description));

      const ul = el("ul", "timeline-list");
      item.achievements.forEach((ach) => ul.appendChild(el("li", "", ach)));
      box.appendChild(ul);
      tl.appendChild(box);
    });

    const certsBox = document.getElementById("certs-container");
    certifications.forEach((c) => {
      const card = el("div", "cert-card");
      card.appendChild(el("span", "cert-badge", `${c.badge} · ${c.year}`));
      card.appendChild(el("h4", "", c.title));
      card.appendChild(el("p", "", c.issuer));
      certsBox.appendChild(card);
    });
  }

  // ---------- 5. Proyectos & Modal con Simulador ----------
  function renderProjectFilters() {
    const container = document.getElementById("project-filters");
    container.innerHTML = "";
    projectCategories.forEach((cat) => {
      const btn = el("button", `filter-btn ${cat.id === activeProjectCategory ? "active" : ""}`, cat.label);
      btn.type = "button";
      btn.addEventListener("click", () => {
        activeProjectCategory = cat.id;
        renderProjectFilters();
        renderProjects();
      });
      container.appendChild(btn);
    });
  }

  function renderProjects() {
    const grid = document.getElementById("projects-grid");
    grid.innerHTML = "";

    const filtered = projects.filter((p) => {
      const matchesCat = activeProjectCategory === "all" || p.category === activeProjectCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.stack.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });

    if (filtered.length === 0) {
      grid.appendChild(el("p", "section-subtitle", "No se encontraron proyectos con ese filtro."));
      return;
    }

    filtered.forEach((p) => {
      const card = el("article", "project-card");

      const content = el("div");
      const top = el("div", "project-top");
      top.appendChild(el("span", "project-badge", p.categoryLabel));
      top.appendChild(el("span", "project-repo", p.repoName));

      content.append(top, el("h3", "", p.title), el("p", "", p.summary));

      const metrics = el("ul", "project-metrics");
      p.metrics.forEach((m) => metrics.appendChild(el("li", "", m)));
      content.appendChild(metrics);

      const tags = el("div", "tag-row");
      p.stack.forEach((tech) => tags.appendChild(el("span", "tag", tech)));
      content.appendChild(tags);

      const actions = el("div", "project-actions no-print");
      const previewBtn = el("button", "btn btn-primary btn-sm", "Vista Previa & Simulación");
      previewBtn.type = "button";
      previewBtn.addEventListener("click", () => openProjectModal(p));

      const repoLink = el("a", "btn btn-outline btn-sm", "Código GitHub ↗");
      repoLink.href = p.repoUrl;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";

      actions.append(previewBtn, repoLink);
      card.append(content, actions);
      grid.appendChild(card);
    });
  }

  function drawProjectSimulation(project) {
    const canvas = document.getElementById("modal-canvas");
    const ctx = canvas.getContext("2d");
    const consoleBox = document.getElementById("modal-console");
    let phase = 0;

    clearInterval(simTimer);

    function renderFrame() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Rejilla sutil
      ctx.strokeStyle = "rgba(148, 163, 184, 0.14)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 62) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 38) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (project.simType === "spectrum") {
        // Espectro FFT simulado con portadora + bandas laterales
        ctx.beginPath();
        ctx.strokeStyle = "#06b6d4";
        ctx.lineWidth = 2.2;
        for (let x = 0; x < w; x++) {
          const norm = x / w;
          const noise = -78 + Math.sin(x * 0.6 + phase) * 3.5;
          const carrier = 62 * Math.exp(-Math.pow((norm - 0.5) / 0.02, 2));
          const usb = 34 * Math.exp(-Math.pow((norm - 0.62) / 0.015, 2));
          const lsb = 34 * Math.exp(-Math.pow((norm - 0.38) / 0.015, 2));
          const db = Math.min(-4, noise + carrier + usb + lsb);
          const y = h - ((db + 90) / 90) * (h - 24) - 12;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        consoleBox.textContent =
          `[DSP] Fc = 10.00 kHz | Peak = -12.4 dBFS | SNR = 42.8 dB | THD = 1.14% | Window = Hann`;
      } else if (project.simType === "gpio") {
        // Barras de CPU/Temperatura y canales GPIO
        const cpuTemp = (46.5 + Math.sin(phase * 0.4) * 2.4).toFixed(1);
        const channels = [
          { name: "GPIO17 · Bomba Aux", on: Math.sin(phase * 0.3) > 0 },
          { name: "GPIO27 · Luz LED", on: true },
          { name: "GPIO22 · Extractor", on: Number(cpuTemp) > 47.0 },
          { name: "GPIO23 · Alarma", on: false }
        ];
        channels.forEach((ch, i) => {
          const y = 24 + i * 38;
          ctx.fillStyle = "#94a3b8";
          ctx.font = "13px Consolas, monospace";
          ctx.fillText(ch.name, 20, y + 16);

          ctx.fillStyle = ch.on ? "#10b981" : "#334155";
          ctx.fillRect(230, y, 90, 24);
          ctx.fillStyle = "#f8fafc";
          ctx.fillText(ch.on ? "HIGH (1)" : "LOW  (0)", 242, y + 16);
        });
        ctx.fillStyle = "#38bdf8";
        ctx.fillText(`SoC Temp: ${cpuTemp} °C`, 420, 44);
        ctx.fillText(`Motion Score: ${(Math.abs(Math.sin(phase * 0.5)) * 14).toFixed(1)}%`, 420, 82);
        consoleBox.textContent =
          `GET /api/status -> {"board":"Raspberry Pi Edge","cpu_temp_c":${cpuTemp},"db":"sqlite_ok"}`;
      } else {
        // Onda de telemetría (Arduino / Cloud Dashboard / Portfolio)
        ctx.beginPath();
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 2.4;
        for (let x = 0; x < w; x += 4) {
          const y = h / 2 + Math.sin(x * 0.03 + phase) * 42 + Math.cos(x * 0.08 - phase) * 14;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        const soil = (48.2 + Math.sin(phase * 0.35) * 4.5).toFixed(1);
        const temp = (24.6 + Math.cos(phase * 0.25) * 1.1).toFixed(1);
        consoleBox.textContent =
          project.simType === "serial"
            ? `{"state":"IDLE_MONITORING","soil_pct":${soil},"temp_c":${temp},"tank_pct":82.4,"flow_lpm":0.00}`
            : `[MQTT/WS] node=agro-01 soil=${soil}% temp=${temp}°C rssi=-61dBm status=ONLINE`;
      }
      phase += 0.22;
    }

    renderFrame();
    simTimer = setInterval(renderFrame, 120);
  }

  function openProjectModal(project) {
    const modal = document.getElementById("project-modal");
    document.getElementById("modal-category").textContent = project.categoryLabel;
    document.getElementById("modal-title").textContent = project.title;
    document.getElementById("modal-summary").textContent = project.summary;
    document.getElementById("modal-architecture").textContent = project.architecture;
    document.getElementById("modal-repo-link").href = project.repoUrl;
    document.getElementById("modal-local-link").href = project.localPath;

    const list = document.getElementById("modal-metrics-list");
    list.innerHTML = "";
    project.metrics.forEach((m) => list.appendChild(el("li", "", m)));

    modal.hidden = false;
    drawProjectSimulation(project);
  }

  function closeProjectModal() {
    document.getElementById("project-modal").hidden = true;
    clearInterval(simTimer);
  }

  // ---------- 6. Tema, Navegación, Búsqueda y Contacto ----------
  function initInteractions() {
    // Tema oscuro / claro
    const html = document.documentElement;
    const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
    html.setAttribute("data-theme", savedTheme);
    document.getElementById("theme-icon").textContent = savedTheme === "dark" ? "☀️" : "🌙";

    document.getElementById("theme-toggle").addEventListener("click", () => {
      const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      localStorage.setItem("portfolio_theme", next);
      document.getElementById("theme-icon").textContent = next === "dark" ? "☀️" : "🌙";
    });

    // Imprimir CV
    document.getElementById("print-cv-btn").addEventListener("click", () => window.print());

    // Menú móvil
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );

    // Buscador de proyectos
    document.getElementById("project-search").addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderProjects();
    });

    // Modal
    document.getElementById("modal-close").addEventListener("click", closeProjectModal);
    document.getElementById("project-modal").addEventListener("click", (e) => {
      if (e.target.id === "project-modal") closeProjectModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeProjectModal();
    });

    // Formulario de contacto
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const subject = document.getElementById("contact-subject").value.trim();
      const msg = document.getElementById("contact-message").value.trim();

      if (!name || !email || !subject || !msg) {
        feedback.textContent = "Por favor completa todos los campos antes de enviar.";
        return;
      }

      const body = encodeURIComponent(`Hola Camilo,\n\nSoy ${name} (${email}).\n\n${msg}`);
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      feedback.textContent = "Se abrió tu cliente de correo con el mensaje preparado.";
    });

    document.getElementById("copy-email-btn").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(profile.email);
        showToast(`Correo copiado: ${profile.email}`);
      } catch {
        showToast(profile.email);
      }
    });
  }

  // Arranque
  renderProfile();
  initTerminal();
  renderSkillFilters();
  renderSkills();
  renderTimelineAndCerts();
  renderProjectFilters();
  renderProjects();
  initInteractions();
})();
