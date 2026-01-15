// import { useRef, useEffect } from 'react';

// const Noise = ({
//   patternSize = 250,
//   patternScaleX = 1,
//   patternScaleY = 1,
//   patternRefreshInterval = 2,
//   patternAlpha = 15
// }) => {
//   const grainRef = useRef(null);

//   useEffect(() => { 
//     const canvas = grainRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d', { alpha: true });
//     if (!ctx) return;

//     let frame = 0;
//     let animationId;
//     const canvasSize = 1024;

//     const resize = () => {
//       if (!canvas) return;
//       canvas.width = canvasSize;
//       canvas.height = canvasSize;

//       canvas.style.width = '100vw';
//       canvas.style.height = '100vh';
//     };

//     const drawGrain = () => {
//       const imageData = ctx.createImageData(canvasSize, canvasSize);
//       const data = imageData.data;

//       for (let i = 0; i < data.length; i += 4) {
//         const value = Math.random() * 255;
//         data[i] = value;
//         data[i + 1] = value;
//         data[i + 2] = value;
//         data[i + 3] = patternAlpha;
//       }

//       ctx.putImageData(imageData, 0, 0);
//     };

//     const loop = () => {
//       if (frame % patternRefreshInterval === 0) {
//         drawGrain();
//       }
//       frame++;
//       animationId = window.requestAnimationFrame(loop);
//     };

//     window.addEventListener('resize', resize);
//     resize();
//     loop();

//     return () => {
//       window.removeEventListener('resize', resize);
//       window.cancelAnimationFrame(animationId);
//     };
//   }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

//   return (
//     <canvas
//       className="pointer-events-none absolute inset-0 w-full h-full"
//       ref={grainRef}
//       style={{ imageRendering: 'pixelated' }}
//     />
//   );
// };

// export default Noise;

// components/NoiseBackground.jsx
import { useRef, useEffect } from 'react';

const NoiseBackground = ({
  alpha = 8,
  refresh = 4
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = 1024;
    let frame = 0;
    let raf;

    const resize = () => {
      canvas.width = size;
      canvas.height = size;
    };

    const draw = () => {
      const imageData = ctx.createImageData(size, size);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = alpha;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % refresh === 0) draw();
      frame++;
      raf = requestAnimationFrame(loop);
    };

    resize();
    loop();

    return () => cancelAnimationFrame(raf);
  }, [alpha, refresh]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default NoiseBackground;