import { IDocument } from '../../Types';
import FlexBoxExampleFirst from '../../examples/FlexBoxExample/FlexBoxExampleFirst';
import FlexBoxExampleSecond from '../../examples/FlexBoxExample/FlexBoxExampleSecond';

const FlexBoxExampleFirstCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleFirst') as string;
const FlexBoxExampleSecondCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleSecond') as string;

const FlexBoxState: IDocument = {
  id: 'FlexBox',
  heading: 'FlexBox',
  subheading: `Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with flexbox.`,
  property: [
    {
      name: 'inline',
      type: 'boolean',
      desc: 'Set display of flex container.',
    }, {
      name: 'direction',
      type: 'FlexDirection',
      desc: 'Sets the direction of flex items in a flex container. Value of direction can be one from this list : "Row", "RowReverse", "Column", "ColumnReverse"',
    }, {
      name: 'justify',
      type: 'FlexJustify',
      desc: 'Sets the alignment of flex items on the main axis. Value of justify can be one from this list : "Start", "Center", "End", "SpaceAround", "SpaceBetween"',
    }, {
      name: 'align',
      type: 'FlexAlign',
      desc: 'Sets the alignment of flex items on the cross axis. Value of align can be one from this list : "Row", "RowReverse", "Column", "ColumnReverse"',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'The child elements to render in the flexbox.',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'To display the styling.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: FlexBoxExampleFirstCode,
  exampleComponent: FlexBoxExampleFirst,
  exampleCodeHeader: '1. Basic FlexBox:',
  exampleCodeDescription: '',
  exampleCode1: FlexBoxExampleSecondCode,
  exampleComponent1: FlexBoxExampleSecond,
  exampleCodeHeader1: '2. Inline FlexBox:',
  exampleCodeDescription1: 'Use to show flexbox with inline child elements.',
};

export default FlexBoxState;
