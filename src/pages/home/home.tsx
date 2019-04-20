import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Header, ButtonBar, Button } from '../../components';

const Home: React.FC<RouteComponentProps> = () => (
  <>
    <Header>Recordings</Header>
    <ButtonBar>
      <Button link="/record">New Recording</Button>
    </ButtonBar>
  </>
);

export default Home;
