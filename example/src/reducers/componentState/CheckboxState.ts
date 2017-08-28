import { IDocument } from '../../Types';
import CheckboxExampleFirst from '../../examples/CheckboxExample/CheckboxExampleFirst';
import CheckboxExampleSecond from '../../examples/CheckboxExample/CheckboxExampleSecond';

const CheckboxExampleCodeFirst = require('!raw-loader!../../examples/CheckboxExample/CheckboxExampleFirst') as string;
const CheckboxExampleCodeSecond = require('!raw-loader!../../examples/CheckboxExample/CheckboxExampleSecond') as string;

const CheckboxState: IDocument = {
  id: 'checkbox',
  heading: 'Checkbox Component',
  subheading: `Checkboxes are most commonly used to give a way to make a range of selections.`,

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
    },{
      name: 'helpText',
      type: 'React.ReactNode',
      desc: 'Additional text to aide in use',
    },
    {
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
    },{
      name: 'error',
      type: 'Error',
      desc: 'Display an error state',
    },{
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
  exampleComponent: CheckboxExampleFirst,
  exampleCodeExtra: CheckboxExampleCodeSecond,
  exampleComponentExtra: CheckboxExampleSecond,
};

export default CheckboxState;
