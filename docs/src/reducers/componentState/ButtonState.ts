import { IDocument } from '../../Types';
import ButtonExampleFirst from '../../examples/ButtonExample/ButtonExampleFirst';
import ButtonExampleSecond from '../../examples/ButtonExample/ButtonExampleSecond';
import ButtonExampleThird from '../../examples/ButtonExample/ButtonExampleThird';
import ButtonExampleFourth from '../../examples/ButtonExample/ButtonExampleFourth';
import ButtonExampleFifth from '../../examples/ButtonExample/ButtonExampleFifth';
import ButtonExampleSixth from '../../examples/ButtonExample/ButtonExampleSixth';
import ButtonExampleSeventh from '../../examples/ButtonExample/ButtonExampleSeventh';
import ButtonExampleEighth from '../../examples/ButtonExample/ButtonExampleEighth';
import ButtonExampleNinth from '../../examples/ButtonExample/ButtonExampleNinth';
import ButtonExampleTenth from '../../examples/ButtonExample/ButtonExampleTenth';

const ButtonExampleFirstCode = require('!raw-loader!../../examples/ButtonExample/ButtonExampleFirst') as string;
const ButtonExampleSecondCode = require('!raw-loader!../../examples/ButtonExample/ButtonExampleSecond') as string;
const ButtonExampleThirdCode = require('!raw-loader!../../examples/ButtonExample/ButtonExampleThird') as string;
const ButtonExampleFourthCode = require('!raw-loader!../../examples/ButtonExample/ButtonExampleFourth') as string;
const ButtonExampleFifthCode = require('!raw-loader!../../examples/ButtonExample/ButtonExampleFifth') as string;
const ButtonExampleSixthCode = require('!raw-loader!../../examples/ButtonExample/ButtonExampleSixth') as string;
const ButtonExampleSeventhCode = require('!raw-loader!../../examples/ButtonExample/ButtonExampleSeventh') as string;
const ButtonExampleEighthCode = require('!raw-loader!../../examples/ButtonExample/ButtonExampleEighth') as string;
const ButtonExampleNinthCode = require('!raw-loader!../../examples/ButtonExample/ButtonExampleNinth') as string;
const ButtonExampleTenthCode = require('!raw-loader!../../examples/ButtonExample/ButtonExampleTenth') as string;

const ButtonState: IDocument = {
  id: 'Button',
  heading: 'Button',
  subheading: `A Button displays multiple related actions in a row to help with horizontal
              arrangement and the spacing of calls to action.`,
  property: [
    {
      name: 'url',
      type: 'string',
      desc: 'To display the URL link.',
    }, {
      name: 'children',
      type: 'string',
      desc: 'The content to display inside the button.',
    }, {
      name: 'customSize',
      type: 'Size',
      desc: 'Change the size of the button. It can be slim or large',
    }, {
      name: 'fullWidth',
      type: 'boolean',
      desc: 'Allows the button to grow to the width of its container',
    }, {
      name: 'primary',
      type: 'boolean',
      desc: 'Display as primary button.',
    }, {
      name: 'outline',
      type: 'boolean',
      desc: 'Display an outlined button.',
    }, {
      name: 'destructive',
      type: 'boolean',
      desc: 'Display as destructive button.',
    }, {
      name: 'disabled',
      type: 'boolean',
      desc: 'Display button as disable.',
    }, {
      name: 'plain',
      type: 'boolean',
      desc: 'Use plain button style.',
    }, {
      name: 'external',
      type: 'boolean',
      desc: 'Force url to open in a new tab.',
    }, {
      name: 'submit',
      type: 'boolean',
      desc: 'Button will submit a form.',
    }, {
      name: 'disclosure',
      type: 'boolean',
      desc: 'Display button with a disclosure icon.',
    }, {
      name: 'accessibilityLabel',
      type: 'string',
      desc: 'Visually hidden text for screen readers.',
    }, {
      name: 'icon',
      type: 'IconProps',
      desc: 'Icon to display in the banner.',
    }, {
      name: 'customStyle',
      type: 'React.CSSProperties',
      desc: 'To display the styling.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    }, {
      name: 'onClick',
      type: 'void',
      desc: 'Callback when clicked.',
    }, {
      name: 'onFocus',
      type: 'void',
      desc: 'Callback when button becomes focussed.',
    }, {
      name: 'onBlur',
      type: 'void',
      desc: 'Callback when focus leaves button.',
    },
  ],
  exampleCode: ButtonExampleFirstCode,
  exampleComponent: ButtonExampleFirst,
  exampleCodeHeader: '1. Basic Button:',
  exampleCodeDescription: 'Used most in the interface. It is without any properties.',
  exampleCode1: ButtonExampleSecondCode,
  exampleComponent1: ButtonExampleSecond,
  exampleCodeHeader1: '2.Plain Button:',
  exampleCodeDescription1: 'Use for less important or less commonly used actions.',
  exampleCode2: ButtonExampleThirdCode,
  exampleComponent2: ButtonExampleThird,
  exampleCodeHeader2: '3. Primary Button:',
  exampleCodeDescription2: 'Use to highlight the most important actions.',
  exampleCode3: ButtonExampleFourthCode,
  exampleComponent3: ButtonExampleFourth,
  exampleCodeHeader3: '4. Destructive Button:',
  exampleCodeDescription3: 'Used when action is to delete the data.',
  exampleCode4: ButtonExampleFifthCode,
  exampleComponent4: ButtonExampleFifth,
  exampleCodeHeader4: '5. Slim Button:',
  exampleCodeDescription4: 'Use to make small size button.',
  exampleCode5: ButtonExampleSixthCode,
  exampleComponent5: ButtonExampleSixth,
  exampleCodeHeader5: '6. Large Button:',
  exampleCodeDescription5: 'Use to make large size button.',
  exampleCode6: ButtonExampleSeventhCode,
  exampleComponent6: ButtonExampleSeventh,
  exampleCodeHeader6: '7. Fullwidth Button:',
  exampleCodeDescription6: 'Use for buttons placed in a narrow column or for creating a set of buttons of equal width.',
  exampleCode7: ButtonExampleEighthCode,
  exampleComponent7: ButtonExampleEighth,
  exampleCodeHeader7: '8. Disabled Button:',
  exampleCodeDescription7: 'Use for actions that aren’t currently available. The surrounding interface should make it clear why the button is disabled and what needs to be done to enable it.',
  exampleCode8: ButtonExampleNinthCode,
  exampleComponent8: ButtonExampleNinth,
  exampleCodeHeader8: '9. Submit Button:',
  exampleCodeDescription8: 'Use as Form submit button.',
  exampleCode9: ButtonExampleTenthCode,
  exampleComponent9: ButtonExampleTenth,
  exampleCodeHeader9: '10. Icon Button:',
  exampleCodeDescription9: 'Use to show button with only icon.',
};

export default ButtonState;
