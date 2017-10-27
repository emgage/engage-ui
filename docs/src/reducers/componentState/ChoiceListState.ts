import { IDocument } from '../../Types';
import ChoiceListExample from '../../examples/ChoiceListExample/ChoiceListExample';
import ChoiceListExample1 from '../../examples/ChoiceListExample/ChoiceListExample1';

const ChoiceListExampleCode = require('!raw-loader!../../examples/ChoiceListExample/ChoiceListExample') as string;
const ChoiceListExample1Code = require('!raw-loader!../../examples/ChoiceListExample/ChoiceListExample1') as string;

const choiceListState: IDocument = {
  id: 'choicelist',
  heading: 'Choice List Component',
  subheading: `A choice list lets you create a list of grouped radio buttons or checkboxes.
               Use this component if you need to group together a related list of interactive choices.`,
  property: [
    {
      name: 'title',
      type: 'string',
      desc: 'Title of choice list.',
    }, {
      name: 'titleHidden',
      type: 'boolean',
      desc: 'Display title or not',
    }, {
      name: 'choices',
      type: 'Choice[]',
      desc: 'Array of choices to be displayed. Choice is object of { value: string, label: string }.',
    }, {
      name: 'selected',
      type: 'string[]',
      desc: 'Selected values',
    }, {
      name: 'name',
      type: 'string',
      desc: '',
    }, {
      name: 'allowMultiple',
      type: 'boolean',
      desc: 'Allow multiple selection',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    }, {
      name: 'onChange',
      type: '(selected: string[]): void',
      desc: 'Function to handle on change of choice list.',
    },
  ],
  exampleCodeHeader: 'Example 1: Radio Buttons',
  exampleCodeDescription: 'Choice list with single selection.',
  exampleCode: ChoiceListExampleCode,
  exampleComponent: ChoiceListExample,
  exampleCodeHeader1: 'Example 2: Checkboxes',
  exampleCodeDescription1: 'Choice list with multiple selection.',
  exampleCode1: ChoiceListExample1Code,
  exampleComponent1: ChoiceListExample1,
};

export default choiceListState;
