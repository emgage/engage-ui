import { IDocument } from '../../Types';
import ChoiceExampleFirst from '../../examples/ChoiceExample/ChoiceExampleFirst';
import ChoiceExampleSecond from '../../examples/ChoiceExample/ChoiceExampleSecond';
import ChoiceExampleThird from '../../examples/ChoiceExample/ChoiceExampleThird';

const ChoiceExampleFirstCode = require('!raw-loader!../../examples/ChoiceExample/ChoiceExampleFirst') as string;
const ChoiceExampleSecondCode = require('!raw-loader!../../examples/ChoiceExample/ChoiceExampleSecond') as string;
const ChoiceExampleThirdCode = require('!raw-loader!../../examples/ChoiceExample/ChoiceExampleThird') as string;

const ChoiceState: IDocument = {
  id: 'choice',
  heading: 'Choice',
  subheading: `Choice component is used to provide selection for RadioButton, Checkbox and Choicelist components.`,
  property: [
    {
      name: 'componentId',
      type: 'string',
      desc: 'Set id of Choice component.',
    }, {
      name: 'label',
      type: 'string',
      desc: 'Set label text.',
    }, {
      name: 'error',
      type: 'Error (boolean | string)',
      desc: 'To give error as boolean or string.',
    }, {
      name: 'labelHidden',
      type: 'boolean',
      desc: 'Display label or not.',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'To provide child text.',
    }, {
      name: 'helpText',
      type: 'React.ReactNode',
      desc: 'Text to understand in detail.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: ChoiceExampleFirstCode,
  exampleComponent: ChoiceExampleFirst,
  exampleCodeHeader: '1. Default Choice:',
  exampleCodeDescription: 'Use to show text choice.',
  exampleCode1: ChoiceExampleSecondCode,
  exampleComponent1: ChoiceExampleSecond,
  exampleCodeHeader1: '2. Choice with Error:',
  exampleCodeDescription1: 'Use to let user know that there is some error with the choice.',
  exampleCode2: ChoiceExampleThirdCode,
  exampleComponent2: ChoiceExampleThird,
  exampleCodeHeader2: '3. Choice with Helptext:',
  exampleCodeDescription2: 'Use to show some description with the choice so user can understand it.',
};

export default ChoiceState;
