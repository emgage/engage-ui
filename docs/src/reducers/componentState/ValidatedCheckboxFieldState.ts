import { IDocument } from '../../Types';
import ValidatedCheckboxFieldExample from '../../examples/ValidatedCheckboxFieldExample/ValidatedCheckboxFieldExample';

const ValidatedCheckboxFieldExampleCode = require('!raw-loader!../../examples/ValidatedCheckboxFieldExample/ValidatedCheckboxFieldExample') as string;
const ValidatedCheckboxFieldState: IDocument = {
  id: 'validatedcheckboxfield',
  heading: 'Validated Checkbox Field',
  subheading: `Use to let user know if their input is valid or if there’s an error.`,
  property: [
    {
      name: 'id',
      type: 'string',
      desc: 'Id of Validated CheckboxField.',
    }, {
      name: 'name',
      type: 'string',
      desc: 'Name displayed with CheckboxField.',
    }, {
      name: 'validateTrigger',
      type: '["onBlur" | "onChange"]',
      desc: 'Action to trigger validation rules.',
    }, {
      name: 'validateRules',
      type: '[ValidationRule]',
      desc: 'Validation rules for CheckboxField. Validation Rule : { required: boolean; message: string; } or { type: string; message: string; }.',
    },
  ],
  exampleCodeHeader: 'Example 1: Validate CheckboxField',
  exampleCodeDescription: 'Validate input as soon as user has finished interacting with a field (but not before)',
  exampleCode: ValidatedCheckboxFieldExampleCode,
  exampleComponent: ValidatedCheckboxFieldExample,
};

export default ValidatedCheckboxFieldState;