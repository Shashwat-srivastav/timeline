import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Scissors, Heart, Sun, Cloud, Sparkles, Camera, Star, Paperclip, MapPin } from 'lucide-react';
import { Moment } from '../types';

interface ScrapbookProps {
    moments: Moment[];
}

export const Scrapbook: React.FC<ScrapbookProps> = ({ moments }) => {
    const scrapbookRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Fallback if no moments
    const displayMoments = moments.length > 0 ? moments : [
        {
            id: 'demo1',
            title: 'Our Journey',
            subtitle: 'Add moments to start...',
            date: 'Today',
            photoUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
        }
    ];

    // Helper to get diverse moments for layout
    const mainMoment = displayMoments[0];
    const stripMoments = displayMoments.slice(1, 4); // Next 3 moments for the strip
    const noteMoment = displayMoments.length > 1 ? displayMoments[1] : displayMoments[0];

    const handleDownload = async () => {
        if (!scrapbookRef.current) return;
        setIsGenerating(true);

        try {
            // Store original styles
            const originalWidth = scrapbookRef.current.style.width;
            const originalHeight = scrapbookRef.current.style.height;
            const originalMaxWidth = scrapbookRef.current.style.maxWidth;

            // Temporarily set fixed desktop dimensions for capture
            scrapbookRef.current.style.width = '900px';
            scrapbookRef.current.style.height = '650px';
            scrapbookRef.current.style.maxWidth = '900px';

            // Small delay to ensure layout adjusts and images are loaded
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(scrapbookRef.current, {
                scale: 2, // High resolution
                useCORS: true, // Important for Unsplash/external images
                backgroundColor: null,
                width: 900,
                height: 650,
            });

            // Restore original styles
            scrapbookRef.current.style.width = originalWidth;
            scrapbookRef.current.style.height = originalHeight;
            scrapbookRef.current.style.maxWidth = originalMaxWidth;

            const link = document.createElement('a');
            link.download = 'Our-Love-Scrapbook.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error("Scrapbook generation failed:", error);
            alert("Could not generate image. Try creating fewer moments or using local images.");

            // Ensure styles are restored even on error
            if (scrapbookRef.current) {
                scrapbookRef.current.style.width = '';
                scrapbookRef.current.style.height = '';
                scrapbookRef.current.style.maxWidth = '';
            }
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="w-full py-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="max-w-6xl mx-auto px-4">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-white/50 backdrop-blur-sm rounded-full mb-4 border border-sw-salmon/30">
                        <Scissors size={20} className="text-sw-salmon mr-2" />
                        <span className="font-typewriter text-sw-sub text-sm">DIGITAL KEEPSAKE</span>
                    </div>
                    <h2 className="text-4xl font-head font-bold text-sw-text mb-2">Your Scrapbook Page</h2>
                    <p className="font-accent italic text-xl text-sw-sub">A static memory to download, print, or share.</p>
                </div>

                {/* The Scrapbook Container (to be captured) */}
                <div className="flex justify-center overflow-x-auto pb-8 pt-4">
                    <div
                        ref={scrapbookRef}
                        className="relative flex flex-col md:flex-row w-full md:w-[900px] h-auto md:h-[650px] bg-white shadow-2xl rounded-sm overflow-hidden shrink-0 max-w-[900px]"
                        style={{
                            // Realistic book shadow
                            boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}
                    >
                        {/* --- LEFT PAGE (Floral) --- */}
                        <div className="relative w-full md:w-1/2 h-[500px] md:h-full overflow-hidden bg-[#fdfbf7]">
                            {/* Floral Pattern Background - Vintage Floral */}
                            <img
                                src="https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&w=1000&q=80"
                                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply"
                                crossOrigin="anonymous"
                                alt="bg"
                            />

                            {/* Content Layer */}
                            <div className="relative z-10 p-10 h-full flex flex-col items-start">

                                {/* Ticket Stub */}
                                <div className="absolute top-10 left-8 bg-[#ff9f9f] p-3 px-5 shadow-sm -rotate-12 border-l-2 border-r-2 border-dashed border-white/60 z-20">
                                    <div className="font-typewriter text-[10px] text-white font-bold uppercase tracking-widest text-center leading-tight">
                                        ADMIT ONE<br />
                                        <span className="text-[8px] font-normal opacity-80">LOVE TOUR</span>
                                    </div>
                                </div>

                                {/* Note Paper */}
                                <div className="bg-[#fcf6e6] p-6 shadow-md rotate-[-2deg] max-w-[80%] border border-gray-200/50 relative mb-8 z-10 mt-12 mx-auto">
                                    {/* Tape */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-sw-salmon/40 backdrop-blur-sm rotate-[1deg] opacity-80" />

                                    {/* Paperclip */}
                                    <div className="absolute -top-4 -right-2 text-gray-400 rotate-12 z-20">
                                        <Paperclip size={32} strokeWidth={1.5} />
                                    </div>

                                    <p className="font-hand text-2xl text-sw-text leading-relaxed mb-4">
                                        "Every moment with you is a favorite memory. Here's to us, {mainMoment.date}."
                                    </p>
                                    <div className="text-right font-typewriter text-xs text-gray-500 uppercase tracking-widest">
                                        — {noteMoment.title}
                                    </div>
                                </div>

                                {/* Main Polaroid */}
                                <div className="absolute bottom-16 right-12 bg-white p-3 pb-8 shadow-xl rotate-[3deg] transition-transform w-56 group z-20">
                                    {/* Washi Tape Corner */}
                                    <div className="absolute -top-3 -right-3 w-16 h-6 bg-sw-teal/40 rotate-[45deg] z-20" />

                                    <div className="w-full aspect-square overflow-hidden bg-gray-100">
                                        <img
                                            src={mainMoment.photoUrl}
                                            className="w-full h-full object-cover grayscale-[0.2] contrast-110"
                                            crossOrigin="anonymous"
                                            alt="main"
                                        />
                                    </div>
                                    <div className="mt-3 font-hand text-xl text-center text-gray-600">
                                        {mainMoment.subtitle}
                                    </div>
                                </div>

                                {/* Stickers */}
                                <div className="absolute top-8 right-8 text-sw-salmon opacity-80 rotate-12">
                                    <Heart fill="currentColor" size={40} />
                                </div>
                                <div className="absolute bottom-32 left-8 text-sw-lavender opacity-80 -rotate-12">
                                    <Sun size={48} strokeWidth={1.5} />
                                </div>

                                {/* Scribbles */}
                                <svg className="absolute bottom-24 left-10 w-24 h-12 pointer-events-none opacity-40 z-0" viewBox="0 0 100 50">
                                    <path d="M0,25 Q25,0 50,25 T100,25" fill="none" stroke="#2d3436" strokeWidth="1" />
                                </svg>

                                {/* Text Overlay */}
                                <div className="absolute bottom-12 left-12 max-w-[150px] z-20">
                                    <h3 className="font-typewriter text-2xl font-bold text-sw-text leading-tight bg-white/60 inline-block px-1">
                                        {mainMoment.title}
                                    </h3>
                                    <p className="font-typewriter text-xs mt-2 text-gray-600">
                                        Captured for eternity.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* --- SPINE --- */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 z-30 pointer-events-none hidden md:block">
                            <div className="w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                        </div>

                        {/* --- RIGHT PAGE (Texture) --- */}
                        <div className="relative w-full md:w-1/2 h-[500px] md:h-full bg-[#f0f4f8]">
                            {/* Paper Texture - Old Paper */}
                            <img
                                src="https://images.unsplash.com/photo-1524634126442-357e0eac3c14?auto=format&fit=crop&w=1000&q=80"
                                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply grayscale"
                                crossOrigin="anonymous"
                                alt="bg-texture"
                            />

                            {/* Content */}
                            <div className="relative z-10 p-10 h-full">

                                {/* Postage Stamp */}
                                <div className="absolute top-8 left-8 w-24 h-28 bg-white p-2 shadow-md rotate-6 z-20">
                                    <div className="w-full h-full border-[3px] border-dashed border-sw-lavender/60 p-1 flex flex-col items-center justify-between bg-white">
                                        <div className="w-full h-16 bg-gray-100 overflow-hidden relative">
                                            <img src={mainMoment.photoUrl} className="w-full h-full object-cover grayscale contrast-125" crossOrigin="anonymous" alt="stamp" />
                                            <div className="absolute inset-0 bg-sw-lavender/20 mix-blend-overlay"></div>
                                        </div>
                                        <div className="flex justify-between w-full items-end px-1">
                                            <span className="font-typewriter text-[8px] text-sw-sub">AIR MAIL</span>
                                            <span className="font-typewriter text-[10px] font-bold text-sw-text">25¢</span>
                                        </div>
                                    </div>
                                    {/* Cancellation Mark */}
                                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 opacity-40 rotate-12 pointer-events-none" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="2" fill="none" />
                                        <path d="M15,50 H85 M50,15 V85" stroke="black" strokeWidth="1" />
                                        <text x="50" y="45" textAnchor="middle" fontSize="10" fontFamily="monospace">FOREVER</text>
                                    </svg>
                                </div>

                                {/* Photo Strip Layout */}
                                <div className="absolute top-10 right-10 flex flex-col gap-4 items-center bg-white p-4 shadow-lg rotate-[2deg] border border-gray-200 z-10">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-8 bg-sw-lavender/40 backdrop-blur-sm -rotate-1 z-20" />

                                    <div className="flex flex-col gap-3">
                                        {stripMoments.length > 0 ? (
                                            stripMoments.map((m, i) => (
                                                <div key={i} className="w-32 aspect-square bg-gray-100 overflow-hidden relative group">
                                                    <img
                                                        src={m.photoUrl}
                                                        className="w-full h-full object-cover"
                                                        crossOrigin="anonymous"
                                                        alt="strip"
                                                    />
                                                    {/* Date overlay */}
                                                    <div className="absolute bottom-0 inset-x-0 bg-white/80 p-1 text-[8px] font-typewriter text-center uppercase tracking-widest">
                                                        {m.date}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            // Empty state placeholders
                                            [1, 2, 3].map((_, i) => (
                                                <div key={i} className="w-32 aspect-square bg-gray-100 flex items-center justify-center text-gray-300">
                                                    <Camera size={24} />
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="font-hand text-lg mt-1 text-gray-400">
                                        LoveTimeline
                                    </div>
                                </div>

                                {/* Motivational Card */}
                                <div className="absolute bottom-16 left-12 bg-[#3c3c3c] text-[#fdfbf7] p-6 shadow-xl -rotate-[2deg] w-48 z-20">
                                    {/* Tape */}
                                    <div className="absolute -top-3 right-8 w-12 h-6 bg-sw-salmon/60 rotate-[90deg] opacity-90" />

                                    <p className="font-typewriter text-lg leading-snug">
                                        "Collect moments,<br />not things."
                                    </p>
                                    <div className="mt-4 flex gap-2 text-sw-salmon">
                                        <Sparkles size={16} />
                                        <Cloud size={16} />
                                    </div>
                                </div>

                                {/* Doodles */}
                                <svg className="absolute top-24 left-12 w-32 h-32 opacity-20 pointer-events-none" viewBox="0 0 100 100">
                                    <path d="M10,50 Q25,25 50,50 T90,50" fill="none" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
                                </svg>

                                {/* Extra Sticker */}
                                <div className="absolute bottom-8 right-32 text-sw-teal opacity-60 rotate-[45deg] z-10">
                                    <Cloud size={64} fill="currentColor" stroke="none" />
                                </div>

                                {/* Pressed Flower Image - Reliable Dried Flower */}
                                <img
                                    src="https://images.unsplash.com/photo-1524055988636-436cfa46e59e?auto=format&fit=crop&w=400&q=80"
                                    className="absolute bottom-[-30px] right-[-30px] w-56 h-56 object-contain opacity-80 mix-blend-multiply -rotate-12 pointer-events-none z-30"
                                    alt="flower"
                                    crossOrigin="anonymous"
                                />

                                {/* Map Pin */}
                                <div className="absolute top-[320px] right-[160px] text-red-400 drop-shadow-md z-30 opacity-80">
                                    <MapPin size={24} fill="currentColor" className="text-red-500" />
                                </div>

                                {/* Scattered Stars */}
                                <div className="absolute top-1/3 left-1/4 text-yellow-400 opacity-60 rotate-45 z-0">
                                    <Star size={24} fill="currentColor" stroke="none" />
                                </div>
                                <div className="absolute bottom-1/4 right-1/3 text-sw-teal opacity-50 -rotate-12 z-0">
                                    <Star size={18} fill="currentColor" stroke="none" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Download Button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-body font-bold text-white transition-all duration-200 bg-sw-text font-lg rounded-full hover:bg-sw-lavender hover:shadow-glow hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sw-lavender disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Developing...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Download size={20} />
                                Download Keepsake
                            </span>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};