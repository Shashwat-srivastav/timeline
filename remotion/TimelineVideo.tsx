import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Moment } from '../types';
import { Slide } from './Slide';

interface TimelineVideoProps {
  moments: Moment[];
}

export const TimelineVideo: React.FC<TimelineVideoProps> = ({ moments }) => {
  const slideDuration = 90; // 3 seconds per slide at 30fps

  if (moments.length === 0) {
    return (
        <AbsoluteFill style={{ backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 40, fontFamily: 'sans-serif', color: '#9CA3AF', fontWeight: 'bold' }}>
                Add memories...
            </div>
        </AbsoluteFill>
    )
  }

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {moments.map((moment, index) => (
        <Sequence
          key={moment.id}
          from={index * slideDuration}
          durationInFrames={slideDuration}
        >
          <Slide moment={moment} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};