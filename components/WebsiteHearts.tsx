import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export const WebsiteHearts: React.FC = () => {
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
    // A palette that mixes brand colors with "snow" white for that snowball effect
    const colors = ['text-sw-lavender', 'text-sw-salmon', 'text-sw-teal', 'text-white', 'text-pink-100'];
    
    // Increased count for a denser effect mixing petals and hearts
    const newItems = Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      type: (Math.random() > 0.5 ? 'heart' : 'petal') as 'heart' | 'petal', // 50/50 split
      left: Math.random() * 100, // Random horizontal start
      delay: Math.random() * -40, // Wider range of negative delay for immediate fullness
      duration: 8 + Math.random() * 25, // Wider range of speeds
      size: 6 + Math.random() * 24, // Wider range of sizes (tiny to large)
      color: colors[Math.floor(Math.random() * colors.length)],
      blur: Math.random() < 0.4 ? (Math.random() * 3) : 0, // More varied blur for depth
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute top-[-50px] ${item.color}`}
          style={{
            left: `${item.left}%`,
            width: item.size,
            height: item.size,
            opacity: item.blur ? 0.3 : 0.6, // Blurry ones are fainter (atmospheric perspective)
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
            // Custom SVG Petal Shape
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
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        @keyframes sway {
          0% { margin-left: -40px; }
          100% { margin-left: 40px; }
        }
      `}</style>
    </div>
  );
};