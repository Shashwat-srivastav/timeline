import React from 'react';
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { Heart } from 'lucide-react';

// Brand palette matching tailwind config
const COLORS = [
  '#a29bfe', // sw-lavender
  '#fab1a0', // sw-salmon
  '#81ecec', // sw-teal
  '#ffffff', // white
  '#fce7f3'  // pink-100
];

export const FallingHearts: React.FC = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();

  // Create 90 deterministic particles to match website density
  const particles = new Array(90).fill(true).map((_, i) => {
    const seed = i * 777;
    
    // Properties matching WebsiteHearts logic
    const type = random(seed) > 0.5 ? 'heart' : 'petal';
    const color = COLORS[Math.floor(random(seed + 1) * COLORS.length)];
    const x = random(seed + 2) * 100; // 0-100% horizontal position
    
    // Interpolate ranges based on random seed
    const size = interpolate(random(seed + 3), [0, 1], [10, 35]); 
    const speed = interpolate(random(seed + 4), [0, 1], [2, 6]); // Fall speed
    const opacity = interpolate(random(seed + 5), [0, 1], [0.3, 0.8]); // Slightly more opaque for video
    const startY = interpolate(random(seed + 6), [0, 1], [-200, height]); // Spread vertically initially
    
    // Sway parameters
    const swaySpeed = interpolate(random(seed + 7), [0, 1], [0.02, 0.05]);
    const swayAmount = interpolate(random(seed + 8), [0, 1], [20, 50]);
    
    // Blur effect simulation
    const blur = random(seed + 9) < 0.4 ? random(seed + 10) * 3 : 0;

    // Animation Logic
    // Continuous vertical loop: move down, wrap around
    const totalHeight = height + 200; // buffer
    const y = ((startY + frame * speed) % totalHeight) - 100;
    
    // Gentle horizontal sway
    const xOffset = Math.sin(frame * swaySpeed + i) * swayAmount;
    
    // Rotation (spin as it falls)
    // Website uses 0->360deg over fall duration. 
    // We approximate continuous rotation based on frame and speed.
    const rotation = (frame * speed * 0.5) % 360;

    return {
      i,
      type,
      color,
      x,
      y,
      xOffset,
      rotation,
      size,
      opacity,
      blur
    };
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {particles.map((p) => (
        <div
          key={p.i}
          style={{
            position: 'absolute',
            left: `calc(${p.x}% + ${p.xOffset}px)`,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            color: p.color,
            filter: p.blur ? `blur(${p.blur}px)` : 'none',
            transform: `rotate(${p.rotation}deg)`,
            // Ensure SVG rendering is crisp
            willChange: 'transform, top, left', 
          }}
        >
          {p.type === 'heart' ? (
            <Heart 
              size={p.size} 
              fill="currentColor" 
              stroke="none"
            />
          ) : (
            // Custom SVG Petal Shape matching WebsiteHearts
             <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                style={{ overflow: 'visible' }}
            >
                <path d="M12 2C12 2 20 8 20 14C20 19 16 22 12 22C8 22 4 19 4 14C4 8 12 2 12 2Z" />
            </svg>
          )}
        </div>
      ))}
    </AbsoluteFill>
  );
};