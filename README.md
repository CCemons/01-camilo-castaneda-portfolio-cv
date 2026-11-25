# Portafolio Web & Hoja de Vida — Camilo Andrés Castañeda Polo

Sitio web personal y currículum técnico interactivo de **Camilo Andrés Castañeda Polo**, Ingeniero Electrónico (candidato a grado inicios de 2027, Universidad Surcolombiana), diseñado desde cero con estándares web modernos y cero dependencias externas.

🌐 **En producción (GitHub Pages):** `https://ccemons.github.io/01-camilo-castaneda-portfolio-cv/`

---

## Qué incluye esta versión

- **Trabajo de Grado Insignia (`JammerUsco` + `ADALM-Pluto+`):** Selector interactivo de los 4 modos RF en 2.4 GHz (*Spot/Tone*, *Sweep/Chirp*, *Random*, *Barrage 22 MHz*) con visualización espectral en Canvas 2D y especificaciones de firmware ESP32/FreeRTOS, banco SDR en Python y manufactura KiCad/CNC/Fusion 360.
- **7 Proyectos Reales de GitHub:** `JammerUsco`, `03-raspberry-pi-edge-iot-hub`, `02-arduino-smart-agro-iot`, `tempe` (`Temperatura`), `04-iot-cloud-telemetry-dashboard`, `05-rf-dsp-spectrum-analyzer` y `Classwix-android`, con filtros por categoría, búsqueda en vivo y `<dialog closedby="any">` nativo con simulador dedicado.
- **Hoja de Vida Completa e Imprimible en PDF:** Experiencia corporativa en ORF S.A. (Organización Roa Florhuila), voluntariado en Cruz Roja Colombiana, formación USCO + SENA, Saber Pro 2026, Saber 11, XIII Olimpiada de Física, EF SET C1 (67/100) y 21 certificaciones verificables (MathWorks, LinkedIn Learning y SENA), con hoja `@media print` dedicada.
- **Estándares Web Modernos:**
  - Tema claro/oscuro basado en `<meta name="color-scheme" content="light dark">`, `light-dark()` y prevención de FOUC.
  - Elemento nativo `<dialog closedby="any">` animado en Top Layer con `@starting-style` y `transition-behavior: allow-discrete`, más contención de scroll vía `overscroll-behavior: contain` y fallbacks progresivos.
  - Transiciones de filtrado con `document.startViewTransition` y soporte completo a `prefers-reduced-motion: reduce`.
  - Formulario de contacto accesible con `:user-invalid`, sincronización `aria-invalid` / `aria-describedby` y región viva `aria-live="polite"`.
  - LCP optimizado con retrato de prioridad alta (`fetchpriority="high"`) y datos estructurales JSON-LD (`Person`).

---

## Estructura del Repositorio

```text
01-camilo-castaneda-portfolio-cv/
├── index.html                 # Documento HTML5 semántico, Hero LCP y vista impresa PDF
├── README.md                  # Documentación del proyecto
├── LICENSE                    # Licencia MIT
└── assets/
    ├── css/
    │   └── styles.css         # Tokens light-dark(), layout responsive, dialog Top Layer y @media print
    ├── img/
    │   ├── camilo-castaneda.jpg
    │   └── favicon.svg
    └── js/
        ├── cv-data.js         # Fuente única y verificable del CV y los 7 proyectos
        ├── simulators.js      # Simuladores Canvas 2D HiDPI con soporte reduced-motion
        └── main.js            # Tema, consola RF, filtros, <dialog> nativo y validación ARIA
```
