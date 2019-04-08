import React from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
}

const Button: React.FC<Props> = ({ children, secondary }) => {
  const className = classNames(styles.button, {
    [styles.secondary]: secondary,
  });

  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
};

export default Button;
