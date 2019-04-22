import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import nanoid from 'nanoid';
import { Recording } from '../../interfaces';
import { getBlobDuration } from '../../utils';

interface AppContext {
  recordings: Recording[];
  addRecording?: (blob: Blob) => Promise<Recording>;
  updateRecordingName?: (
    recordingId: string,
    name: string
  ) => Promise<Recording | null>;
  deleteRecording?: (recordingId: string) => Promise<Recording[]>;
}

// Initial context value
const initialContext: AppContext = {
  recordings: [],
};

// Create app context with initial state value
export const AppContext = React.createContext<AppContext>(initialContext);

const AppState: React.FC = ({ children }) => {
  const [recordings, setRecordings] = useState<Recording[]>(
    initialContext.recordings
  );

  // Get existing recording from storage
  const getRecordings: () => void = () => {
    let existingRecordings: Recording[] = [];

    // Loop over storage and set initial state
    localforage
      .iterate((value: Recording, key: Recording['id']) => {
        existingRecordings = [...existingRecordings, { id: key, ...value }];
      })
      .then(() => {
        setRecordings(existingRecordings);
      })
      .catch(err => {
        // TODO: handle error
        console.log(err);
      });
  };

  // Localforage setup
  useEffect(() => {
    localforage.config({
      name: 'voxmo',
      storeName: 'recordings',
    });

    getRecordings();
  }, []);

  // Add a new recording
  const addRecording: AppContext['addRecording'] = async blob => {
    // Get the duration of the blob
    const duration = await getBlobDuration(blob);

    // Setup new recording object
    const newRecording: Recording = {
      id: nanoid(),
      name: 'New recording',
      date: new Date().toJSON(),
      blob,
      duration,
    };
    const { id, name, date } = newRecording;

    // Update state
    await localforage.setItem(id, { name, date, blob, duration });
    setRecordings([newRecording, ...recordings]);

    // Return the new recording
    return newRecording;
  };

  // Update the name of an existing recording
  const updateRecordingName: AppContext['updateRecordingName'] = async (
    recordingId,
    name
  ) => {
    // Existing recordings
    const existingRecordings = recordings.filter(
      item => item.id !== recordingId
    );

    // The recording we're updating
    const recording = recordings.find(item => item.id === recordingId);

    // Set the recording name and update state
    if (recording) {
      recording.name = name;
      const { id, ...forageProps } = recording;
      await localforage.removeItem(recordingId);
      await localforage.setItem(recordingId, forageProps);
      setRecordings([recording, ...existingRecordings]);
    }

    return recording || null;
  };

  // Delete an existing recording
  const deleteRecording: AppContext['deleteRecording'] = async recordingId => {
    // Get all the recordings minus the one we want to delte
    const updatedRecordings = recordings.filter(
      item => item.id !== recordingId
    );

    // Remove the recording we want to delete
    await localforage.removeItem(recordingId);

    // Update state
    setRecordings(updatedRecordings);

    return updatedRecordings;
  };

  const data: AppContext = {
    recordings,
    addRecording,
    updateRecordingName,
    deleteRecording,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default AppState;
