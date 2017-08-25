import { IDocument } from '../../Types';
import CardExampleFirst from '../../examples/CardExample/CardExampleFirst';
import CardExampleSecond from '../../examples/CardExample/CardExampleSecond';

const CardExampleFirstCode = require('!raw-loader!../../examples/CardExample/CardExampleFirst') as string;
const CardExampleSecondCode = require('!raw-loader!../../examples/CardExample/CardExampleSecond') as string;

const cardState: IDocument = {
  id: 'card',
  heading: 'Card Component',
  subheading: `A card is a piece of paper with unique related data that serves as an entry point to more detailed information. For example, a card could contain a photo, text, and a link about a single subject.
  Cards have a constant width and variable height. The maximum height is limited to the height of the available space on a platform, but it can temporarily expand (for example, to display a comment field). Cards do not flip over to reveal information on the back.
  Card expansion can be controlled (use expanded and onExpandChange properties) or uncontrolled (use initiallyExpanded property). Use the expandable property to control whether an element will react to expansion or not. Use actAsExpander on CardTitle or CardHeader to let them have an expander button.`, 
  property: [
    {
      name: 'title',
      type: 'string',
      desc: 'Title content for the card.',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'Card related components to render inside this card.',
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
