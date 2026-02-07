import React, { useState, useEffect } from 'react';
import { Moment, DEMO_MOMENTS } from './types';
import { Header } from './components/Header';
import { MomentForm } from './components/MomentForm';
import { MomentList } from './components/MomentList';
import { TimelinePreview } from './components/TimelinePreview';
import { AbstractBackground } from './components/AbstractBackground';
import { PhotoReel } from './components/PhotoReel';
import { Scrapbook } from './components/Scrapbook';
import { GarlandDivider } from './components/GarlandDivider';

export default function App() {
  // Initialize state lazily
  const [moments, setMoments] = useState<Moment[]>(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const sharedData = searchParams.get('s');
      if (sharedData) {
        try {
          const decoded = JSON.parse(decodeURIComponent(sharedData));
          if (Array.isArray(decoded)) {
            return decoded;
          }
        } catch (e) {
          console.error("Failed to load shared timeline:", e);
        }
      }
    }
    return DEMO_MOMENTS;
  });

  const addMoment = (moment: Moment) => {
    setMoments((prev) => [...prev, moment]);
  };

  const removeMoment = (id: string) => {
    setMoments((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen pb-20 relative overflow-x-hidden bg-sw-bg">
      <AbstractBackground />

      <Header />
      
      <PhotoReel />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <MomentForm onAddMoment={addMoment} />
            <MomentList moments={moments} onRemoveMoment={removeMoment} />
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-8">
            <TimelinePreview moments={moments} />
          </div>
        </div>

        {/* Garland Separator */}
        <GarlandDivider />

        {/* Full Width Scrapbook Section */}
        <div className="relative z-10 pt-4">
            <Scrapbook moments={moments} />
        </div>
      </div>
      
      {/* Subtle Footer */}
      <div className="text-center py-12 text-sw-sub font-accent italic text-sm opacity-60 relative z-10 flex flex-col items-center gap-4">
        <GarlandDivider className="opacity-30 scale-75 !py-0" />
        Designed for LoveTimeline
      </div>
    </div>
  );
}