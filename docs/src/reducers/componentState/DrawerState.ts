import { IDocument } from '../../Types';
import DrawerExampleFirst from '../../examples/DrawerExample/DrawerExampleFirst';

const DrawerExampleFirstCode = require('!raw-loader!../../examples/DrawerExample/DrawerExampleFirst') as string;

const DrawerState: IDocument = {
  id: 'Drawer',
  heading: 'Drawer',
  subheading: `Drawer aka OffCanvas, is something like modal which can be used to contain different components`,
  property: [
    {
      name: 'active',
      type: 'boolean',
      desc: 'To show or hide drawer.',
    }, {
      name: 'children',
      type: 'string',
      desc: 'The content to display inside the drawer.',
    }, {
      name: 'flip',
      type: 'boolean',
      desc: 'Change the position of drawer from left to right',
    }, {
      name: 'mode',
      type: 'string',
      desc: 'Open drawer in slide, push or reveal mode',
    }, {
      name: 'overlay',
      type: 'boolean',
      desc: 'Show the backdrop',
    }, {
      name: 'width',
      type: 'string',
      desc: 'set size of drawer: small, medium, large or any px value',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: DrawerExampleFirstCode,
  exampleComponent: DrawerExampleFirst,
  exampleCodeHeader: '1. Large drawer with slide mode & flip direction (open from right)',
  exampleCodeDescription: 'Drawer wrapper which can contain multiple drawer content & which can be trigger from any button',
};

export default DrawerState;
