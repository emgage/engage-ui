import { IDocument } from '../../Types';
import VisuallyHiddenExample from '../../examples/VisuallyHiddenExample/VisuallyHiddenExample';
import VisuallyHiddenExample1 from '../../examples/VisuallyHiddenExample/VisuallyHiddenExample1';

const VisuallyHiddenExampleCode = require('!raw-loader!../../examples/VisuallyHiddenExample/VisuallyHiddenExample') as string;
const VisuallyHiddenExample1Code = require('!raw-loader!../../examples/VisuallyHiddenExample/VisuallyHiddenExample1') as string;

const VisuallyHiddenState: IDocument = {
  id: 'visuallyhidden',
  heading: 'VisuallyHidden',
  subheading: `It is used when an element needs to be available to assistive technology (e.g. screen readers) but otherwise hidden.Wrap the piece of text in the visually hidden component so it doesn’t show on the interface, but will still be available to merchants using a screen reader.`,
  property: [
    {
      name: 'children',
      type: 'React.ReactNode',
      desc: '	The content to be hidden visually.',
    },{
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCodeHeader: 'Example 1: Visually hidden heading',
  exampleCodeDescription: 'Always provide a heading for a major page section such as a card. In rare cases the heading is visually redundant and the meaning is conveyed by context. Rather than omit the heading, wrap the heading in the visually hidden component.',
  exampleCode: VisuallyHiddenExampleCode,
  exampleComponent: VisuallyHiddenExample,
  exampleCodeHeader1: 'Example 2: Visually hidden table headers',
  exampleCodeDescription1: 'Whenever one or more table columns has no need for a visible header, hide the header content rather than omitting it. Note that due to browser quirks the visually hidden component must go inside each `<th>`.',
  exampleCode1: VisuallyHiddenExample1Code,
  exampleComponent1: VisuallyHiddenExample1,
};

export default VisuallyHiddenState;
