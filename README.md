# Expediente de Ingeniería & Hoja de Vida — Camilo Andrés Castañeda Polo

Monografía web personal y currículum técnico de **Camilo Andrés Castañeda Polo** (Ingeniero Electrónico, Universidad Surcolombiana), diseñada bajo estética **editorial suiza / industrial** sin dependencias externas.

🌐 **Sitio en GitHub Pages:** `https://ccemons.github.io/01-camilo-castaneda-portfolio-cv/`

---

## Arquitectura y Estética

- **Diseño Editorial Asimétrico (Marfil / Carbón + Cobre):** Retícula arquitectónica gobernada por filetes de `1 px`, índice lateral fijo con Scrollspy (`scroll-target-group: auto` y `:target-current`) y paleta dual papel marfil cálido (`#F5F4F0`) / carbón neutro (`#111110`) con acento cobre internacional.
- **Caso de Estudio RF & Banco SDR (`JammerUsco`):** Diagrama vectorial SVG completo de la cadena hardware-canal-SDR (ESP32 Dual-Core FreeRTOS, `nRF24L01+PA+LNA`, `SBB5089+SZP2026`, Aaronia SPECTRAN HF-60105X y ADALM-Pluto+ en Python) junto con tabla comparativa de los 4 modos RF.
- **Expediente de Sistemas con `<details>` Animados:** Los 6 repositorios complementarios (`03-raspberry-pi-edge-iot-hub`, `02-arduino-smart-agro-iot`, `tempe`/`Temperatura`, `04-iot-cloud-telemetry-dashboard`, `05-rf-dsp-spectrum-analyzer`, `Classwix-android`) despliegan bajo demanda su diagrama vectorial SVG y especificaciones mediante `<details>` nativo con `::details-content` e `interpolate-size: allow-keywords`.
- **Tabla Responsiva de 21 Certificaciones:** Tabla semántica con encabezados pegajosos y transformación automática por `@container (width < 600px)`.
- **Exportación a PDF (`@media print`):** Hoja de impresión limpia sin elementos interactivos.

---

## Estructura de Archivos

```text
01-camilo-castaneda-portfolio-cv/
├── index.html                 # Portada editorial, retícula 3:9 y secciones del expediente
├── README.md
├── LICENSE
└── assets/
    ├── css/styles.css         # Retícula suiza, tokens light-dark(), accordion, scrollspy y print
    ├── img/
    │   ├── camilo-castaneda.jpg
    │   └── favicon.svg
    └── js/
        ├── cv-data.js         # Datos verificables del CV y diagramas de arquitectura
        └── main.js            # Scrollspy, SVG dinámicos, acordeones, validación ARIA y tema
```
