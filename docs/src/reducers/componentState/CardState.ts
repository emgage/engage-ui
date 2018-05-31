import { IDocument } from '../../Types';
import CardExampleFirst from '../../examples/CardExample/CardExampleFirst';
import CardExampleSecond from '../../examples/CardExample/CardExampleSecond';
import CardExampleThird from '../../examples/CardExample/CardExampleThird';
import CardExampleFourth from '../../examples/CardExample/CardExampleFourth';
import CardExampleFifth from '../../examples/CardExample/CardExampleFifth';

const CardExampleFirstCode = require('!raw-loader!../../examples/CardExample/CardExampleFirst') as string;
const CardExampleSecondCode = require('!raw-loader!../../examples/CardExample/CardExampleSecond') as string;
const CardExampleThirdCode = require('!raw-loader!../../examples/CardExample/CardExampleThird') as string;
const CardExampleFourthCode = require('!raw-loader!../../examples/CardExample/CardExampleFourth') as string;
const CardExampleFifthCode = require('!raw-loader!../../examples/CardExample/CardExampleFifth') as string;

const cardState: IDocument = {
  id: 'card',
  heading: 'Card',
  subheading: 'Cards are used to group similar concepts and tasks together to make easier for user to scan, read, and get things done.',
  property: [
    {
      name: 'customTitle',
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
    }, {
      name: 'secondaryFooterAction',
      type: 'Action',
      desc: 'Secondary action in the card footer',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: CardExampleFirstCode,
  exampleComponent: CardExampleFirst,
  exampleCodeHeader: '1. Default Card:',
  exampleCodeDescription: 'Use when you have a simple message to communicate to user that doesn’t require any secondary steps.',
  exampleCode1: CardExampleSecondCode,
  exampleComponent1: CardExampleSecond,
  exampleCodeHeader1: '2. Card with call to action in footer:',
  exampleCodeDescription1: 'Use when you have a simple message to communicate to user that requires them to take an action.',
  exampleCode2: CardExampleThirdCode,
  exampleComponent2: CardExampleThird,
  exampleCodeHeader2: '3. Card with call to action in header:',
  exampleCodeDescription2: 'Use when there’s a persistent action available to user.',
  exampleCode3: CardExampleFourthCode,
  exampleComponent3: CardExampleFourth,
  exampleCodeHeader3: '4. Card with multiple sections:',
  exampleCodeDescription3: 'Use when you have two related but distinct pieces of information to communicate to user.',
  exampleCode4: CardExampleFifthCode,
  exampleComponent4: CardExampleFifth,
  exampleCodeHeader4: '5. Subdued Card:',
  exampleCodeDescription4: 'Use for content that you want to deprioritize.',
};

export default cardState;
