import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Img } from 'remotion';
import { Moment } from '../types';

export const Slide: React.FC<{ moment: Moment }> = ({ moment }) => {
  const frame = useCurrentFrame();

  // Animations
  const opacity = interpolate(frame, [0, 15], [0, 1]);
  const scale = interpolate(frame, [0, 100], [1, 1.05]); // Subtle zoom
  const textTranslateY = interpolate(frame, [0, 20], [20, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a1a' }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Img
          src={moment.photoUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </AbsoluteFill>

      {/* Cinematic Vignette/Overlay - Softer for this aesthetic */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Text Container */}
      <div
        style={{
          position: 'absolute',
          bottom: 150,
          left: 60,
          right: 60,
          opacity,
          transform: `translateY(${textTranslateY}px)`,
          color: 'white',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <h1
            style={{
                fontSize: 68,
                fontWeight: 700,
                marginBottom: 20,
                lineHeight: 1.1,
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '-0.02em',
            }}
        >
          {moment.title}
        </h1>
        <p
            style={{
                fontSize: 32,
                fontWeight: 400,
                opacity: 0.9,
                marginBottom: 30,
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: 'italic',
                letterSpacing: '0.05em',
            }}
        >
          {moment.subtitle}
        </p>
        <div
            style={{
                display: 'inline-block',
                borderTop: '1px solid rgba(255,255,255,0.4)',
                paddingTop: 15,
                fontSize: 20,
                fontWeight: 500,
                fontFamily: '"Montserrat", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
            }}
        >
          {moment.date}
        </div>
      </div>
    </AbsoluteFill>
  );
};