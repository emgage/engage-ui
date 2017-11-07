import { IDocument } from '../../Types';
import SubheadingExample from '../../examples/SubheadingExample/SubheadingExample';
import SubheadingExample1 from '../../examples/SubheadingExample/SubheadingExample1';

const SubheadingExampleCode = require('!raw-loader!../../examples/SubheadingExample/SubheadingExample') as string;
const SubheadingExample1Code = require('!raw-loader!../../examples/SubheadingExample/SubheadingExample1') as string;

const HeadingState: IDocument = {
  id: 'subheading',
  heading: 'Subheading',
  subheading: `Subheadings are used for the title of any sub-sections in top-level page sections. Generally, sections of a card use subheadings for their titles.`,
  property: [
    {
      name: 'element',
      type: 'HeadingTagName ( h1, h2, h3, h4, h5, h6 )',
      desc: 'The element name to use for the subheading.',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'Text to display in subheading.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCodeHeader: 'Example 1: Default Subheading',
  exampleCodeDescription: 'Use to structure content in a card.',
  exampleCode: SubheadingExampleCode,
  exampleComponent: SubheadingExample,
  exampleCodeHeader1: 'Example 2: Subheading with h1 element',
  exampleCodeDescription1: 'Use to structure content with size in a card.',
  exampleCode1: SubheadingExample1Code,
  exampleComponent1: SubheadingExample1,
};

export default HeadingState;
