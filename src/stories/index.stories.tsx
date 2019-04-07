/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { themes } from '@storybook/theming';

import { storiesOf, addParameters, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, Layout } from '../components';

const LayoutDecorator = storyFn => <Layout>{storyFn()}</Layout>;
addDecorator(LayoutDecorator);

addParameters({ options: { theme: themes.dark } });

storiesOf('Button', module).add('Default', () => <Button onClick={action}>New recording</Button>, {
  info: { inline: true },
});
