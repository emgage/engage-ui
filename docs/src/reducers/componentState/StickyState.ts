import { IDocument } from '../../Types';
import StickyExample from '../../examples/StickyExample/StickyExample';
import StickyExample1 from '../../examples/StickyExample/StickyExample1';

const StickyExampleCode = require('!raw-loader!../../examples/StickyExample/StickyExample') as string;
const StickyExample1Code = require('!raw-loader!../../examples/StickyExample/StickyExample1') as string;

const StickyState: IDocument = {
  id: 'Sticky',
  heading: 'Sticky',
  subheading: `Make elements remain at the top or bottom of the viewport, like a sticky navigation.`,
  property: [
    {
      name: 'children',
      type: 'any',
      desc: 'Elements to display inside Sticky.',
    }, {
      name: 'position',
      type: 'Position',
      desc: 'Position prop allow user to choose StickyHeader or StickyFooter',
    }, {
      name: 'style',
      type: 'enum',
      desc: 'style prop allow user to choose display colored theme for Sticky component.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCodeHeader: 'Example 1: Default Sticky component as StickyHeader',
  exampleCodeDescription: 'Make elements remain at the top of the viewport, like a stickyHeader navigation.',
  exampleCode: StickyExampleCode,
  exampleComponent: StickyExample,
  exampleCodeHeader1: 'Example 2: Sticky component as StickyFooter',
  exampleCodeDescription1: 'Make elements remain at the top of the viewport, like a stickyFooter navigation.',
  exampleCode1: StickyExample1Code,
  exampleComponent1: StickyExample1,
};

export default StickyState;
