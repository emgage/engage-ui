import { IDocument } from '../../Types';
import LinkExampleFirst from '../../examples/LinkExample/LinkExampleFirst';
import LinkExampleSecond from '../../examples/LinkExample/LinkExampleSecond';
import LinkExampleThird from '../../examples/LinkExample/LinkExampleThird';

const LinkExampleFirstCode = require('!raw-loader!../../examples/LinkExample/LinkExampleFirst') as string;
const LinkExampleSecondCode = require('!raw-loader!../../examples/LinkExample/LinkExampleSecond') as string;
const LinkExampleThirdCode = require('!raw-loader!../../examples/LinkExample/LinkExampleThird') as string;

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
  exampleCodeHeader: '1. Link with url prop:',
  exampleCodeDescription: 'Use for text links in larger spans of text.',
  exampleCode1: LinkExampleSecondCode,
  exampleComponent1: LinkExampleSecond,
  exampleCodeHeader1: '2. Link with url and external prop:',
  exampleCodeDescription1: 'Use for text links in larger spans of text in new tab.',
  exampleCode2: LinkExampleThirdCode,
  exampleComponent2: LinkExampleThird,
  exampleCodeHeader2: '3. Link with onclick prop:',
  exampleCodeDescription2: 'Use for text links in larger spans of text with onclick prop.',
};

export default LinkState;
