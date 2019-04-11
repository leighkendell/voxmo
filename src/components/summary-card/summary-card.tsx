import React, { useState, useRef, useEffect } from 'react';
import styles from './summary-card.module.scss';
import { KebabMenuItem, KebabMenu, CircleButton } from '..';

interface Props {
  title: string;
  date: string;
  duration: string;
  audio: string;
}

const SummaryCard: React.FC<Props> = ({ title, date, duration, audio }) => {
  const [playing, setPlaying] = useState(false);
  const audioEl = useRef<HTMLAudioElement>();

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
      <audio ref={audioEl} src={audio}>
        <track kind="captions" />
      </audio>
      <KebabMenu>
        <KebabMenuItem>Rename</KebabMenuItem>
        <KebabMenuItem>Delete</KebabMenuItem>
      </KebabMenu>
    </div>
  );
};

export default SummaryCard;
