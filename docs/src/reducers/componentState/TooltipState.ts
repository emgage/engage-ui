import { IDocument } from '../../Types';
import TooltipExampleFirst from '../../examples/TooltipExample/TooltipExampleFirst';
import TooltipExampleSecond from '../../examples/TooltipExample/TooltipExampleSecond';

const TooltipExampleFirstCode = require('!raw-loader!../../examples/TooltipExample/TooltipExampleFirst') as string;
const TooltipExampleSecondCode = require('!raw-loader!../../examples/TooltipExample/TooltipExampleSecond') as string;

const TooltipState: IDocument = {
  id: 'tooltip',
  heading: 'Tooltip Component',
  subheading: `Tooltips are floating labels that briefly explain the function of a user interface element. They can be triggered when merchants hover, focus, tap, or click.`,
  property: [
    {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'The children that activate the tooltip.',
    }, {
      name: 'content',
      type: 'string',
      desc: 'The content to display within the tooltip.',
    }, {
      name: 'active',
      type: 'boolean',
      desc: 'Toggle whether the tooltip is visible.',
    }, {
      name: 'light',
      type: 'boolean',
      desc: 'Display tooltip with a light background.',
    }, {
      name: 'preferredPosition',
      type: 'PreferredPosition(above | below | mostSpace)',
      desc: 'The direction the tooltip tries to display.',
    },{
      name: 'activatorWrapper',
      type: 'string',
      desc: 'The element type to wrap the activator in.',
    },{
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: TooltipExampleFirstCode,
  exampleComponent: TooltipExampleFirst,
  exampleCodeExtra: TooltipExampleSecondCode,
  exampleComponentExtra: TooltipExampleSecond,
};

export default TooltipState;
