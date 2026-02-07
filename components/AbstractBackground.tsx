import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export const AbstractBackground: React.FC = () => {
  // --- Falling Elements Logic ---
  const [items, setItems] = useState<{ 
      id: number; 
      type: 'heart' | 'petal';
      left: number; 
      delay: number; 
      duration: number; 
      size: number; 
      color: string;
      blur: number;
  }[]>([]);

  useEffect(() => {
    // Brand palette for the falling elements
    const colors = ['text-sw-lavender', 'text-sw-salmon', 'text-sw-teal', 'text-white', 'text-pink-100'];
    
    // Generate particles
    const newItems = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      type: (Math.random() > 0.6 ? 'heart' : 'petal') as 'heart' | 'petal',
      left: Math.random() * 100,
      delay: Math.random() * -40, // Start immediately by using negative delay
      duration: 15 + Math.random() * 20, // Slow, dreamy fall
      size: 8 + Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      blur: Math.random() < 0.4 ? (Math.random() * 2) : 0,
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-sw-bg">
      
      {/* 1. Base Gradient Mesh - Breathing Colors */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-sw-lavender/30 rounded-full blur-[100px] animate-pulse-slow mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-sw-salmon/25 rounded-full blur-[120px] animate-pulse-slow mix-blend-multiply" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[40%] left-[40%] w-[60vw] h-[60vw] bg-sw-teal/10 rounded-full blur-[90px] animate-pulse-slow mix-blend-multiply" style={{ animationDelay: '2s' }} />
      </div>

      {/* 2. Texture Layer (Noise) - Adds a "Memory/Paper" feel */}
      <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-soft-light">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* 3. Abstract SVG Layer - "Threads of Connection" */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a29bfe" stopOpacity="0" />
            <stop offset="50%" stopColor="#a29bfe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a29bfe" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fab1a0" stopOpacity="0" />
            <stop offset="50%" stopColor="#fab1a0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fab1a0" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Animated curves representing timeline paths */}
        <path 
          d="M-200,300 Q400,100 800,500 T1800,400" 
          fill="none" 
          stroke="url(#lineGradient1)" 
          strokeWidth="1.5" 
          className="opacity-60 animate-float-slow"
        />
        <path 
          d="M-200,600 Q500,800 1000,400 T2200,600" 
          fill="none" 
          stroke="url(#lineGradient2)" 
          strokeWidth="1.5" 
          className="opacity-60 animate-float-slow"
          style={{ animationDelay: '-5s' }}
        />
      </svg>

      {/* 4. Integrated Falling Hearts & Petals */}
      <div className="absolute inset-0">
        {items.map((item) => (
            <div
            key={item.id}
            className={`absolute top-[-50px] ${item.color} transition-opacity duration-1000`}
            style={{
                left: `${item.left}%`,
                width: item.size,
                height: item.size,
                opacity: item.blur ? 0.4 : 0.8,
                filter: item.blur ? `blur(${item.blur}px)` : 'none',
                animation: `fall ${item.duration}s linear infinite, sway ${item.duration / 3}s ease-in-out infinite alternate`,
                animationDelay: `${item.delay}s`,
            }}
            >
            {item.type === 'heart' ? (
                <Heart 
                size={item.size} 
                fill="currentColor" 
                stroke="none"
                />
            ) : (
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
      </div>

      <style>{`
        .animate-pulse-slow {
          animation: pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-float-slow {
            animation: float 20s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }

        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        @keyframes sway {
          0% { margin-left: -30px; }
          100% { margin-left: 30px; }
        }
      `}</style>
    </div>
  );
};