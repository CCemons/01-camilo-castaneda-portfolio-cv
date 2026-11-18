/**
 * Datos centrales del Currículum Vitae y Portafolio de Camilo Castañeda.
 * Edita este archivo para actualizar tu información personal, enlaces,
 * experiencia, formación académica, habilidades y proyectos sin tocar el HTML.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Camilo Castañeda",
    initials: "CC",
    role: "Ingeniero en Electrónica · Sistemas Embebidos, IoT & Desarrollo Web",
    tagline:
      "Diseño soluciones integrales que conectan el mundo físico con la nube: desde firmware determinista en Arduino/ESP32 y gateways Edge en Raspberry Pi, hasta procesamiento digital de señales RF y aplicaciones web modernas.",
    location: "Colombia (Disponible para trabajo remoto y presencial)",
    availability: "Disponible para proyectos y oportunidades",
    email: "camilomilo3000@gmail.com",
    githubUsername: "CCemons",
    githubUrl: "https://github.com/CCemons",
    linkedinUrl: "https://www.linkedin.com/in/camilocastanedapolo/",
    websiteUrl: "https://ccemons.github.io/01-camilo-castaneda-portfolio-cv/",
    yearsExperience: "3+",
    projectsCompleted: "15+",
    highlights: [
      { label: "Enfoque principal", value: "IoT · Embebidos · Web" },
      { label: "Plataformas Hardware", value: "Arduino · ESP32 · Raspberry Pi" },
      { label: "Stack Software", value: "C/C++ · Python · JS · MATLAB" },
      { label: "Especialidad RF", value: "DSP · FFT · SDR (PlutoSDR)" }
    ],
    aboutParagraphs: [
      "Soy un apasionado de la ingeniería electrónica y el desarrollo de software orientado al Internet de las Cosas (IoT) y la instrumentación digital. Disfruto construir sistemas completos de principio a fin: diseño de circuitos, programación de microcontroladores en tiempo real, servidores embebidos en Linux y visualización web interactiva.",
      "Mi experiencia abarca desde arquitecturas de bajo consumo con máquinas de estados finitos en C++ para Arduino y ESP32, hasta nodos Edge con visión computacional y APIs REST en Raspberry Pi, pasando por análisis espectral y procesamiento digital de señales (DSP) con Python y Radio Definida por Software (SDR)."
    ]
  },

  skillCategories: [
    { id: "all", label: "Todas" },
    { id: "embedded", label: "Embebidos & Hardware" },
    { id: "rpi", label: "Raspberry Pi & Linux" },
    { id: "dsp", label: "DSP, RF & Ciencia" },
    { id: "web", label: "Web & Cloud" }
  ],

  skills: [
    {
      name: "Arduino / ESP32 (C / C++)",
      category: "embedded",
      level: 94,
      tags: ["PlatformIO", "FSM", "ISR", "Bajo Consumo"]
    },
    {
      name: "Buses de Comunicación Industrial",
      category: "embedded",
      level: 90,
      tags: ["UART", "I2C", "SPI", "PWM", "ADC"]
    },
    {
      name: "Diseño Electrónico & Prototipado",
      category: "embedded",
      level: 85,
      tags: ["Sensores", "Relés", "KiCad", "Wokwi"]
    },
    {
      name: "Raspberry Pi & Linux Embebido",
      category: "rpi",
      level: 92,
      tags: ["GPIO", "Systemd", "Bash", "SSH"]
    },
    {
      name: "Python para IoT & Backend",
      category: "rpi",
      level: 93,
      tags: ["APIs REST", "SQLite", "OpenCV", "Serial"]
    },
    {
      name: "Contenedores & Despliegue Edge",
      category: "rpi",
      level: 82,
      tags: ["Docker", "Docker Compose", "MQTT"]
    },
    {
      name: "Procesamiento Digital de Señales (DSP)",
      category: "dsp",
      level: 90,
      tags: ["FFT", "Filtros FIR", "PSD", "SNR/THD"]
    },
    {
      name: "SDR & Telecomunicaciones RF",
      category: "dsp",
      level: 86,
      tags: ["ADALM-PLUTO", "libiio", "AM/FM", "MATLAB"]
    },
    {
      name: "HTML5, CSS3 & JavaScript (ES6+)",
      category: "web",
      level: 91,
      tags: ["SPA", "Canvas 2D", "Responsive", "UI/UX"]
    },
    {
      name: "Git, GitHub & Documentación Técnica",
      category: "web",
      level: 89,
      tags: ["Git Flow", "GitHub Pages", "Markdown"]
    }
  ],

  timeline: [
    {
      type: "experience",
      period: "2025 — Presente",
      title: "Desarrollador de Soluciones IoT, Embebidos & Web (Portafolio Open Source)",
      organization: "Proyectos Independientes · GitHub",
      description:
        "Arquitectura y publicación de sistemas modulares de código abierto que integran sensores en Arduino/ESP32, gateways en Raspberry Pi con SQLite y APIs REST, y dashboards web de telemetría en tiempo real.",
      achievements: [
        "Diseño de firmware no bloqueante con máquinas de estados finitos y filtrado EMA para agro-tecnología.",
        "Implementación de capa HAL en Python para Raspberry Pi compatible con pruebas en entornos sin hardware.",
        "Desarrollo de visualizadores web SPA de alto rendimiento basados en HTML5 Canvas sin dependencias externas."
      ]
    },
    {
      type: "experience",
      period: "2024 — 2026",
      title: "Investigación y Desarrollo en Sistemas SDR y Procesamiento de Señales RF",
      organization: "Proyecto de Grado / Laboratorio Universitario",
      description:
        "Implementación de flujos de adquisición, análisis espectral y procesamiento digital de señales mediante transceptores SDR (ADALM-PLUTO / libiio), MATLAB y Python científico.",
      achievements: [
        "Caracterización de señales moduladas (AM, FM, Chirp) y evaluación de relación señal a ruido (SNR) y distorsión armónica (THD).",
        "Automatización de reportes espectrales reproducibles y librerías de pruebas unitarias para motores FFT."
      ]
    },
    {
      type: "education",
      period: "2020 — 2026",
      title: "Ingeniería Electrónica / Telecomunicaciones",
      organization: "Formación Universitaria",
      description:
        "Sólida base en electrónica analógica y digital, microcontroladores, sistemas de comunicaciones, teoría de control, redes de datos y programación orientada a objetos.",
      achievements: [
        "Énfasis en sistemas embebidos, automatización con Raspberry Pi/Arduino y procesamiento de señales.",
        "Integración multidisciplinaria entre hardware físico y plataformas web."
      ]
    }
  ],

  certifications: [
    {
      title: "Arquitectura de Sistemas Embebidos con C/C++",
      issuer: "Especialización Técnica",
      year: "2025",
      badge: "C++ / PlatformIO"
    },
    {
      title: "Linux Embebido, Docker & Edge Computing en Raspberry Pi",
      issuer: "Formación Práctica IoT",
      year: "2025",
      badge: "Raspberry Pi"
    },
    {
      title: "Procesamiento Digital de Señales (DSP) & SDR Aplicado",
      issuer: "Laboratorio RF & MATLAB",
      year: "2025",
      badge: "DSP / SDR"
    },
    {
      title: "Desarrollo Web Moderno (HTML5, CSS3, JavaScript ES6+)",
      issuer: "Frontend Engineering",
      year: "2024",
      badge: "Web SPA"
    }
  ],

  projectCategories: [
    { id: "all", label: "Todos" },
    { id: "arduino", label: "Arduino & ESP32" },
    { id: "raspberry", label: "Raspberry Pi" },
    { id: "web", label: "Web Apps" },
    { id: "dsp", label: "DSP & Python" }
  ],

  projects: [
    {
      id: "agro-iot",
      repoName: "02-arduino-smart-agro-iot",
      title: "Smart Agro-IoT: Riego Autónomo & Telemetría",
      category: "arduino",
      categoryLabel: "Arduino & ESP32",
      featured: true,
      summary:
        "Firmware profesional en C++ (PlatformIO/Arduino) con Máquina de Estados Finitos (FSM), filtrado EMA para sensores analógicos, lectura de caudal por interrupción externa y protección contra operación en seco.",
      stack: ["C++", "Arduino / ESP32", "PlatformIO", "Wokwi", "Python Serial"],
      metrics: [
        "Muestreo determinista sin delay()",
        "Filtro EMA (α = 0.25) anti-ruido",
        "Tramas JSON a 115200 bps",
        "Simulación lista en Wokwi"
      ],
      repoUrl: "https://github.com/CCemons/02-arduino-smart-agro-iot",
      localPath: "../02-arduino-smart-agro-iot/README.md",
      simType: "serial",
      architecture:
        "Sensores (Humedad Suelo, DHT22, HC-SR04, Caudalímetro YF-S201) -> SensorManager (Filtro EMA + ISR) -> IrrigationFSM (6 estados con histéresis) -> Relé Bomba + Telemetría JSON UART -> Logger Python CSV."
    },
    {
      id: "rpi-edge-hub",
      repoName: "03-raspberry-pi-edge-iot-hub",
      title: "Raspberry Pi Edge IoT Hub & Monitor de Visión",
      category: "raspberry",
      categoryLabel: "Raspberry Pi",
      featured: true,
      summary:
        "Plataforma Edge completa en Python para Raspberry Pi con control de 4 canales GPIO, monitoreo térmico del SoC, detector de movimiento por visión artificial, base de datos SQLite y panel web en tiempo real.",
      stack: ["Python 3", "Raspberry Pi OS", "GPIO", "SQLite", "Docker", "REST API"],
      metrics: [
        "Capa HAL auto-detectable (RPi / Sim)",
        "Auditoría GPIO y eventos en SQLite",
        "Servicio Systemd + Dockerfile incluidos",
        "Cero dependencias obligatorias para pruebas"
      ],
      repoUrl: "https://github.com/CCemons/03-raspberry-pi-edge-iot-hub",
      localPath: "../03-raspberry-pi-edge-iot-hub/README.md",
      simType: "gpio",
      architecture:
        "RaspberryPiHAL (GPIO/Thermal/RAM) + EdgeVisionMonitor (Frame Diff) -> SQLite Storage -> HTTP REST Server -> Dashboard Web Interactivo."
    },
    {
      id: "iot-cloud-dashboard",
      repoName: "04-iot-cloud-telemetry-dashboard",
      title: "IoT Cloud Telemetry Dashboard (SCADA Web)",
      category: "web",
      categoryLabel: "Web Apps",
      featured: true,
      summary:
        "Aplicación web SPA estilo centro de control industrial para supervisar múltiples nodos IoT (Arduino, Raspberry Pi, ESP32), con gráficas HTML5 Canvas en vivo, inyector de anomalías, consola MQTT simulada y exportación CSV/JSON.",
      stack: ["HTML5", "CSS3", "JavaScript ES6", "Canvas 2D", "SCADA UI"],
      metrics: [
        "4 nodos IoT simulados en tiempo real",
        "Motor de gráficas propio en Canvas 2D",
        "Sistema de alertas configurables",
        "Exportación directa a CSV y JSON"
      ],
      repoUrl: "https://github.com/CCemons/04-iot-cloud-telemetry-dashboard",
      localPath: "../04-iot-cloud-telemetry-dashboard/index.html",
      simType: "telemetry",
      architecture:
        "TelemetrySimulator (Ruido Gaussiano + Ciclos) -> AlertEngine -> CanvasChartRenderer (Series de tiempo y Gauges) -> CSV/JSON Exporter."
    },
    {
      id: "rf-dsp-analyzer",
      repoName: "05-rf-dsp-spectrum-analyzer",
      title: "Analizador de Espectro RF & Procesamiento DSP",
      category: "dsp",
      categoryLabel: "DSP & Python",
      featured: true,
      summary:
        "Motor de análisis espectral en Python capaz de sintetizar señales AM, FM, Chirp y multitono con ruido AWGN, aplicar ventanas (Hann, Hamming, Blackman), calcular FFT/PSD en dBFS, medir SNR y THD, y exportar reportes HTML/SVG.",
      stack: ["Python 3", "FFT Radix-2", "DSP", "Filtros FIR", "SVG/HTML"],
      metrics: [
        "Implementación Radix-2 FFT + soporte NumPy",
        "Cálculo preciso de SNR y THD (%)",
        "Filtro digital FIR pasa-bajos por ventana Sinc",
        "Exportador automático de reportes visuales"
      ],
      repoUrl: "https://github.com/CCemons/05-rf-dsp-spectrum-analyzer",
      localPath: "../05-rf-dsp-spectrum-analyzer/README.md",
      simType: "spectrum",
      architecture:
        "SignalGenerator (AM/FM/Chirp/AWGN) -> DSPEngine (Windowing + Radix-2 FFT + FIR) -> Peak/SNR/THD Analyzer -> HTML/SVG Report Exporter."
    },
    {
      id: "portfolio-cv",
      repoName: "01-camilo-castaneda-portfolio-cv",
      title: "Portafolio Web Interactivo & Currículum Vitae",
      category: "web",
      categoryLabel: "Web Apps",
      featured: false,
      summary:
        "Sitio web personal y hoja de vida interactiva lista para GitHub Pages. Incluye terminal interactiva, filtros dinámicos, simuladores embebidos de proyectos, modo claro/oscuro y hoja de estilos optimizada para imprimir CV en PDF.",
      stack: ["HTML5 Semántico", "CSS Grid/Variables", "JavaScript ES6", "Print CSS"],
      metrics: [
        "100% estático y sin dependencias externas",
        "Configuración centralizada en JSON/JS",
        "Diseño optimizado para impresión PDF",
        "Terminal interactiva de comandos"
      ],
      repoUrl: "https://github.com/CCemons/01-camilo-castaneda-portfolio-cv",
      localPath: "./README.md",
      simType: "terminal",
      architecture:
        "PORTFOLIO_DATA (Fuente única de verdad) -> Renderizador DOM dinámico -> Simulador Canvas/Serial por proyecto -> @media print para exportación CV."
    }
  ]
};
