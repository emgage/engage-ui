import { IDocument } from '../../Types';
import ListExampleFirst from '../../examples/ListExample/ListExampleFirst';
import ListExampleSecond from '../../examples/ListExample/ListExampleSecond';

const ListExampleFirstCode = require('!raw-loader!../../examples/ListExample/ListExampleFirst') as string;
const ListExampleSecondCode = require('!raw-loader!../../examples/ListExample/ListExampleSecond') as string;

const ListState: IDocument = {
  id: 'list',
  heading: 'List Component',
  subheading: `Lists display a series of related content.
               Each list item begins with a bullet, a number, or less commonly, with an icon.`,
  property: [
    {
      name: 'children',
      type: 'string',
      desc: 'Display list item elements',
    }, {
      name: 'type',
      type: 'Type',
      desc: 'Type of list to display either default, bullet or number',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: ListExampleFirstCode,
  exampleComponent: ListExampleFirst,
  exampleCodeHeader: '1. List display with bullet:',
  exampleCodeDescription: 'Use for a text-only list of related items that don’t need to be in a specific order and don’t require an icon or other indicator.',
  exampleCode1: ListExampleSecondCode,
  exampleComponent1: ListExampleSecond,
  exampleCodeHeader1: '2. List display with number:',
  exampleCodeDescription1: 'Use for a text-only list of related items when an inherent order, priority, or sequence needs to be communicated.',
};

export default ListState;
