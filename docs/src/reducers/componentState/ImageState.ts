import { IDocument } from '../../Types';
import ImageExampleFirst from '../../examples/ImageExample/ImageExampleFirst';

const ImageExampleFirstCode = require('!raw-loader!../../examples/ImageExample/ImageExampleFirst') as string;


const ImageState: IDocument = {
  id: 'Image',
  heading: 'Image Component',
  subheading: `display the Image.`,
  property: [
    {
      name: 'alt',
      type: 'string',
      desc: 'Alt text for the image.',
    }, {
      name: 'source',
      type: 'string',
      desc: 'URL for the image.',
    }, {
      name: 'sourceSet',
      type: 'SourceSet[](source: string, descriptor: string)',
      desc: 'To display the source url set of the image.',
    },
  ],

  exampleCode: ImageExampleFirstCode,
  exampleComponent: ImageExampleFirst,
};

export default ImageState;
