import { IDocument } from '../../Types';
import TextFieldExampleFirst from '../../examples/TextFieldExample/TextFieldExampleFirst';

const TextFieldExampleFirstCode = require('!raw-loader!../../examples/TextFieldExample/TextFieldExampleFirst') as string;

const TextFieldState: IDocument = {
  id: 'TextField',
  heading: 'TextField Component',
  subheading: `A text field is an input field that a merchant can type into. It has a range of options and supports several text formats including numbers.`,
  property: [
    {
      name: 'prefix',
      type: 'React.ReactNode',
      desc: 'Text to display before value.',
    }, {
      name: 'suffix',
      type: 'React.ReactNode',
      desc: 'Text to display after value.',
    }, {
      name: 'placeholder',
      type: 'string',
      desc: 'Hint text to display.',
    }, {
      name: 'value',
      type: 'string',
      desc: 'Initial value for the input.',
    }, {
      name: 'helpText',
      type: 'React.ReactNode',
      desc: 'Additional hint text to display.',
    }, {
      name: 'enableTextCouter',
      type: 'boolean',
      desc: 'display the TextCounter.',
    }, {
      name: 'label',
      type: 'string',
      desc: 'Label for the input.',
    },{
      name: 'labelAction',
      type: 'Action',
      desc: 'Adds an action to the label.',
    }, {
      name: 'labelHidden',
      type: 'boolean',
      desc: '	Visually hide the label.',
    }, {
      name: 'disabled',
      type: 'boolean',
      desc: 'Disable the input.',
    },{
      name: 'readOnly',
      type: 'boolean',
      desc: 'Disable editing of the input.',
    }, {
      name: 'autoFocus',
      type: 'boolean',
      desc: 'Automatically focus the input.',
    },{
      name: 'multiline',
      type: 'boolean | number',
      desc: 'Allow for multiple lines of input.',
    }, {
      name: 'errors',
      type: '[string]',
      desc: 'Error to display beneath the label.',
    }, {
      name: 'connectedRight',
      type: 'React.ReactNode',
      desc: 'An element connected to the right of the input.',
    },{
      name: 'connectedLeft',
      type: 'React.ReactNode',
      desc: 'An element connected to the left of the input',
    }, {
      name: 'type',
      type: 'Type',
      desc: 'Determine type of input',
    }, {
      name: 'name',
      type: 'string',
      desc: 'Name of the input.',
    },{
      name: 'id',
      type: 'string',
      desc: 'ID for the input.',
    }, {
      name: 'step',
      type: 'number',
      desc: 'Limit increment value for numeric and date-time inputs.',
    },{
      name: 'autoComplete',
      type: 'boolean',
      desc: 'Enable automatic completion by the browser.',
    }, {
      name: 'max',
      type: 'number',
      desc: 'Maximum value for a numeric or date-time input.',
    }, {
      name: 'maxLength',
      type: 'number',
      desc: 'Maximum character length for an input.',
    },{
      name: 'min',
      type: 'number',
      desc: 'Minimum value for a numeric or date-time input.',
    }, {
      name: 'minLength',
      type: 'number',
      desc: 'Minimum character length for an input.',
    }, {
      name: 'pattern',
      type: 'string',
      desc: 'A regular expression to check the value against.',
    },{
      name: 'required',
      type: 'boolean',
      desc: 'To make it required or not.',
    }, {
      name: 'spellCheck',
      type: 'boolean',
      desc: 'Indicate whether value should have spelling checked.',
    }, {
      name: 'resizable',
      type: 'boolean',
      desc: 'To make it resizable or not.',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'To provide styling.',
    },{
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    }, {
      name: 'onChange',
      type: '(value: string): void',
      desc: 'Callback when value is changed.',
    },{
      name: 'onFocus',
      type: 'void',
      desc: 'Callback when input is focused.',
    }, {
      name: 'onBlur',
      type: '(e?: any): void',
      desc: 'Callback when focus is removed	.',
    },
  ],
  exampleCode: TextFieldExampleFirstCode,
  exampleComponent: TextFieldExampleFirst,
};

export default TextFieldState;
