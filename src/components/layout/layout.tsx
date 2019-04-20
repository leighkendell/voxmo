import React from 'react';
import './layout.scss';
import { Pattern } from '..';
import { WindowLocation } from '@reach/router';

interface Props {
  location?: WindowLocation | undefined;
}

const Layout: React.FC<Props> = ({ children, location }) => {
  const patternAnimated = location && location.pathname !== '/';

  return (
    <>
      <Pattern transform={patternAnimated} />
      {children}
    </>
  );
};

export default Layout;
