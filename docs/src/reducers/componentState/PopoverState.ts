import { IDocument } from '../../Types';
import PopoverExampleFirst from '../../examples/PopoverExample/PopoverExampleFirst';
import PopoverExampleSecond from '../../examples/PopoverExample/PopoverExampleSecond';
import PopoverExampleThird from '../../examples/PopoverExample/PopoverExampleThird';

const PopoverExampleFirstCode = require('!raw-loader!../../examples/PopoverExample/PopoverExampleFirst') as string;
const PopoverExampleSecondCode = require('!raw-loader!../../examples/PopoverExample/PopoverExampleSecond') as string;
const PopoverExampleThirdCode = require('!raw-loader!../../examples/PopoverExample/PopoverExampleThird') as string;

const PopoverState: IDocument = {
  id: 'popover',
  heading: 'Popover Component',
  subheading: `Popovers are small overlays that open on demand, usually when the merchant clicks a button. They let users access supplementary content and actions without cluttering the page.`,
  property: [
    {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'The content to display inside the popover.',
    }, {
      name: 'preferredPosition',
      type: 'PreferredPosition (above | below | mostSpace)',
      desc: 'The preferred direction to open the popover.',
    }, {
      name: 'active',
      type: 'boolean',
      desc: 'Show or hide the Popover.',
    }, {
      name: 'activator',
      type: 'React.ReactElement<any>',
      desc: 'The element to activate the Popover.',
    }, {
      name: 'activatorWrapper',
      type: 'string',
      desc: 'The element type to wrap the activator with.',
    }, {
      name: 'preventAutofocus',
      type: 'boolean',
      desc: 'Prevent automatic focus of the first field on activation.',
    }, {
      name: 'sectioned',
      type: 'boolean',
      desc: 'Automatically add wrap content in a section.',
    }, {
      name: 'onClose',
      type: 'function (source: CloseSource [ Click, EscapeKeypress, FocusOut, ScrollOut ] )',
      desc: 'Callback when popover is closed.',
    },
  ],
  exampleCode: PopoverExampleFirstCode,
  exampleComponent: PopoverExampleFirst,
  exampleCodeHeader: '1. Popover with ActionList:',
  exampleCodeDescription: 'Use when presenting a set of actions in a disclosable menu.',
  exampleCode1: PopoverExampleSecondCode,
  exampleComponent1: PopoverExampleSecond,
  exampleCodeHeader1: '2. Popover with Content and Actions:',
  exampleCodeDescription1: 'Use to present a combination of content, instructions, and actions is a panel for tasks that are of low or secondary importance to the current page. When used this way, popovers provide useful entry points to related features without overwhelming users.',
  exampleCode2: PopoverExampleThirdCode,
  exampleComponent2: PopoverExampleThird,
  exampleCodeHeader2: '2. Popover with Form Components:',
  exampleCodeDescription2: 'Use to present secondary input tasks on demand.',
};

export default PopoverState;
