import React, { useMemo } from 'react';

const Particles = React.memo(() => {
  const colors = ['bg-white', 'bg-slate-300', 'bg-slate-400', 'bg-slate-500'];
  
  // Generate particles once on mount using useMemo
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3.5 + 1.5,
      delay: Math.random() * 8,
      duration: Math.random() * 12 + 18,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []); // Empty dependency array ensures it is generated exactly once

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0.08,
            filter: 'blur(1px)',
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
});

Particles.displayName = 'Particles';

export default Particles;
