import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Header, ButtonBar, Button, Recorder, Main } from '../../components';
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
      <Main>
        {stream && <Recorder stream={stream} isRecording={isRecording} />}
      </Main>
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
