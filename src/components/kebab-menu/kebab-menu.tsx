import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import classNames from 'classnames';
import styles from './kebab-menu.module.scss';
import { ReactComponent as KebabIcon } from '../../images/kebab-toggle.svg';
import { useUuid } from '../../hooks';

const KebabMenu: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonId = useUuid();
  const menuId = useUuid();

  const toggleOpen: () => void = () => {
    setIsOpen(!isOpen);
  };

  const spring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translate3d(0px, 0px, 0px)' : 'translate3d(0px, 5px, 0px)',
    pointerEvents: isOpen ? 'auto' : 'none',
  });

  const buttonClasses = classNames(styles.button, {
    [styles.active]: isOpen,
  });

  return (
    <div className={styles.wrapper}>
      <button
        id={buttonId}
        className={buttonClasses}
        type="button"
        aria-label="More options"
        aria-haspopup="true"
        aria-controls={menuId}
        aria-expanded={isOpen}
        onClick={toggleOpen}
      >
        <KebabIcon className={styles.icon} role="img" />
      </button>
      {children && (
        <animated.ul
          id={menuId}
          className={styles.menu}
          role="menu"
          aria-labelledby={buttonId}
          style={spring}
        >
          {children}
        </animated.ul>
      )}
    </div>
  );
};

export default KebabMenu;
