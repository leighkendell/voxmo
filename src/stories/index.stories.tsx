/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { themes } from '@storybook/theming';

import { storiesOf, addParameters } from '@storybook/react';
import { Button, Layout, CircleButton } from '../components';

addParameters({ options: { theme: themes.dark } });

const spacer = {
  display: 'grid',
  gridGap: '20px',
  gridAutoFlow: 'column',
};

storiesOf('Button', module)
  .add('Primary', () => <Button>New recording</Button>)
  .add('Secondary', () => <Button secondary>Cancel</Button>)
  .add('Circular', () => (
    <div style={spacer}>
      <CircleButton label="Play button" icon="play" />
      <CircleButton label="Play button" icon="stop" />
    </div>
  ))
  .add('Circular Secondary', () => (
    <div style={spacer}>
      <CircleButton label="Play button" icon="play" secondary />
      <CircleButton label="Play button" icon="stop" secondary />
    </div>
  ));
