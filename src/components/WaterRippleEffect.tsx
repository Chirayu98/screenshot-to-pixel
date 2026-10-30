import { useEffect, useRef } from "react";

interface WaterRippleEffectProps {
  className?: string;
  damping?: number;          // Wave retention (0.97 - 0.99)
  waveSpeed?: number;        // c^2 factor: 0.12 = slow & graceful, 0.5 = fast
  dropRadius?: number;       // Radius of droplet in simulation units
  enableAmbientDrops?: boolean;
}

export function WaterRippleEffect({
  className = "",
  damping = 0.985,
  waveSpeed = 0.14,           // Slow, graceful, relaxing wave propagation
  dropRadius = 9,             // Wider, softer swells
  enableAmbientDrops = true,
}: WaterRippleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const mainCtx = canvas.getContext("2d", { alpha: true });
    if (!mainCtx) return;

    let animId: number;
    let simW = 0;
    let simH = 0;
    const SIM_SCALE = 2.8; // Smooth, soft grid

    let bufferCurr: Float32Array;
    let bufferPrev: Float32Array;
    let offscreenCanvas: HTMLCanvasElement;
    let offscreenCtx: CanvasRenderingContext2D | null;
    let imgData: ImageData;

    function resize() {
      if (!canvas || !parent) return;
      const rect = parent.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);

      if (w <= 0 || h <= 0) return;

      canvas.width = w;
      canvas.height = h;

      simW = Math.max(30, Math.floor(w / SIM_SCALE));
      simH = Math.max(30, Math.floor(h / SIM_SCALE));

      const size = simW * simH;
      bufferCurr = new Float32Array(size);
      bufferPrev = new Float32Array(size);

      offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = simW;
      offscreenCanvas.height = simH;
      offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
      if (offscreenCtx) {
        imgData = offscreenCtx.createImageData(simW, simH);
      }
    }

    resize();

    function addDrop(cx: number, cy: number, radius: number, strength: number) {
      if (!bufferCurr || simW <= 0 || simH <= 0) return;
      const r2 = radius * radius;
      const minX = Math.max(1, Math.floor(cx - radius));
      const maxX = Math.min(simW - 2, Math.ceil(cx + radius));
      const minY = Math.max(1, Math.floor(cy - radius));
      const maxY = Math.min(simH - 2, Math.ceil(cy + radius));

      for (let y = minY; y <= maxY; y++) {
        const dy = y - cy;
        const dy2 = dy * dy;
        const row = y * simW;
        for (let x = minX; x <= maxX; x++) {
          const dx = x - cx;
          const d2 = dx * dx + dy2;
          if (d2 < r2) {
            const dist = Math.sqrt(d2);
            // Smooth cosine bell curve
            const factor = Math.cos((dist / radius) * (Math.PI / 2));
            bufferCurr[row + x] += strength * factor;
          }
        }
      }
    }

    // Pointer movement tracking with smooth throttling
    let lastDropTime = 0;
    let lastX = -1;
    let lastY = -1;

    function handlePointerMove(e: PointerEvent) {
      if (!parent || simW <= 0 || simH <= 0) return;
      const rect = parent.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      if (px < 0 || px > rect.width || py < 0 || py > rect.height) return;

      const simX = (px / rect.width) * simW;
      const simY = (py / rect.height) * simH;

      const now = performance.now();

      if (lastX >= 0 && lastY >= 0) {
        const dist = Math.hypot(simX - lastX, simY - lastY);
        // Throttle droplet generation so movement feels smooth & viscous, not frantic
        if (dist > 3 && now - lastDropTime > 45) {
          const strength = Math.min(1.2, Math.max(0.35, dist * 0.08));
          addDrop(simX, simY, dropRadius, strength);
          lastDropTime = now;
          lastX = simX;
          lastY = simY;
        }
      } else {
        addDrop(simX, simY, dropRadius, 0.6);
        lastDropTime = now;
        lastX = simX;
        lastY = simY;
      }
    }

    function handlePointerDown(e: PointerEvent) {
      if (!parent || simW <= 0 || simH <= 0) return;
      const rect = parent.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const simX = (px / rect.width) * simW;
      const simY = (py / rect.height) * simH;

      // Gentle, deep splash on click
      addDrop(simX, simY, dropRadius * 1.8, 1.8);
      lastDropTime = performance.now();
    }

    function handlePointerLeave() {
      lastX = -1;
      lastY = -1;
    }

    parent.addEventListener("pointermove", handlePointerMove, { passive: true });
    parent.addEventListener("pointerdown", handlePointerDown, { passive: true });
    parent.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    // Ambient raindrop timer (calm and spaced out)
    let ambientTimer: number | null = null;
    if (enableAmbientDrops) {
      const scheduleAmbientDrop = () => {
        ambientTimer = window.setTimeout(() => {
          if (simW > 0 && simH > 0) {
            const rx = Math.random() * (simW - 40) + 20;
            const ry = Math.random() * (simH - 40) + 20;
            addDrop(rx, ry, dropRadius * 1.4, 0.9);
          }
          scheduleAmbientDrop();
        }, 4500 + Math.random() * 3500);
      };
      scheduleAmbientDrop();
    }

    // Physical wave simulation parameters
    // c^2 controls wave propagation speed:
    // 0.12 - 0.16 = slow, calm, majestic ripples
    // 0.50 = maximum speed (fast & frantic)
    const c2 = Math.min(0.48, Math.max(0.06, waveSpeed));
    const currCoeff = 2 - 4 * c2;

    // Animation loop
    function render() {
      animId = requestAnimationFrame(render);

      if (!bufferCurr || !bufferPrev || !offscreenCtx || !imgData || simW <= 0 || simH <= 0) return;

      // 1. Solve tunable wave equation:
      // h_next = [ (2 - 4*c2)*h_curr - h_prev + c2*(neighbors) ] * damping
      for (let y = 1; y < simH - 1; y++) {
        const row = y * simW;
        const topRow = (y - 1) * simW;
        const bottomRow = (y + 1) * simW;

        for (let x = 1; x < simW - 1; x++) {
          const idx = row + x;
          const neighbors =
            bufferCurr[row + x - 1] +
            bufferCurr[row + x + 1] +
            bufferCurr[topRow + x] +
            bufferCurr[bottomRow + x];

          const wave = (currCoeff * bufferCurr[idx] - bufferPrev[idx] + c2 * neighbors) * damping;

          // Store next height in bufferPrev (reused to avoid allocation)
          bufferPrev[idx] = wave;
        }
      }

      // 2. Compute smooth normal lighting & write to ImageData
      const data = imgData.data;
      let hasVisibleWave = false;

      for (let y = 1; y < simH - 1; y++) {
        const row = y * simW;
        const topRow = (y - 1) * simW;
        const bottomRow = (y + 1) * simW;

        for (let x = 1; x < simW - 1; x++) {
          const idx = row + x;
          const val = bufferPrev[idx];
          const pIdx = idx * 4;

          if (Math.abs(val) > 0.003) {
            hasVisibleWave = true;
            // Wave slope
            const dx = bufferPrev[row + x + 1] - bufferPrev[row + x - 1];
            const dy = bufferPrev[bottomRow + x] - bufferPrev[topRow + x];

            // Directional light from top-left
            const light = -dx * 0.7 - dy * 0.7;

            if (light > 0.002) {
              // Gentle glistening shimmer on wave crests
              const intensity = Math.min(255, light * 190);
              const alpha = Math.min(140, Math.round(intensity * 0.75));
              data[pIdx] = 255;
              data[pIdx + 1] = 248;
              data[pIdx + 2] = 235;
              data[pIdx + 3] = alpha;
            } else if (light < -0.002) {
              // Gentle warm crimson shadow in wave troughs
              const intensity = Math.min(255, -light * 160);
              const alpha = Math.min(90, Math.round(intensity * 0.55));
              data[pIdx] = 135;
              data[pIdx + 1] = 12;
              data[pIdx + 2] = 0;
              data[pIdx + 3] = alpha;
            } else {
              data[pIdx + 3] = 0;
            }
          } else {
            data[pIdx + 3] = 0;
          }
        }
      }

      // 3. Swap buffers (bufferPrev now holds the newest state, bufferCurr becomes prev)
      const temp = bufferCurr;
      bufferCurr = bufferPrev;
      bufferPrev = temp;

      // 4. Draw to main canvas with high-quality bicubic smoothing
      if (hasVisibleWave) {
        offscreenCtx.putImageData(imgData, 0, 0);
        mainCtx.clearRect(0, 0, canvas.width, canvas.height);
        mainCtx.imageSmoothingEnabled = true;
        mainCtx.imageSmoothingQuality = "high";
        mainCtx.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);
      } else {
        mainCtx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    animId = requestAnimationFrame(render);

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(animId);
      if (ambientTimer) clearTimeout(ambientTimer);
      ro.disconnect();
      parent.removeEventListener("pointermove", handlePointerMove);
      parent.removeEventListener("pointerdown", handlePointerDown);
      parent.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [damping, waveSpeed, dropRadius, enableAmbientDrops]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-20 h-full w-full ${className}`}
    />
  );
}
