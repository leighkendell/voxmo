import React from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './progress-bar.module.scss';

interface Props {
  value: number;
}

const ProgressBar: React.FC<Props> = ({ value }) => {
  const barSpring = useSpring({
    opacity: value ? 1 : 0,
  });

  const progressSpring = useSpring({
    from: {
      transform: 'scaleX(0)',
    },
    transform: `scaleX(${value / 100})`,
  });

  return (
    <animated.div className={styles.bar} style={barSpring}>
      <animated.div className={styles.progress} style={progressSpring} />
    </animated.div>
  );
};

export default ProgressBar;
