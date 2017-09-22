import { IDocument } from '../../Types';
import RadioButtonExampleFirst from '../../examples/RadioButtonExample/RadioButtonExampleFirst';
import RadioButtonExampleSecond from '../../examples/RadioButtonExample/RadioButtonExampleSecond';

const RadioButtonExampleFirstCode = require('!raw-loader!../../examples/RadioButtonExample/RadioButtonExampleFirst') as string;
const RadioButtonExampleSecondCode = require('!raw-loader!../../examples/RadioButtonExample/RadioButtonExampleSecond') as string;

const RadioButtonState: IDocument = {
  id: 'radiobutton',
  heading: 'RadioButton Component',
  subheading: `Radio Buttons to present each item in a list of options where merchants must make a single selection. Radio buttons present multiple items and require merchants to pick only one thing from a list.`,
  property: [
    {
      name: 'label',
      type: 'string',
      desc: 'Label for the radio button.',
    }, {
      name: 'labelHidden',
      type: 'boolean',
      desc: 'Visually hide the label.',
    }, {
      name: 'helpText',
      type: 'React.ReactNode',
      desc: 'Additional text to aid in use.',
    }, {
      name: 'checked',
      type: 'boolean',
      desc: 'Radio button is selected.',
    }, {
      name: 'id',
      type: 'string',
      desc: 'ID for form input.',
    }, {
      name: 'name',
      type: 'string',
      desc: 'Name for form input.',
    }, {
      name: 'value',
      type: 'string',
      desc: 'Value for form input.',
    }, {
      name: 'disabled',
      type: 'boolean',
      desc: 'Set as disabled or not.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
    {
      name: 'onChange',
      type: 'function(newValue: boolean)',
      desc: 'Callback when the radio button is toggled.',
    },
    {
      name: 'onFocus',
      type: 'function()',
      desc: 'Callback when radio button is focussed.',
    },
    {
      name: 'onBlur',
      type: 'function()',
      desc: 'Callback when focus is removed.',
    },
  ],
  exampleCode: RadioButtonExampleFirstCode,
  exampleComponent: RadioButtonExampleFirst,
  exampleCodeExtra: RadioButtonExampleSecondCode,
  exampleComponentExtra: RadioButtonExampleSecond,
};

export default RadioButtonState;
