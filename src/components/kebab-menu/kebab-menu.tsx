import React, { useState } from 'react';
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

  return (
    <div className={styles.wrapper}>
      <button
        id={buttonId}
        className={styles.button}
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
        <ul id={menuId} className={styles.menu} role="menu" aria-labelledby={buttonId}>
          {children}
        </ul>
      )}
    </div>
  );
};

export default KebabMenu;
