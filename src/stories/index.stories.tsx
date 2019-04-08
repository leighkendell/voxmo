/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { themes } from '@storybook/theming';

import { storiesOf, addParameters } from '@storybook/react';
import { Button, Layout } from '../components';

addParameters({ options: { theme: themes.dark } });

storiesOf('Button', module)
  .add('Primary', () => <Button>New recording</Button>)
  .add('Secondary', () => <Button secondary>Cancel</Button>);
