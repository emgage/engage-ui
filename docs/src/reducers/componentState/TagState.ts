import { IDocument } from '../../Types';
import TagExampleFirst from '../../examples/TagExample/TagExampleFirst';

const TagExampleFirstCode = require('!raw-loader!../../examples/TagExample/TagExampleFirst') as string;

const TagState: IDocument = {
  id: 'Tag',
  heading: 'Tag Component',
  subheading: `Tags represent a set of interactive, merchant-supplied keywords that help label, organize, and categorize objects. Tags can be added or removed from an object by merchants.`,
  property: [
    {
      name: 'children',
      type: 'string',
      desc: 'Content to display in the tag.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    }, {
      name: 'onRemove',
      type: 'void',
      desc: 'Callback when tag is removed.',
    },
  ],
  exampleCode: TagExampleFirstCode,
  exampleComponent: TagExampleFirst,
};

export default TagState;
