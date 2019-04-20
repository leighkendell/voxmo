import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Header, ButtonBar, Button, Recorder } from '../../components';
import { useMediaStream } from '../../hooks';

const Record: React.FC<RouteComponentProps> = () => {
  const stream = useMediaStream();
  const [recording, setRecording] = useState(true);

  const onDone: () => void = () => {
    setRecording(false);
  };

  return (
    <>
      <Header>New recording</Header>
      {stream && <Recorder stream={stream} recording={recording} />}
      <ButtonBar>
        <Button link="/" secondary>
          Cancel
        </Button>
        <Button onClick={onDone}>Done</Button>
      </ButtonBar>
    </>
  );
};

export default Record;
