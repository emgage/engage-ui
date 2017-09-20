import { IDocument } from '../../Types';
import LinkExampleFirst from '../../examples/LinkExample/LinkExampleFirst';
import LinkExampleSecond from '../../examples/LinkExample/LinkExampleSecond';

const LinkExampleFirstCode = require('!raw-loader!../../examples/LinkExample/LinkExampleFirst') as string;
const LinkExampleSecondCode = require('!raw-loader!../../examples/LinkExample/LinkExampleSecond') as string;

const LinkState: IDocument = {
  id: 'Link',
  heading: 'Link Component',
  subheading: `Links are used to embed actions or pathways to more information in a sentence.`,
  property: [
    {
      name: 'url',
      type: 'string',
      desc: 'The url to link to.',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'The content to display inside link.',
    }, {
      name: 'external',
      type: 'boolean',
      desc: 'Use for a links that open a different site',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    }, {
      name: 'onClick',
      type: 'void',
      desc: '	Callback when a link is clicked',
    },
  ],
  exampleCode: LinkExampleFirstCode,
  exampleComponent: LinkExampleFirst,
  exampleCodeExtra: LinkExampleSecondCode,
  exampleComponentExtra: LinkExampleSecond,
};

export default LinkState;
