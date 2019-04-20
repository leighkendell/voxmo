import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Header, ButtonBar, Button } from '../../components';
import { useMediaStream } from '../../hooks';

const Record: React.FC<RouteComponentProps> = () => {
  const stream = useMediaStream();

  return (
    <>
      <Header>New recording</Header>
      <ButtonBar>
        <Button link="/" secondary>
          Cancel
        </Button>
        <Button>Done</Button>
      </ButtonBar>
    </>
  );
};

export default Record;
