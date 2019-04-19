import React from 'react';
import { Layout, AppRouter } from './components';
import { Home } from './pages';

const App: React.FC = () => {
  return (
    <Layout>
      <AppRouter>
        <Home path="/" />
      </AppRouter>
    </Layout>
  );
};

export default App;
