import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Header, Pattern } from '../../components';

const Home: React.FC<RouteComponentProps> = () => (
  <>
    <Pattern />
    <Header>Recordings</Header>
  </>
);

export default Home;
