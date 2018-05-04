import { IDocument } from '../../Types';
import BreadcrumbExampleFirst from '../../examples/BreadcrumbExample/BreadcrumbExampleFirst';
import BreadcrumbExampleSecond from '../../examples/BreadcrumbExample/BreadcrumbExampleSecond';

const BreadcrumbExampleFirstCode = require('!raw-loader!../../examples/BreadcrumbExample/BreadcrumbExampleFirst') as string;
const BreadcrumbExampleSecondCode = require('!raw-loader!../../examples/BreadcrumbExample/BreadcrumbExampleSecond') as string;

const BreadcrumbState: IDocument = {
  id: 'Breadcrumb',
  heading: 'Breadcrumb',
  subheading: `The Breadcrumb component consists of links, which are aligned side by side and separated by a divider. Breadcrumbs are a good way to display your current location. This is usually used when you have multiple layers of content.`,
  property: [
    {
      name: 'direction',
      type: 'Direction',
      desc: 'Direction prop defines the direction in which breadcrumb start.',
    }, {
      name: 'source',
      type: 'ISourceData[]',
      desc: 'The content as Array of items, render in breadcrumb.',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'To display the styling.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    }, {
      name: 'onBreadcrumbClick',
      type: 'void',
      desc: 'Callback when clicked.',
    },
  ],
  exampleCode: BreadcrumbExampleFirstCode,
  exampleComponent: BreadcrumbExampleFirst,
  exampleCodeHeader: '1. Basic Breadcrumb:',
  exampleCodeDescription: 'Used most in the interface. It is with ltr direction property.',
  exampleCode1: BreadcrumbExampleSecondCode,
  exampleComponent1: BreadcrumbExampleSecond,
  exampleCodeHeader1: '2. Breadcrumb with Active/Disable item:',
  exampleCodeDescription1: 'Used when need to display disabled or currently active or default item in breadcrumbs.',
};

export default BreadcrumbState;
