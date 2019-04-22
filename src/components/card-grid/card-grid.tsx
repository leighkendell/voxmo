import React from 'react';
import { animated, useTrail, config, useSpring } from 'react-spring';
import styles from './card-grid.module.scss';
import { Recording } from '../../interfaces';
import SummaryCard from '../summary-card/summary-card';

interface Props {
  items: Recording[];
}

const AnimatedCard = animated(SummaryCard);

const CardGrid: React.FC<Props> = ({ items }) => {
  const spring = useSpring({
    from: { transform: 'translateX(-40px)' },
    transform: 'translateX(0)',
  });

  const trail = useTrail(items.length, {
    from: { opacity: 0 },
    opacity: 1,
    config: config.gentle,
  });

  return (
    <animated.div className={styles.grid} style={spring}>
      {trail.map((props, index) => {
        const { id, name, date, blob, duration } = items[index];

        return (
          <AnimatedCard
            key={id}
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
