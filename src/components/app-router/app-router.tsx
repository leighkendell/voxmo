import React from 'react';
import { Router, WindowLocation } from '@reach/router';
import { useTransition, animated } from 'react-spring';
import styles from './app-router.module.scss';

interface AppRouterProps {
  location: WindowLocation | undefined;
}

// TODO: Work out correct typings
const AppRouter: React.FC<any> = ({ children, location }): any => {
  const transitions = useTransition(location, loc => loc.key, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props} className={styles.wrapper}>
      <Router location={item}>{children}</Router>
    </animated.div>
  ));
};

export default AppRouter;
