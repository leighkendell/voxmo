import React from 'react';
import styles from './kebab-menu.module.scss';

interface Props {
  keyup?: () => void;
}

const KebabMenuItem: React.FC<Props> = ({ children, keyup }) => (
  <li className={styles.menuItem} role="menuitem" tabIndex={-1} onKeyUp={keyup}>
    {children}
  </li>
);

export default KebabMenuItem;
