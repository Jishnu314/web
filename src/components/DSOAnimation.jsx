import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

const WAVES = ["Sine", "Square", "Step"];

// An interactive oscilloscope screen with "weighted" controls: mouse
// position sets a TARGET frequency/amplitude, but the actual trace chases
// that target through a spring-damper system with inertia. Fast mouse
// movement injects extra disturbance, so quick or jerky control causes
// overshoot/ringing instead of landing cleanly — you have to move slowly
// and anticipate the lag to dial in a precise reading.
export default function DSOAnimation() {
  const { colors } = useTheme();
  const width = 360;
  const height = 160;
  const midY = height / 2;

  const [wave, setWave] = useState("Sine");
  const [phase, setPhase] = useState(0);
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  // Raw mouse target + velocity tracking (refs so we don't trigger extra
  // re-renders — the rAF loop already re-renders every frame via phase).
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5, active: false, speed: 0, lastT: performance.now() });

  // Actual "physical" values the trace uses, plus their velocity —
  // this is what gives the controls weight/momentum instead of direct control.
  const actualRef = useRef({ freq: 3.2, amp: 40 });
  const velRef = useRef({ freq: 0, amp: 0 });

  useEffect(() => {
    const start = performance.now();
    const loop = (now) => {
      const t = (now - start) / 1000;
      setPhase(t);

      const m = mouseTargetRef.current;
      const targetFreq = m.active ? 2 + m.x * 9 : 3.2;
      const targetAmp = m.active ? 12 + (1 - m.y) * 48 : 40;

      // Spring pulls actual value toward target...
      const kFreq = 0.05;
      const kAmp = 0.05;
      const damping = 0.88; // <1 means it's underdamped enough to overshoot/ring

      velRef.current.freq += (targetFreq - actualRef.current.freq) * kFreq;
      velRef.current.amp += (targetAmp - actualRef.current.amp) * kAmp;

      // ...but fast mouse movement injects extra "kick" disturbance, so
      // quick motions throw the reading off instead of snapping to target.
      velRef.current.freq += (Math.random() - 0.5) * m.speed * 2.2;
      velRef.current.amp += (Math.random() - 0.5) * m.speed * 9;

      velRef.current.freq *= damping;
      velRef.current.amp *= damping;

      actualRef.current.freq += velRef.current.freq;
      actualRef.current.amp += velRef.current.amp;

      // clamp so it can't fly off into nonsense ranges
      actualRef.current.freq = Math.min(12, Math.max(1, actualRef.current.freq));
      actualRef.current.amp = Math.min(70, Math.max(6, actualRef.current.amp));

      // mouse speed decays each frame so a single fast flick doesn't
      // permanently jack up the noise/kick forever
      m.speed *= 0.9;

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));

    const now = performance.now();
    const prev = mouseTargetRef.current;
    const dt = Math.max(1, now - prev.lastT) / 1000; // seconds, floor to avoid divide-by-~0
    const dx = x - prev.x;
    const dy = y - prev.y;
    const instSpeed = Math.hypot(dx, dy) / dt; // normalized units/sec

    mouseTargetRef.current = {
      x,
      y,
      active: true,
      // blend new speed reading with old so it's not too jittery frame to frame
      speed: prev.speed * 0.5 + instSpeed * 0.5,
      lastT: now,
    };
  };

  const handleMouseLeave = () => {
    mouseTargetRef.current.active = false;
  };

  // Read the "actual" physical values for rendering — NOT the raw mouse.
  const freq = actualRef.current.freq;
  const amp = actualRef.current.amp;
  // Noise now reflects both frequency and how erratically you're moving —
  // jerky control literally makes the signal messier.
  const noiseLevel = 1.4 + (freq - 2) * 0.35 + mouseTargetRef.current.speed * 1.4;

  const pathD = (() => {
    const points = [];
    for (let px = 0; px <= width; px += 3) {
      const t = px / width;
      const angle = t * Math.PI * 2 * freq + phase * 1.6;
      let y;

      if (wave === "Sine") {
        y = midY + Math.sin(angle) * amp;
      } else if (wave === "Square") {
        y = midY + (Math.sin(angle) >= 0 ? amp : -amp);
      } else {
        const cycle = ((phase * 0.9) % 2.4) / 2.4;
        const localT = Math.min(1, cycle * 1.4);
        const decay = Math.exp(-localT * (2.6 + (freq - 3) * 0.25));
        y = midY + Math.sin(localT * Math.PI * (5 + (freq - 3) * 0.8)) * amp * decay;
      }

      const noise = (Math.random() - 0.5) * noiseLevel;
      points.push(`${px},${(y + noise).toFixed(1)}`);
    }
    return `M${points.join(" L")}`;
  })();

  const gridLines = [];
  for (let x = 0; x <= width; x += 30) {
    gridLines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={height} stroke={colors.border} strokeWidth="1" />);
  }
  for (let y = 0; y <= height; y += 20) {
    gridLines.push(<line key={`h${y}`} x1={0} y1={y} x2={width} y2={y} stroke={colors.border} strokeWidth="1" />);
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="rounded-2xl p-4" style={{ backgroundColor: colors.bgSoft, border: `1px solid ${colors.border}` }}>
        <div className="flex gap-1 mb-3">
          {WAVES.map((w) => (
            <button
              key={w}
              onClick={() => setWave(w)}
              className="text-[10px] px-2.5 py-1 rounded-full transition-colors"
              style={{
                fontFamily: "monospace",
                letterSpacing: "0.03em",
                border: `1px solid ${wave === w ? colors.accent : colors.border}`,
                color: wave === w ? colors.accent : colors.textSub,
                backgroundColor: wave === w ? colors.accentSoft : "transparent",
              }}
            >
              {w}
            </button>
          ))}
        </div>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="rounded-lg overflow-hidden"
          style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, cursor: "crosshair" }}
        >
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full block">
            {gridLines}
            <path d={pathD} fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex items-center justify-between mt-3 px-1">
          <span style={{ color: colors.textSub, fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.05em" }}>
            {freq.toFixed(1)} Hz &nbsp; {Math.round((amp / 60) * 10) / 10}V/div
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent }} />
            <span style={{ color: colors.textSub, fontSize: "10px", fontFamily: "monospace" }}>RUN</span>
          </span>
        </div>
        <p className="mt-1.5 px-1" style={{ color: colors.textSub, fontSize: "10px", fontFamily: "monospace", opacity: 0.7 }}>
          move slowly — the trace has weight and will overshoot if you flick it
        </p>
      </div>
    </div>
  );
}