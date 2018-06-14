import { IDocument } from '../../Types';
import PopoverExampleFirst from '../../examples/PopoverExample/PopoverExampleFirst';
import PopoverExampleSecond from '../../examples/PopoverExample/PopoverExampleSecond';
import PopoverExampleThird from '../../examples/PopoverExample/PopoverExampleThird';
import PopoverExampleFourth from '../../examples/PopoverExample/PopoverExampleFourth';

const PopoverExampleFirstCode = require('!raw-loader!../../examples/PopoverExample/PopoverExampleFirst') as string;
const PopoverExampleSecondCode = require('!raw-loader!../../examples/PopoverExample/PopoverExampleSecond') as string;
const PopoverExampleThirdCode = require('!raw-loader!../../examples/PopoverExample/PopoverExampleThird') as string;
const PopoverExampleFourthCode = require('!raw-loader!../../examples/PopoverExample/PopoverExampleFourth') as string;

const PopoverState: IDocument = {
  id: 'popover',
  heading: 'Popover Component',
  subheading: `Popover are small overlays that open on demand, usually when the merchant clicks a button. They let users access supplementary actions without cluttering the page.`,
  property: [
    {
      name: 'anchorEl',
      type: 'HtmlElement',
      desc: 'This is the DOM element that will be used to set the position of the popover.',
    }, {
      name: 'direction',
      type: 'enum',
      desc: 'The direction to open the popover. Available options: up | down | left | right',
    }, {
      name: 'active',
      type: 'boolean',
      desc: 'Show or hide the Popover.',
    }, {
      name: 'activatorWrapper',
      type: 'string',
      desc: 'The element type to wrap the activator with.',
    }, {
      name: 'toggle',
      type: 'function ()',
      desc: 'Callback when popover\'s active props changes.',
    }, {
      name: 'onClose',
      type: 'function ()',
      desc: 'Callback when popover is closed.',
    }, {
      name: 'onOpen',
      type: 'function ()',
      desc: 'Callback when popover is opened.',
    }, {
      name: 'closeOnClickOutside',
      type: 'boolean',
      desc: 'Close the popover when mouse click outside of the popover',
    },
  ],
  exampleCode: PopoverExampleFirstCode,
  exampleComponent: PopoverExampleFirst,
  exampleCodeHeader: '1. Popover:',
  exampleCodeDescription: 'Use when presenting a set of actions in a disclosable container.',
  exampleCode1: PopoverExampleSecondCode,
  exampleComponent1: PopoverExampleSecond,
  exampleCodeHeader1: '2. Up Popover:',
  exampleCodeDescription1: 'Popover that opens in up direction.',
  exampleCode2: PopoverExampleThirdCode,
  exampleComponent2: PopoverExampleThird,
  exampleCodeHeader2: '3. Left Popover:',
  exampleCodeDescription2: 'Popover that opens in left direction.',
  exampleCode3: PopoverExampleFourthCode,
  exampleComponent3: PopoverExampleFourth,
  exampleCodeHeader3: '4. Right Popover:',
  exampleCodeDescription3: 'Popover that opens in right direction.',
};

export default PopoverState;
