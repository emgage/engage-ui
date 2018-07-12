import { IDocument } from '../../Types';
import FlexBoxExampleFirst from '../../examples/FlexBoxExample/FlexBoxExampleFirst';
import FlexBoxExampleSecond from '../../examples/FlexBoxExample/FlexBoxExampleSecond';
import FlexBoxExampleThird from '../../examples/FlexBoxExample/FlexBoxExampleThird';
import FlexBoxExampleFourth from '../../examples/FlexBoxExample/FlexBoxExampleFourth';
import FlexBoxExampleFifth from '../../examples/FlexBoxExample/FlexBoxExampleFifth';
import FlexBoxExampleSixth from '../../examples/FlexBoxExample/FlexBoxExampleSixth';
import FlexBoxExampleSeventh from '../../examples/FlexBoxExample/FlexBoxExampleSeventh';
import FlexBoxExampleEighth from '../../examples/FlexBoxExample/FlexBoxExampleEighth';
import FlexBoxExampleNinth from '../../examples/FlexBoxExample/FlexBoxExampleNinth';
import FlexBoxExampleTenth from '../../examples/FlexBoxExample/FlexBoxExampleTenth';

const FlexBoxExampleFirstCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleFirst') as string;
const FlexBoxExampleSecondCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleSecond') as string;
const FlexBoxExampleThirdCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleThird') as string;
const FlexBoxExampleFourthCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleFourth') as string;
const FlexBoxExampleFifthCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleFifth') as string;
const FlexBoxExampleSixthCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleSixth') as string;
const FlexBoxExampleSeventhCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleSeventh') as string;
const FlexBoxExampleEighthCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleEighth') as string;
const FlexBoxExampleNinthCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleNinth') as string;
const FlexBoxExampleTenthCode = require('!raw-loader!../../examples/FlexBoxExample/FlexBoxExampleTenth') as string;

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
      desc: 'Sets the alignment of flex items on the cross axis. Value of align can be one from this list : "Start", "Center", "End", "Stretch"',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'The child elements to render in the flexbox.',
    }, {
      name: 'componentStyle',
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
  exampleCode2: FlexBoxExampleThirdCode,
  exampleComponent2: FlexBoxExampleThird,
  exampleCodeHeader2: '3. Row FlexBox:',
  exampleCodeDescription2: 'Use to show flexbox with end justified and center aligned.',
  exampleCode3: FlexBoxExampleFourthCode,
  exampleComponent3: FlexBoxExampleFourth,
  exampleCodeHeader3: '4. Row Reverse FlexBox:',
  exampleCodeDescription3: 'Use to show flexbox with space-around justified and stretch aligned.',
  exampleCode4: FlexBoxExampleFifthCode,
  exampleComponent4: FlexBoxExampleFifth,
  exampleCodeHeader4: '5. Row Reverse FlexBox:',
  exampleCodeDescription4: 'Use to show flexbox with space-between justified and end aligned.',
  exampleCode5: FlexBoxExampleSixthCode,
  exampleComponent5: FlexBoxExampleSixth,
  exampleCodeHeader5: '6. Column FlexBox:',
  exampleCodeDescription5: 'Use to show flexbox with center justified and start aligned.',
  exampleCode6: FlexBoxExampleSeventhCode,
  exampleComponent6: FlexBoxExampleSeventh,
  exampleCodeHeader6: '7. Column FlexBox:',
  exampleCodeDescription6: 'Use to show flexbox with start justified and center aligned.',
  exampleCode7: FlexBoxExampleEighthCode,
  exampleComponent7: FlexBoxExampleEighth,
  exampleCodeHeader7: '8. Column FlexBox:',
  exampleCodeDescription7: 'Use to show flexbox with end justified and end aligned.',
  exampleCode8: FlexBoxExampleNinthCode,
  exampleComponent8: FlexBoxExampleNinth,
  exampleCodeHeader8: '9. Column Reverse FlexBox:',
  exampleCodeDescription8: 'Use to show flexbox with space-around justified and center aligned.',
  exampleCode9: FlexBoxExampleTenthCode,
  exampleComponent9: FlexBoxExampleTenth,
  exampleCodeHeader9: '10. Column Reverse FlexBox:',
  exampleCodeDescription9: 'Use to show flexbox with space-between justified and start aligned.',
};

export default FlexBoxState;
