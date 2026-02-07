import React from 'react';

export const GarlandDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`w-full flex justify-center items-center py-8 select-none pointer-events-none opacity-60 ${className}`}>
            <div className="flex items-center text-sw-lavender/50">
                {/* Left tapered line */}
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-current"></div>

                {/* Repeated Vine Pattern */}
                <div className="flex -space-x-1 mx-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={i} width="60" height="20" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
                            {/* Wave */}
                            <path d="M0,10 Q15,18 30,10 T60,10" className="text-sw-sub/30" />

                            {/* Leaves */}
                            <path d="M15,14 Q10,20 18,22" className="text-sw-teal/40" />
                            <path d="M45,6 Q50,0 42,-2" className="text-sw-teal/40" />

                            {/* Buds */}
                            <circle cx="30" cy="10" r="2" fill="currentColor" className={i % 2 === 0 ? "text-sw-salmon" : "text-sw-lavender"} stroke="none" />
                        </svg>
                    ))}
                </div>

                {/* Right tapered line */}
                <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-current"></div>
            </div>
        </div>
    );
};