import { IDocument } from '../../Types';
import DisplayTextExampleFirst from '../../examples/DisplayTextExample/DisplayTextExampleFirst';
import DisplayTextExampleSecond from '../../examples/DisplayTextExample/DisplayTextExampleSecond';
import DisplayTextExampleThird from '../../examples/DisplayTextExample/DisplayTextExampleThird';
import DisplayTextExampleFourth from '../../examples/DisplayTextExample/DisplayTextExampleFourth';
import DisplayTextExampleFifth from '../../examples/DisplayTextExample/DisplayTextExampleFifth';
import DisplayTextExampleSixth from '../../examples/DisplayTextExample/DisplayTextExampleSixth';
import DisplayTextExampleSeventh from '../../examples/DisplayTextExample/DisplayTextExampleSeventh';

const DisplayTextExampleCodeFirst = require('!raw-loader!../../examples/DisplayTextExample/DisplayTextExampleFirst') as string;
const DisplayTextExampleCodeSecond = require('!raw-loader!../../examples/DisplayTextExample/DisplayTextExampleSecond') as string;
const DisplayTextExampleCodeThird = require('!raw-loader!../../examples/DisplayTextExample/DisplayTextExampleThird') as string;
const DisplayTextExampleCodeFourth = require('!raw-loader!../../examples/DisplayTextExample/DisplayTextExampleFourth') as string;
const DisplayTextExampleCodeFifth = require('!raw-loader!../../examples/DisplayTextExample/DisplayTextExampleFifth') as string;
const DisplayTextExampleCodeSixth = require('!raw-loader!../../examples/DisplayTextExample/DisplayTextExampleSixth') as string;
const DisplayTextExampleCodeSeventh = require('!raw-loader!../../examples/DisplayTextExample/DisplayTextExampleSeventh') as string;

const DisplayTextState: IDocument = {
  id: 'displaytext',
  heading: 'Display Text',
  subheading: `Display Texts are used to inform the status of a piece of information or of an action that’s been taken.`,
  property: [
    {
      name: 'element',
      type: 'HeadingTagName',
      desc: 'Name of element to use for text from H1 to H6 and p',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'The content to display for displaytext' ,
    }, {
      name: 'componentSize',
      type: 'Size',
      desc: 'Size of the text small, medium, large or extralarge',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: DisplayTextExampleCodeFirst,
  exampleComponent: DisplayTextExampleFirst,
  exampleCodeHeader: '1. Default DisplayText:',
  exampleCodeDescription: '',
  exampleCode1: DisplayTextExampleCodeSecond,
  exampleComponent1: DisplayTextExampleSecond,
  exampleCodeHeader1: '2. DisplayText with element:',
  exampleCodeDescription1: 'Use to show displaytext with element by passing heading tag.',
  exampleCode2: DisplayTextExampleCodeThird,
  exampleComponent2: DisplayTextExampleThird,
  exampleCodeHeader2: '3. DisplayText with element and size:',
  exampleCodeDescription2: 'Use to show displaytext with some element and size.',
  exampleCode3: DisplayTextExampleCodeFourth,
  exampleComponent3: DisplayTextExampleFourth,
  exampleCodeHeader3: '4. Small DisplayText:',
  exampleCodeDescription3: 'Use to show small size displaytext.',
  exampleCode4: DisplayTextExampleCodeFifth,
  exampleComponent4: DisplayTextExampleFifth,
  exampleCodeHeader4: '5. Medium DisplayText:',
  exampleCodeDescription4: 'Use to show medium size displaytext.',
  exampleCode5: DisplayTextExampleCodeSixth,
  exampleComponent5: DisplayTextExampleSixth,
  exampleCodeHeader5: '6. Large DisplayText:',
  exampleCodeDescription5: 'Use to show large size displaytext.',
  exampleCode6: DisplayTextExampleCodeSeventh,
  exampleComponent6: DisplayTextExampleSeventh,
  exampleCodeHeader6: '7. Extra Large DisplayText:',
  exampleCodeDescription6: 'Use to show extralarge size displaytext.',
};

export default DisplayTextState;
