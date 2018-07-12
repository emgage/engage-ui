import { IDocument } from '../../Types';
import AvatarExampleFirst from '../../examples/AvatarExample/AvatarExampleFirst';
import AvatarExampleSecond from '../../examples/AvatarExample/AvatarExampleSecond';
import AvatarExampleThird from '../../examples/AvatarExample/AvatarExampleThird';

const AvatarExampleCodeFirst = require('!raw-loader!../../examples/AvatarExample/AvatarExampleFirst') as string;
const AvatarExampleCodeSecond = require('!raw-loader!../../examples/AvatarExample/AvatarExampleSecond') as string;
const AvatarExampleCodeThird = require('!raw-loader!../../examples/AvatarExample/AvatarExampleThird') as string;

const avatarState: IDocument = {
  id: 'avatar',
  heading: 'Avatar',
  subheading: `Avatars are used to show a thumbnail representation of an individual or business in the interface.`,
  property: [
    {
      name: 'componentSize',
      type: 'Size',
      desc: 'Size of avatar. It can be small, medium or large',
    }, {
      name: 'componentName',
      type: 'string',
      desc: 'Name of the person for avatar',
    }, {
      name: 'initials',
      type: 'string',
      desc: 'Initials of person to display',
    }, {
      name: 'customer',
      type: 'boolean',
      desc: 'Weather avatar is for customer',
    }, {
      name: 'source',
      type: 'string',
      desc: 'URL of the avatar image',
    }, {
      name: 'accessibilityLabel',
      type: 'string',
      desc: 'Accessible label for the avatar image',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: AvatarExampleCodeFirst,
  exampleComponent: AvatarExampleFirst,
  exampleCodeHeader: '1. Default Avatar:',
  exampleCodeDescription: 'It is a simple Avatar without Image and Initials',
  exampleCode1: AvatarExampleCodeSecond,
  exampleComponent1: AvatarExampleSecond,
  exampleCodeHeader1: '2. Initial Avatar:',
  exampleCodeDescription1: 'It is a Avatar with initials',
  exampleCode2: AvatarExampleCodeThird,
  exampleComponent2: AvatarExampleThird,
  exampleCodeHeader2: '3. Image Avatar',
  exampleCodeDescription2: 'It is a Avatar with an image',
};

export default avatarState;
