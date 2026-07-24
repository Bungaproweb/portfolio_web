import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Activity, Layers, EyeOff, Eye } from 'lucide-react';

interface AnimatedBackgroundProps {
  darkMode?: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ darkMode = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationStyle, setAnimationStyle] = useState<'constellation' | 'orbs' | 'full'>('full');
  const [interactiveMouse, setInteractiveMouse] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Mouse position tracking
  const mouseRef = useRef<{ x: number; y: number; radius: number }>({
    x: -1000,
    y: -1000,
    radius: 160,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactiveMouse) return;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!interactiveMouse || e.touches.length === 0) return;
      mouseRef.current.x = e.touches[0].clientX;
      mouseRef.current.y = e.touches[0].clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [interactiveMouse]);

  useEffect(() => {
    if (!isVisible || animationStyle === 'orbs') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Resize handling
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Particles setup
    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 18000), 75);
    
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseAngle: number;
    }

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.2 + 0.8,
        baseAlpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseAngle: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = darkMode;
      const primaryColor = isDark ? '217, 119, 6' : '180, 83, 9'; // Amber palette
      const secondaryColor = isDark ? '245, 158, 11' : '146, 64, 14';

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce screen edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse interaction (repulse / nudge)
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 1.5;
          p.y -= Math.sin(angle) * force * 1.5;
        }

        // Pulse alpha
        p.pulseAngle += p.pulseSpeed;
        const currentAlpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.2;
        const alphaClamped = Math.max(0.1, Math.min(0.8, currentAlpha));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryColor}, ${alphaClamped})`;
        ctx.fill();

        // Connect nearby particles with glowing line constellation
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pDistance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          const maxDist = 130;

          if (pDistance < maxDist) {
            const lineAlpha = (1 - pDistance / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${secondaryColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode, animationStyle, isVisible]);

  if (!isVisible) {
    return (
      <div className="fixed bottom-20 left-5 z-40">
        <button
          onClick={() => setIsVisible(true)}
          className="p-2.5 rounded-full bg-stone-900/80 text-amber-400 border border-stone-700 shadow-lg backdrop-blur-md hover:scale-110 transition-transform"
          title="Tampilkan Animasi Latar Belakang"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Animated Motion Orbs (Glow Gradients) */}
      {(animationStyle === 'orbs' || animationStyle === 'full') && (
        <div className="absolute inset-0">
          {/* Orb 1 - Top Left Amber */}
          <motion.div
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full blur-[110px] opacity-40 dark:opacity-30 ${
              darkMode
                ? 'bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900'
                : 'bg-gradient-to-br from-amber-300 via-amber-200 to-orange-200'
            }`}
          />

          {/* Orb 2 - Center Right Warm Bronze */}
          <motion.div
            animate={{
              x: [0, -60, 40, 0],
              y: [0, 40, -40, 0],
              scale: [1, 0.85, 1.15, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute top-1/3 -right-32 w-[36rem] h-[36rem] rounded-full blur-[130px] opacity-35 dark:opacity-25 ${
              darkMode
                ? 'bg-gradient-to-tr from-stone-800 via-amber-900 to-amber-700'
                : 'bg-gradient-to-tr from-orange-200 via-amber-200 to-amber-100'
            }`}
          />

          {/* Orb 3 - Bottom Left Warm Dusk */}
          <motion.div
            animate={{
              x: [0, 50, -20, 0],
              y: [0, -30, 40, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute -bottom-40 left-1/4 w-[34rem] h-[34rem] rounded-full blur-[120px] opacity-35 dark:opacity-20 ${
              darkMode
                ? 'bg-gradient-to-bl from-amber-800 via-stone-900 to-amber-950'
                : 'bg-gradient-to-bl from-amber-200 via-stone-200 to-amber-100'
            }`}
          />
        </div>
      )}

      {/* 2. Interactive Canvas Particles & Constellation Lines */}
      {(animationStyle === 'constellation' || animationStyle === 'full') && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />
      )}

      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.05]" />

      {/* Floating Control Button for Customization */}
      <div className="pointer-events-auto fixed bottom-20 left-5 z-40">
        <div className="relative">
          <button
            onClick={() => setShowControls(!showControls)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/80 dark:bg-stone-950/80 text-amber-300 dark:text-amber-400 border border-amber-700/50 shadow-lg backdrop-blur-md hover:bg-stone-900 transition-all text-xs font-semibold"
            id="animated-bg-toggle-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>Efek Latar Latar</span>
          </button>

          {/* Control Dropdown Popover */}
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-10 left-0 w-60 p-4 rounded-2xl bg-stone-900/95 text-stone-100 border border-stone-800 shadow-2xl backdrop-blur-xl space-y-3 z-50"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Pengaturan Latar Bergerak</span>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1 rounded-md hover:bg-stone-800 text-stone-400 hover:text-white"
                  title="Sembunyikan Latar"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Preset Selector */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-stone-400">Mode Visual:</span>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => setAnimationStyle('full')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                      animationStyle === 'full'
                        ? 'bg-amber-800 text-amber-50'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    Lengkap
                  </button>
                  <button
                    onClick={() => setAnimationStyle('constellation')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                      animationStyle === 'constellation'
                        ? 'bg-amber-800 text-amber-50'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    Partikel
                  </button>
                  <button
                    onClick={() => setAnimationStyle('orbs')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                      animationStyle === 'orbs'
                        ? 'bg-amber-800 text-amber-50'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    Gradient
                  </button>
                </div>
              </div>

              {/* Interactive Mouse Toggle */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-[11px] text-stone-300 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-amber-400" />
                  <span>Respon Kursor</span>
                </span>
                <button
                  onClick={() => setInteractiveMouse(!interactiveMouse)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                    interactiveMouse ? 'bg-amber-700' : 'bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      interactiveMouse ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
