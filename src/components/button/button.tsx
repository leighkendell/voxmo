import React from 'react';
import styles from './button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<Props> = ({ children }) => (
  <button type="button" className={styles.button}>
    {children}
  </button>
);

export default Button;
