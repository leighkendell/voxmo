import React from 'react';
import { Location } from '@reach/router';
import { Layout, AppRouter } from './components';
import { Home, Record } from './pages';

const App: React.FC = () => {
  return (
    <Location>
      {({ location }) => (
        <Layout location={location}>
          <AppRouter location={location}>
            <Home path="/" />
            <Record path="record" />
          </AppRouter>
        </Layout>
      )}
    </Location>
  );
};

export default App;
