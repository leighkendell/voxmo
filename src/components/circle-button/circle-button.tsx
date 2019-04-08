import React from 'react';
import classNames from 'classnames';
import styles from './circle-button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: 'play' | 'stop';
  secondary?: boolean;
}

const CircleButton: React.FC<Props> = ({ label, secondary, icon, ...props }) => {
  const className = classNames(styles.button, {
    [styles.secondary]: secondary,
    [styles.play]: icon === 'play',
    [styles.stop]: icon === 'stop',
  });
  return <button type="button" className={className} aria-label={label} {...props} />;
};

export default CircleButton;
