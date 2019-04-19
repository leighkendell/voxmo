/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { themes } from '@storybook/theming';

import { storiesOf, addParameters } from '@storybook/react';
import {
  Button,
  Layout,
  CircleButton,
  SummaryCard,
  KebabMenu,
  KebabMenuItem,
  ProgressBar,
  Pattern,
  ButtonBar,
  Header,
  Input,
} from '../components';

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

storiesOf('Summary Card', module)
  .add('Kebab Menu', () => (
    <div style={{ padding: '20px 200px' }}>
      <KebabMenu>
        <KebabMenuItem>Hello</KebabMenuItem>
        <KebabMenuItem>People</KebabMenuItem>
      </KebabMenu>
    </div>
  ))
  .add('Progress Bar', () => (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <ProgressBar value={65} />
    </div>
  ))
  .add('Card', () => (
    <div style={spacer}>
      <SummaryCard
        title="Dino roar"
        date="10 September, 2018"
        audio="https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3"
      />
      <SummaryCard
        title="My cool recording"
        date="10 September, 2018"
        audio="https://doc-0c-6c-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/ba2n43tdgk4c47o38eaqtui6bno64u44/1555250400000/16178610560955219818/*/1avt9FBdAM51yKKX6IXActgpsTSio1Eli"
      />
    </div>
  ));

storiesOf('Pattern', module)
  .add('Header', () => (
    <div style={{ padding: '20px' }}>
      <Pattern />
    </div>
  ))
  .add('Circle', () => (
    <div style={{ padding: '20px' }}>
      <Pattern transform />
    </div>
  ));

storiesOf('Button Bar', module)
  .add('Default', () => <ButtonBar />)
  .add('With Buttons', () => (
    <ButtonBar>
      <Button secondary>Cancel</Button>
      <Button>Done</Button>
    </ButtonBar>
  ));

storiesOf('Header', module)
  .add('Default', () => <Header>Recordings</Header>)
  .add('With Pattern', () => (
    <>
      <Pattern />
      <Header>Recordings</Header>
    </>
  ));

storiesOf('Forms', module).add('Input', () => (
  <Input label="Recording name" type="text" required />
));
