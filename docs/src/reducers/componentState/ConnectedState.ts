import { IDocument } from '../../Types';
import ConnectedExampleFirst from '../../examples/ConnectedExample/ConnectedExampleFirst';

const ConnectedExampleCodeFirst = require('!raw-loader!../../examples/ConnectedExample/ConnectedExampleFirst') as string;

const ConnectedState: IDocument = {
  id: 'connected',
  heading: 'Connected Component',
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
};

export default ConnectedState;
