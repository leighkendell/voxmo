import React from 'react';
import { Location, Router } from '@reach/router';
import { useTransition, animated } from 'react-spring';
import styles from './app-router.module.scss';

// TODO: Work out correct typings
const AnimatedRouter: any = ({ location, children }: any) => {
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
    <animated.main key={key} style={props} className={styles.wrapper}>
      <Router location={item}>{children}</Router>
    </animated.main>
  ));
};

const AppRouter: React.FC = ({ children }) => (
  <Location>
    {({ location }) => (
      <AnimatedRouter location={location}>{children}</AnimatedRouter>
    )}
  </Location>
);

export default AppRouter;
