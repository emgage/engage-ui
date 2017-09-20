import { IDocument } from '../../Types';
import ButtonExampleFirst from '../../examples/ButtonExample/ButtonExampleFirst';

const ButtonExampleFirstCode = require('!raw-loader!../../examples/ButtonExample/ButtonExampleFirst') as string;

const ButtonState: IDocument = {
  id: 'Button',
  heading: 'Button Component',
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
      name: 'size',
      type: 'Size',
      desc: 'Change the size of the button.',
    }, {
      name: 'fullWidth',
      type: 'boolean',
      desc: 'display true or false value.Display full width button.',
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
      name: 'style',
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
};

export default ButtonState;
