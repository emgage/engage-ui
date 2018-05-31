import { IDocument } from '../../Types';
import TextFieldExample from '../../examples/TextFieldExample/TextFieldExample';
import TextFieldExample1 from '../../examples/TextFieldExample/TextFieldExample1';
import TextFieldExample2 from '../../examples/TextFieldExample/TextFieldExample2';
import TextFieldExample3 from '../../examples/TextFieldExample/TextFieldExample3';
import TextFieldExample4 from '../../examples/TextFieldExample/TextFieldExample4';
import TextFieldExample5 from '../../examples/TextFieldExample/TextFieldExample5';
import TextFieldExample6 from '../../examples/TextFieldExample/TextFieldExample6';
import TextFieldExample7 from '../../examples/TextFieldExample/TextFieldExample7';
import TextFieldExample8 from '../../examples/TextFieldExample/TextFieldExample8';
import TextFieldExample9 from '../../examples/TextFieldExample/TextFieldExample9';

const TextFieldExampleCode = require('!raw-loader!../../examples/TextFieldExample/TextFieldExample') as string;
const TextFieldExample1Code = require('!raw-loader!../../examples/TextFieldExample/TextFieldExample1') as string;
const TextFieldExample2Code = require('!raw-loader!../../examples/TextFieldExample/TextFieldExample2') as string;
const TextFieldExample3Code = require('!raw-loader!../../examples/TextFieldExample/TextFieldExample3') as string;
const TextFieldExample4Code = require('!raw-loader!../../examples/TextFieldExample/TextFieldExample4') as string;
const TextFieldExample5Code = require('!raw-loader!../../examples/TextFieldExample/TextFieldExample5') as string;
const TextFieldExample6Code = require('!raw-loader!../../examples/TextFieldExample/TextFieldExample6') as string;
const TextFieldExample7Code = require('!raw-loader!../../examples/TextFieldExample/TextFieldExample7') as string;
const TextFieldExample8Code = require('!raw-loader!../../examples/TextFieldExample/TextFieldExample8') as string;
const TextFieldExample9Code = require('!raw-loader!../../examples/TextFieldExample/TextFieldExample9') as string;

const TextFieldState: IDocument = {
  id: 'TextField',
  heading: 'TextField',
  subheading: `A text field is an input field that a user can type into. It has a range of options and supports several text formats including numbers.`,
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
      name: 'customValue',
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
    }, {
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
    }, {
      name: 'readOnly',
      type: 'boolean',
      desc: 'Disable editing of the input.',
    }, {
      name: 'autoFocus',
      type: 'boolean',
      desc: 'Automatically focus the input.',
    }, {
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
    }, {
      name: 'connectedLeft',
      type: 'React.ReactNode',
      desc: 'An element connected to the left of the input',
    }, {
      name: 'customType',
      type: 'enum',
      desc: 'Determine type of input. Available options: text | email | number | password | search | tel | url | date | datetime-local | month | time | week',
    }, {
      name: 'customName',
      type: 'string',
      desc: 'Name of the input.',
    }, {
      name: 'customId',
      type: 'string',
      desc: 'ID for the input.',
    }, {
      name: 'step',
      type: 'number',
      desc: 'Limit increment value for numeric and date-time inputs.',
    }, {
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
    }, {
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
    }, {
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
      name: 'customStyle',
      type: 'React.CSSProperties',
      desc: 'To provide styling.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    }, {
      name: 'onChange',
      type: 'function(value: string)',
      desc: 'Callback when value is changed.',
    }, {
      name: 'onFocus',
      type: 'function(e?: any)',
      desc: 'Callback when input is focused.',
    }, {
      name: 'onBlur',
      type: 'function(e?: any)',
      desc: 'Callback when focus is removed	.',
    },
  ],
  exampleCodeHeader: 'Example 1: Default TextField',
  exampleCodeDescription: 'Use to allow users to provide text input when the expected input is short. For longer input, use the auto grow or multiline options.',
  exampleCode: TextFieldExampleCode,
  exampleComponent: TextFieldExample,
  exampleCodeHeader1: 'Example 2: Number Field with value prop',
  exampleCodeDescription1: 'Use when input text should be a number.',
  exampleCode1: TextFieldExample1Code,
  exampleComponent1: TextFieldExample1,
  exampleCodeHeader2: 'Example 3: Multiline TextField:',
  exampleCodeDescription2: 'Use when the expected input could be more than one line. The field will automatically grow to accommodate additional text.',
  exampleCode2: TextFieldExample2Code,
  exampleComponent2: TextFieldExample2,
  exampleCodeHeader3: 'Example 4: TextField with Hidden Label',
  exampleCodeDescription3: 'Use to visually hide the label when the text field’s purpose is clear from context. The label will remain available to screen readers. Use this option with care. In almost all cases, show the label.',
  exampleCode3: TextFieldExample3Code,
  exampleComponent3: TextFieldExample3,
  exampleCodeHeader4: 'Example 5: TextField with Label Action',
  exampleCodeDescription4: 'Use when an optional, secondary action is closely associated with a text field. For example, on a field for entering a customs tariff code, a label action might be to look up the appropriate code from a table.',
  exampleCode4: TextFieldExample4Code,
  exampleComponent4: TextFieldExample4,
  exampleCodeHeader5: 'Example 6: TextField with placeholder text',
  exampleCodeDescription5: 'Use to provide a short, non-essential hint about the expected input. Placeholder text is low-contrast, so don’t rely on it for important information.',
  exampleCode5: TextFieldExample5Code,
  exampleComponent5: TextFieldExample5,
  exampleCodeHeader6: 'Example 7: TextField with Help Text',
  exampleCodeDescription6: 'Use to show short instructional content below the text field. Use especially when incorrect formatting will result in an error and the merchant doesn’t know what format is required (e.g. to explain the correct format for dates, or requirements for a password).',
  exampleCode6: TextFieldExample6Code,
  exampleComponent6: TextFieldExample6,
  exampleCodeHeader7: 'Example 8: TextField with prefix or Suffix',
  exampleCodeDescription7: 'Use as a special form of help text that works best inline. Use a prefix for things like currency symbols (e.g. “$”, “¥”, “£”). Use suffix for things like units of measure (e.g. “in”, “cm”).',
  exampleCode7: TextFieldExample7Code,
  exampleComponent7: TextFieldExample7,
  exampleCodeHeader8: 'Example 9: TextField with connected Fields',
  exampleCodeDescription8: 'Use when a text field and several related fields make up a logical unit. If inputting weight as a number and a separate unit of measurement, use a text field with a <select dropdown menu> (e.g. “kg”, “lb”) as a connected field.',
  exampleCode8: TextFieldExample8Code,
  exampleComponent8: TextFieldExample8,
  exampleCodeHeader9: 'Example 10: TextField with Validation Error',
  exampleCodeDescription9: 'Use to let users know if their input is valid or if there’s an error. Whenever possible, validate input as soon as a user has finished interacting with a field (but not before). If a field already has an error, validate and remove errors as the user types so they can immediately see when an error has been fixed.',
  exampleCode9: TextFieldExample9Code,
  exampleComponent9: TextFieldExample9,
};

export default TextFieldState;
