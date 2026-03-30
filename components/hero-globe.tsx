"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

/**
 * Animated wireframe globe with chat bubbles,
 * signal pulses, data packets, orbit rings, and a particle network.
 * Pure <canvas> — zero dependencies.
 */

/* ── helpers ──────────────────────────────────────────────── */

interface Point3D { x: number; y: number; z: number }

function latLngTo3D(lat: number, lng: number, r: number, rot: number): Point3D {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + rot) * Math.PI) / 180;
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
}

function proj(p: Point3D, cx: number, cy: number, fov: number) {
  const s = fov / (fov + p.z);
  return { x: cx + p.x * s, y: cy + p.y * s, s };
}

function depthAlpha(p: Point3D, r: number) {
  return Math.max(0, (p.z + r) / (2 * r));
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function seeded(i: number) { return ((Math.sin(i * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1; }

/* ── types ────────────────────────────────────────────────── */

interface GlobeParticle {
  lat: number; lng: number; size: number; pulse: number; pulseSpd: number;
}

interface ChatBubble {
  lat: number; lng: number; life: number; maxLife: number;
  text: string; offsetY: number;
}

interface PulseRing {
  lat: number; lng: number; age: number; maxAge: number;
}

interface DataPacket {
  fromLat: number; fromLng: number; toLat: number; toLng: number;
  progress: number; speed: number;
  _colorFn: (a: number) => string;
}

interface FloatingDot {
  x: number; y: number; vx: number; vy: number; size: number; opacity: number;
}

/* ── component ────────────────────────────────────────────── */

export function HeroGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx = maybeCtx;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    const isDark = resolvedTheme === "dark";

    const c = (r: number, g: number, b: number) =>
      (a: number) => `rgba(${r},${g},${b},${a})`;

    const cGlobe  = isDark ? c(148, 163, 184) : c(100, 116, 139);
    const cDot    = isDark ? c(148, 163, 184) : c(100, 116, 139);
    const cConn   = isDark ? c(148, 163, 184) : c(100, 116, 139);
    const cGlow   = isDark ? c(99, 102, 241)  : c(79, 70, 229);
    const cChat   = isDark ? c(56, 189, 248)  : c(14, 165, 233);
    const cPulse  = isDark ? c(167, 139, 250) : c(139, 92, 246);
    const cPacket1 = isDark ? c(52, 211, 153) : c(16, 185, 129);
    const cPacket2 = isDark ? c(251, 146, 60) : c(249, 115, 22);

    const cx = w * 0.5;
    const cy = h * 0.48;
    const radius = Math.min(w, h) * 0.3;
    const fov = 600;

    /* ── init arrays ─────────────────────────────────────── */

    const particles: GlobeParticle[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        lat: Math.asin(2 * ((i * 0.618033988749895) % 1) - 1) * (180 / Math.PI),
        lng: ((i * 137.508) % 360) - 180,
        size: 1.0 + (i % 5) * 0.4,
        pulse: seeded(i) * Math.PI * 2,
        pulseSpd: 0.02 + seeded(i + 100) * 0.03,
      });
    }

    // Cities with locale-appropriate greetings
    const cities = [
      { lat: 52.52, lng: 13.40, greetings: ["Hallo!", "Moin!", "Hi!"] },           // Berlin
      { lat: 48.85, lng: 2.35, greetings: ["Bonjour!", "Salut!", "Coucou!"] },     // Paris
      { lat: 40.71, lng: -74.01, greetings: ["Hey!", "Hi!", "Yo!"] },              // New York
      { lat: 35.68, lng: 139.69, greetings: ["\u3053\u3093\u306B\u3061\u306F!", "\u304A\u306F\u3088\u3046!", "\u3084\u3042!"] },       // Tokyo (こんにちは, おはよう, やあ)
      { lat: 28.61, lng: 77.21, greetings: ["\u0928\u092E\u0938\u094D\u0924\u0947!", "\u0939\u0948\u0932\u094B!", "\u0915\u094D\u092F\u093E \u0939\u093E\u0932?"] },     // Delhi (नमस्ते, हैलो, क्या हाल)
      { lat: -33.87, lng: 151.21, greetings: ["G'day!", "Hey!", "Oi!"] },          // Sydney
      { lat: 37.77, lng: -122.42, greetings: ["What's up!", "Hey!", "Sup?"] },     // San Francisco
      { lat: 1.35, lng: 103.82, greetings: ["\u4F60\u597D!", "Hello!", "Hi!"] },              // Singapore (你好)
      { lat: 55.75, lng: 37.62, greetings: ["\u041F\u0440\u0438\u0432\u0435\u0442!", "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435!"] },   // Moscow (Привет, Здравствуйте)
      { lat: -23.55, lng: -46.63, greetings: ["Ol\u00E1!", "E a\u00ED!", "Oi!"] },            // São Paulo
      { lat: 51.51, lng: -0.13, greetings: ["Hello!", "Hiya!", "Cheers!"] },       // London
      { lat: 48.14, lng: 11.58, greetings: ["Servus!", "Gr\u00FC\u00DF Gott!", "Hallo!"] },   // Munich
      { lat: 25.27, lng: 55.30, greetings: ["\u0645\u0631\u062D\u0628\u0627!", "\u0623\u0647\u0644\u0627\u064B!", "\u0633\u0644\u0627\u0645!"] },       // Dubai (مرحبا, أهلاً, سلام)
      { lat: 37.57, lng: 126.98, greetings: ["\uC548\uB155!", "\uC548\uB155\uD558\uC138\uC694!"] },          // Seoul (안녕, 안녕하세요)
      { lat: 13.76, lng: 100.50, greetings: ["\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35!", "\u0E2B\u0E27\u0E31\u0E14\u0E14\u0E35!"] },             // Bangkok (สวัสดี, หวัดดี)
      { lat: 41.01, lng: 28.98, greetings: ["Merhaba!", "Selam!"] },              // Istanbul
      { lat: 19.43, lng: -99.13, greetings: ["\u00A1Hola!", "\u00BFQu\u00E9 tal?", "Buenas!"] },        // Mexico City
      { lat: 30.04, lng: 31.24, greetings: ["\u0623\u0647\u0644\u0627\u064B!", "\u064A\u0627 \u0647\u0644\u0627!"] },              // Cairo (أهلاً, يا هلا)
    ];

    const chatBubbles: ChatBubble[] = [];
    let chatTimer = 0;

    const pulseRings: PulseRing[] = [];
    let pulseTimer = 0;

    const dataPackets: DataPacket[] = [];
    let packetTimer = 0;

    const floatingDots: FloatingDot[] = [];
    for (let i = 0; i < 55; i++) {
      floatingDots.push({
        x: seeded(i + 200) * w,
        y: seeded(i + 300) * h,
        vx: (seeded(i + 400) - 0.5) * 0.4,
        vy: (seeded(i + 500) - 0.5) * 0.4,
        size: 0.5 + seeded(i + 600) * 1.8,
        opacity: 0.08 + seeded(i + 700) * 0.25,
      });
    }

    let rotation = 0;
    let time = 0;

    /* ── arc interpolation on globe surface ──────────────── */

    function arcPoint(fLat: number, fLng: number, tLat: number, tLng: number, t: number, alt: number) {
      const lat = lerp(fLat, tLat, t);
      const lng = lerp(fLng, tLng, t);
      const lift = Math.sin(t * Math.PI) * (alt - 1);
      return latLngTo3D(lat, lng, radius * (1 + lift), rotation);
    }

    /* ── render loop ─────────────────────────────────────── */

    function render() {
      ctx.clearRect(0, 0, w, h);
      rotation += 0.12;
      time += 1;

      // ── Floating background particles + connections ────
      for (const d of floatingDots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;
      }
      for (let i = 0; i < floatingDots.length; i++) {
        for (let j = i + 1; j < floatingDots.length; j++) {
          const dx = floatingDots[i].x - floatingDots[j].x;
          const dy = floatingDots[i].y - floatingDots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(floatingDots[i].x, floatingDots[i].y);
            ctx.lineTo(floatingDots[j].x, floatingDots[j].y);
            ctx.strokeStyle = cConn((1 - dist / 100) * 0.06);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      for (const d of floatingDots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = cDot(d.opacity * (0.8 + 0.2 * Math.sin(time * 0.02 + d.x)));
        ctx.fill();
      }

      // ── Globe glow ────────────────────────────────────
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2);
      grad.addColorStop(0, cGlow(0.07));
      grad.addColorStop(0.4, cGlow(0.03));
      grad.addColorStop(1, cGlow(0));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // ── Globe 3D shading (lit from top-left) ─────────
      const shadeGrad = ctx.createRadialGradient(
        cx - radius * 0.35, cy - radius * 0.35, radius * 0.05,
        cx, cy, radius
      );
      shadeGrad.addColorStop(0, isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.12)");
      shadeGrad.addColorStop(0.5, "rgba(0,0,0,0)");
      shadeGrad.addColorStop(1, isDark ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.06)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = shadeGrad;
      ctx.fill();

      // ── Globe wireframe: latitude (depth-shaded segments) ──
      for (let lat = -60; lat <= 60; lat += 30) {
        let prevPr: { x: number; y: number } | null = null;
        for (let lng = -180; lng <= 180; lng += 3) {
          const p = latLngTo3D(lat, lng, radius, rotation);
          const pr = proj(p, cx, cy, fov);
          const da = depthAlpha(p, radius);
          if (da < 0.15) { prevPr = null; continue; }
          if (prevPr) {
            const alpha = 0.08 + da * 0.30;
            const lw = 0.3 + da * 0.7;
            ctx.beginPath();
            ctx.moveTo(prevPr.x, prevPr.y);
            ctx.lineTo(pr.x, pr.y);
            ctx.strokeStyle = cGlobe(alpha);
            ctx.lineWidth = lw;
            ctx.stroke();
          }
          prevPr = { x: pr.x, y: pr.y };
        }
      }

      // ── Globe wireframe: longitude (depth-shaded segments) ──
      for (let lng = -180; lng < 180; lng += 30) {
        let prevPr: { x: number; y: number } | null = null;
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = latLngTo3D(lat, lng, radius, rotation);
          const pr = proj(p, cx, cy, fov);
          const da = depthAlpha(p, radius);
          if (da < 0.15) { prevPr = null; continue; }
          if (prevPr) {
            const alpha = 0.08 + da * 0.30;
            const lw = 0.3 + da * 0.7;
            ctx.beginPath();
            ctx.moveTo(prevPr.x, prevPr.y);
            ctx.lineTo(pr.x, pr.y);
            ctx.strokeStyle = cGlobe(alpha);
            ctx.lineWidth = lw;
            ctx.stroke();
          }
          prevPr = { x: pr.x, y: pr.y };
        }
      }

      // ── Globe outline with atmospheric rim ────────────
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 2, 0, Math.PI * 2);
      ctx.strokeStyle = cGlobe(0.06);
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = cGlobe(0.25);
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── City pin dots ────────────────────────────────
      for (const city of cities) {
        const p = latLngTo3D(city.lat, city.lng, radius, rotation);
        const da = depthAlpha(p, radius);
        if (da < 0.15) continue;
        const pr = proj(p, cx, cy, fov);
        const a = da * 0.6;
        // Outer glow
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, 5 * pr.s, 0, Math.PI * 2);
        ctx.fillStyle = cGlow(a * 0.15);
        ctx.fill();
        // Pin dot
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, 1.8 * pr.s, 0, Math.PI * 2);
        ctx.fillStyle = cGlow(a * 0.7);
        ctx.fill();
      }

      // ── Globe surface particles ───────────────────────
      const projPts: { x: number; y: number; a: number }[] = [];
      for (const pt of particles) {
        pt.pulse += pt.pulseSpd;
        const p = latLngTo3D(pt.lat, pt.lng, radius, rotation);
        const da = depthAlpha(p, radius);
        if (da < 0.1) continue;
        const pr = proj(p, cx, cy, fov);
        const ps = 0.7 + 0.3 * Math.sin(pt.pulse);
        const a = da * 0.6 * ps;
        const sz = pt.size * pr.s * ps;
        projPts.push({ x: pr.x, y: pr.y, a });
        ctx.beginPath(); ctx.arc(pr.x, pr.y, sz * 3, 0, Math.PI * 2);
        ctx.fillStyle = cGlow(a * 0.12); ctx.fill();
        ctx.beginPath(); ctx.arc(pr.x, pr.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = cDot(a); ctx.fill();
      }
      for (let i = 0; i < projPts.length; i++) {
        for (let j = i + 1; j < projPts.length; j++) {
          const dx = projPts[i].x - projPts[j].x;
          const dy = projPts[i].y - projPts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius * 0.55) {
            ctx.beginPath();
            ctx.moveTo(projPts[i].x, projPts[i].y);
            ctx.lineTo(projPts[j].x, projPts[j].y);
            ctx.strokeStyle = cConn((1 - dist / (radius * 0.55)) * 0.12 * Math.min(projPts[i].a, projPts[j].a));
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // ── Pulse rings expanding from hotspots ───────────
      pulseTimer++;
      if (pulseTimer > 90) {
        pulseTimer = 0;
        const ci = Math.floor(seeded(time) * cities.length);
        pulseRings.push({ lat: cities[ci].lat, lng: cities[ci].lng, age: 0, maxAge: 80 });
      }
      for (let i = pulseRings.length - 1; i >= 0; i--) {
        const ring = pulseRings[i];
        ring.age++;
        if (ring.age > ring.maxAge) { pulseRings.splice(i, 1); continue; }
        const p = latLngTo3D(ring.lat, ring.lng, radius, rotation);
        const da = depthAlpha(p, radius);
        if (da < 0.1) continue;
        const pr = proj(p, cx, cy, fov);
        const t = ring.age / ring.maxAge;
        const ringR = t * radius * 0.25 * pr.s;
        const alpha = (1 - t) * 0.35 * da;
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = cPulse(alpha);
        ctx.lineWidth = 1.5 * (1 - t);
        ctx.stroke();
      }

      // ── Data packets traveling between cities ─────────
      packetTimer++;
      if (packetTimer > 70) {
        packetTimer = 0;
        const a = Math.floor(seeded(time + 50) * cities.length);
        let b = Math.floor(seeded(time + 150) * cities.length);
        if (b === a) b = (a + 1) % cities.length;
        const useColor = seeded(time + 250) > 0.5 ? cPacket1 : cPacket2;
        dataPackets.push({
          fromLat: cities[a].lat, fromLng: cities[a].lng,
          toLat: cities[b].lat, toLng: cities[b].lng,
          progress: 0, speed: 0.006 + seeded(time + 350) * 0.004,
          _colorFn: useColor,
        });
      }
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const pk = dataPackets[i];
        pk.progress += pk.speed;
        if (pk.progress > 1) { dataPackets.splice(i, 1); continue; }

        const p = arcPoint(pk.fromLat, pk.fromLng, pk.toLat, pk.toLng, pk.progress, 1.08);
        const da = depthAlpha(p, radius * 1.08);
        if (da < 0.05) continue;
        const pr = proj(p, cx, cy, fov);
        const alpha = da * 0.8;

        for (let tr = 1; tr <= 5; tr++) {
          const trailT = Math.max(0, pk.progress - tr * 0.02);
          const trP = arcPoint(pk.fromLat, pk.fromLng, pk.toLat, pk.toLng, trailT, 1.08);
          const trDa = depthAlpha(trP, radius * 1.08);
          if (trDa < 0.05) continue;
          const trPr = proj(trP, cx, cy, fov);
          ctx.beginPath();
          ctx.arc(trPr.x, trPr.y, (3 - tr * 0.4) * pr.s, 0, Math.PI * 2);
          ctx.fillStyle = pk._colorFn(alpha * (0.4 - tr * 0.07));
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(pr.x, pr.y, 2.5 * pr.s, 0, Math.PI * 2);
        ctx.fillStyle = pk._colorFn(alpha);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pr.x, pr.y, 7 * pr.s, 0, Math.PI * 2);
        ctx.fillStyle = pk._colorFn(alpha * 0.15);
        ctx.fill();
      }

      // ── Chat bubbles popping up ───────────────────────
      chatTimer++;
      if (chatTimer > 80) {
        chatTimer = 0;
        const ci = Math.floor(seeded(time + 999) * cities.length);
        const city = cities[ci];
        const greeting = city.greetings[Math.floor(seeded(time + 1234) * city.greetings.length)];
        chatBubbles.push({
          lat: city.lat, lng: city.lng,
          life: 0, maxLife: 140,
          text: greeting,
          offsetY: 0,
        });
      }
      for (let i = chatBubbles.length - 1; i >= 0; i--) {
        const cb = chatBubbles[i];
        cb.life++;
        if (cb.life > cb.maxLife) { chatBubbles.splice(i, 1); continue; }

        const p = latLngTo3D(cb.lat, cb.lng, radius, rotation);
        const da = depthAlpha(p, radius);
        if (da < 0.15) continue;
        const pr = proj(p, cx, cy, fov);

        const t = cb.life / cb.maxLife;
        cb.offsetY = -t * 40 * pr.s;
        const alpha = da * (t < 0.15 ? t / 0.15 : t > 0.7 ? (1 - t) / 0.3 : 1) * 0.55;

        const bx = pr.x;
        const by = pr.y + cb.offsetY;

        ctx.font = `${Math.round(9 * pr.s)}px Inter, system-ui, sans-serif`;
        const metrics = ctx.measureText(cb.text);
        const tw = metrics.width;
        const th = 9 * pr.s;
        const pad = 5 * pr.s;

        const bw = tw + pad * 2;
        const bh = th + pad * 1.5;
        const br = 4 * pr.s;

        ctx.beginPath();
        ctx.roundRect(bx - bw / 2, by - bh / 2, bw, bh, br);
        ctx.fillStyle = cChat(alpha * 0.15);
        ctx.fill();
        ctx.strokeStyle = cChat(alpha * 0.3);
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bx - 3 * pr.s, by + bh / 2);
        ctx.lineTo(bx, by + bh / 2 + 4 * pr.s);
        ctx.lineTo(bx + 3 * pr.s, by + bh / 2);
        ctx.fillStyle = cChat(alpha * 0.15);
        ctx.fill();

        ctx.fillStyle = cChat(alpha);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(cb.text, bx, by);
      }

      // ── Orbit rings ───────────────────────────────────
      ctx.save();
      ctx.translate(cx, cy);
      drawOrbitRing(ctx, radius, 1.35, 0.3, 0.25, cGlobe, time, 0.008, cGlow);
      drawOrbitRing(ctx, radius, 1.5, 0.45, -0.35, cGlobe, time, -0.006, cPulse);
      ctx.restore();

      animRef.current = requestAnimationFrame(render);
    }

    render();
    return () => { cancelAnimationFrame(animRef.current); };
  }, [resolvedTheme]);

  useEffect(() => {
    const cleanup = draw();
    return () => { cancelAnimationFrame(animRef.current); cleanup?.(); };
  }, [draw]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => { cancelAnimationFrame(animRef.current); draw(); }, 150);
    };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(timeout); };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}

/* ── orbit ring helper ────────────────────────────────────── */

function drawOrbitRing(
  ctx: CanvasRenderingContext2D,
  radius: number,
  radiusMult: number,
  tilt: number,
  rotAngle: number,
  cGlobe: (a: number) => string,
  time: number,
  speed: number,
  cAccent: (a: number) => string,
) {
  const cosR = Math.cos(rotAngle);
  const sinR = Math.sin(rotAngle);
  const rx = radius * radiusMult;
  const ry = rx * tilt;

  ctx.beginPath();
  for (let a = 0; a <= Math.PI * 2; a += 0.02) {
    const px = Math.cos(a) * rx;
    const py = Math.sin(a) * ry;
    const fx = px * cosR - py * sinR;
    const fy = px * sinR + py * cosR;
    if (a === 0) ctx.moveTo(fx, fy); else ctx.lineTo(fx, fy);
  }
  ctx.closePath();
  ctx.strokeStyle = cGlobe(0.18);
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 8]);
  ctx.stroke();
  ctx.setLineDash([]);

  const angle = time * speed;
  const opx = Math.cos(angle) * rx;
  const opy = Math.sin(angle) * ry;
  const ofx = opx * cosR - opy * sinR;
  const ofy = opx * sinR + opy * cosR;

  for (let t = 1; t <= 8; t++) {
    const ta = angle - t * 0.04 * Math.sign(speed);
    const tpx = Math.cos(ta) * rx;
    const tpy = Math.sin(ta) * ry;
    const tfx = tpx * cosR - tpy * sinR;
    const tfy = tpx * sinR + tpy * cosR;
    ctx.beginPath();
    ctx.arc(tfx, tfy, 2 - t * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = cAccent(0.3 - t * 0.035);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(ofx, ofy, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = cAccent(0.6);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(ofx, ofy, 9, 0, Math.PI * 2);
  ctx.fillStyle = cAccent(0.08);
  ctx.fill();
}
