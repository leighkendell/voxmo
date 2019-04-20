import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Header, ButtonBar, Button } from '../../components';

const Record: React.FC<RouteComponentProps> = () => (
  <>
    <Header>00:00:00</Header>
    <ButtonBar>
      <Button link="/" secondary>
        Cancel
      </Button>
      <Button>Done</Button>
    </ButtonBar>
  </>
);

export default Record;
