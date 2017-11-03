import { IDocument } from '../../Types';
import StackExample from '../../examples/StackExample/StackExample';
import StackExample1 from '../../examples/StackExample/StackExample1';
import StackExample2 from '../../examples/StackExample/StackExample2';
import StackExample3 from '../../examples/StackExample/StackExample3';
import StackExample4 from '../../examples/StackExample/StackExample4';
import StackExample5 from '../../examples/StackExample/StackExample5';


const StackExampleCode = require('!raw-loader!../../examples/StackExample/StackExample') as string;
const StackExample1Code = require('!raw-loader!../../examples/StackExample/StackExample1') as string;
const StackExample2Code = require('!raw-loader!../../examples/StackExample/StackExample2') as string;
const StackExample3Code = require('!raw-loader!../../examples/StackExample/StackExample3') as string;
const StackExample4Code = require('!raw-loader!../../examples/StackExample/StackExample4') as string;
const StackExample5Code = require('!raw-loader!../../examples/StackExample/StackExample5') as string;

const StackState: IDocument = {
  id: 'stack',
  heading: 'Stack',
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
  exampleCodeHeader: 'Example 1: Default Stack',
  exampleCodeDescription: 'Use to quickly lay out a horizontal row of components and maintain their relative sizes. On small screens, children rows wrap down to additional rows as needed.',
  exampleCode: StackExampleCode,
  exampleComponent: StackExample,
  exampleCodeHeader1: 'Example 2: Stack with Spacing option',
  exampleCodeDescription1: 'Use to control spacing of items in a stack in standard increments. Use tight for less spacing, loose for more spacing, or none to remove normal spacing altogether',
  exampleCode1: StackExample1Code,
  exampleComponent1: StackExample1,
  exampleCodeHeader2: 'Example 3: Stack with Alignment as center',
  exampleCodeDescription2: 'Use to vertically center a set of items.',
  exampleCode2: StackExample2Code,
  exampleComponent2: StackExample2,
  exampleCodeHeader3: 'Example 4: Stack with Distribution as equalSpacing',
  exampleCodeDescription3: 'Use to have the stack’s items with equalSpacing in the container and maintain their relative proportions.',
  exampleCode3: StackExample3Code,
  exampleComponent3: StackExample3,
  exampleCodeHeader4: 'Example 5: Stack with Vertical option',
  exampleCodeDescription4: 'Use to Stack the elements vertically',
  exampleCode4: StackExample4Code,
  exampleComponent4: StackExample4,
  exampleCodeHeader5: 'Example 6: Stack with Single Item fills the remaining Space Example',
  exampleCodeDescription5: 'Use for aligning buttons or secondary content to the right edge of another element.',
  exampleCode5: StackExample5Code,
  exampleComponent5: StackExample5,
};

export default StackState;
