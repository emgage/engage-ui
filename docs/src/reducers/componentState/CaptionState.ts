import { IDocument } from '../../Types';
import CaptionExampleFirst from '../../examples/CaptionExample/CaptionExampleFirst';

const CaptionExampleFirstCode = require('!raw-loader!../../examples/CaptionExample/CaptionExampleFirst') as string;

const CaptionState : IDocument = {
  id: 'caption',
  heading: 'Caption',
  subheading: 'Caption text size is smaller than the recommended size for general reading. It should be used only in a graph or as a timestamp in a list.',
  property: [
    {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'The content to display',
    }, {
      name: 'componentStyle',
      type: 'React.CSSProperties',
      desc: 'Set the style via css',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCodeHeader: '1. Default Caption:',
  exampleCodeDescription: 'Use to provide details in situations where content is compact and space is tight.',
  exampleComponent: CaptionExampleFirst,
  exampleCode: CaptionExampleFirstCode,
};

export default CaptionState;
