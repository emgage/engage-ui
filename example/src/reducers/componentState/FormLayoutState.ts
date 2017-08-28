import { IDocument } from '../../Types';
import FormLayoutExampleFirst from '../../examples/FormLayoutExample/FormLayoutExampleFirst';
import FormLayoutExampleSecond from '../../examples/FormLayoutExample/FormLayoutExampleSecond';

const FormLayoutExampleFirstCode = require('!raw-loader!../../examples/FormLayoutExample/FormLayoutExampleFirst') as string;
const FormLayoutExampleSecondCode = require('!raw-loader!../../examples/FormLayoutExample/FormLayoutExampleSecond') as string;

const FormLayoutState: IDocument = {
  id: 'FormLayout',
  heading: 'FormLayout Component',
  subheading: `A FormLayout displays multiple related actions in a row to help with horizontal 
              arrangement and the spacing of calls to action.`,
  property: [
    {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'display true or false value.Join buttons as segmented group',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'name of button,Button components',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'display any type of theme.',
    }, 
  ],
  exampleCode: FormLayoutExampleFirstCode,
  exampleComponent: FormLayoutExampleFirst,
  exampleCodeExtra: FormLayoutExampleSecondCode,
  exampleComponentExtra: FormLayoutExampleSecond,
};

export default FormLayoutState;
