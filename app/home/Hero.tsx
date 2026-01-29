"use client";

import React, { useState } from 'react';

const Hero: React.FC = () => {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 30; // Max 30 degrees rotation
    const rotateX = (y / rect.height - 0.5) * -30; // Max 30 degrees rotation

    setRotation({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ rotateX: 0, rotateY: 0 });
  };

  // Calculate dynamic shadow based on rotation for enhanced 3D effect
  const shadowX = 8 + rotation.rotateY * 0.3;
  const shadowY = 8 - rotation.rotateX * 0.3;
  const shadowBlur = 0;
  
  // Multiple shadow layers for depth
  const textShadow = `
    ${shadowX}px ${shadowY}px 0px rgba(0, 0, 0, 0.4),
    ${shadowX * 1.5}px ${shadowY * 1.5}px 0px rgba(0, 0, 0, 0.3),
    ${shadowX * 2}px ${shadowY * 2}px 0px rgba(0, 0, 0, 0.2),
    ${shadowX * 2.5}px ${shadowY * 2.5}px 0px rgba(0, 0, 0, 0.1),
    ${shadowX * 3}px ${shadowY * 3}px 20px rgba(0, 0, 0, 0.1)
  `;

  return (
    <div className="min-h-screen text-black flex items-center justify-center overflow-hidden px-4">
      <h1 
        className="font-extrabold relative leading-none select-none w-full text-center"
        style={{ 
          perspective: '1200px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 'clamp(3rem, 12vw, 18rem)',
          letterSpacing: '0.05em'
        }}
      >
        <span
          className="relative inline-block text-black cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
            transition: rotation.rotateX === 0 && rotation.rotateY === 0 ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
            textShadow: textShadow,
            WebkitTextStroke: '1px rgba(0, 0, 0, 0.1)',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          NEXGEN
        </span>
      </h1>
    </div>
  );
};

export default Hero;