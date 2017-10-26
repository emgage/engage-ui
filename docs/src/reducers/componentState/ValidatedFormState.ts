import { IDocument } from '../../Types';
import ValidatedFormExample from '../../examples/ValidatedFormExample/ValidatedFormExample';
import ValidatedFormMultipleValidationExample from '../../examples/ValidatedFormExample/ValidatedFormMultipleValidationExample';

const ValidatedFormExampleCode = require('!raw-loader!../../examples/ValidatedFormExample/ValidatedFormExample') as string;
const ValidatedFormMultipleValidationExampleCode = require('!raw-loader!../../examples/ValidatedFormExample/ValidatedFormMultipleValidationExample') as string;


const ValidatedFormState: IDocument = {
  id: 'validatedform',
  heading: 'Validate Form Component',
  subheading: `A validation form lets you vaidate the form controls.`,
  property: [
    {
      name: 'form{getFieldProps}',
      type: 'any',
      desc: 'Field properties of form.',
    },{
      name: 'form{getFieldError}',
      type: 'any',
      desc: 'Field error of form.',
    },{
      name: 'form{validateFieldsAndScroll}',
      type: 'any',
      desc: 'Validate fields and scroll of form.',
    },{
      name: 'onSubmit',
      type: 'function(values: [any]): void',
      desc: 'Function to handle on submit of validated form.',
    },{
      name: 'onSubmitError',
      type: 'function(values: [any], error: Error): void',
      desc: 'Function to handle errors on submit of validated form.',
    },
  ],
  exampleCode: ValidatedFormExampleCode,
  exampleComponent: ValidatedFormExample,
  exampleCodeExtra: ValidatedFormMultipleValidationExampleCode,
  exampleComponentExtra: ValidatedFormMultipleValidationExample,
};

export default ValidatedFormState;
