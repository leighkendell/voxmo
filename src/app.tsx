import React from 'react';
import { Location } from '@reach/router';
import { Layout, AppRouter, AppState } from './components';
import { Home, Record, Save } from './pages';

const App: React.FC = () => {
  return (
    <AppState>
      <Location>
        {({ location }) => (
          <Layout location={location}>
            <AppRouter location={location}>
              <Home path="/" />
              <Record path="record" />
              <Save path="save/:recordingId" />
            </AppRouter>
          </Layout>
        )}
      </Location>
    </AppState>
  );
};

export default App;
