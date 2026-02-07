import React from 'react';
import { Heart } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-transparent pt-12 pb-4 px-6 animate-slide-up relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="mb-4 relative">
          <div className="absolute inset-0 bg-sw-lavender blur-2xl opacity-20 rounded-full transform scale-150"></div>
          <Heart 
            size={40} 
            className="text-sw-lavender fill-sw-lavender/20 relative z-10" 
            strokeWidth={1}
          />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-head font-bold text-sw-text tracking-tight mb-3">
          LoveTimeline
        </h1>
        
        <div className="flex items-center gap-4 text-sw-sub/40">
            {/* Left floral flourish */}
            <svg width="50" height="12" viewBox="0 0 50 12" className="rotate-180" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round">
                 <path d="M50,6 Q35,12 25,6 T0,6" />
                 <path d="M35,9 Q30,14 25,9" />
                 <circle cx="0" cy="6" r="1.5" fill="currentColor" stroke="none" className="text-sw-salmon" />
            </svg>

            <p className="font-accent italic text-xl text-sw-sub px-2">
            The Journey, Curated.
            </p>

            {/* Right floral flourish */}
            <svg width="50" height="12" viewBox="0 0 50 12" className="" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round">
                 <path d="M0,6 Q15,0 25,6 T50,6" />
                 <path d="M15,3 Q20,-2 25,3" />
                 <circle cx="50" cy="6" r="1.5" fill="currentColor" stroke="none" className="text-sw-salmon" />
            </svg>
        </div>
      </div>
    </header>
  );
};