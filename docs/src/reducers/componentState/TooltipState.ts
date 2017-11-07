import { IDocument } from '../../Types';
import TooltipExample from '../../examples/TooltipExample/TooltipExample';
import TooltipExample1 from '../../examples/TooltipExample/TooltipExample1';
import TooltipExample2 from '../../examples/TooltipExample/TooltipExample2';
import TooltipExample3 from '../../examples/TooltipExample/TooltipExample3';

const TooltipExampleCode = require('!raw-loader!../../examples/TooltipExample/TooltipExample') as string;
const TooltipExample1Code = require('!raw-loader!../../examples/TooltipExample/TooltipExample1') as string;
const TooltipExample2Code = require('!raw-loader!../../examples/TooltipExample/TooltipExample2') as string;
const TooltipExample3Code = require('!raw-loader!../../examples/TooltipExample/TooltipExample3') as string;

const TooltipState: IDocument = {
  id: 'tooltip',
  heading: 'Tooltip',
  subheading: `Tooltips are floating labels that briefly explain the function of a user interface element. They can be triggered when users hover, focus, tap, or click.`,
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
      type: 'enum',
      desc: 'The direction the tooltip tries to display Availabel options: above | below | mostSpace ',
    }, {
      name: 'activatorWrapper',
      type: 'string',
      desc: 'The element type to wrap the activator in.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCodeHeader: 'Example 1: Default Tooltip',
  exampleCodeDescription: 'Use only when necessary to provide an explanation for an interface element.',
  exampleCode: TooltipExampleCode,
  exampleComponent: TooltipExample,
  exampleCodeHeader1: 'Example 2: Tooltip with active property',
  exampleCodeDescription1: 'Use when users need to Show or Hide tooltip on an element.',
  exampleCode1: TooltipExample1Code,
  exampleComponent1: TooltipExample1,
  exampleCodeHeader2: 'Example 3: Tooltip with light property',
  exampleCodeDescription2: 'Use when users need to Show tooltip with light background.',
  exampleCode2: TooltipExample2Code,
  exampleComponent2: TooltipExample2,
  exampleCodeHeader3: 'Example 4: Tooltip with preferredPosition and activatorWrapper property',
  exampleCodeDescription3: 'User can set the direction the tooltip tries to display and can also render Tooltip on any other element.',
  exampleCode3: TooltipExample3Code,
  exampleComponent3: TooltipExample3,
};

export default TooltipState;
