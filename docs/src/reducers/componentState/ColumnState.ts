import { IDocument } from '../../Types';
import ColumnExampleFirst from '../../examples/ColumnExample/ColumnExampleFirst';
import ColumnExampleSecond from '../../examples/ColumnExample/ColumnExampleSecond';

const ColumnExampleCodeFirst = require('!raw-loader!../../examples/ColumnExample/ColumnExampleFirst') as string;
const ColumnExampleCodeSecond = require('!raw-loader!../../examples/ColumnExample/ColumnExampleSecond') as string;

const ColumnState: IDocument = {
  id: 'column',
  heading: 'Column Component',
  subheading: `Column responsivewidth size are vary and show information in multiple line based on size selected for column by user.`,

  property: [
    {
      name: 'small',
      type: 'ResponsiveWidth',
      desc: 'Column set with small width size',
    }, {
      name: 'medium',
      type: 'ResponsiveWidth',
      desc: 'Column set with medium width size',
    }, {
      name: 'large',
      type: 'ResponsiveWidth',
      desc: 'Column set with large width size',
    }, {
      name: 'extraLarge',
      type: 'ResponsiveWidth',
      desc: 'Column set with extraLarge width size',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'Set the style via css',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: ColumnExampleCodeFirst,
  exampleComponent: ColumnExampleFirst,
  exampleCodeExtra: ColumnExampleCodeSecond,
  exampleComponentExtra: ColumnExampleSecond,
};

export default ColumnState;
