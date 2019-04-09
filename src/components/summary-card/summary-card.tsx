import React, { useState } from 'react';
import styles from './summary-card.module.scss';
import { KebabMenuItem, KebabMenu, CircleButton } from '..';

interface Props {
  title: string;
  date: string;
  duration: string;
}

const SummaryCard: React.FC<Props> = ({ title, date, duration }) => {
  const [playing, setPlaying] = useState(false);

  const togglePlayBack: () => void = () => {
    setPlaying(!playing);
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
      <KebabMenu>
        <KebabMenuItem>Rename</KebabMenuItem>
        <KebabMenuItem>Delete</KebabMenuItem>
      </KebabMenu>
    </div>
  );
};

export default SummaryCard;
