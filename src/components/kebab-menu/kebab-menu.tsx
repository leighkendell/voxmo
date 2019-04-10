import React, { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import classNames from 'classnames';
import styles from './kebab-menu.module.scss';
import { ReactComponent as KebabIcon } from '../../images/kebab-toggle.svg';
import { useUuid } from '../../hooks';

const KebabMenu: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonId = useUuid();
  const menuId = useUuid();
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleOpen: () => void = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyup: (event: React.KeyboardEvent<HTMLButtonElement>) => void = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (isOpen && event.keyCode === 13 && menuRef.current) {
      menuRef.current.firstChild.focus();
    }
  };

  const handleChildKeyup: (event: React.KeyboardEvent<HTMLLIElement>) => void = (
    event: React.KeyboardEvent<HTMLLIElement>
  ) => {
    const { previousSibling, nextSibling } = event.currentTarget;

    if (event.keyCode === 40 && nextSibling) {
      (nextSibling as HTMLLIElement).focus();
    }

    if (event.keyCode === 38 && previousSibling) {
      (previousSibling as HTMLLIElement).focus();
    }
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
        onKeyUp={handleKeyup}
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
          tabIndex={-1}
          ref={menuRef}
        >
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              keyup: handleChildKeyup,
            });
          })}
        </animated.ul>
      )}
    </div>
  );
};

export default KebabMenu;
