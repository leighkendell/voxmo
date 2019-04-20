import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Header, ButtonBar, Button, Recorder } from '../../components';
import { useMediaStream } from '../../hooks';

const Record: React.FC<RouteComponentProps> = () => {
  const stream = useMediaStream();
  const [isRecording, setIsRecording] = useState(true);

  const onDone: () => void = () => {
    setIsRecording(false);
  };

  return (
    <>
      <Header>New recording</Header>
      {stream && <Recorder stream={stream} isRecording={isRecording} />}
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
