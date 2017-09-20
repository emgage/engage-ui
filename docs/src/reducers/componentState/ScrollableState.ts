import { IDocument } from '../../Types';
import ScrollableExampleFirst from '../../examples/ScrollableExample/ScrollableExampleFirst';

const ScrollableExampleFirstCode = require('!raw-loader!../../examples/ScrollableExample/ScrollableExampleFirst') as string;

const ScrollableState: IDocument = {
  id: 'Scrollable',
  heading: 'Scrollable Component',
  subheading: `The scrollable component is a container for long form content, such as terms of service, that allows for scrolling so merchants can expose more text as they read.`,
  property: [
    {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'Content to display in scrollable area.',
    }, {
      name: 'vertical',
      type: 'boolean',
      desc: 'Scroll content vertically.',
    }, {
      name: 'horizontal',
      type: 'boolean',
      desc: 'Scroll content horizontally.',
    }, {
      name: 'shadow',
      type: 'boolean',
      desc: 'Add a shadow when content is scrollable.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: ScrollableExampleFirstCode,
  exampleComponent: ScrollableExampleFirst,
};

export default ScrollableState;
