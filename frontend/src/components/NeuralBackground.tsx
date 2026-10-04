import React, { useEffect, useRef } from 'react';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  pulsePhase: number;
}

interface Pulse {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
  color: string;
}

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160
    };

    // Calculate node density based on screen dimensions
    const isMobile = width < 768;
    const nodeCount = isMobile ? 45 : 95;
    const maxDistance = isMobile ? 110 : 150;

    const colors = [
      'rgba(108, 92, 231, ',   // Neon Purple/Violet
      'rgba(0, 206, 201, ',     // Cyber Cyan
      'rgba(168, 85, 247, ',    // Electric Magenta
      'rgba(56, 189, 248, '     // Sky Blue
    ];

    const neurons: Neuron[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const baseRadius = Math.random() * 2 + 1.5;
      neurons.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: baseRadius,
        baseRadius,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    const pulses: Pulse[] = [];

    // Periodic pulse generator (electrical signals firing between neurons)
    const pulseInterval = setInterval(() => {
      if (neurons.length < 2) return;
      // Pick a random neuron
      const sourceIndex = Math.floor(Math.random() * neurons.length);
      const source = neurons[sourceIndex];

      // Find nearest neighbor within connection range
      for (let j = 0; j < neurons.length; j++) {
        if (sourceIndex === j) continue;
        const target = neurons[j];
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance && Math.random() > 0.4) {
          pulses.push({
            fromX: source.x,
            fromY: source.y,
            toX: target.x,
            toY: target.y,
            progress: 0,
            speed: 0.015 + Math.random() * 0.02,
            color: source.color
          });
          break;
        }
      }

      // Limit active pulse count for 60fps performance
      if (pulses.length > 35) {
        pulses.splice(0, pulses.length - 35);
      }
    }, 280);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep dark cosmic background tint with subtle radial gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 50,
        width / 2, height / 2, Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, 'rgba(11, 11, 20, 0.95)');
      bgGrad.addColorStop(1, 'rgba(6, 6, 12, 1)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Update and Draw Synaptic Lines (Connections)
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(neurons[i].x, neurons[i].y);
            ctx.lineTo(neurons[j].x, neurons[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect to mouse if close
        const mdx = neurons[i].x - mouse.x;
        const mdy = neurons[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouse.radius) {
          const mAlpha = (1 - mDist / mouse.radius) * 0.7;
          ctx.beginPath();
          ctx.moveTo(neurons[i].x, neurons[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 206, 201, ${mAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Subtle gentle repulsion/attraction to mouse
          neurons[i].x += (mouse.x - neurons[i].x) * 0.008;
          neurons[i].y += (mouse.y - neurons[i].y) * 0.008;
        }
      }

      // 2. Draw Traveling Electrical Signals (Pulses)
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const currX = p.fromX + (p.toX - p.fromX) * p.progress;
        const currY = p.fromY + (p.toY - p.fromY) * p.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}0.95)`;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // 3. Update & Draw Neurons
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];

        // Move
        n.x += n.vx;
        n.y += n.vy;

        // Bounce off canvas boundaries
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Pulsing radius
        n.pulsePhase += 0.03;
        n.radius = n.baseRadius + Math.sin(n.pulsePhase) * 0.8;

        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}0.85)`;
        ctx.shadowColor = `${n.color}0.6)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(pulseInterval);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    />
  );
};
