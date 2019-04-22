import React, { useEffect, useRef } from 'react';
import styles from './visualisation.module.scss';

interface Props {
  stream: MediaStream;
}

const Visualisation: React.FC<Props> = ({ stream }) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  // Canvas dimentions
  const scale = window.devicePixelRatio;
  const width = window.innerWidth * scale;
  const height = window.innerHeight * scale;

  useEffect(() => {
    // Create a new audio context and set up the options
    const audioContext = new AudioContext();
    const analyserNode = audioContext.createAnalyser();
    analyserNode.smoothingTimeConstant = 0.75;
    analyserNode.fftSize = 256;

    // Create a media stream source and connect it to the analyser node
    const sourceNode = audioContext.createMediaStreamSource(stream);
    sourceNode.connect(analyserNode);

    // Store the waveform data in an array
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNode.getByteFrequencyData(dataArray);

    if (canvasEl.current) {
      const ctx = canvasEl.current.getContext('2d');

      if (ctx) {
        ctx.scale(scale, scale);
        ctx.clearRect(0, 0, width, height);

        // Animate the frequency data
        const draw: () => void = () => {
          ctx.clearRect(0, 0, width, height);

          const barWidth = (width / scale / bufferLength) * 2;
          let barHeight;
          let x = 0;

          for (let i = 0; i < bufferLength; i += 1) {
            barHeight = dataArray[i] / 2;
            ctx.fillStyle = `rgba(3, 248, 252, ${barHeight / 100})`;
            ctx.fillRect(
              x,
              height / 2 / scale - barHeight / 2,
              barWidth,
              barHeight
            );

            x += barWidth + 5;
          }
        };

        // Loop the animation
        const update: () => void = () => {
          requestAnimationFrame(update);
          analyserNode.getByteFrequencyData(dataArray);
          draw();
        };
        update();
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasEl}
      width={width}
      height={height}
      className={styles.canvas}
    />
  );
};

export default Visualisation;
