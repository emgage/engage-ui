import { IDocument } from '../../Types';
import FormLayoutExampleFirst from '../../examples/FormLayoutExample/FormLayoutExampleFirst';
import FormLayoutExampleSecond from '../../examples/FormLayoutExample/FormLayoutExampleSecond';
import FormLayoutExampleThird from '../../examples/FormLayoutExample/FormLayoutExampleThird';

const FormLayoutExampleFirstCode = require('!raw-loader!../../examples/FormLayoutExample/FormLayoutExampleFirst') as string;
const FormLayoutExampleSecondCode = require('!raw-loader!../../examples/FormLayoutExample/FormLayoutExampleSecond') as string;
const FormLayoutExampleThirdCode = require('!raw-loader!../../examples/FormLayoutExample/FormLayoutExampleThird') as string;

const FormLayoutState: IDocument = {
  id: 'FormLayout',
  heading: 'FormLayout Component',
  subheading: `A FormLayout displays multiple related actions in a row to help with horizontal
              arrangement and the spacing of calls to action.`,
  property: [
    {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'The content to display inside the formlayout',
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
  exampleCode: FormLayoutExampleFirstCode,
  exampleComponent: FormLayoutExampleFirst,
  exampleCodeHeader: '1. Default FormLayout:',
  exampleCodeDescription: 'Use to stack form fields vertically, which makes them easier to scan and complete.',
  exampleCode1: FormLayoutExampleSecondCode,
  exampleComponent1: FormLayoutExampleSecond,
  exampleCodeHeader1: '2. FormLayout with Field Group:',
  exampleCodeDescription1: 'Use field groups to arrange multiple fields in a row.',
  exampleCode2: FormLayoutExampleThirdCode,
  exampleComponent2: FormLayoutExampleThird,
  exampleCodeHeader2: '3. Condensed Field Group:',
  exampleCodeDescription2: 'For very short inputs, the width of the inputs may be reduced in order to fit more fields in the row.',
};

export default FormLayoutState;
