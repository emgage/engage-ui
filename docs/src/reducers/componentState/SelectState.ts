import { IDocument } from '../../Types';
import SelectExample from '../../examples/SelectExample/SelectExample';
import SelectExample1 from '../../examples/SelectExample/SelectExample1';

const SelectExampleCode = require('!raw-loader!../../examples/SelectExample/SelectExample') as string;
const SelectExample1Code = require('!raw-loader!../../examples/SelectExample/SelectExample1') as string;

const SelectState: IDocument = {
  id: 'select',
  heading: 'Select',
  subheading: 'Select lets users choose one option from a list in a dropdown menu. It works well for lists of more than four choices when displaying them could clutter up the interface.',
  property: [
    {
      name: 'options',
      type: 'Option[ ]',
      desc: 'List of options to choose from',
    }, {
      name: 'groups',
      type: '(Group or Option)[ ]',
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
      name: 'componentId',
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
  exampleCodeHeader: 'Example 1: Default Select',
  exampleCodeDescription: 'Use when a user needs to choose one option from a list of four or more.',
  exampleCode: SelectExampleCode,
  exampleComponent: SelectExample,
  exampleCodeHeader1: 'Example 2: Disabled Select',
  exampleCodeDescription1: 'Use for selections that aren’t currently available. The surrounding interface should make it clear why the select box is disabled and how to activate it.',
  exampleCode1: SelectExample1Code,
  exampleComponent1: SelectExample1,
};

export default SelectState;
