import { IDocument } from '../../Types';
import SliderExampleFirst from '../../examples/SliderExample/SliderExampleFirst';

const SliderExampleFirstCode = require('!raw-loader!../../examples/SliderExample/SliderExampleFirst') as string;

const SliderState: IDocument = {
  id: 'Slider',
  heading: 'Slider',
  subheading: `Slider is used to slide react component it may be single or multiple, where multiple windows stack over one another.`,
  property: [
    {
      name: 'active',
      type: 'boolean',
      desc: 'To show or hide slider.',
    }, {
      name: 'accessibilityLabel',
      type: 'string',
      desc: 'Set accessibility label aria-label.',
    }, {
      name: 'activeContentId',
      type: 'string',
      desc: 'Store current active slider contents id to make specific content active',
    }, {
      name: 'children',
      type: 'string',
      desc: 'The content to display inside the slider.',
    }, {
      name: 'flip',
      type: 'boolean',
      desc: 'Change the position of slider from left to right',
    }, {
      name: 'overlay',
      type: 'boolean',
      desc: 'Show the backdrop',
    }, {
      name: 'componentWidth',
      type: 'string',
      desc: 'set size of slider: small, medium, large or any px value',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: SliderExampleFirstCode,
  exampleComponent: SliderExampleFirst,
  exampleCodeHeader: '1. Large slider flip direction (open from right)',
  exampleCodeDescription: 'Slider wrapper which can contain multiple slider content & which can be trigger from any button',
};

export default SliderState;
