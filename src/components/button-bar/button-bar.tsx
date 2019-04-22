import React from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './button-bar.module.scss';

const ButtonBar: React.FC = ({ children }) => {
  const spring = useSpring({
    from: {
      transform: 'translateY(100%)',
    },
    transform: 'translateY(0)',
  });

  return (
    <animated.div className={styles.bar} style={spring}>
      {children}
    </animated.div>
  );
};

export default ButtonBar;
