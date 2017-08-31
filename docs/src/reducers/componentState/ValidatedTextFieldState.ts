import { IDocument } from '../../Types';
import ValidatedTextFieldExampleFirst from '../../examples/ValidateTextFieldExample/ValidatedTextFieldExampleFirst';

const ValidatedTextFieldExampleFirstCode = require('!raw-loader!../../examples/ValidateTextFieldExample/ValidatedTextFieldExampleFirst') as string;

const ValidatedTextFieldState: IDocument = {
  id: 'validatedtextfield',
  heading: 'Validated Text Field Component',
  subheading: ``,
  property: [
    {
      name: 'id',
      type: 'string',
      desc: 'Id of Validated Textfield.',
    }, {
      name: 'name',
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
  exampleCode: ValidatedTextFieldExampleFirstCode,
  exampleComponent: ValidatedTextFieldExampleFirst,
};

export default ValidatedTextFieldState;
