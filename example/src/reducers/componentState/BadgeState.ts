import { IDocument } from '../../Types';
import BadgeExampleFirst from '../../examples/BadgeExample/BadgeExampleFirst';

const BadgeExampleCodeFirst = require('!raw-loader!../../examples/BadgeExample/BadgeExampleFirst') as string;

const BadgeState: IDocument = {
  id: 'badge',
  heading: 'Badge Component',
  subheading: `Badges are used to inform of the status of a piece of information or of an action that’s been taken.`,

  property: [
    {
      name: 'children',
      type: 'string',
      desc: 'The content to display inside the badge',
    }, {
      name: 'status',
      type: 'Status',
      desc: 'Set the color of the badge for the given status',
    }, {
      name: 'progress',
      type: 'Progress',
      desc: 'Set the status of the badge',
    },{
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: BadgeExampleCodeFirst,
  exampleComponent: BadgeExampleFirst,
};

export default BadgeState;
