import { IDocument } from '../../Types';
import DropdownExampleFirst from '../../examples/DropdownExample/DropdownExampleFirst';
import DropdownExampleSecond from '../../examples/DropdownExample/DropdownExampleSecond';
import DropdownExampleThird from '../../examples/DropdownExample/DropdownExampleThird';
import DropdownExampleFourth from '../../examples/DropdownExample/DropdownExampleFourth';
import DropdownExampleFifth from '../../examples/DropdownExample/DropdownExampleFifth';

const DropdownExampleFirstCode = require('!raw-loader!../../examples/DropdownExample/DropdownExampleFirst') as string;
const DropdownExampleSecondCode = require('!raw-loader!../../examples/DropdownExample/DropdownExampleSecond') as string;
const DropdownExampleThirdCode = require('!raw-loader!../../examples/DropdownExample/DropdownExampleThird') as string;
const DropdownExampleFourthCode = require('!raw-loader!../../examples/DropdownExample/DropdownExampleFourth') as string;
const DropdownExampleFifthCode = require('!raw-loader!../../examples/DropdownExample/DropdownExampleFifth') as string;

const DropdownState: IDocument = {
  id: 'dropdown',
  heading: 'Dropdown Component',
  subheading: `Dropdown are small overlays that open on demand, usually when the merchant clicks a button. They let users access supplementary actions without cluttering the page.`,
  property: [
    {
      name: 'anchorEl',
      type: 'HtmlElement',
      desc: 'This is the DOM element that will be used to set the position of the dropdown.',
    }, {
      name: 'direction',
      type: 'enum',
      desc: 'The direction to open the dropdown. Availablee options: up | down | left | right',
    }, {
      name: 'active',
      type: 'boolean',
      desc: 'Show or hide the Dropdown.',
    }, {
      name: 'disabled',
      type: 'boolean',
      desc: 'Disable the dropdown',
    }, {
      name: 'dropdownItems',
      type: 'DropdownItemProps',
      desc: 'items of the dropdown.',
    }, {
      name: 'toggle',
      type: 'function ()',
      desc: 'Callback when dropdown\'s active props changes.',
    }, {
      name: 'onOpen',
      type: 'function ()',
      desc: 'Callback when dropdown is opened.',
    }, {
      name: 'onClose',
      type: 'function ()',
      desc: 'Callback when dropdown is closed.',
    }, {
      name: 'closeOnClickOutside',
      type: 'boolean',
      desc: 'Close the dropdown when mouse click outside of the dropdown',
    },
  ],
  exampleCode: DropdownExampleFirstCode,
  exampleComponent: DropdownExampleFirst,
  exampleCodeHeader: '1. Dropdown:',
  exampleCodeDescription: 'Use when presenting a set of actions in a disclosable menu.',
  exampleCode1: DropdownExampleSecondCode,
  exampleComponent1: DropdownExampleSecond,
  exampleCodeHeader1: '2. Up Dropdown:',
  exampleCodeDescription1: 'Dropdown that opens in up direction.',
  exampleCode2: DropdownExampleThirdCode,
  exampleComponent2: DropdownExampleThird,
  exampleCodeHeader2: '3. Left Dropdown:',
  exampleCodeDescription2: 'Dropdown that opens in left direction.',
  exampleCode3: DropdownExampleFourthCode,
  exampleComponent3: DropdownExampleFourth,
  exampleCodeHeader3: '4. Right Dropdown:',
  exampleCodeDescription3: 'Dropdown that opens in right direction.',
  exampleCode4: DropdownExampleFifthCode,
  exampleComponent4: DropdownExampleFifth,
  exampleCodeHeader4: '5. Disable Dropdown:',
  exampleCodeDescription4: 'A disabled dropdown does not allow user interaction.',
};

export default DropdownState;
