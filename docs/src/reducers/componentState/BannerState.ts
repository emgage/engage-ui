import { IDocument } from '../../Types';
import BannerExampleFirst from '../../examples/BannerExample/BannerExampleFirst';
import BannerExampleSecond from '../../examples/BannerExample/BannerExampleSecond';

const BannerExampleCodeFirst = require('!raw-loader!../../examples/BannerExample/BannerExampleFirst') as string;
const BannerExampleCodeSecond = require('!raw-loader!../../examples/BannerExample/BannerExampleSecond') as string;

const BannerState: IDocument = {
  id: 'banner',
  heading: 'Banner Component',
  subheading: `Banners are used to inform about important changes or persistent conditions.
               They’re one of the most prominent ways to communicate. Banners show at the top
               of the page or section they apply to.`,

  property: [
    {
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
      desc: 'Sets the status of the banner',
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
  exampleCodeExtra: BannerExampleCodeSecond,
  exampleComponentExtra: BannerExampleSecond,
};

export default BannerState;
