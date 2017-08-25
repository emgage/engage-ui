import { IDocument } from '../../Types';
import SelectExampleFirst from '../../examples/SelectExample/SelectExampleFirst';
import SelectExampleSecond from '../../examples/SelectExample/SelectExampleSecond';

const SelectExampleFirstCode = require('!raw-loader!../../examples/SelectExample/SelectExampleFirst') as string;

const SelectState: IDocument = {
  id: 'select',
  heading: 'Select Component',
  subheading: `Form control for selecting a value from a set of options.`,
  property: [
    {
      name: 'options',
      type: 'Option[]',
      desc: 'List of options to choose from',
    }, {
      name: 'groups',
      type: 'Group or Option)[]',
      desc: 'List of option groups to choose from',
    }, {
      name: 'label',
      type: 'string',
      desc: 'Label for the Select',
    }, {
      name: 'labelAction',
      type: 'Action',
      desc: 'Adds an action to the label',
    }, {
      name: 'labelHidden',
      type: 'boolean',
      desc: 'Visually hide the label',
    }, {
      name: 'disabled',
      type: 'boolean',
      desc: 'Disable input',
    }, {
      name: 'helpText',
      type: 'string or React.ReactNode',
      desc: 'Additional text to aide in use',
    }, {
      name: 'placeholder',
      type: 'string',
      desc: 'Example text to display as placeholder',
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
      name: 'onChange',
      type: 'function()',
      desc: 'Callback when selection is changed',
    }, {
      name: 'onFocus',
      type: 'function()',
      desc: 'Callback when Select is focussed',
    }, {
      name: 'onBlur',
      type: 'function()',
      desc: 'Callback when focus is removed',
    },
  ],
  exampleCode: SelectExampleFirstCode,
  exampleComponent: SelectExampleFirst,
};

export default SelectState;
