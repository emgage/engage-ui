import { IDocument } from '../../Types';
import AvatarExampleFirst from '../../examples/AvatarExample/AvatarExampleFirst';

const AvatarExampleCodeFirst = require('!raw-loader!../../examples/AvatarExample/AvatarExampleFirst') as string;

const avatarState: IDocument = {
  id: 'avatar',
  heading: 'Avatar Component',
  subheading: `Avatars are used to show a thumbnail representation of an individual or business in the interface.`,

  property: [
    {
      name: 'size',
      type: 'size',
      desc: 'Size of avatar small, medium or large',
    }, {
      name: 'name',
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
};

export default avatarState;
