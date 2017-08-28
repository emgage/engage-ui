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
      desc: 'Name of element to use for text',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'Size of the text',
    }, {
      name: 'size',
      type: 'Size',
      desc: 'Set the status of the DisplayText',
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
