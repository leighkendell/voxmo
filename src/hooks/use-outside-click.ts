import React, { useEffect } from 'react';

type EventType = MouseEvent | TouchEvent;

const useOutsideClick: (
  ref: React.RefObject<HTMLElement>,
  handler: (event: EventType) => void
) => void = (ref: React.RefObject<HTMLElement>, handler: (event: EventType) => void) => {
  useEffect(() => {
    const listener: (event: EventType) => void = (event: EventType) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOutsideClick;
