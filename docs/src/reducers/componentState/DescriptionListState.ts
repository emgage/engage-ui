import { IDocument } from '../../Types';
import DescriptionListExampleFirst from '../../examples/DescriptionListExample/DescriptionListExampleFirst';
import DescriptionListExampleSecond from '../../examples/DescriptionListExample/DescriptionListExampleSecond';
import DescriptionListExampleThird from '../../examples/DescriptionListExample/DescriptionListExampleThird';

const DescriptionListExampleFirstCode = require('!raw-loader!../../examples/DescriptionListExample/DescriptionListExampleFirst') as string;
const DescriptionListExampleSecondCode = require('!raw-loader!../../examples/DescriptionListExample/DescriptionListExampleSecond') as string;
const DescriptionListExampleThirdCode = require('!raw-loader!../../examples/DescriptionListExample/DescriptionListExampleThird') as string;

const DescriptionListState: IDocument = {
  id: 'descriptionlist',
  heading: 'Description List Component',
  subheading: `Description lists are a way to organize and explain related information. They’re particularly useful when you need to list and define terms such as in a glossary.`,
  property: [
    {
      name: 'children',
      type: 'string',
      desc: 'Display description list with term and description elements',
    }, {
      name: 'type',
      type: 'enum',
      desc: 'Type of description list to display. Available options: default | divider',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },{
      name: 'style',
      type: 'string',
      desc: 'Style to be applied. Available options: Inline | Stacked',
    },
  ],
  exampleCode: DescriptionListExampleFirstCode,
  exampleComponent: DescriptionListExampleFirst,
  exampleCodeHeader: '1. Description List display with Inline style:',
  exampleCodeDescription: 'Use when you need to present a list of items or terms alongside descriptions and explanations.',
  exampleCode1: DescriptionListExampleSecondCode,
  exampleComponent1: DescriptionListExampleSecond,
  exampleCodeHeader1: '2. Description List display with Stacked style:',
  exampleCodeDescription1: 'Use when you need to present a list of items or terms in a simple stacked style list items one below other.',
  exampleCode2: DescriptionListExampleThirdCode,
  exampleComponent2: DescriptionListExampleThird,
  exampleCodeHeader2: '3. Description List display with Stacked style but with divider as type:',
  exampleCodeDescription2: 'Use when you need to present a list of items or terms with a horizontal line between list items.',
};

export default DescriptionListState;
