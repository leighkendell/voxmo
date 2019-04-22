import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './input.module.scss';
import { useUuid } from '../../hooks';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ label, onChange, ...props }) => {
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
        ref={inputRef}
        onChange={handleChange}
        {...props}
      />
      <label htmlFor={inputID} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Input;
