import React, { useMemo } from 'react';
import { animated, useTrail, config, useSpring } from 'react-spring';
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

  const spring = useSpring({
    from: { transform: 'translateX(-40px)' },
    transform: 'translateX(0)',
  });

  const trail = useTrail(sortedItems.length, {
    from: { opacity: 0 },
    opacity: 1,
    config: config.gentle,
  });

  return (
    <animated.div className={styles.grid} style={spring}>
      {trail.map((props, index) => {
        const { id, name, date, blob, duration } = sortedItems[index];

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
    </animated.div>
  );
};

export default CardGrid;
