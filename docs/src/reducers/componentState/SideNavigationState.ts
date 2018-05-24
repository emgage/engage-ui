import { IDocument } from '../../Types';
import SideNavigationExampleFirst from '../../examples/SideNavigationExample/SideNavigationExampleFirst';

const SideNavigationExampleFirstCode = require('!raw-loader!../../examples/SideNavigationExample/SideNavigationExampleFirst') as string;

const SideNavigationState: IDocument = {
  id: 'sidenavigation',
  heading: 'SideNavigation',
  subheading: `SideNavigation is something like drawer which can be used to contain different components`,
  property: [
    {
      name: 'accordian',
      type: 'boolean',
      desc: 'To show or hide accordian.',
    },{
      name: 'url',
      type: 'string',
      desc: 'To dispay the url to fetch the json file data.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: SideNavigationExampleFirstCode,
  exampleComponent: SideNavigationExampleFirst,
  exampleCodeHeader: '1. SideNavigation with slide mode & collapsible to icons visibility wih tooltip',
  exampleCodeDescription: 'SideNavigation wrapper which can contain multiple sideNavigation menu items & which can be trigger from any button. The itemscan have child items as well.',
};

export default SideNavigationState;
