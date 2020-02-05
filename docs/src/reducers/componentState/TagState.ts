import { IDocument } from '../../Types';
import TagExample from '../../examples/TagExample/TagExample';

const TagExampleCode = require('!raw-loader!../../examples/TagExample/TagExample') as string;

const TagState: IDocument = {
  id: 'tag',
  heading: 'Tag',
  subheading: 'Tags represent a set of interactive, user-supplied keywords that help label, organize, and categorize objects. Tags can be added or removed from an object by users.',
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
  exampleCodeHeader: 'Example 1: Default Tag',
  exampleCodeDescription: 'Use to represent a list of attributes on an object that can be added or removed.',
  exampleCode: TagExampleCode,
  exampleComponent: TagExample,
};

export default TagState;
