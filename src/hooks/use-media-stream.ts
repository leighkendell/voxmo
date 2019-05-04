import { useEffect, useState } from 'react';

const useMediaStream: (
  onError?: () => void
) => MediaStream | null = onError => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let audio: MediaStream | null;

    // Set up the media stream
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(mediaStream => {
        audio = mediaStream;
        setStream(audio);
      })
      .catch(() => {
        audio = null;
        if (onError) {
          onError();
        }
      });

    // Stop the media stream
    return () => {
      if (audio) {
        audio.getAudioTracks().forEach(track => track.stop());
      }
    };
  }, [onError]);

  return stream;
};

export default useMediaStream;
