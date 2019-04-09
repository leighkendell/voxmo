import React from 'react';
import styles from './kebab-menu.module.scss';

const KebabMenuItem: React.FC = ({ children }) => (
  <li className={styles.menuItem} role="menuitem">
    {children}
  </li>
);

export default KebabMenuItem;
