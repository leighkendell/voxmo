import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './input.module.scss';
import { useUuid } from '../../hooks';

interface Props {
  label: string;
  type: string;
  required: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ label, type, required, onChange }) => {
  const inputID = useUuid();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = event => {
    if (inputRef.current && inputRef.current.value.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }

    if (onChange) {
      onChange(event);
    }
  };

  const inputClasses = classNames(styles.input, {
    [styles.empty]: isEmpty,
  });

  return (
    <div className={styles.wrapper}>
      <input
        id={inputID}
        className={inputClasses}
        type={type}
        required={required}
        ref={inputRef}
        onChange={handleChange}
      />
      <label htmlFor={inputID} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Input;
