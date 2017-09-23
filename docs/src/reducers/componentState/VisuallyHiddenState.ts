import { IDocument } from '../../Types';
import VisuallyHiddenExampleFirst from '../../examples/VisuallyHiddenExample/VisuallyHiddenExampleFirst';
import VisuallyHiddenExampleSecond from '../../examples/VisuallyHiddenExample/VisuallyHiddenExampleSecond';

const VisuallyHiddenExampleFirstCode = require('!raw-loader!../../examples/VisuallyHiddenExample/VisuallyHiddenExampleFirst') as string;
const VisuallyHiddenExampleSecondCode = require('!raw-loader!../../examples/VisuallyHiddenExample/VisuallyHiddenExampleSecond') as string;

const VisuallyHiddenState: IDocument = {
  id: 'visuallyhidden',
  heading: 'VisuallyHidden Component',
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
  exampleCode: VisuallyHiddenExampleFirstCode,
  exampleComponent: VisuallyHiddenExampleFirst,
  exampleCodeExtra: VisuallyHiddenExampleSecondCode,
  exampleComponentExtra: VisuallyHiddenExampleSecond,
};

export default VisuallyHiddenState;
