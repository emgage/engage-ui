import { IDocument } from '../../Types';
import ConnectedExampleFirst from '../../examples/ConnectedExample/ConnectedExampleFirst';
import ConnectedExampleSecond from '../../examples/ConnectedExample/ConnectedExampleSecond';
import ConnectedExampleThird from '../../examples/ConnectedExample/ConnectedExampleThird';

const ConnectedExampleCodeFirst = require('!raw-loader!../../examples/ConnectedExample/ConnectedExampleFirst') as string;
const ConnectedExampleCodeSecond = require('!raw-loader!../../examples/ConnectedExample/ConnectedExampleSecond') as string;
const ConnectedExampleCodeThird = require('!raw-loader!../../examples/ConnectedExample/ConnectedExampleThird') as string;

const ConnectedState: IDocument = {
  id: 'connected',
  heading: 'Connected',
  subheading: `Connected component is used to display other component either right or left.`,

  property: [
    {
      name: 'left',
      type: 'React.ReactNode',
      desc: 'Align component to left',
    }, {
      name: 'right',
      type: 'React.ReactNode',
      desc: 'Align component to right',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'Display given text',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'Style to be injected via css',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: ConnectedExampleCodeFirst,
  exampleComponent: ConnectedExampleFirst,
  exampleCodeHeader: '1. Left Connected Component:',
  exampleCodeDescription: 'Use to connect a compoent left side of a component.',
  exampleCode1: ConnectedExampleCodeSecond,
  exampleComponent1: ConnectedExampleSecond,
  exampleCodeHeader1: '2. Right Connected Component:',
  exampleCodeDescription1: 'Use to connect a compoent right side of a component.',
  exampleCode2: ConnectedExampleCodeThird,
  exampleComponent2: ConnectedExampleThird,
  exampleCodeHeader2: '3. Left and Right Componet:',
  exampleCodeDescription2: 'Use to connect Two component one on left side and another on right side.',
};

export default ConnectedState;
