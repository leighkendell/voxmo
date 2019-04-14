import nanoid from 'nanoid';
import { useEffect, useState } from 'react';

const useUuid: () => string = () => {
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    setUuid(nanoid());
  }, []);

  return uuid;
};

export default useUuid;
