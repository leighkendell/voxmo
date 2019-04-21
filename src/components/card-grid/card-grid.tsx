import React from 'react';
import { animated, useTrail, config } from 'react-spring';
import styles from './card-grid.module.scss';
import { Recording } from '../../interfaces';
import SummaryCard from '../summary-card/summary-card';

interface Props {
  items: Recording[];
}

const AnimatedCard = animated(SummaryCard);

const CardGrid: React.FC<Props> = ({ items }) => {
  const trail = useTrail(items.length, {
    from: { opacity: 0, transform: 'translateX(-40px)' },
    opacity: 1,
    transform: 'translateX(0)',
    config: config.gentle,
  });

  return (
    <div className={styles.grid}>
      {trail.map((props, index) => {
        const { id, name, date, blob } = items[index];

        return (
          <AnimatedCard
            key={id}
            title={name}
            date={date}
            audio={blob}
            style={props}
          />
        );
      })}
    </div>
  );
};

export default CardGrid;
