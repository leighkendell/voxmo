import React from 'react';
import classNames from 'classnames';
import { Link } from '@reach/router';
import styles from './button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  link?: string;
}

const Button: React.FC<Props> = ({ children, secondary, link, ...props }) => {
  const className = classNames(styles.button, {
    [styles.secondary]: secondary,
  });

  if (link) {
    return (
      <Link to={link} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
