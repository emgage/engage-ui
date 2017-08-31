import { IDocument } from '../../Types';
import HeadingExampleFirst from '../../examples/HeadingExample/HeadingExampleFirst';
import HeadingExampleSecond from '../../examples/HeadingExample/HeadingExampleSecond';

const HeadingExampleFirstCode = require('!raw-loader!../../examples/HeadingExample/HeadingExampleFirst') as string;
const HeadingExampleSecondCode = require('!raw-loader!../../examples/HeadingExample/HeadingExampleSecond') as string;

const HeadingState: IDocument = {
  id: 'heading',
  heading: 'Heading Component',
  subheading: `Headings are used as the titles of each major section of a page in the interface.`,
  property: [
    {
      name: 'element',
      type: 'HeadingTagName(h1, h2, h3, h4, h5, h6, p)',
      desc: 'The element name to use for the heading.',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'The content to display inside the heading.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: HeadingExampleFirstCode,
  exampleComponent: HeadingExampleFirst,
  exampleCodeExtra: HeadingExampleSecondCode,
  exampleComponentExtra: HeadingExampleSecond,
};

export default HeadingState;
