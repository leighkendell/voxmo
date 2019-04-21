import React, { useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import {
  Header,
  ButtonBar,
  Button,
  AppContext,
  Main,
  CardGrid,
} from '../../components';

const Home: React.FC<RouteComponentProps> = () => {
  const { recordings } = useContext(AppContext);

  return (
    <>
      <Header>Recordings</Header>
      <Main>
        <CardGrid items={recordings} />
      </Main>
      <ButtonBar>
        <Button link="/record">New recording</Button>
      </ButtonBar>
    </>
  );
};

export default Home;
