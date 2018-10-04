import { IDocument } from '../../Types';
import ProcessExampleFirst from '../../examples/ProcessExample/ProcessExampleFirst';
import ProcessExampleSecond from '../../examples/ProcessExample/ProcessExampleSecond';

const ProcessExampleFirstCode = require('!raw-loader!../../examples/ProcessExample/ProcessExampleFirst') as string;
const ProcessExampleSecondCode = require('!raw-loader!../../examples/ProcessExample/ProcessExampleSecond') as string;

const ProcessState: IDocument = {
  id: 'Process',
  heading: 'Process',
  subheading: `The Process component you can use to communicate the Process of loaders, timers or whatever else you might need a Process indicator for.`,
  property: [
    {
      name: 'steps',
      type: 'Step[]',
      desc: 'JSON data source for to track process for.',
    }, {
      name: 'allowBackStepping',
      type: 'boolean',
      desc: 'Using this prop user can enable/disable backStepping to navingate through component process indicator',
    }, {
      name: 'componentStyle',
      type: 'React.CSSProperties',
      desc: 'To display the styling.',
    }, {
      name: 'componentClass',
      type: 'string',
      desc: 'To apply custom class to component.',
    },  {
      name: 'onClick',
      type: 'function ()',
      desc: 'Callback when process component is clicked.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: ProcessExampleFirstCode,
  exampleComponent: ProcessExampleFirst,
  exampleCodeHeader: '1. Basic Process:',
  exampleCodeDescription: 'Used most in the interface. It is with primary display style, JSON data source and no colored theme applied.',
  exampleCode1: ProcessExampleSecondCode,
  exampleComponent1: ProcessExampleSecond,
  exampleCodeHeader1: '2. Process with backStepping enable:',
  exampleCodeDescription1: 'User can navigate with backStepping enable through process indicator',
};

export default ProcessState;
