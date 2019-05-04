import React, { useMemo } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { getTime } from 'date-fns';
import styles from './card-grid.module.scss';
import { Recording } from '../../interfaces';
import SummaryCard from '../summary-card/summary-card';

interface Props {
  items: Recording[];
}

const AnimatedCard = animated(SummaryCard);

const CardGrid: React.FC<Props> = ({ items }) => {
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => getTime(b.date) - getTime(a.date)),
    [items]
  );

  const transition = useTransition(sortedItems, item => item.id, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
    config: config.gentle,
    trail: 500 / sortedItems.length,
  });

  return (
    <div className={styles.grid}>
      {transition.map(({ item, props }) => {
        const { id, name, date, blob, duration } = item;

        return (
          <AnimatedCard
            key={id}
            recordingId={id}
            title={name}
            date={date}
            blob={blob}
            duration={duration}
            style={props}
          />
        );
      })}
    </div>
  );
};

export default CardGrid;
