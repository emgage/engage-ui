import { IDocument } from '../../Types';
import UnstyledLinkExampleFirst from '../../examples/UnstyledLinkExample/UnstyledLinkExampleFirst';
import UnstyledLinkExampleSecond from '../../examples/UnstyledLinkExample/UnstyledLinkExampleSecond';

const UnstyledLinkExampleFirstCode = require('!raw-loader!../../examples/UnstyledLinkExample/UnstyledLinkExampleFirst') as string;
const UnstyledLinkExampleSecondCode = require('!raw-loader!../../examples/UnstyledLinkExample/UnstyledLinkExampleSecond') as string;

const UnstyledLinkState: IDocument = {
  id: 'UnstyledLink',
  heading: 'UnstyledLink Component',
  subheading: `UnstyledLink Component is used to open URL.`,
  property: [
    {
      name: 'url',
      type: 'string',
      desc: 'To display the Url Link.',
    }, {
      name: 'external',
      type: 'boolean',
      desc: 'To display externally(open in new tab) or not.',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'Content to display in the UnstyledLink.',
    }, {
      name: 'key: string',
      type: 'any',
      desc: 'To display inside the key.',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'To display the styling.',
    },
  ],
  exampleCode: UnstyledLinkExampleFirstCode,
  exampleComponent: UnstyledLinkExampleFirst,
  exampleCodeExtra: UnstyledLinkExampleSecondCode,
  exampleComponentExtra: UnstyledLinkExampleSecond,
};

export default UnstyledLinkState;
