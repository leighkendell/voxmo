import React, { useState, useRef, useEffect } from 'react';
import styles from './summary-card.module.scss';
import { KebabMenuItem, KebabMenu, CircleButton } from '..';

interface Props {
  title: string;
  date: string;
  audio: string;
}

const SummaryCard: React.FC<Props> = ({ title, date, audio }) => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const audioEl = useRef<HTMLAudioElement>();

  // Format and update the duration state
  const formatDuration: (durationSeconds: number) => void = (durationSeconds: number) => {
    setDuration(new Date(durationSeconds * 1000).toISOString().substr(11, 8));
  };

  // Handle end of playback
  useEffect(() => {
    const setPlayBack: () => void = () => {
      setPlaying(false);
    };

    if (audioEl.current) {
      audioEl.current.addEventListener('ended', setPlayBack);
    }

    return () => {
      if (audioEl.current) {
        audioEl.current.removeEventListener('ended', setPlayBack);
      }
    };
  }, []);

  // Set duration once metadata loads
  useEffect(() => {
    if (audioEl.current) {
      if (audioEl.current.duration) {
        formatDuration(audioEl.current.duration);
      } else {
        audioEl.current.onloadedmetadata = () => {
          if (audioEl.current) {
            formatDuration(audioEl.current.duration);
          }
        };
      }
    }
  }, []);

  // Toggle playback state and audio
  const togglePlayBack: () => void = () => {
    if (audioEl.current) {
      if (playing) {
        audioEl.current.pause();
      } else {
        audioEl.current.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <div className={styles.card}>
      <CircleButton
        label={playing ? 'Stop' : 'Play'}
        icon={playing ? 'stop' : 'play'}
        secondary={playing}
        onClick={togglePlayBack}
      />
      <strong className={styles.title}>{title}</strong>
      <span className={styles.meta}>{date}</span>
      <span className={styles.meta}>{duration}</span>
      {/* eslint-disable */}
      <audio ref={audioEl} src={audio} />
      {/* eslint-enable */}
      <KebabMenu>
        <KebabMenuItem>Rename</KebabMenuItem>
        <KebabMenuItem>Delete</KebabMenuItem>
      </KebabMenu>
    </div>
  );
};

export default SummaryCard;
