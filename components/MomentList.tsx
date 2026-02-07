import React from 'react';
import { Trash2 } from 'lucide-react';
import { Moment } from '../types';

interface MomentListProps {
  moments: Moment[];
  onRemoveMoment: (id: string) => void;
}

export const MomentList: React.FC<MomentListProps> = ({ moments, onRemoveMoment }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-soft p-8 md:p-10 relative animate-slide-up transition-all duration-500 hover:shadow-glow hover:-translate-y-1 border border-white/50" style={{ animationDelay: '200ms' }}>
      
      <div className="flex justify-between items-end mb-8 border-b border-gray-100/50 pb-4">
        <div>
            <span className="text-sw-salmon font-bold tracking-widest text-xs uppercase mb-2 block">Step 02</span>
            <h2 className="text-3xl font-head font-bold text-sw-text">Timeline</h2>
        </div>
        <div className="text-sw-sub font-accent italic text-lg">{moments.length} Memories</div>
      </div>

      {moments.length === 0 ? (
        <div className="py-12 text-center rounded-xl bg-gray-50/50 border border-dashed border-gray-300/60">
          <p className="font-accent italic text-xl text-gray-400">The canvas is empty.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {moments.map((m, index) => (
            <div
              key={m.id}
              className="flex gap-6 items-center p-4 rounded-xl hover:bg-white/60 transition-all duration-300 group border border-transparent hover:border-gray-100 hover:shadow-glow-card transform hover:-translate-x-[-4px]"
            >
              <div className="shrink-0 w-20 h-20 relative overflow-hidden rounded-lg shadow-sm border border-gray-100">
                <img
                  src={m.photoUrl}
                  alt={m.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-sw-lavender/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-sw-lavender tracking-widest uppercase">0{index + 1}</span>
                    <span className="h-[1px] w-8 bg-gray-200"></span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{m.date}</span>
                </div>
                <h3 className="font-head text-2xl text-sw-text leading-tight mb-1">{m.title}</h3>
                <p className="text-sm font-accent italic text-sw-sub truncate">{m.subtitle}</p>
              </div>

              <button
                onClick={() => onRemoveMoment(m.id)}
                className="p-3 text-gray-300 hover:text-sw-salmon transition-colors opacity-0 group-hover:opacity-100"
                title="Remove moment"
              >
                <Trash2 size={18} strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};