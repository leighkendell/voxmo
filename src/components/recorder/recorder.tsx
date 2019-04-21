import React, { useEffect, useContext } from 'react';
import { AppContext } from '..';

interface Props {
  stream: MediaStream;
  isRecording: boolean;
}

// Required as there's no typings for MediaRecorder
declare const MediaRecorder: any;

// Globals
let blobs: Blob[];
let mediaRecorder: any;

const Recorder: React.FC<Props> = ({ stream, isRecording }) => {
  const { addRecording } = useContext(AppContext);

  // Start recording
  const start: () => void = () => {
    if (mediaRecorder.state === 'inactive') {
      mediaRecorder.start(1000);
    }
  };

  // Stop recording
  const stop: () => void = () => {
    if (mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  };

  // Destroy MediaRecorder instance
  const destroy: () => void = () => {
    mediaRecorder.ondataavailable = null;
    mediaRecorder.onstop = null;
    stop();
  };

  // Initial setup
  useEffect(() => {
    blobs = [];
    mediaRecorder = new MediaRecorder(stream);

    // Add to the blobs array when new data becomes available
    mediaRecorder.ondataavailable = (blobEvent: any) => {
      blobs.push(blobEvent.data);
    };

    // Save recorded blobs to state when recording stops
    mediaRecorder.onstop = (event: Event) => {
      const blob = new Blob(blobs, { type: 'audio/ogg; codecs=opus' });

      // Add new recording
      if (addRecording) {
        addRecording(blob).then(recording => {
          // Navigate to save page
          console.log('time to nav');
        });
      }
    };

    if (isRecording) {
      start();
    }

    return () => {
      destroy();
    };
  }, []);

  // Toggle start/stop based on props
  useEffect(() => {
    if (isRecording) {
      start();
    } else {
      stop();
    }
  }, [isRecording]);

  return <></>;
};

export default Recorder;
