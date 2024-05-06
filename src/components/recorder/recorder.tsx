import React, { useEffect, useContext, useMemo, useCallback } from 'react';
import { AppContext } from '..';
import { navigate } from '@reach/router';

interface Props {
  stream: MediaStream;
  isRecording: boolean;
}

// Required as there's no typings for MediaRecorder
declare const MediaRecorder: any;

// Globals
let blobs: Blob[];
// let mediaRecorder: any;

const Recorder: React.FC<Props> = ({ stream, isRecording }) => {
  const { addRecording } = useContext(AppContext);
  const mediaRecorder = useMemo(() => new MediaRecorder(stream), [stream]);

  // Start recording
  const start: () => void = useCallback(() => {
    if (mediaRecorder.state === 'inactive') {
      mediaRecorder.start();
    }
  }, [mediaRecorder]);

  // Stop recording
  const stop: () => void = useCallback(() => {
    if (mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  }, [mediaRecorder]);

  // Initial setup
  useEffect(() => {
    blobs = [];

    // Add to the blobs array when new data becomes available
    mediaRecorder.ondataavailable = (blobEvent: any) => {
      blobs.push(blobEvent.data);
    };

    // Save recorded blobs to state when recording stops
    mediaRecorder.onstop = (event: Event) => {
      const blob = new Blob(blobs, { type: mediaRecorder.mimeType });

      // Add new recording
      if (addRecording) {
        addRecording(blob).then(({ id }) => {
          // Navigate to save page
          navigate(`/save/${id}`);
        });
      }
    };

    return () => {
      // Destroy MediaRecorder instance
      mediaRecorder.ondataavailable = null;
      mediaRecorder.onstop = null;
      stop();
    };
  }, [addRecording, mediaRecorder, start, stop]);

  // Toggle start/stop based on props
  useEffect(() => {
    if (isRecording) {
      start();
    } else {
      stop();
    }
  }, [isRecording, start, stop]);

  return <></>;
};

export default Recorder;
