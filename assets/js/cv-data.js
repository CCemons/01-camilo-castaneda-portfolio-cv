/**
 * Fuente única y verificable de datos curriculares y proyectos de ingeniería
 * de Camilo Andrés Castañeda Polo.
 */

export const CV_DATA = {
  profile: {
    name: "Camilo Andrés Castañeda Polo",
    role: "Ingeniero Electrónico (Candidato a Grado · Inicios 2027)",
    location: "Neiva, Huila, Colombia",
    email: "camilomilo3000@gmail.com",
    phone: "+57 304 643 5801",
    githubUrl: "https://github.com/CCemons",
    linkedinUrl: "https://www.linkedin.com/in/camilocastanedapolo/"
  },

  systemCategories: [
    { id: "all", label: "Todos (6)" },
    { id: "rf-dsp", label: "RF & DSP" },
    { id: "embedded", label: "Embebidos & Instrumentación" },
    { id: "software", label: "Edge, SCADA & Móvil" }
  ],

  systems: [
    {
      id: "rpi-edge-hub",
      repoName: "03-raspberry-pi-edge-iot-hub",
      year: "2026",
      category: "software",
      categoryLabel: "Edge IoT & Docker",
      title: "Plataforma Edge IoT en Raspberry Pi con Visión Artificial, API REST y Docker",
      subtitle: "Python 3 · gpiozero HAL · OpenCV · SQLite · systemd",
      summary:
        "Gateway Linux embebido con capa de abstracción de hardware (HAL) auto-detectable entre GPIO físico y entorno simulado, monitoreo térmico del SoC (/sys/class/thermal), detección visual con OpenCV y persistencia auditable en SQLite.",
      stack: ["Python 3", "Raspberry Pi OS", "OpenCV", "SQLite", "REST API", "Docker Compose", "systemd"],
      repoUrl: "https://github.com/CCemons/03-raspberry-pi-edge-iot-hub",
      flowSteps: [
        { stage: "HAL Auto-Detect", detail: "gpiozero + /sys/thermal" },
        { stage: "Visión OpenCV", detail: "Cámara USB / CSI" },
        { stage: "Persistencia", detail: "SQLite (4 GPIO)" },
        { stage: "API REST + Ops", detail: "Docker Compose / systemd" }
      ],
      specs: [
        "Capa HAL con conmutación automática entre hardware físico y entorno simulado para pruebas sin placa.",
        "Control y trazabilidad de 4 canales GPIO con registro de auditoría en SQLite.",
        "Servidor HTTP REST (/api/status, /api/gpio/toggle, /api/vision/trigger) validado con unittest.",
        "Empaquetado reproducible para despliegue mediante Docker Compose y servicio systemd."
      ]
    },
    {
      id: "agro-iot",
      repoName: "02-arduino-smart-agro-iot",
      year: "2026",
      category: "embedded",
      categoryLabel: "Embebidos & Control",
      title: "Controlador Autónomo Agro-IoT de Riego y Telemetría Serial",
      subtitle: "C++ · ESP32 / AVR · PlatformIO · Wokwi · Python",
      summary:
        "Sistema embebido no bloqueante para automatización de riego gobernado por una máquina de estados finitos (FSM) de 6 estados con histéresis, filtrado digital exponencial EMA, interrupción externa en caudalímetro y logger en Python.",
      stack: ["C++", "ESP32 / AVR", "PlatformIO", "FSM 6 Estados", "ISR YF-S201", "Wokwi", "Python"],
      repoUrl: "https://github.com/CCemons/02-arduino-smart-agro-iot",
      flowSteps: [
        { stage: "Sensórica Campo", detail: "Humedad / DHT22 / HC-SR04" },
        { stage: "Acondicionamiento", detail: "Filtro EMA (α=0.25) + ISR" },
        { stage: "Control FSM", detail: "6 Estados + Histéresis" },
        { stage: "Actuación & Log", detail: "Relé Bomba + Python CSV" }
      ],
      specs: [
        "Temporización determinista sin retardos bloqueantes (delay) compatible con ESP32 y AVR.",
        "Filtro EMA (α = 0.25) para rechazar ruido transitorio en sensores analógicos.",
        "Protección activa contra operación en seco mediante interrupción ISR en caudalímetro YF-S201.",
        "Simulación completa en Wokwi y captura estructurada de tramas JSON por UART en Python."
      ]
    },
    {
      id: "termosense-spi",
      repoName: "tempe",
      year: "2026",
      category: "embedded",
      categoryLabel: "Instrumentación Industrial",
      title: "TermoSense: Datalogger Térmico Tipo K con Librería SPI por Software Propia",
      subtitle: "Arduino · MAX6675 · RTC I2C · MicroSD · C++",
      summary:
        "Registrador industrial de temperatura para termopar Tipo K que elimina la contención en el bus SPI de hardware con tarjetas MicroSD mediante el desarrollo de una librería C++ propia de SPI por software (MAX6675_Lento).",
      stack: ["C++", "Arduino", "MAX6675_Lento", "SPI Software", "RTC I2C", "MicroSD"],
      repoUrl: "https://github.com/CCemons/tempe",
      secondaryUrl: "https://github.com/CCemons/Temperatura",
      secondaryLabel: "Repositorio Temperatura",
      flowSteps: [
        { stage: "Termopar Tipo K", detail: "Conversor MAX6675" },
        { stage: "SPI Software", detail: "Librería MAX6675_Lento" },
        { stage: "Sincronía RTC", detail: "Estampa I2C" },
        { stage: "Almacenamiento", detail: "MicroSD (SPI HW)" }
      ],
      specs: [
        "Diseño e implementación de la librería C++ propia MAX6675_Lento para aislar el bus SPI.",
        "Estampado cronológico continuo sincronizado por módulo de reloj en tiempo real (RTC).",
        "Registro persistente de series térmicas en memoria MicroSD sin corrupción de datos.",
        "Documentación y código fuente en los repositorios tempe y Temperatura de GitHub."
      ]
    },
    {
      id: "scada-cloud-dashboard",
      repoName: "04-iot-cloud-telemetry-dashboard",
      year: "2026",
      category: "software",
      categoryLabel: "SCADA Web & Modbus",
      title: "Centro de Control SCADA Web Multi-Nodo en Tiempo Real",
      subtitle: "JavaScript ES6+ · HTML5 Canvas 2D · Modbus · MQTT/JSON",
      summary:
        "Aplicación web SPA libre de dependencias externas para supervisión simultánea de nodos Arduino, ESP32, Raspberry Pi 5 y medidor de red eléctrica Modbus con potencia activa, tensión RMS y factor de potencia.",
      stack: ["JavaScript ES6+", "HTML5 Canvas 2D", "Modbus", "MQTT / JSON", "SCADA UI"],
      repoUrl: "https://github.com/CCemons/04-iot-cloud-telemetry-dashboard",
      flowSteps: [
        { stage: "Nodos Campo", detail: "Arduino / ESP32 / RPi 5" },
        { stage: "Red Eléctrica", detail: "Modbus Vrms / P / FP" },
        { stage: "Motor Alertas", detail: "Payloads JSON / Anomalías" },
        { stage: "Consola SCADA", detail: "Series + Export CSV/JSON" }
      ],
      specs: [
        "Supervisión multi-nodo heterogénea en tiempo real sin librerías ni CDNs externos.",
        "Lectura y monitoreo de variables eléctricas Modbus: potencia activa, tensión RMS y factor de potencia.",
        "Inyector de anomalías, consola de inspección de payloads JSON tipo MQTT y motor de alertas.",
        "Exportación inmediata de registros históricos en formatos CSV y JSON."
      ]
    },
    {
      id: "rf-dsp-analyzer",
      repoName: "05-rf-dsp-spectrum-analyzer",
      year: "2026",
      category: "rf-dsp",
      categoryLabel: "RF & DSP en Python",
      title: "Suite Modular de Análisis Espectral RF y Procesamiento Digital de Señales",
      subtitle: "Python · FFT Cooley-Tukey Radix-2 · NumPy · Reportes SVG",
      summary:
        "Herramienta científica modular en Python con motor FFT híbrido (algoritmo iterativo Cooley-Tukey Radix-2 nativo y aceleración NumPy), ventanas calibradas, estimación de piso de ruido, SNR/THD, filtrado FIR y reportes HTML + SVG.",
      stack: ["Python 3", "FFT Radix-2", "NumPy", "Filtros FIR", "SNR / THD", "HTML + SVG"],
      repoUrl: "https://github.com/CCemons/05-rf-dsp-spectrum-analyzer",
      flowSteps: [
        { stage: "Síntesis RF", detail: "AM / FM / Chirp / AWGN" },
        { stage: "Ventaneo", detail: "Hann / Hamming / Blackman" },
        { stage: "Motor FFT", detail: "Radix-2 + Sub-bin" },
        { stage: "Métricas & FIR", detail: "SNR / THD / Reporte SVG" }
      ],
      specs: [
        "Implementación iterativa nativa Cooley-Tukey Radix-2 con respaldo acelerado en NumPy.",
        "Interpolación parabólica sub-bin para localización espectral de alta precisión.",
        "Cálculo automatizado de piso de ruido, relación señal a ruido SNR (dB) y distorsión armónica THD (%).",
        "Filtro digital FIR pasa-bajos y generador de reportes técnicos autocontenidos en HTML + SVG."
      ]
    },
    {
      id: "classwix-android",
      repoName: "Classwix-android",
      year: "2026",
      category: "software",
      categoryLabel: "Android Kotlin & CI/CD",
      title: "Emulador Científico Casio ClassWiz fx-991LA CW en Android (v1.0.3)",
      subtitle: "100% Kotlin · Jetpack Compose M3 · MVVM · GitHub Actions",
      summary:
        "Aplicación Android nativa escrita 100 % en Kotlin con Jetpack Compose (Material 3) bajo arquitectura MVVM (ViewModel + StateFlow) y DataStore, implementando 13 modos matemáticos y estadísticos con pipeline CI/CD.",
      stack: ["Kotlin", "Jetpack Compose", "Material 3", "MVVM / StateFlow", "DataStore", "JUnit 4 / Robolectric", "GitHub Actions"],
      repoUrl: "https://github.com/CCemons/Classwix-android",
      flowSteps: [
        { stage: "UI Compose M3", detail: "13 Modos Científicos" },
        { stage: "Estado MVVM", detail: "ViewModel + StateFlow" },
        { stage: "Motor & Datos", detail: "Álgebra / Regresión / DataStore" },
        { stage: "Calidad CI/CD", detail: "JUnit 4 + GitHub Actions" }
      ],
      specs: [
        "13 modos matemáticos y estadísticos: ecuaciones, matrices, regresión, hoja de cálculo y más.",
        "Separación estricta de estado reactivo mediante ViewModel, StateFlow y persistencia DataStore.",
        "Suite de pruebas automatizadas con JUnit 4 y Robolectric.",
        "Compilación y publicación automatizada de artefactos de versión en GitHub Actions (v1.0.3)."
      ]
    }
  ],

  domains: [
    {
      title: "Sistemas Embebidos, IoT e Instrumentación",
      summary: "Firmware en tiempo real, buses industriales y acondicionamiento electrónico.",
      items: [
        "ESP32 (Dual-Core Xtensa LX6) & FreeRTOS",
        "C / C++ & PlatformIO",
        "Arduino (AVR) & Simulación Wokwi",
        "Raspberry Pi (Linux, gpiozero, systemd)",
        "SPI (Hardware y Software), I2C, UART / CLI",
        "Modbus, MQTT / JSON & Telemetría",
        "nRF24L01+PA+LNA & Etapa SBB5089/SZP2026",
        "MAX6675 Tipo K, DHT22, HC-SR04, YF-S201",
        "Regulación LM2596 / Doble LDO AMS1117-3.3V"
      ]
    },
    {
      title: "Telecomunicaciones, RF, SDR y Control",
      summary: "Radio Definida por Software, DSP aplicado y teoría de control avanzada.",
      items: [
        "ADALM-Pluto+ SDR (AD9363 + FPGA Zynq-7000)",
        "pyadi-iio / libiio (Captura DMA I/Q)",
        "DSP: FFT Radix-2, FIR, RRC α = 0.35, Lazo de Costas",
        "Demodulación BPSK, QPSK, 16-QAM, GFSK, FHSS",
        "Medición BER / PER, SNR (dB), THD (%) y Balance Friis",
        "Analizador de Espectro Aaronia SPECTRAN HF-60105X",
        "MATLAB, Simulink & MATLAB Coder (C/C++)",
        "Control Digital, Adaptativo y Predictivo",
        "Regulación ANE Res. 105/2020 y MinTIC 002774/2013"
      ]
    },
    {
      title: "Software, IA, Móvil y DevOps",
      summary: "Ciencia de datos, visión por computador, desarrollo nativo y contenedores.",
      items: [
        "Python (NumPy, SciPy, OpenCV, Matplotlib)",
        "Machine Learning, Deep Learning & Visión Artificial",
        "Kotlin (Android, Jetpack Compose, Material 3)",
        "Arquitectura MVVM (ViewModel + StateFlow, DataStore)",
        "JavaScript ES6+, HTML5 Semántico, CSS3, SVG",
        "APIs REST, SQLite & Reportes HTML + SVG",
        "Docker, Docker Compose & Git / GitHub Actions (CI/CD)",
        "Pruebas: JUnit 4, Robolectric & Python unittest",
        "Power BI, Microsoft 365 (Excel) & ERP DMS"
      ]
    },
    {
      title: "ECAD, MCAD, Manufactura Digital y Gestión",
      summary: "Del esquemático al prototipo mecanizado con control de costos y trazabilidad.",
      items: [
        "KiCad 10.0 (Esquemáticos, PCB monocara, Gerber/Excellon)",
        "Fresado CNC 6040 (FlatCAM, Mach3, malla G31)",
        "Autodesk Fusion 360 (Co-diseño ECAD–MCAD STEP)",
        "AutoCAD (Diseño asistido por computador 2D)",
        "Impresión 3D FDM (PLA / PETG)",
        "Estructuración de BOM, costos e inventarios",
        "Conciliaciones bancarias y normativa tributaria/auditoría",
        "Sistemas de Información Geográfica (SIG)",
        "Documentación técnica bilingüe (Estándares IEEE)"
      ]
    }
  ],

  languages: [
    {
      name: "Inglés — EF SET International Certificate",
      badge: "MCER C1 Avanzado · 67/100",
      detail: "Abr. 2026 · Lectura técnica proficiente de estándares IEEE, hojas de datos y documentación de ingeniería.",
      bars: [
        { label: "Lectura (Reading) · C2", score: 97 },
        { label: "Escucha (Listening) · C2", score: 74 },
        { label: "Escritura (Writing) · B2", score: 59 },
        { label: "Conversación (Speaking) · A2", score: 36 }
      ],
      verifyUrl: "https://cert.efset.org/es/xaP8ED",
      verifyLabel: "Verificar en cert.efset.org/es/xaP8ED"
    },
    {
      name: "Inglés — Prueba de Estado ICFES Saber Pro",
      badge: "Nivel B2 (Máx.) · Percentil 97",
      detail: "Puntaje 213 / 300 · Percentil 97 Nacional y Percentil 96 en el NBC de Ingeniería Electrónica, Telecomunicaciones y Afines (2026).",
      bars: []
    },
    {
      name: "Español",
      badge: "Lengua Nativa",
      detail: "Redacción técnica, documentación de proyectos, sustentación y coordinación multidisciplinaria.",
      bars: []
    }
  ],

  distinctions: [
    {
      title: "Pruebas Saber Pro (ICFES, 2026)",
      code: "Reg. EK202610024539",
      detail:
        "Puntaje Global 175 / 300 (Percentil 85 Nacional — Top 15 %; Percentil 76 en NBC de Ingeniería Electrónica, Telecomunicaciones y Afines). Resultados por módulo: Inglés P97 (213), Razonamiento Cuantitativo P92 (186 · Nivel 3), Competencias Ciudadanas P90 (192 · Nivel 3) y Lectura Crítica P80 (176 · Nivel 3)."
    },
    {
      title: "Prueba Saber 11 (ICFES, Ago. 2017)",
      code: "Percentil 100 Nacional",
      detail:
        "Puntaje Global 372 / 500, alcanzando Nivel de Desempeño 4 (máximo posible) en Matemáticas, Ciencias Naturales, Lectura Crítica y Sociales."
    },
    {
      title: "XIII Olimpiada Departamental de Física — Nivel B",
      code: "Sept. 2017",
      detail:
        "Mejor Puntaje Institucional en la I.E. Atanasio Girardot, otorgado por la Universidad Surcolombiana (USCO) y AHMAFIS en Neiva, Huila."
    }
  ],

  certificationsTable: [
    { org: "MathWorks Training Services", area: "IA & Aprendizaje", title: "Deep Learning Onramp", hours: "100 % · Abr. 2026", url: "" },
    { org: "MathWorks Training Services", area: "IA & Datos", title: "Machine Learning Onramp", hours: "100 % · Abr. 2026", url: "" },
    { org: "MathWorks Training Services", area: "Código Embebido", title: "MATLAB Coder Onramp (C/C++)", hours: "100 % · Abr. 2026", url: "" },
    { org: "MathWorks Training Services", area: "Interfaces GUI", title: "App Building Onramp", hours: "100 % · Abr. 2026", url: "" },
    { org: "MathWorks Training Services", area: "Cómputo Científico", title: "MATLAB Onramp", hours: "100 % · Abr. 2026", url: "" },
    { org: "MathWorks Training Services", area: "Control", title: "Control Design Onramp with Simulink", hours: "100 % · Abr. 2025", url: "" },
    { org: "MathWorks Training Services", area: "Electrónica", title: "Circuit Simulation Onramp", hours: "100 % · Nov. 2021", url: "" },
    { org: "MathWorks Training Services", area: "Simulación", title: "Simulink Onramp", hours: "100 % · Nov. 2021", url: "" },
    {
      org: "LinkedIn Learning",
      area: "Diseño CAD",
      title: "AutoCAD esencial",
      hours: "6h 06m · Abr. 2026",
      url: "https://www.linkedin.com/learning/certificates/87f3d2929988be20dc46256c92a7eb9dd105b9df5ffc78d2aa07e62504d048e0/"
    },
    {
      org: "LinkedIn Learning",
      area: "Analítica BI",
      title: "Power BI esencial",
      hours: "3h 55m · Abr. 2026",
      url: "https://www.linkedin.com/learning/certificates/9c936d24fddf23fb537240e1b7bd6e5e800a3eb04f72f1de1028bb854a1eb10d/"
    },
    {
      org: "LinkedIn Learning",
      area: "Microsoft 365",
      title: "Excel esencial (Office 365 / M365)",
      hours: "4h 13m · Abr. 2026",
      url: "https://www.linkedin.com/learning/certificates/0ab7d6e9a243cf7cf64ec59f89a4f45a833ad415b985f38bb2d33c018a4dc246/"
    },
    { org: "LinkedIn Learning", area: "Microsoft 365", title: "Word esencial (Office 365 / M365)", hours: "3h 18m · Abr. 2026", url: "" },
    { org: "LinkedIn Learning", area: "Microsoft 365", title: "PowerPoint esencial (Office 365 / M365)", hours: "2h 18m · Abr. 2026", url: "" },
    { org: "SENA Complementaria", area: "Drones & UAS", title: "Exploración, Conceptualización y Aplicación de la Tecnología Drone", hours: "20 h · Nov. 2017", url: "" },
    { org: "SENA Complementaria", area: "Robótica", title: "Programar Tareas en un Sistema Robótico Móvil", hours: "20 h · Nov. 2017", url: "" },
    { org: "SENA Complementaria", area: "Robótica", title: "Introducción a la Robótica bajo Plataforma Festo", hours: "20 h · Dic. 2015", url: "" },
    { org: "SENA Complementaria", area: "Gestión", title: "Liquidación de Nómina y Prestaciones Sociales", hours: "40 h · Dic. 2016", url: "" },
    { org: "SENA Complementaria", area: "Finanzas", title: "Educación Económica y Financiera", hours: "50 h · Nov. 2016", url: "" },
    { org: "SENA Complementaria", area: "Ciencias Básicas", title: "Fortalecimiento en Razonamiento Cuantitativo", hours: "57 h · 2015", url: "" },
    { org: "SENA Complementaria", area: "Lectura Crítica", title: "Fortalecimiento en Lectura Crítica", hours: "54 h · 2015", url: "" },
    { org: "SENA Complementaria", area: "Ciencias", title: "Fortalecimiento en Ciencias Naturales", hours: "45 h · 2015", url: "" }
  ]
};
