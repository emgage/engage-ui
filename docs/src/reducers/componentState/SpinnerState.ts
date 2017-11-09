import { IDocument } from '../../Types';
import SpinnerExampleFirst from '../../examples/SpinnerExample/SpinnerExampleFirst';
import SpinnerExampleSecond from '../../examples/SpinnerExample/SpinnerExampleSecond';

const SpinnerExampleFirstCode = require('!raw-loader!../../examples/SpinnerExample/SpinnerExampleFirst') as string;
const SpinnerExampleSecondtCode = require('!raw-loader!../../examples/SpinnerExample/SpinnerExampleSecond') as string;

const SpinnerState: IDocument = {
  id: 'spinner',
  heading: 'Spinner',
  subheading: 'Spinners are used to notify users that their action is being processed.',
  property: [
    {
      name: 'size',
      type: 'Size',
      desc: 'Size of Spinner. It can be small or large',
    } , {
      name: 'color',
      type: 'Color',
      desc: 'Color of Spinner. It can be white, teal or inkLightest',
    } , {
      name: 'accessibilityLabel',
      type: 'string',
      desc: 'Visually hidden text for screen readers',
    } , {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    } , {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'Set the style via css',
    },
  ],
  exampleCode: SpinnerExampleFirstCode,
  exampleComponent: SpinnerExampleFirst,
  exampleCodeHeader: '1. Default Spinner:',
  exampleCodeDescription: 'Use to show Spinner with large size and teal color.',
  exampleCode1: SpinnerExampleSecondtCode,
  exampleComponent1: SpinnerExampleSecond,
  exampleCodeHeader1: '2. Small Spinner:',
  exampleCodeDescription1: 'Use to show Spinner with small size and inkLightest color.',
};

export default SpinnerState;
