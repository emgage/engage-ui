import { IDocument } from '../../Types';
import ListExampleFirst from '../../examples/ListExample/ListExampleFirst';

const ListExampleCodeFirst = require('!raw-loader!../../examples/ListExample/ListExampleFirst') as string;

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
  exampleCode: ListExampleCodeFirst,
  exampleComponent: ListExampleFirst,
};

export default ListState;
