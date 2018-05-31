import { IDocument } from '../../Types';
import ChoiceListExampleFirst from '../../examples/ChoiceListExample/ChoiceListExampleFirst';
import ChoiceListExampleSecond from '../../examples/ChoiceListExample/ChoiceListExampleSecond';

const ChoiceListExampleCodeFirst = require('!raw-loader!../../examples/ChoiceListExample/ChoiceListExampleFirst') as string;
const ChoiceListExampleCodeSecond = require('!raw-loader!../../examples/ChoiceListExample/ChoiceListExampleSecond') as string;

const choiceListState: IDocument = {
  id: 'choicelist',
  heading: 'Choice List',
  subheading: `A choice list lets you create a list of grouped radio buttons or checkboxes.
               Use this component if you need to group together a related list of interactive choices.`,
  property: [
    {
      name: 'customTitle',
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
      name: 'customName',
      type: 'string',
      desc: 'Name of the chicelist',
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
  exampleCodeHeader: '1: Radio Buttons:',
  exampleCodeDescription: 'Use when you need user to make a single selection from a list of choices.',
  exampleCode: ChoiceListExampleCodeFirst,
  exampleComponent: ChoiceListExampleFirst,
  exampleCodeHeader1: '2: Checkboxes:',
  exampleCodeDescription1: 'Use when to let user make multiple sections from a list of choices.',
  exampleCode1: ChoiceListExampleCodeSecond,
  exampleComponent1: ChoiceListExampleSecond,
};

export default choiceListState;
