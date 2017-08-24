import { IDocument } from '../../Types';
import CardExampleFirst from '../../examples/CardExample/CardExampleFirst';
import CardExampleSecond from '../../examples/CardExample/CardExampleSecond';

const CardExampleFirstCode = require('!raw-loader!../../examples/CardExample/CardExampleFirst') as string;
const CardExampleSecondCode = require('!raw-loader!../../examples/CardExample/CardExampleSecond') as string;

const cardState: IDocument = {
  id: 'card',
  heading: 'Card Component',
  subheading: `Cards are used to group similar concepts and tasks together to scan, read, and get things done easily. Cards can have action links in Header and Primary and Secondary actions in footer.`, 
  property: [
    {
      name: 'title',
      type: 'string',
      desc: 'Title content for the card.',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'Inner content of the card',
    }, {
      name: 'subdued',
      type: 'boolean',
      desc: 'A less prominent card',
    }, {
      name: 'sectioned',
      type: 'boolean',
      desc: 'Auto wrap content in section',
    }, {
      name: 'actions',
      type: 'Action[]',
      desc: 'Card header actions',
    }, {
      name: 'primaryFooterAction',
      type: 'Action',
      desc: 'Primary action in the card footer',
    },{
      name: 'secondaryFooterAction',
      type: 'Action',
      desc: 'Secondary action in the card footer',
    }, 
  ],
  exampleCode: CardExampleFirstCode,
  exampleComponent: CardExampleFirst,
  exampleCodeExtra: CardExampleSecondCode,
  exampleComponentExtra: CardExampleSecond,
};

export default cardState;
