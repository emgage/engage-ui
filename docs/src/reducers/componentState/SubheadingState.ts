import { IDocument } from '../../Types';
import SubheadingExampleFirst from '../../examples/SubheadingExample/SubheadingExampleFirst';
import SubheadingExampleSecond from '../../examples/SubheadingExample/SubheadingExampleSecond';

const SubheadingExampleFirstCode = require('!raw-loader!../../examples/SubheadingExample/SubheadingExampleFirst') as string;
const SubheadingExampleSecondCode = require('!raw-loader!../../examples/SubheadingExample/SubheadingExampleSecond') as string;

const HeadingState: IDocument = {
  id: 'subheading',
  heading: 'Subheading Component',
  subheading: `Subheadings are used for the title of any sub-sections in top-level page sections. Generally, sections of a card use subheadings for their titles.`,
  property: [
    {
      name: 'element',
      type: 'HeadingTagName(h1, h2, h3, h4, h5, h6, p)',
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
  exampleCode: SubheadingExampleFirstCode,
  exampleComponent: SubheadingExampleFirst,
  exampleCodeExtra: SubheadingExampleSecondCode,
  exampleComponentExtra: SubheadingExampleSecond,
};

export default HeadingState;
