import { IDocument } from '../../Types';
import ValidatedTextFieldExample from '../../examples/ValidateTextFieldExample/ValidatedTextFieldExample';

const ValidatedTextFieldExampleCode = require('!raw-loader!../../examples/ValidateTextFieldExample/ValidatedTextFieldExample') as string;

const ValidatedTextFieldState: IDocument = {
  id: 'validatedtextfield',
  heading: 'Validated Text Field',
  subheading: `Use to let user know if their input is valid or if there’s an error.`,
  property: [
    {
      name: 'customId',
      type: 'string',
      desc: 'Id of Validated Textfield.',
    }, {
      name: 'customName',
      type: 'string',
      desc: 'Name displayed with TextField.',
    }, {
      name: 'validateTrigger',
      type: '["onBlur" | "onChange"]',
      desc: 'Action to trigger validation rules.',
    }, {
      name: 'validateRules',
      type: '[ValidationRule]',
      desc: ' Validation rules for textfield. Validation Rule : { required: boolean; message: string; } or { type: string; message: string; }.',
    },
  ],
  exampleCodeHeader: 'Example 1: Validate TextField',
  exampleCodeDescription: 'Validate input as soon as user has finished interacting with a field (but not before)',
  exampleCode: ValidatedTextFieldExampleCode,
  exampleComponent: ValidatedTextFieldExample,
};

export default ValidatedTextFieldState;
