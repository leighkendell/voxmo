import React from 'react';
import styles from './kebab-menu.module.scss';

interface Props {
  keyup?: () => void;
  onClick?: () => void;
}

const KebabMenuItem: React.FC<Props> = ({ children, keyup, onClick }) => (
  <li
    className={styles.menuItem}
    role="menuitem"
    tabIndex={-1}
    onKeyUp={keyup}
    onClick={onClick}
  >
    {children}
  </li>
);

export default KebabMenuItem;
