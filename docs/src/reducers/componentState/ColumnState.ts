import { IDocument } from '../../Types';
import ColumnExampleFirst from '../../examples/ColumnExample/ColumnExampleFirst';
import ColumnExampleSecond from '../../examples/ColumnExample/ColumnExampleSecond';
import ColumnExampleThird from '../../examples/ColumnExample/ColumnExampleThird';
import ColumnExampleFourth from '../../examples/ColumnExample/ColumnExampleFourth';
import ColumnExampleFifth from '../../examples/ColumnExample/ColumnExampleFifth';

const ColumnExampleCodeFirst = require('!raw-loader!../../examples/ColumnExample/ColumnExampleFirst') as string;
const ColumnExampleCodeSecond = require('!raw-loader!../../examples/ColumnExample/ColumnExampleSecond') as string;
const ColumnExampleCodeThird = require('!raw-loader!../../examples/ColumnExample/ColumnExampleThird') as string;
const ColumnExampleCodeFourth = require('!raw-loader!../../examples/ColumnExample/ColumnExampleFourth') as string;
const ColumnExampleCodeFifth = require('!raw-loader!../../examples/ColumnExample/ColumnExampleFifth') as string;

const ColumnState: IDocument = {
  id: 'column',
  heading: 'Column',
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
      name: 'customStyle',
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
  exampleCodeHeader: '1. Small Column:',
  exampleCodeDescription: 'Use to make small size column.',
  exampleCode1: ColumnExampleCodeSecond,
  exampleComponent1: ColumnExampleSecond,
  exampleCodeHeader1: '2. Medium Column:',
  exampleCodeDescription1: 'Use to make medium size column.',
  exampleCode2: ColumnExampleCodeThird,
  exampleComponent2: ColumnExampleThird,
  exampleCodeHeader2: '3. Large column:',
  exampleCodeDescription2: 'Use to make large size column.',
  exampleCode3: ColumnExampleCodeFourth,
  exampleComponent3: ColumnExampleFourth,
  exampleCodeHeader3: '4. ExtraLarge column:',
  exampleCodeDescription3: 'Use to make extraLarge size column.',
  exampleCode4: ColumnExampleCodeFifth,
  exampleComponent4: ColumnExampleFifth,
  exampleCodeHeader4: '5. All size of columns together:',
  exampleCodeDescription4: 'Use to make column with different type of size together.',
};

export default ColumnState;
