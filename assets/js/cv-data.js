/**
 * Fuente única y verificable de datos curriculares y portafolio técnico
 * de Camilo Andrés Castañeda Polo.
 */

export const CV_DATA = {
  profile: {
    name: "Camilo Andrés Castañeda Polo",
    shortName: "Camilo Castañeda",
    initials: "CC",
    role: "Ingeniero Electrónico (Candidato a Grado · Inicios 2027)",
    specialty: "Sistemas Embebidos · RF / SDR · Control e Instrumentación · IA & Software",
    location: "Neiva, Huila, Colombia",
    mobility: "Disponibilidad inmediata presencial, híbrida o remota · Viajes técnicos y traslado nacional o internacional · Licencias A2 y B1 (vig. 2031)",
    phone: "+57 304 643 5801",
    phoneHref: "tel:+573046435801",
    email: "camilomilo3000@gmail.com",
    githubUser: "CCemons",
    githubUrl: "https://github.com/CCemons",
    linkedinUrl: "https://www.linkedin.com/in/camilocastanedapolo/",
    linkedinLabel: "linkedin.com/in/camilocastanedapolo",
    portfolioUrl: "https://ccemons.github.io/01-camilo-castaneda-portfolio-cv/",
    summary:
      "Ingeniero Electrónico en cierre de pregrado con enfoque práctico en el desarrollo de sistemas electrónicos y de software de punta a punta: diseño y fabricación de hardware propio, firmware embebido en tiempo real, radiofrecuencia/SDR, control e instrumentación. Combino trabajo directo de laboratorio —tarjetas impresas en KiCad fresadas en CNC, transceptores RF, sensores industriales y validación espectral— con programación en C/C++, Python, MATLAB, Kotlin y JavaScript para convertir prototipos físicos en soluciones funcionales, medibles y bien documentadas."
  },

  thesisModes: {
    spot: {
      id: "spot",
      label: "Spot / Tone",
      freqRange: "2437 MHz (Canal Wi-Fi 6)",
      power: "2 W (33.5 dBm) · SBB5089 + SZP2026",
      bus: "HSPI / VSPI @ 16 MHz · Núcleo 0",
      description:
        "Portadora concentrada sobre canal específico de 2.4 GHz para pruebas controladas de bloqueo de canal angosto y evaluación de relación señal a interferencia.",
      metrics: [
        { label: "Ancho de Banda", value: "~1.2 MHz" },
        { label: "Conmutación", value: "Dedicada Core 0 (µs)" },
        { label: "Aislamiento", value: "radioMutex + Radios Nativos OFF" }
      ]
    },
    sweep: {
      id: "sweep",
      label: "Sweep / Chirp",
      freqRange: "2400 – 2525 MHz (Bidireccional)",
      power: "2 W (33.5 dBm) · Antena Colineal 2/5/8 dBi",
      bus: "HSPI / VSPI @ 16 MHz · Barrido continuo",
      description:
        "Barrido rápido bidireccional a través de los 126 canales ISM de 2.4 GHz mediante doble transceptor nRF24L01+PA+LNA sincronizado por FreeRTOS.",
      metrics: [
        { label: "Cobertura", value: "125 MHz (Canales 0–125)" },
        { label: "Distancia Test", value: "5 m · FSPL = 54.20 dB" },
        { label: "Analizador", value: "Aaronia SPECTRAN HF-60105X" }
      ]
    },
    random: {
      id: "random",
      label: "Random Hopping",
      freqRange: "2400 – 2525 MHz (Pseudoaleatorio)",
      power: "2 W (33.5 dBm) · Regulación LM2596 + Doble LDO",
      bus: "HSPI / VSPI @ 16 MHz · Salto no determinista",
      description:
        "Saltos pseudoaleatorios de frecuencia diseñados para contrastar la resiliencia de esquemas FHSS, GFSK y enlaces digitales frente a interferencia ágil.",
      metrics: [
        { label: "Demodulación", value: "Coherente & No Coherente" },
        { label: "Captura SDR", value: "150.000 muestras I/Q DMA" },
        { label: "Normativa", value: "ANE Res. 105/2020 · MinTIC 2774" }
      ]
    },
    barrage: {
      id: "barrage",
      label: "Barrage Wi-Fi 22 MHz",
      freqRange: "22 MHz continuos (Banda Wi-Fi)",
      power: "2 W (33.5 dBm) · Etapa RF Dual",
      bus: "HSPI / VSPI @ 16 MHz · Cobertura de subbanda",
      description:
        "Distribución de energía sobre un canal Wi-Fi completo de 22 MHz para medir degradación de tasa de error de bit (BER) y de paquete (PER) en el banco ADALM-Pluto+.",
      metrics: [
        { label: "Modulaciones", value: "BPSK · QPSK · 16-QAM · GFSK" },
        { label: "Sincronía", value: "RRC α = 0.35 · Lazo de Costas" },
        { label: "Manufactura", value: "KiCad 10 · CNC G31 (335 pts)" }
      ]
    }
  },

  projectCategories: [
    { id: "all", label: "Todos (7)" },
    { id: "rf-sdr", label: "RF, SDR & DSP" },
    { id: "embedded", label: "Embebidos & IoT" },
    { id: "software", label: "Edge, SCADA & Android" }
  ],

  projects: [
    {
      id: "jammer-usco",
      repoName: "JammerUsco",
      year: "2026",
      category: "rf-sdr",
      categoryLabel: "RF, SDR & Hardware",
      featured: true,
      title: "Prototipo Generador de Interferencia RF Controlada en 2.4 GHz y Banco SDR",
      subtitle: "Trabajo de Grado · Universidad Surcolombiana (USCO) · Lab. de Líneas y Antenas",
      summary:
        "Sistema experimental de ciclo completo en banda ISM de 2.4 GHz que integra firmware multinúcleo en tiempo real sobre ESP32, etapa amplificadora de 2 W (33.5 dBm), banco de evaluación SDR ADALM-Pluto+ en Python para medición de BER/PER y manufactura PCB/CNC/3D propia.",
      architecture:
        "Núcleo 0 ESP32 (FreeRTOS, HSPI/VSPI 16 MHz, radioMutex) -> Doble nRF24L01+PA+LNA + Etapa SBB5089/SZP2026 (33.5 dBm) | Núcleo 1 (FSM + OLED SSD1306 I2C + CLI UART 115200) | Banco ADALM-Pluto+ (AD9363 + FPGA Zynq-7000, pyadi-iio, RRC α=0.35, Costas Loop) + Aaronia SPECTRAN HF-60105X.",
      stack: ["ESP32 FreeRTOS", "C++ / PlatformIO", "ADALM-Pluto+ SDR", "Python / SciPy", "KiCad 10", "CNC 6040 / Fusion 360"],
      metrics: [
        "4 modos RF (Spot, Sweep, Random, Barrage 22 MHz) hasta 2 W (33.5 dBm)",
        "Captura DMA de 150.000 muestras I/Q y cálculo de BER/PER a 5 m (FSPL = 54.20 dB)",
        "Demodulación coherente (RRC α = 0.35, FFT, Lazo de Costas, AGC) en BPSK, QPSK, 16-QAM, GFSK y FHSS",
        "PCB monocara fresada con malla G31 de 335 puntos (734.4 µm), gabinete STEP FDM y BOM de $396.500 COP"
      ],
      repoUrl: "https://github.com/CCemons/JammerUsco",
      simType: "rf-jammer"
    },
    {
      id: "rpi-edge-hub",
      repoName: "03-raspberry-pi-edge-iot-hub",
      year: "2026",
      category: "software",
      categoryLabel: "Edge IoT & Docker",
      featured: true,
      title: "Plataforma Edge IoT en Raspberry Pi con Visión Artificial, API REST y Docker",
      subtitle: "Gateway Linux Embebido · Python · OpenCV · SQLite",
      summary:
        "Hub IoT Edge modular para Raspberry Pi con capa de abstracción de hardware (HAL) auto-detectable entre GPIO físico y entorno simulado, telemetría térmica del SoC, detector de movimiento con OpenCV, auditoría en SQLite y despliegue contenerizado.",
      architecture:
        "RaspberryPiHAL (gpiozero + /sys/class/thermal + SimFallback) -> OpenCV Vision Monitor (cámara USB/CSI) -> SQLite Audit Storage -> HTTP REST API (/api/status, /api/gpio/toggle, /api/vision/trigger) -> Docker Compose & systemd.",
      stack: ["Python 3", "Raspberry Pi OS", "OpenCV", "SQLite", "REST API", "Docker Compose", "systemd"],
      metrics: [
        "Conmutación transparente entre hardware real (gpiozero) y modo simulado",
        "Control y auditoría de 4 canales GPIO persistidos en SQLite",
        "Endpoints REST documentados y suite de pruebas unitarias con unittest",
        "Orquestación lista para producción mediante Docker Compose y servicio systemd"
      ],
      repoUrl: "https://github.com/CCemons/03-raspberry-pi-edge-iot-hub",
      simType: "rpi-edge"
    },
    {
      id: "agro-iot",
      repoName: "02-arduino-smart-agro-iot",
      year: "2026",
      category: "embedded",
      categoryLabel: "Embebidos & Control",
      featured: true,
      title: "Sistema Agro-IoT de Riego Autónomo y Telemetría Serial",
      subtitle: "Control Determinista en ESP32 y AVR · PlatformIO · Wokwi",
      summary:
        "Controlador embebido autónomo de riego en C++ sin retardos bloqueantes, gobernado por una máquina de estados finitos (FSM) de 6 estados con histéresis, filtrado exponencial EMA, interrupción externa de caudal y logger de telemetría en Python.",
      architecture:
        "Sensores (Humedad Suelo, DHT22, HC-SR04, Caudalímetro YF-S201 ISR) -> Filtro EMA (α = 0.25) -> IrrigationFSM (6 estados con histéresis y protección marcha en seco) -> Relé Bomba + JSON UART 115200 bps -> Logger CSV en Python.",
      stack: ["C++", "ESP32 / AVR", "PlatformIO", "FSM 6 Estados", "ISR", "Wokwi", "Python Serial"],
      metrics: [
        "Arquitectura no bloqueante basada en temporización determinista",
        "Filtro digital EMA (α = 0.25) para estabilización de lecturas analógicas",
        "Protección activa contra operación de bomba en seco mediante interrupción ISR",
        "Simulación reproducible en Wokwi y exportación de tramas JSON a CSV"
      ],
      repoUrl: "https://github.com/CCemons/02-arduino-smart-agro-iot",
      simType: "agro-fsm"
    },
    {
      id: "termosense-spi",
      repoName: "tempe",
      year: "2026",
      category: "embedded",
      categoryLabel: "Instrumentación Industrial",
      featured: false,
      title: "TermoSense: Datalogger Industrial Tipo K con Librería SPI por Software",
      subtitle: "Arduino · Termopar MAX6675 · RTC · MicroSD",
      summary:
        "Registrador térmico de campo para termopar Tipo K que resuelve la contención del bus SPI hardware entre el módulo MicroSD y el conversor MAX6675 mediante la creación de una librería C++ propia de bit-banging SPI lento.",
      architecture:
        "Termopar Tipo K + MAX6675 -> Librería propia MAX6675_Lento (SPI por software en pines dedicados) + Reloj RTC (I2C) -> Módulo MicroSD (SPI Hardware) con estampado temporal continuo.",
      stack: ["C++", "Arduino", "MAX6675_Lento", "SPI Software/Hardware", "I2C RTC", "MicroSD"],
      metrics: [
        "Librería C++ propia (MAX6675_Lento) para aislar lecturas térmicas del bus SPI SD",
        "Estampado cronológico preciso mediante módulo RTC",
        "Persistencia continua de curvas térmicas en tarjeta MicroSD",
        "Repositorios complementarios publicados en GitHub (tempe y Temperatura)"
      ],
      repoUrl: "https://github.com/CCemons/tempe",
      secondaryUrl: "https://github.com/CCemons/Temperatura",
      secondaryLabel: "Repo Temperatura",
      simType: "thermo-spi"
    },
    {
      id: "scada-cloud-dashboard",
      repoName: "04-iot-cloud-telemetry-dashboard",
      year: "2026",
      category: "software",
      categoryLabel: "SCADA Web & Modbus",
      featured: true,
      title: "Centro de Control SCADA Web Multi-Nodo en Tiempo Real",
      subtitle: "JavaScript ES6+ · HTML5 Canvas 2D · Modbus / MQTT",
      summary:
        "Aplicación web SPA sin dependencias externas diseñada para supervisar telemetría heterogénea de nodos Arduino, ESP32, Raspberry Pi 5 y medidor eléctrico Modbus, incorporando motor de alertas, consola JSON/MQTT y exportación directa.",
      architecture:
        "Nodos (Arduino, ESP32, RPi 5, Medidor Modbus TCP/RTU) -> Motor de Telemetría & Anomalías -> AlertEngine -> Renderizador Canvas 2D (Potencia Activa, Vrms, FP) -> Exportador CSV/JSON.",
      stack: ["JavaScript ES6+", "HTML5 Canvas 2D", "Modbus", "MQTT / JSON", "SCADA UI", "CSS3"],
      metrics: [
        "Supervisión simultánea de nodos Arduino, ESP32, Raspberry Pi 5 y red eléctrica Modbus",
        "Visualización en vivo de potencia activa, tensión RMS y factor de potencia",
        "Inyector de anomalías, consola de payloads JSON tipo MQTT y alertas configurables",
        "Exportación instantánea de históricos operativos en formatos CSV y JSON"
      ],
      repoUrl: "https://github.com/CCemons/04-iot-cloud-telemetry-dashboard",
      simType: "scada-modbus"
    },
    {
      id: "rf-dsp-analyzer",
      repoName: "05-rf-dsp-spectrum-analyzer",
      year: "2026",
      category: "rf-sdr",
      categoryLabel: "DSP & Python Científico",
      featured: true,
      title: "Suite Modular de Análisis Espectral RF y Procesamiento Digital de Señales",
      subtitle: "Python · FFT Cooley-Tukey Radix-2 · NumPy · SVG",
      summary:
        "Suite de análisis espectral en Python con motor FFT híbrido (algoritmo iterativo Cooley-Tukey Radix-2 nativo con aceleración automática en NumPy), ventanas calibradas, estimación de piso de ruido, SNR/THD, filtrado FIR y reportes HTML+SVG.",
      architecture:
        "Generador de Señales (AM/FM/Chirp/Multitono + AWGN) -> Ventaneo (Hann/Hamming/Blackman) -> Motor FFT Radix-2 / NumPy + Interpolación Parabólica Sub-bin -> Filtro FIR Pasa-Bajos -> Reportes Autocontenidos HTML + SVG.",
      stack: ["Python 3", "FFT Radix-2", "NumPy", "Filtros FIR", "SNR / THD", "SVG / HTML"],
      metrics: [
        "Implementación iterativa propia de Cooley-Tukey Radix-2 compatible con NumPy",
        "Interpolación parabólica sub-bin para localización espectral de picos",
        "Medición automatizada de piso de ruido, SNR (dB) y distorsión armónica THD (%)",
        "Generación de reportes visuales autocontenidos en HTML + SVG sin dependencias"
      ],
      repoUrl: "https://github.com/CCemons/05-rf-dsp-spectrum-analyzer",
      simType: "dsp-fft"
    },
    {
      id: "classwix-android",
      repoName: "Classwix-android",
      year: "2026",
      category: "software",
      categoryLabel: "Android Kotlin & CI/CD",
      featured: false,
      title: "Emulador Científico Casio ClassWiz fx-991LA CW para Android (v1.0.3)",
      subtitle: "100% Kotlin · Jetpack Compose · MVVM · GitHub Actions",
      summary:
        "Aplicación móvil nativa en Android que replica la experiencia y motor de cálculo de la calculadora científica Casio ClassWiz fx-991LA CW con 13 modos matemáticos y estadísticos, pruebas automatizadas y pipeline de publicación en GitHub Actions.",
      architecture:
        "Jetpack Compose UI (Material 3) -> ViewModel + StateFlow (Arquitectura MVVM) -> Motor Matemático/Estadístico (13 Modos) + Persistencia DataStore -> Suite JUnit 4 + Robolectric -> CI/CD GitHub Actions.",
      stack: ["Kotlin", "Jetpack Compose", "Material 3", "MVVM / StateFlow", "DataStore", "JUnit 4 / Robolectric", "GitHub Actions"],
      metrics: [
        "13 modos matemáticos y estadísticos: regresión, ecuaciones, matrices, hoja de cálculo y más",
        "Estado reactivo desacoplado bajo patrón MVVM (ViewModel + StateFlow) y DataStore",
        "Cobertura de pruebas unitarias e instrumentadas locales con JUnit 4 y Robolectric",
        "Compilación y publicación automatizada de versiones mediante GitHub Actions (v1.0.3)"
      ],
      repoUrl: "https://github.com/CCemons/Classwix-android",
      simType: "android-calc"
    }
  ],

  skillCategories: [
    { id: "all", label: "Todas (4 Áreas)" },
    { id: "embedded", label: "Embebidos & IoT" },
    { id: "rf", label: "RF, SDR & Control" },
    { id: "software", label: "Software, IA & DevOps" },
    { id: "cad", label: "ECAD, MCAD & Gestión" }
  ],

  skills: [
    {
      id: "sk-embedded",
      category: "embedded",
      categoryLabel: "Sistemas Embebidos, IoT e Instrumentación",
      highlight: "Hardware en tiempo real y buses industriales",
      items: [
        "ESP32 (Dual-Core Xtensa LX6) & FreeRTOS",
        "C / C++ & PlatformIO",
        "Arduino (AVR) & Wokwi",
        "Raspberry Pi (Linux, gpiozero, systemd)",
        "SPI (Hardware y Software), I2C, UART / CLI",
        "Modbus, MQTT / JSON & Telemetría",
        "Transceptores nRF24L01+PA+LNA & SBB5089",
        "Termopar MAX6675, DHT22, HC-SR04, YF-S201",
        "Regulación LM2596 / Doble LDO AMS1117-3.3V"
      ]
    },
    {
      id: "sk-rf",
      category: "rf",
      categoryLabel: "Telecomunicaciones, RF, Control y Simulación",
      highlight: "SDR, procesamiento espectral y control avanzado",
      items: [
        "ADALM-Pluto+ SDR (AD9363 + FPGA Zynq-7000)",
        "pyadi-iio / libiio (DMA I/Q)",
        "DSP: FFT Radix-2, FIR, RRC α = 0.35, Lazo de Costas",
        "Demodulación BPSK, QPSK, 16-QAM, GFSK, FHSS",
        "Medición BER / PER, SNR (dB), THD (%) y Friis",
        "Analizador Aaronia SPECTRAN HF-60105X",
        "MATLAB, Simulink & MATLAB Coder (C/C++)",
        "Control Digital, Adaptativo y Predictivo",
        "Regulación ANE Res. 105/2020 y MinTIC 2774"
      ]
    },
    {
      id: "sk-software",
      category: "software",
      categoryLabel: "Software, IA, Analítica y DevOps",
      highlight: "Ciencia de datos, móvil nativo, web y automatización",
      items: [
        "Python (NumPy, SciPy, OpenCV, Matplotlib)",
        "Machine Learning, Deep Learning & Visión Artificial",
        "Kotlin (Android, Jetpack Compose, Material 3)",
        "Arquitectura MVVM (ViewModel + StateFlow, DataStore)",
        "JavaScript ES6+, HTML5 Semántico, CSS3, Canvas 2D",
        "APIs REST, SQLite & Reportes HTML + SVG",
        "Docker, Docker Compose & Git / GitHub Actions (CI/CD)",
        "Testing: JUnit 4, Robolectric & Python unittest",
        "Power BI, Microsoft 365 (Excel) & ERP DMS"
      ]
    },
    {
      id: "sk-cad",
      category: "cad",
      categoryLabel: "ECAD, MCAD, Manufactura Digital y Gestión",
      highlight: "Del esquemático al prototipo físico y control de costos",
      items: [
        "KiCad 10.0 (Esquemáticos, PCB monocara, Gerber/Excellon)",
        "Fresado CNC 6040 (FlatCAM, Mach3, malla G31)",
        "Autodesk Fusion 360 (Co-diseño ECAD–MCAD STEP)",
        "AutoCAD (Diseño asistido por computador 2D)",
        "Impresión 3D FDM (PLA / PETG)",
        "Estructuración de BOM, costos e inventarios",
        "Conciliaciones bancarias y gestión tributaria/auditoría",
        "Sistemas de Información Geográfica (SIG)",
        "Documentación técnica bilingüe (IEEE / Datasheets)"
      ]
    }
  ],

  experience: [
    {
      type: "Corporativa",
      period: "Jun. 2017 – Nov. 2017",
      title: "Auxiliar Contable (Contrato de Aprendizaje / Etapa Práctica SENA – 880 h)",
      org: "ORF S.A. – Organización Roa Florhuila · Neiva, Huila (Presencial · 6 meses)",
      bullets: [
        "Ejecución de procesos contables, causación de facturación y validación de soportes bajo normativa tributaria vigente mediante el sistema empresarial ERP DMS y Microsoft Excel.",
        "Elaboración de conciliaciones bancarias, cruce sistemático de cuentas y control de exactitud de saldos para cierres periódicos del área financiera.",
        "Estandarización y gestión documental para auditorías internas y externas, aportando insumos confiables para reportes corporativos."
      ]
    },
    {
      type: "Voluntariado",
      period: "Nov. 2016",
      title: "Voluntariado — Servicio Social y Proyección Comunitaria (80 horas certificadas)",
      org: "Cruz Roja Colombiana · Seccional Huila · Neiva",
      bullets: [
        "Participación certificada en talleres de formación, capacitación juvenil y jornadas de proyección comunitaria enfocadas en servicio social."
      ]
    }
  ],

  education: [
    {
      primary: true,
      period: "Jun. 2020 – Actualidad",
      title: "Ingeniería Electrónica (Último semestre · Candidato a Grado: Inicios de 2027)",
      org: "Universidad Surcolombiana (USCO) · Neiva, Huila · Registro SNIES 3204",
      detail:
        "Trabajo de grado experimental en hardware de RF (2.4 GHz) y Radio Definida por Software (ADALM-Pluto+). Líneas de profundización: Sistemas Embebidos, Control Digital, Adaptativo y Predictivo, Instrumentación Industrial, SDR, Procesamiento Digital de Señales, Visión por Computador, Telemetría Eléctrica, Redes de Datos, SIG y Aplicaciones Móviles."
    },
    {
      primary: false,
      period: "Ene. 2016 – Nov. 2017",
      title: "Técnico en Contabilización de Operaciones Comerciales y Financieras",
      org: "Servicio Nacional de Aprendizaje (SENA) – Regional Huila · Reg. No. 34078916",
      detail:
        "Formación Profesional Integral de 1.945 horas (1.065 h lectivas en contabilidad, inventarios de equipos/materiales e inglés técnico + 880 h de etapa práctica corporativa en ORF S.A.). Articulado con el título de Bachiller Técnico Comercial en la I.E. Atanasio Girardot (1.200 h, Neiva, Dic. 2017)."
    }
  ],

  languages: [
    {
      name: "Inglés — EF SET International Certificate",
      badge: "MCER C1 Avanzado · 67/100",
      date: "Abr. 2026",
      description:
        "Certificación internacional que acredita lectura técnica proficiente de estándares IEEE, hojas de datos y documentación de ingeniería.",
      bars: [
        { label: "Lectura (Reading) · C2 Proficiente", score: 97 },
        { label: "Escucha (Listening) · C2 Proficiente", score: 74 },
        { label: "Escritura (Writing) · B2 Int. Alto", score: 59 },
        { label: "Conversación (Speaking) · A2", score: 36 }
      ],
      verifyUrl: "https://cert.efset.org/es/xaP8ED",
      verifyLabel: "Verificar en cert.efset.org/es/xaP8ED"
    },
    {
      name: "Inglés — Prueba de Estado ICFES Saber Pro",
      badge: "Nivel B2 (Máximo) · Percentil 97",
      date: "2026",
      description:
        "Puntaje de 213 / 300, ubicándose en el Percentil 97 Nacional y Percentil 96 dentro del Núcleo Básico de Conocimiento (Ingeniería Electrónica, Telecomunicaciones y Afines).",
      bars: []
    },
    {
      name: "Español",
      badge: "Lengua Nativa",
      date: "Nativo",
      description: "Redacción técnica, documentación de proyectos, sustentación oral y trabajo en equipos multidisciplinarios.",
      bars: []
    }
  ],

  distinctions: [
    {
      title: "Pruebas Saber Pro (ICFES, 2026)",
      tag: "Reg. EK202610024539",
      summary:
        "Puntaje Global 175 / 300 — Percentil 85 Nacional (Top 15 %) y Percentil 76 en NBC de Ingeniería Electrónica, Telecomunicaciones y Afines.",
      chips: [
        "Inglés: P97 (213)",
        "Raz. Cuantitativo: P92 (186 · Nivel 3)",
        "Comp. Ciudadanas: P90 (192 · Nivel 3)",
        "Lectura Crítica: P80 (176 · Nivel 3)"
      ]
    },
    {
      title: "Prueba Saber 11 (ICFES, Ago. 2017)",
      tag: "Percentil 100 Nacional",
      summary:
        "Puntaje Global 372 / 500, alcanzando Nivel de Desempeño 4 (máximo posible) en Matemáticas, Ciencias Naturales, Lectura Crítica y Sociales.",
      chips: ["Global 372/500", "Matemáticas Nivel 4", "Ciencias Naturales Nivel 4"]
    },
    {
      title: "XIII Olimpiada Departamental de Física — Nivel B",
      tag: "Sept. 2017",
      summary:
        "Mejor Puntaje Institucional en la I.E. Atanasio Girardot, distinción otorgada por la Universidad Surcolombiana (USCO) y AHMAFIS en Neiva, Huila.",
      chips: ["USCO & AHMAFIS", "Mejor Puntaje Institucional"]
    }
  ],

  certifications: [
    {
      provider: "MathWorks Training Services",
      count: "8 Certificaciones · 100%",
      period: "2021 – 2026",
      items: [
        { name: "Deep Learning Onramp", meta: "Abr. 2026 · Redes neuronales" },
        { name: "Machine Learning Onramp", meta: "Abr. 2026 · Clasificación y regresión" },
        { name: "MATLAB Coder Onramp", meta: "Abr. 2026 · Generación de código C/C++" },
        { name: "App Building Onramp", meta: "Abr. 2026 · App Designer" },
        { name: "MATLAB Onramp", meta: "Abr. 2026 · Fundamentos computacionales" },
        { name: "Control Design Onramp with Simulink", meta: "Abr. 2025 · Control y lazo cerrado" },
        { name: "Circuit Simulation Onramp", meta: "Nov. 2021 · Simscape / Circuitos" },
        { name: "Simulink Onramp", meta: "Nov. 2021 · Modelado dinámico" }
      ]
    },
    {
      provider: "LinkedIn Learning",
      count: "5 Certificaciones · CAD, BI & M365",
      period: "Abr. 2026",
      items: [
        {
          name: "AutoCAD esencial",
          meta: "6h 06m · Diseño asistido por computador",
          url: "https://www.linkedin.com/learning/certificates/87f3d2929988be20dc46256c92a7eb9dd105b9df5ffc78d2aa07e62504d048e0/"
        },
        {
          name: "Power BI esencial",
          meta: "3h 55m · Modelado y tableros BI",
          url: "https://www.linkedin.com/learning/certificates/9c936d24fddf23fb537240e1b7bd6e5e800a3eb04f72f1de1028bb854a1eb10d/"
        },
        {
          name: "Excel esencial (Office 365 / M365)",
          meta: "4h 13m · Análisis tabular y fórmulas",
          url: "https://www.linkedin.com/learning/certificates/0ab7d6e9a243cf7cf64ec59f89a4f45a833ad415b985f38bb2d33c018a4dc246/"
        },
        { name: "Word esencial (Office 365 / M365)", meta: "3h 18m · Documentación técnica" },
        { name: "PowerPoint esencial (Office 365 / M365)", meta: "2h 18m · Presentaciones ejecutivas" }
      ]
    },
    {
      provider: "SENA — Formación Complementaria",
      count: "8 Certificaciones · 306 horas",
      period: "2015 – 2017",
      items: [
        { name: "Exploración, Conceptualización y Aplicación de la Tecnología Drone", meta: "20 h · Nov. 2017" },
        { name: "Programar Tareas en un Sistema Robótico Móvil", meta: "20 h · Nov. 2017" },
        { name: "Introducción a la Robótica bajo Plataforma Festo", meta: "20 h · Dic. 2015" },
        { name: "Liquidación de Nómina y Prestaciones Sociales", meta: "40 h · Dic. 2016" },
        { name: "Educación Económica y Financiera", meta: "50 h · Nov. 2016" },
        { name: "Fortalecimiento en Razonamiento Cuantitativo", meta: "57 h · 2015" },
        { name: "Fortalecimiento en Lectura Crítica", meta: "54 h · 2015" },
        { name: "Fortalecimiento en Ciencias Naturales", meta: "45 h · 2015" }
      ]
    }
  ]
};
