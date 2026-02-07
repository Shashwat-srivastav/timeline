import React, { useState, useRef } from 'react';
import { Plus, Image as ImageIcon, X, Calendar } from 'lucide-react';
import { Moment } from '../types';

interface MomentFormProps {
  onAddMoment: (moment: Moment) => void;
}

export const MomentForm: React.FC<MomentFormProps> = ({ onAddMoment }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [date, setDate] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddMoment = () => {
    if (!title || !date || !photoUrl) {
      alert("Please fill in Title, Date, and upload a photo.");
      return;
    }

    let displayDate = date;
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
        displayDate = new Intl.DateTimeFormat('en-US', {
            month: 'long', 
            day: 'numeric', 
            year: 'numeric'
        }).format(dateObj);
    }

    const newMoment: Moment = {
      id: crypto.randomUUID(),
      title,
      subtitle,
      date: displayDate,
      photoUrl,
    };

    onAddMoment(newMoment);

    setTitle("");
    setSubtitle("");
    setDate("");
    setPhotoUrl("");
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPhotoUrl(objectUrl);
    }
  };

  const clearPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-soft p-8 md:p-10 relative animate-slide-up transition-all duration-500 hover:shadow-glow hover:-translate-y-1 border border-white/50" style={{ animationDelay: '100ms' }}>
      
      <div className="flex justify-between items-end mb-8 border-b border-gray-100/50 pb-4">
        <div>
            <span className="text-sw-lavender font-bold tracking-widest text-xs uppercase mb-2 block">Step 01</span>
            <h2 className="text-3xl font-head font-bold text-sw-text">Add Memory</h2>
        </div>
        <div className="hidden md:block text-sw-sub font-accent italic text-lg">Curate your story</div>
      </div>

      <div className="space-y-8">
        
        {/* Title Input */}
        <div className="group">
          <label className="block font-body font-medium text-sm text-sw-sub mb-2 uppercase tracking-wide">Title</label>
          <input
            className="w-full bg-white/50 border border-gray-200/60 rounded-lg p-3 text-lg font-head text-sw-text placeholder:text-gray-400 focus:outline-none focus:border-sw-lavender focus:bg-white/80 transition-all duration-300 focus:shadow-glow-card"
            placeholder="e.g. First Date"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Subtitle Input */}
        <div className="group">
          <label className="block font-body font-medium text-sm text-sw-sub mb-2 uppercase tracking-wide">Detail</label>
          <input
            className="w-full bg-white/50 border border-gray-200/60 rounded-lg p-3 text-lg font-accent italic text-sw-text placeholder:text-gray-400 focus:outline-none focus:border-sw-salmon focus:bg-white/80 transition-all duration-300 focus:shadow-glow-card"
            placeholder="e.g. It started with coffee..."
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        {/* Date Input */}
        <div className="group">
          <label className="block font-body font-medium text-sm text-sw-sub mb-2 uppercase tracking-wide">Date</label>
          <div className="relative">
            <input
              type="date"
              className="w-full bg-white/50 border border-gray-200/60 rounded-lg p-3 text-lg font-body text-sw-text placeholder:text-gray-400 focus:outline-none focus:border-sw-teal focus:bg-white/80 transition-all duration-300 cursor-pointer focus:shadow-glow-card"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onClick={(e) => e.currentTarget.showPicker()}
              onKeyDown={(e) => {
                  // Prevent typing but allow navigation keys like Tab
                  if (e.key !== 'Tab') e.preventDefault();
              }}
            />
            {/* Overlay Icon for consistent look, ensuring user knows it's clickable */}
            {!date && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <Calendar size={20} />
                </div>
            )}
          </div>
        </div>

        {/* Photo Input */}
        <div>
          <label className="block font-body font-medium text-sm text-sw-sub mb-3 uppercase tracking-wide">Photograph</label>
          
          <div 
              onClick={() => fileInputRef.current?.click()}
              className={`
                  relative w-full aspect-video rounded-xl overflow-hidden transition-all duration-500 cursor-pointer group
                  ${photoUrl ? 'shadow-lg border border-gray-200 hover:shadow-glow-card' : 'border border-dashed border-gray-300 bg-gray-50/50 hover:bg-white/60 hover:border-sw-lavender hover:shadow-glow-card'}
              `}
          >
              <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
              />

              {photoUrl ? (
                  <>
                      <img src={photoUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Preview" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <button 
                              onClick={clearPhoto}
                              className="bg-white/90 text-sw-text p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:text-red-500"
                          >
                              <X size={20} strokeWidth={1.5} />
                          </button>
                      </div>
                  </>
              ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400 group-hover:text-sw-lavender transition-colors">
                      <ImageIcon size={32} strokeWidth={1} />
                      <span className="font-accent italic text-lg">Upload Memory</span>
                  </div>
              )}
          </div>
        </div>

        <button
          onClick={handleAddMoment}
          className="w-full bg-sw-text text-white py-4 rounded-xl font-body font-medium tracking-widest text-sm uppercase hover:bg-sw-lavender hover:shadow-glow-card hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 border border-transparent"
        >
          <Plus size={18} strokeWidth={2} />
          Add to Collection
        </button>
      </div>
    </div>
  );
};