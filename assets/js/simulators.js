/**
 * Motores de visualización Canvas 2D con soporte devicePixelRatio, ResizeObserver
 * sin forced reflow y respuesta inmediata incluso con prefers-reduced-motion.
 */

function createCanvasSizer(canvas, fallbackWidth = 560, fallbackHeight = 220, onResize = null) {
  let width = fallbackWidth;
  let height = fallbackHeight;
  let dirty = true;

  const updateFromRect = (w, h) => {
    const nextW = Math.max(260, Math.round(w));
    const nextH = Math.max(160, Math.round(h));
    if (nextW !== width || nextH !== height) {
      width = nextW;
      height = nextH;
      dirty = true;
      return true;
    }
    return false;
  };

  let ro = null;
  if (typeof ResizeObserver === "function") {
    ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        if (cr.width > 0 && cr.height > 0 && updateFromRect(cr.width, cr.height) && onResize) {
          onResize();
        }
      }
    });
    ro.observe(canvas);
  }

  return {
    prepare() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (dirty || canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        dirty = false;
      }
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx, width, height };
    },
    disconnect() {
      if (ro) ro.disconnect();
    }
  };
}

function drawGrid(ctx, width, height) {
  ctx.strokeStyle = "rgba(148, 163, 184, 0.14)";
  ctx.lineWidth = 1;
  const stepX = Math.max(48, Math.floor(width / 10));
  const stepY = Math.max(36, Math.floor(height / 5));
  for (let x = 0; x <= width; x += stepX) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += stepY) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

/**
 * Simulador de espectro 2.4 GHz para el proyecto insignia JammerUsco.
 * Devuelve { redraw, destroy } para actualizar al instante cuando cambia el modo.
 */
export function mountThesisCanvas(canvas, getMode, onReadout) {
  let rafId = 0;
  let phase = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sizer = createCanvasSizer(canvas, 560, 230, () => renderOnce());

  function renderOnce() {
    const { ctx, width, height } = sizer.prepare();
    const mode = getMode();

    ctx.fillStyle = "#070d19";
    ctx.fillRect(0, 0, width, height);
    drawGrid(ctx, width, height);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px Consolas, ui-monospace, monospace";
    ctx.fillText("2400 MHz", 10, height - 8);
    ctx.fillText("2462 MHz", width * 0.45, height - 8);
    ctx.fillText("2525 MHz", width - 66, height - 8);

    ctx.beginPath();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = mode === "barrage" ? "#10b981" : "#38bdf8";

    const sweepCenter = 0.5 + 0.36 * Math.sin(phase * 0.85);
    const hopCenter = 0.15 + ((Math.floor(phase * 2.5 + 3) * 37) % 71) / 100;

    for (let x = 0; x < width; x++) {
      const norm = x / width;
      const noise = -84 + Math.sin(x * 0.45 + phase * 1.4) * 2.5 + Math.cos(x * 0.19 - phase) * 1.8;
      let signal = 0;

      if (mode === "spot") {
        signal = 68 * Math.exp(-Math.pow((norm - 0.3) / 0.018, 2));
      } else if (mode === "sweep") {
        signal = 66 * Math.exp(-Math.pow((norm - sweepCenter) / 0.022, 2));
      } else if (mode === "random") {
        signal = 65 * Math.exp(-Math.pow((norm - hopCenter) / 0.016, 2));
        signal += 22 * Math.exp(-Math.pow((norm - (1 - hopCenter)) / 0.016, 2));
      } else {
        const delta = Math.abs(norm - 0.5);
        signal =
          delta < 0.09
            ? 58 * (1 - Math.pow(delta / 0.09, 4))
            : 12 * Math.exp(-Math.pow((delta - 0.09) / 0.03, 2));
      }

      const db = Math.min(-4, noise + signal);
      const y = height - 24 - ((db + 92) / 92) * (height - 40);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(245, 158, 11, 0.55)";
    ctx.beginPath();
    ctx.moveTo(0, height - 34);
    ctx.lineTo(width, height - 34);
    ctx.stroke();
    ctx.setLineDash([]);

    if (onReadout) {
      const freqMHz =
        mode === "spot"
          ? "2437.0"
          : mode === "sweep"
            ? (2400 + sweepCenter * 125).toFixed(1)
            : mode === "random"
              ? (2400 + hopCenter * 125).toFixed(1)
              : "2462.0 ±11";
      onReadout(
        `[ESP32 Core0: HSPI/VSPI 16 MHz] mode=${mode.toUpperCase()} | fc=${freqMHz} MHz | out=33.5 dBm (2.0 W) | PLUTO_RX=150k I/Q`
      );
    }
  }

  function loop() {
    renderOnce();
    if (!reducedMotion.matches) {
      phase += 0.07;
      rafId = requestAnimationFrame(loop);
    }
  }

  loop();

  const onMotionChange = () => {
    cancelAnimationFrame(rafId);
    loop();
  };
  reducedMotion.addEventListener("change", onMotionChange);

  return {
    redraw() {
      renderOnce();
    },
    destroy() {
      cancelAnimationFrame(rafId);
      sizer.disconnect();
      reducedMotion.removeEventListener("change", onMotionChange);
    }
  };
}

/**
 * Simulador específico del modal para cada uno de los 7 proyectos.
 */
export function mountProjectSimulator(canvas, consoleEl, simType) {
  let rafId = 0;
  let phase = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sizer = createCanvasSizer(canvas, 640, 190, () => frame());

  function frame() {
    const { ctx, width, height } = sizer.prepare();
    ctx.fillStyle = "#070d19";
    ctx.fillRect(0, 0, width, height);
    drawGrid(ctx, width, height);

    if (simType === "rf-jammer" || simType === "dsp-fft") {
      ctx.beginPath();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2.2;
      for (let x = 0; x < width; x++) {
        const norm = x / width;
        const floor = -80 + Math.sin(x * 0.5 + phase) * 2.8;
        const p1 = 62 * Math.exp(-Math.pow((norm - 0.5) / 0.022, 2));
        const p2 = 34 * Math.exp(-Math.pow((norm - 0.64) / 0.015, 2));
        const p3 = 34 * Math.exp(-Math.pow((norm - 0.36) / 0.015, 2));
        const db = Math.min(-4, floor + p1 + p2 + p3);
        const y = height - 16 - ((db + 90) / 90) * (height - 32);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      consoleEl.textContent =
        simType === "rf-jammer"
          ? `[PLUTO+ AD9363] fs=3.0 MSPS | RRC α=0.35 | FSPL(5m)=54.20 dB | Costas LOCKED | BER=1.8e-4`
          : `[DSP Radix-2] Window=Hann | Peak=-11.8 dBFS | SNR=44.2 dB | THD=0.92% | FIR_LPF=PASS`;
    } else if (simType === "rpi-edge") {
      const temp = (47.2 + Math.sin(phase * 0.5) * 2.1).toFixed(1);
      const pins = [
        { label: "GPIO17 · Actuador A", high: Math.sin(phase * 0.4) > 0 },
        { label: "GPIO27 · Iluminación", high: true },
        { label: "GPIO22 · Ventilador", high: Number(temp) > 47.5 },
        { label: "GPIO23 · Alerta Visión", high: Math.cos(phase * 0.3) > 0.4 }
      ];
      ctx.font = "12px Consolas, ui-monospace, monospace";
      pins.forEach((p, idx) => {
        const y = 20 + idx * 36;
        ctx.fillStyle = "#cbd5e1";
        ctx.fillText(p.label, 14, y + 16);
        ctx.fillStyle = p.high ? "#10b981" : "#334155";
        ctx.fillRect(Math.min(width - 105, 195), y, 86, 22);
        ctx.fillStyle = "#f8fafc";
        ctx.fillText(p.high ? "HIGH (1)" : "LOW  (0)", Math.min(width - 96, 204), y + 15);
      });
      if (width > 430) {
        ctx.fillStyle = "#38bdf8";
        ctx.fillText(`SoC Temp: ${temp} °C`, Math.min(width - 155, 340), 40);
        ctx.fillText(`Docker: HEALTHY`, Math.min(width - 155, 340), 76);
        ctx.fillText(`SQLite: WAL_SYNC`, Math.min(width - 155, 340), 112);
      }

      consoleEl.textContent = `GET /api/status -> {"hal":"gpiozero","soc_temp_c":${temp},"vision_opencv":"active","db":"sqlite_ok"}`;
    } else if (simType === "thermo-spi") {
      ctx.beginPath();
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2.4;
      for (let x = 0; x < width; x += 3) {
        const norm = x / width;
        const val = 185 + 32 * Math.sin(norm * 5 + phase * 0.4) + 6 * Math.cos(norm * 14);
        const y = height - 20 - ((val - 130) / 110) * (height - 40);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      const tempK = (196.4 + Math.sin(phase * 0.4) * 14.2).toFixed(2);
      consoleEl.textContent = `[TermoSense] MAX6675_Lento(SW_SPI) -> T_K=${tempK} °C | RTC=2026-11-24T23:55:10 | SD_SPI=LOGGED`;
    } else if (simType === "scada-modbus") {
      ctx.beginPath();
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2.2;
      for (let x = 0; x < width; x += 3) {
        const y = height / 2 + Math.sin(x * 0.045 + phase * 1.1) * 44;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      const vrms = (120.4 + Math.sin(phase * 0.3) * 0.9).toFixed(1);
      const pf = (0.96 + Math.cos(phase * 0.25) * 0.02).toFixed(2);
      consoleEl.textContent = `[MQTT/Modbus] vrms=${vrms}V | P_act=1.42 kW | PF=${pf} | nodes=[ESP32, RPi5, Arduino, Meter]`;
    } else if (simType === "android-calc") {
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(14, 14, width - 28, height - 28);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(14, 14, width - 28, height - 28);
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "12px Consolas, ui-monospace, monospace";
      ctx.fillText("CASIO fx-991LA CW [13 MODOS · KOTLIN MVVM]", 26, 40);
      ctx.fillStyle = "#38bdf8";
      ctx.fillText("Integral | Regresion | Matrices 4x4", 26, 74);
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 17px Consolas, ui-monospace, monospace";
      ctx.fillText("Resultado = 6.96884712", 26, 118);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px Consolas, ui-monospace, monospace";
      ctx.fillText("Jetpack Compose M3 · JUnit 4 + Robolectric PASS", 26, 152);

      consoleEl.textContent = `[Classwix v1.0.3] Mode=Calculus | StateFlow emitted | DataStore persisted | CI/CD=GitHub_Actions_OK`;
    } else {
      ctx.beginPath();
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2.4;
      for (let x = 0; x < width; x += 4) {
        const y = height / 2 + Math.sin(x * 0.03 + phase) * 38 + Math.cos(x * 0.07 - phase) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      const soil = (48.6 + Math.sin(phase * 0.35) * 4.2).toFixed(1);
      consoleEl.textContent = `{"fsm":"IDLE_MONITORING","ema_soil_pct":${soil},"dht22_c":25.4,"yf_s201_isr_lpm":0.00,"dry_run":"OK"}`;
    }

    if (!reducedMotion.matches) {
      phase += 0.08;
      rafId = requestAnimationFrame(frame);
    }
  }

  frame();
  const onMotionChange = () => {
    cancelAnimationFrame(rafId);
    frame();
  };
  reducedMotion.addEventListener("change", onMotionChange);

  return () => {
    cancelAnimationFrame(rafId);
    sizer.disconnect();
    reducedMotion.removeEventListener("change", onMotionChange);
  };
}
