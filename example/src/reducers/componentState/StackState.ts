import { IDocument } from '../../Types';
import StackExampleFirst from '../../examples/StackExample/StackExampleFirst';
import StackExampleSecond from '../../examples/StackExample/StackExampleSecond';

const StackExampleFirstCode = require('!raw-loader!../../examples/StackExample/StackExampleFirst') as string;
const StackExampleSecondCode = require('!raw-loader!../../examples/StackExample/StackExampleSecond') as string;

const StackState: IDocument = {
  id: 'stack',
  heading: 'Stack Component',
  subheading: `Used to layout a horizontal row of components or to achieve no-fuss vertical centering. A stack is made of flexible items that wrap each of the stack’s children. Options provide control of the spacing and relative size of the items in the stack.`,
  property: [
    {
      name: 'children',
      type: 'any',
      desc: 'Elements to display inside stack.',
    }, {
      name: 'vertical',
      type: 'boolean',
      desc: 'Stack the elements vertically.',
    }, {
      name: 'spacing',
      type: 'Spacing (tight | loose | none)',
      desc: 'Adjust spacing between elements.',
    }, {
      name: 'alignment',
      type: 'Alignment(leading | trailing | center | fill | baseline)',
      desc: 'Adjust vertical alignment of elements.',
    }, {
      name: 'distribution',
      type: 'Distribution(equalSpacing | eading | trailing | center | fill | fillEvenly)',
      desc: 'Adjust horizontal alignment of elements.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: StackExampleFirstCode,
  exampleComponent: StackExampleFirst,
  exampleCodeExtra: StackExampleSecondCode,
  exampleComponentExtra: StackExampleSecond,
};

export default StackState;
