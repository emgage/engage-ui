import { IDocument } from '../../Types';
import ChoiceExampleFirst from '../../examples/ChoiceExample/ChoiceExampleFirst';
import ChoiceExampleSecond from '../../examples/ChoiceExample/ChoiceExampleSecond';

const ChoiceExampleFirstCode = require('!raw-loader!../../examples/ChoiceExample/ChoiceExampleFirst') as string;
const ChoiceExampleSecondCode = require('!raw-loader!../../examples/ChoiceExample/ChoiceExampleSecond') as string;

const ChoiceState: IDocument = {
  id: 'choice',
  heading: 'Choice Component',
  subheading: `Choice component used to provide selection for RadioButton,Checkbox and Choicelist components.`,
  property: [
    {
      name: 'id',
      type: 'string',
      desc: 'Set id of Choice component.',
    }, {
      name: 'label',
      type: 'string',
      desc: 'Set label text.',
    }, {
      name: 'error',
      type: 'Error(boolean | string)',
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
      desc: 'Theme to be injected via css-themr..',
    },
  ],
  exampleCode: ChoiceExampleFirstCode,
  exampleComponent: ChoiceExampleFirst,
  exampleCodeExtra: ChoiceExampleSecondCode,
  exampleComponentExtra: ChoiceExampleSecond,
};

export default ChoiceState;
