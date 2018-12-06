import { IDocument } from '../../Types';
import BadgeExampleFirst from '../../examples/BadgeExample/BadgeExampleFirst';
import BadgeExampleSecond from '../../examples/BadgeExample/BadgeExampleSecond';
import BadgeExampleThird from '../../examples/BadgeExample/BadgeExampleThird';
import BadgeExampleFourth from '../../examples/BadgeExample/BadgeExampleFourth';
import BadgeExampleFifth from '../../examples/BadgeExample/BadgeExampleFifth';
import BadgeExampleSixth from '../../examples/BadgeExample/BadgeExampleSixth';
import BadgeExampleSeventh from '../../examples/BadgeExample/BadgeExampleSeventh';
import BadgeExampleEighth from '../../examples/BadgeExample/BadgeExampleEighth';

const BadgeExampleCodeFirst = require('!raw-loader!../../examples/BadgeExample/BadgeExampleFirst') as string;
const BadgeExampleCodeSecond = require('!raw-loader!../../examples/BadgeExample/BadgeExampleSecond') as string;
const BadgeExampleCodeThird = require('!raw-loader!../../examples/BadgeExample/BadgeExampleThird') as string;
const BadgeExampleCodeFourth = require('!raw-loader!../../examples/BadgeExample/BadgeExampleFourth') as string;
const BadgeExampleCodeFifth = require('!raw-loader!../../examples/BadgeExample/BadgeExampleFifth') as string;
const BadgeExampleCodeSixth = require('!raw-loader!../../examples/BadgeExample/BadgeExampleSixth') as string;
const BadgeExampleCodeSeventh = require('!raw-loader!../../examples/BadgeExample/BadgeExampleSeventh') as string;
const BadgeExampleCodeEighth = require('!raw-loader!../../examples/BadgeExample/BadgeExampleEighth') as string;

const BadgeState: IDocument = {
  id: 'badge',
  heading: 'Badge',
  subheading: `Badges are used to inform of the status of a piece of information or of an action that’s been taken.`,
  property: [
    {
      name: 'children',
      type: 'string',
      desc: 'The content to display inside the badge',
    }, {
      name: 'status',
      type: 'Status',
      desc: 'Set the color of the badge for the given status. It can be success, info, attention or warning.',
    }, {
      name: 'progress',
      type: 'Progress',
      desc: 'Show the progress of badge using round indicator. It can be incomplete, partiallyComplete or complete',
    },  {
      name: 'componentStyle',
      type: 'React.CSSProperties',
      desc: 'To display the styling.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: BadgeExampleCodeFirst,
  exampleComponent: BadgeExampleFirst,
  exampleCodeHeader: '1. Default Badge:',
  exampleCode1: BadgeExampleCodeSecond,
  exampleComponent1: BadgeExampleSecond,
  exampleCodeHeader1: '2. Success Badge:',
  exampleCodeDescription1: 'Use to indicate a successful, completed, or desirable state',
  exampleCode2: BadgeExampleCodeThird,
  exampleComponent2: BadgeExampleThird,
  exampleCodeHeader2: '3. Informational Badge:',
  exampleCodeDescription2: 'Use to call out an object or action as having an important attribute',
  exampleCode3: BadgeExampleCodeFourth,
  exampleComponent3: BadgeExampleFourth,
  exampleCodeHeader3: '4. Attention Badge:',
  exampleCodeDescription3: 'It is used when something requires attention',
  exampleCode4: BadgeExampleCodeFifth,
  exampleComponent4: BadgeExampleFifth,
  exampleCodeHeader4: '5. Warning Badge:',
  exampleCodeDescription4: 'Use for the most critical issues that requires attention',
  exampleCode5: BadgeExampleCodeSixth,
  exampleComponent5: BadgeExampleSixth,
  exampleCodeHeader5: '6. Incomplete Badge:',
  exampleCodeDescription5: 'Use to indicate when a given task has not yet been completed',
  exampleCode6: BadgeExampleCodeSeventh,
  exampleComponent6: BadgeExampleSeventh,
  exampleCodeHeader6: '7. Partially Complete Badge:',
  exampleCodeDescription6: 'Use to indicate when a given task has been partially completed',
  exampleCode7: BadgeExampleCodeEighth,
  exampleComponent7: BadgeExampleEighth,
  exampleCodeHeader7: '8. Complete Badge:',
  exampleCodeDescription7: 'Use to indicate when a given task has been completed',
};

export default BadgeState;
