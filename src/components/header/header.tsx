import React from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './header.module.scss';

const Header: React.FC = ({ children }) => {
  const spring = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(-100%)',
    },
    opacity: 1,
    transform: 'translateY(0)',
  });

  return (
    <animated.header style={spring} className={styles.header} role="banner">
      <h1 className={styles.text}>{children}</h1>
    </animated.header>
  );
};

export default Header;
