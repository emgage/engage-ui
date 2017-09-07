import { IDocument } from '../../Types';
import DisplayTextExampleFirst from '../../examples/DisplayTextExample/DisplayTextExampleFirst';
import DisplayTextExampleSecond from '../../examples/DisplayTextExample/DisplayTextExampleSecond';

const DisplayTextExampleCodeFirst = require('!raw-loader!../../examples/DisplayTextExample/DisplayTextExampleFirst') as string;
const DisplayTextExampleCodeSecond = require('!raw-loader!../../examples/DisplayTextExample/DisplayTextExampleSecond') as string;

const DisplayTextState: IDocument = {
  id: 'displaytext',
  heading: 'Display Text Component',
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
      name: 'size',
      type: 'Size',
      desc: 'Size of the text small, medium, large or extralarge',
    },{
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: DisplayTextExampleCodeFirst,
  exampleComponent: DisplayTextExampleFirst,
  exampleCodeExtra: DisplayTextExampleCodeSecond,
  exampleComponentExtra: DisplayTextExampleSecond,
};

export default DisplayTextState;
