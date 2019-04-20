import { useEffect, useState } from 'react';

const useMediaStream: (
  onError?: () => void
) => MediaStream | null = onError => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const getStream: () => void = async () => {
    try {
      const audio = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(audio);
    } catch {
      if (onError) {
        onError();
      }
    }
  };

  useEffect(() => {
    getStream();
  }, []);

  return stream;
};

export default useMediaStream;
