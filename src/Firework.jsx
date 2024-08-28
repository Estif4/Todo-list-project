import React, { useRef, useEffect } from 'react';
import Fireworks from 'fireworks-js';

const FireworksComponent = ({ trigger }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && trigger) {
      const fireworks = new Fireworks(containerRef.current);
      fireworks.start();

      const timer = setTimeout(() => {
        fireworks.stop();
      }, 5000); // Fireworks duration

      return () => {
        clearTimeout(timer);
        fireworks.stop();
      };
    }
  }, [trigger]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000, // Lower than other elements if necessary
        pointerEvents: 'none', // Allows interactions with elements below
      }}
    ></div>
  );
};

export default FireworksComponent;
