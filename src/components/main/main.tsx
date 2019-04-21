import React from 'react';
import styles from './main.module.scss';

const Main: React.FC = ({ children }) => (
  <main className={styles.main}>{children}</main>
);

export default Main;
