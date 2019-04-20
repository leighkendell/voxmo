import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import nanoid from 'nanoid';
import { Recording } from '../../interfaces';

interface AppContext {
  recordings: Recording[];
  addRecording?: (blob: Blob) => Promise<Recording>;
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
    // Setup new recording object
    const newRecording: Recording = {
      id: nanoid(),
      name: 'New recording',
      date: new Date().toJSON(),
      blob,
    };
    const { id, name, date } = newRecording;

    // Update state
    await localforage.setItem(id, { name, date, blob });
    setRecordings([newRecording, ...recordings]);

    // Return the new recording
    return newRecording;
  };

  const data: AppContext = {
    recordings,
    addRecording,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default AppState;
