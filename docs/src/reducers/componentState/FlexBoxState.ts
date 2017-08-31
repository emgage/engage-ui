import { IDocument } from '../../Types';
import FlexBoxExampleFirst from '../../examples/FlexBoxExample/FlexBoxExampleFirst';

const FlexBoxExampleFirstCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleFirst') as string;

const FlexBoxState: IDocument = {
  id: 'FlexBox',
  heading: 'FlexBox Component',
  subheading: `Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with flexbox.`,
  property: [
    {
      name: 'inline',
      type: 'boolean',
      desc: 'Set display of flex container.',
    }, {
      name: 'direction',
      type: 'FlexDirection(row, row-reverse, column, column-reverse)',
      desc: 'Sets the direction of flex items in a flex container.',
    }, {
      name: 'justify',
      type: 'FlexJustify(start, center, end, space-around, space-between)',
      desc: 'Sets the alignment of flex items on the main axis.',
    }, {
      name: 'align',
      type: 'FlexAlign(alignStart , alignEnd , alignCenter, alignStretch)',
      desc: 'Sets the alignment of flex items on the cross axis.',
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
};

export default FlexBoxState;
