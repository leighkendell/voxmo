import React from 'react';
import styles from './button-bar.module.scss';

const ButtonBar: React.FC = ({ children }) => (
  <div className={styles.bar}>{children}</div>
);

export default ButtonBar;
