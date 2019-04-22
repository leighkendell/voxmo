import React, { useContext, useState } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import {
  Header,
  Main,
  ButtonBar,
  Button,
  Input,
  AppContext,
} from '../../components';

interface Props extends RouteComponentProps {
  recordingId?: string;
}

const Save: React.FC<Props> = ({ recordingId }) => {
  const { updateRecordingName, deleteRecording } = useContext(AppContext);
  const [name, setName] = useState('');

  const onSave: () => void = async () => {
    if (updateRecordingName && recordingId) {
      await updateRecordingName(recordingId, name);
      navigate('/');
    }
  };

  const onDiscard: () => void = async () => {
    if (deleteRecording && recordingId) {
      await deleteRecording(recordingId);
      navigate('/');
    }
  };

  const handleNameChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = event => {
    setName(event.target.value);
  };

  return (
    <>
      <Header>Save recording</Header>
      <Main>
        <Input
          label="Recording name"
          type="text"
          value={name}
          required
          onChange={handleNameChange}
        />
      </Main>
      <ButtonBar>
        <Button secondary onClick={onDiscard}>
          Discard
        </Button>
        <Button onClick={onSave}>Save</Button>
      </ButtonBar>
    </>
  );
};

export default Save;
