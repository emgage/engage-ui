import { IDocument } from '../../Types';
import ButtonGroupExampleFirst from '../../examples/ButtonGroupExample/ButtonGroupExampleFirst';
import ButtonGroupExampleSecond from '../../examples/ButtonGroupExample/ButtonGroupExampleSecond';

const ButtonGroupExampleFirstCode = require('!raw-loader!../../examples/ButtonGroupExample/ButtonGroupExampleFirst') as string;
const ButtonGroupExampleSecondCode = require('!raw-loader!../../examples/ButtonGroupExample/ButtonGroupExampleSecond') as string;

const ButtonGroupState: IDocument = {
  id: 'ButtonGroup',
  heading: 'ButtonGroup Component',
  subheading: `A Button Group displays multiple related actions in a row to help with horizontal
              arrangement and the spacing of calls to action.`,
  property: [
    {
      name: 'segmented',
      type: 'boolean',
      desc: 'Display true or false value.Join buttons as segmented group',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'Name of button, 	Button components',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Display any type of theme.',
    },
  ],
  exampleCode: ButtonGroupExampleFirstCode,
  exampleComponent: ButtonGroupExampleFirst,
  exampleCodeExtra: ButtonGroupExampleSecondCode,
  exampleComponentExtra: ButtonGroupExampleSecond,
};

export default ButtonGroupState;
