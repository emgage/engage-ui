import { IDocument } from '../../Types';
import CheckBoxExampleFirst from '../../examples/CheckBoxExample/CheckBoxExampleFirst';
import CheckBoxExampleSecond from '../../examples/CheckBoxExample/CheckBoxExampleSecond';
import CheckBoxExampleThird from '../../examples/CheckBoxExample/CheckBoxExampleThird';
import CheckBoxExampleFourth from '../../examples/CheckBoxExample/CheckBoxExampleFourth';
import CheckBoxExampleFifth from '../../examples/CheckBoxExample/CheckBoxExampleFifth';

const CheckboxExampleCodeFirst = require('!raw-loader!../../examples/CheckBoxExample/CheckBoxExampleFirst') as string;
const CheckboxExampleCodeSecond = require('!raw-loader!../../examples/CheckBoxExample/CheckBoxExampleSecond') as string;
const CheckboxExampleCodeThird = require('!raw-loader!../../examples/CheckBoxExample/CheckBoxExampleThird') as string;
const CheckboxExampleCodeFourth = require('!raw-loader!../../examples/CheckBoxExample/CheckBoxExampleFourth') as string;
const CheckboxExampleCodeFifth = require('!raw-loader!../../examples/CheckBoxExample/CheckBoxExampleFifth') as string;

const CheckboxState: IDocument = {
  id: 'checkbox',
  heading: 'Checkbox',
  subheading: `Checkboxes are most commonly used to give a way to make a range of selections. Selection can be zero, one or multiple.`,
  property: [
    {
      name: 'label',
      type: 'string',
      desc: 'Label for the checkbox',
    }, {
      name: 'labelHidden',
      type: 'boolean',
      desc: 'Visually hide the label',
    }, {
      name: 'checked',
      type: 'boolean',
      desc: 'Checkbox is selected or not',
    }, {
      name: 'helpText',
      type: 'React.ReactNode',
      desc: 'Additional text to aide in use',
    }, {
      name: 'id',
      type: 'string',
      desc: 'ID for form input',
    }, {
      name: 'name',
      type: 'string',
      desc: 'Name for form input',
    }, {
      name: 'value',
      type: 'string',
      desc: 'Value for form input',
    }, {
      name: 'error',
      type: 'Error',
      desc: 'Display an error state',
    }, {
      name: 'disabled',
      type: 'boolean',
      desc: 'Disabled checkbox name',
    }, {
      name: 'onChange',
      type: 'function()',
      desc: 'Callback when checkbox is toggled',
    }, {
      name: 'onFocus',
      type: 'function()',
      desc: 'Callback when checkbox is focussed',
    }, {
      name: 'onBlur',
      type: 'function()',
      desc: 'Callback when focus is removed',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: CheckboxExampleCodeFirst,
  exampleComponent: CheckBoxExampleFirst,
  exampleCodeHeader: '1. Default Checkbox:',
  exampleCodeDescription: 'Use in forms to toggle the state of something on or off.',
  exampleCode1: CheckboxExampleCodeSecond,
  exampleComponent1: CheckBoxExampleSecond,
  exampleCodeHeader1: '2. Checked Checkbox:',
  exampleCodeDescription1: 'Use when state of Checkbox should be true by default.',
  exampleCode2: CheckboxExampleCodeThird,
  exampleComponent2: CheckBoxExampleThird,
  exampleCodeHeader2: '3. Disabled Checkbox:',
  exampleCodeDescription2: 'Use for actions that aren’t currently available.',
  exampleCode3: CheckboxExampleCodeFourth,
  exampleComponent3: CheckBoxExampleFourth,
  exampleCodeHeader3: '4. Checkbox with HelpText:',
  exampleCodeDescription3: 'Use to show some help description with the checkbox.',
  exampleCode4: CheckboxExampleCodeFifth,
  exampleComponent4: CheckBoxExampleFifth,
  exampleCodeHeader4: '5. Checkbox with Error:',
  exampleCodeDescription4: 'Use to show some error with the checkbox.',
};

export default CheckboxState;
