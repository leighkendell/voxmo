/* eslint-disable react/button-has-type */
import React from 'react';
import classNames from 'classnames';
import { Link } from '@reach/router';
import styles from './button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  link?: string;
}

const Button: React.FC<Props> = ({
  children,
  secondary,
  link,
  type,
  ...props
}) => {
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
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
