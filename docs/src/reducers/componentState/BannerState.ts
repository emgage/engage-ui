import { IDocument } from '../../Types';
import BannerExampleFirst from '../../examples/BannerExample/BannerExampleFirst';
import BannerExampleSecond from '../../examples/BannerExample/BannerExampleSecond';
import BannerExampleThird from '../../examples/BannerExample/BannerExampleThird';
import BannerExampleFourth from '../../examples/BannerExample/BannerExampleFourth';
import BannerExampleFifth from '../../examples/BannerExample/BannerExampleFifth';
import BannerExampleSixth from '../../examples/BannerExample/BannerExampleSixth';
import BannerExampleSeventh from '../../examples/BannerExample/BannerExampleSeventh';

const BannerExampleCodeFirst = require('!raw-loader!../../examples/BannerExample/BannerExampleFirst') as string;
const BannerExampleCodeSecond = require('!raw-loader!../../examples/BannerExample/BannerExampleSecond') as string;
const BannerExampleCodeThird = require('!raw-loader!../../examples/BannerExample/BannerExampleThird') as string;
const BannerExampleCodeFourth = require('!raw-loader!../../examples/BannerExample/BannerExampleFourth') as string;
const BannerExampleCodeFifth = require('!raw-loader!../../examples/BannerExample/BannerExampleFifth') as string;
const BannerExampleCodeSixth = require('!raw-loader!../../examples/BannerExample/BannerExampleSixth') as string;
const BannerExampleCodeSeventh = require('!raw-loader!../../examples/BannerExample/BannerExampleSeventh') as string;

const BannerState: IDocument = {
  id: 'banner',
  heading: 'Banner',
  subheading: `Banners are used to inform about important changes or persistent conditions.
               They’re one of the most prominent ways to communicate. Banners show at the top
               of the page or section they apply to.`,
  property: [
    {
      name: 'ariaLabel',
      type: 'string',
      desc: 'Sets aria-label that is used to provide the banner to any assistive technologies',
    }, {
      name: 'icon',
      type: 'IconProps',
      desc: 'Icon to display in the banner',
    }, {
      name: 'title',
      type: 'string',
      desc: 'Title content for the banner',
    }, {
      name: 'status',
      type: 'Status',
      desc: 'Sets the status of the banner. It can be success, info, warning or critical',
    }, {
      name: 'action',
      type: 'Action',
      desc: 'Action for banner',
    }, {
      name: 'secondaryAction',
      type: 'Action',
      desc: 'Displays a secondary action',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'The child elements to render in the banner',
    }, {
      name: 'onDismiss',
      type: 'function()',
      desc: 'Callback when banner is dismissed',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: BannerExampleCodeFirst,
  exampleComponent: BannerExampleFirst,
  exampleCodeHeader: '1. Default Banner:',
  exampleCodeDescription: 'Use to give general information or actions',
  exampleCode1: BannerExampleCodeSecond,
  exampleComponent1: BannerExampleSecond,
  exampleCodeHeader1: '2. Success Banner:',
  exampleCodeDescription1: 'Use to inform user when actions are successfully completed',
  exampleCode2: BannerExampleCodeThird,
  exampleComponent2: BannerExampleThird,
  exampleCodeHeader2: '3. Informational Banner:',
  exampleCodeDescription2: 'Use to update user about a change',
  exampleCode3: BannerExampleCodeFourth,
  exampleComponent3: BannerExampleFourth,
  exampleCodeHeader3: '4. Warning Banner:',
  exampleCodeDescription3: 'Use to display information that needs attention',
  exampleCode4: BannerExampleCodeFifth,
  exampleComponent4: BannerExampleFifth,
  exampleCodeHeader4: '5. Critical Banner:',
  exampleCodeDescription4: 'Use to display problems or showing issues',
  exampleCode5: BannerExampleCodeSixth,
  exampleComponent5: BannerExampleSixth,
  exampleCodeHeader5: '6. Dismissible Banner:',
  exampleCodeDescription5: 'Make banner dismissible',
  exampleCode6: BannerExampleCodeSeventh,
  exampleComponent6: BannerExampleSeventh,
  exampleCodeHeader6: '7. Banner with footer call-to-action:',
  exampleCodeDescription6: 'Use to give information with action in the Banner',
};

export default BannerState;
