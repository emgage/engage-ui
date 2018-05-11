import { IDocument } from '../../Types';
import ValidatedRadioFieldExample from '../../examples/ValidatedRadioFieldExample/ValidatedRadioFieldExample';

const ValidatedRadioFieldExampleCode = require('!raw-loader!../../examples/ValidatedRadioFieldExample/ValidatedRadioFieldExample') as string;
const ValidatedRadioFieldState: IDocument = {
  id: 'validatedradiofield',
  heading: 'Validated Radio Field',
  subheading: `Use to let user know if their input is valid or if there’s an error.`,
  property: [
    {
      name: 'id',
      type: 'string',
      desc: 'Id of Validated RadioField.',
    }, {
      name: 'name',
      type: 'string',
      desc: 'Name displayed with RadioField.',
    }, {
      name: 'validateTrigger',
      type: '["onBlur" | "onChange"]',
      desc: 'Action to trigger validation rules.',
    }, {
      name: 'validateRules',
      type: '[ValidationRule]',
      desc: 'Validation rules for RadioField. Validation Rule : { required: boolean; message: string; } or { type: string; message: string; }.',
    },
  ],
  exampleCodeHeader: 'Example 1: Validate RadioField',
  exampleCodeDescription: 'Validate input as soon as user has finished interacting with a field (but not before)',
  exampleCode: ValidatedRadioFieldExampleCode,
  exampleComponent: ValidatedRadioFieldExample,
};

export default ValidatedRadioFieldState;