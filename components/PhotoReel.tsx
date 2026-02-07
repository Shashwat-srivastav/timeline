import React from 'react';

const LOCATIONS = [
  { url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', label: 'PARIS' },
  { url: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', label: 'VENICE' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', label: 'PARADISE' },
  { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', label: 'ESCAPE' },
  { url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', label: 'KYOTO' },
  { url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', label: 'SANTORINI' },
  { url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', label: 'CINQUE TERRE' },
];

export const PhotoReel: React.FC = () => {
  // Duplicate list for seamless loop
  const slides = [...LOCATIONS, ...LOCATIONS, ...LOCATIONS]; 

  return (
    <div className="w-full mt-8 mb-12 overflow-hidden relative group z-10">
      {/* 
        Using mask-image to fade edges to transparent instead of overlaying a solid color div.
        This allows the abstract background to show through the faded areas.
      */}
      <div 
        className="flex w-max animate-scroll group-hover:[animation-play-state:paused] items-center gap-8 py-4 px-12"
        style={{
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
        }}
      >
        {slides.map((loc, i) => (
          <div 
            key={i} 
            className="relative w-64 aspect-[3/4] shrink-0 transition-all duration-500 ease-out hover:-translate-y-3 hover:rotate-2 group/card cursor-pointer"
          >
            
            <div className="w-full h-full bg-white rounded-2xl shadow-soft overflow-hidden relative border border-white transition-all duration-300 group-hover/card:border-sw-lavender group-hover/card:shadow-[0_20px_40px_-10px_rgba(162,155,254,0.4)]">
               <img 
                 src={loc.url} 
                 alt={loc.label}
                 className="w-full h-full object-cover transition-all duration-700 ease-in-out filter saturate-[0.6] brightness-[0.95] group-hover/card:scale-110 group-hover/card:saturate-[1.3] group-hover/card:brightness-110"
               />
               
               {/* Colorful Gradient Overlay on Hover */}
               <div className="absolute inset-0 bg-gradient-to-t from-sw-lavender/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

               {/* Minimal Label with Slide Up Animation */}
               <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 delay-75">
                  <span className="text-white font-head font-bold text-xl tracking-widest drop-shadow-md">
                    {loc.label}
                  </span>
                  <div className="h-[2px] w-0 group-hover/card:w-8 bg-sw-salmon mt-2 transition-all duration-500 delay-150"></div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};