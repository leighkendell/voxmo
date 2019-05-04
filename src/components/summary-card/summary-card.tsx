/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef, useEffect, useMemo, useContext } from 'react';
import throttle from 'lodash/throttle';
import { format } from 'date-fns';
import styles from './summary-card.module.scss';
import {
  KebabMenuItem,
  KebabMenu,
  CircleButton,
  ProgressBar,
  AppContext,
} from '..';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  date: string;
  blob: Blob;
  recordingId: string;
  duration: number;
}

const SummaryCard: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(
  ({ title, date, blob, duration, recordingId }, ref) => {
    // State
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const { deleteRecording } = useContext(AppContext);

    // Ref to audio element used for playback
    const audioEl = useRef<HTMLAudioElement>(null);

    // Calculated values
    const src = useMemo(() => URL.createObjectURL(blob), [blob]);
    const formattedDuration = useMemo(
      () => new Date(duration * 1000).toISOString().substr(11, 8),
      [duration]
    );
    const formattedDate = useMemo(() => format(date, 'DD MMMM, YYYY'), [date]);

    // Add event listeners to handle playback progress and end of playback
    useEffect(() => {
      const el = audioEl.current;

      // Set playing state when playback ends
      const handleEnded: () => void = () => {
        setPlaying(false);
      };

      // Set progress state every 'timeupdate' event
      const handleTimeUpdate: () => void = () => {
        if (el) {
          setProgress((el.currentTime / duration) * 100);
        }
      };

      // Add listeners
      if (el) {
        el.addEventListener('ended', handleEnded);
        el.addEventListener('timeupdate', throttle(handleTimeUpdate, 250));
      }

      // Clean up listeners
      return () => {
        if (el) {
          el.removeEventListener('ended', handleEnded);
          el.removeEventListener('timeupdate', handleTimeUpdate);
        }
      };
    }, [duration]);

    // Toggle playback state and audio
    const togglePlayBack: () => void = async () => {
      if (audioEl.current) {
        if (audioEl.current.paused) {
          await audioEl.current.play();
          setPlaying(true);
        } else {
          await audioEl.current.pause();
          setPlaying(false);
        }
      }
    };

    // Delete this recording
    const handleDelete: (id: string) => void = id => {
      if (deleteRecording) {
        deleteRecording(id);
      }
    };

    return (
      <div className={styles.card} ref={ref}>
        <CircleButton
          label={playing ? 'Stop' : 'Play'}
          icon={playing ? 'stop' : 'play'}
          secondary={playing}
          onClick={togglePlayBack}
        />
        <strong className={styles.title}>{title}</strong>
        <span className={styles.meta}>{formattedDate}</span>
        <span className={styles.meta}>{formattedDuration}</span>
        <audio ref={audioEl} src={src} />
        <ProgressBar value={progress} />
        <KebabMenu>
          <KebabMenuItem onClick={() => handleDelete(recordingId)}>
            Delete
          </KebabMenuItem>
        </KebabMenu>
      </div>
    );
  }
);

export default SummaryCard;
