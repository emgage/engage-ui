import { IDocument } from '../../Types';
import ClickableChipExampleFirst from '../../examples/ClickableChipExample/ClickableChipExampleFirst';
import ClickableChipExampleSecond from '../../examples/ClickableChipExample/ClickableChipExampleSecond';

const ClickableChipExampleFirstCode = require('!raw-loader!../../examples/ClickableChipExample/ClickableChipExampleFirst') as string;
const ClickableChipExampleSecondCode = require('!raw-loader!../../examples/ClickableChipExample/ClickableChipExampleSecond') as string;

const ClickableChipState: IDocument = {
  id: 'clickablechip',
  heading: 'ClickableChip Component',
  subheading: `ClickableChips is used to provide clickability of Chip component. Clicking on that it displays details.`,
  property: [
    {
      name: 'chip',
      type: 'React.ReactElement<any>',
      desc: 'Chip component is used as property.',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'To provide styling.',
    },{
      name: 'onClick',
      type: 'function',
      desc: 'Function used for clicking the chip.',
    },{
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: ClickableChipExampleFirstCode,
  exampleComponent: ClickableChipExampleFirst,
  exampleCodeExtra: ClickableChipExampleSecondCode,
  exampleComponentExtra: ClickableChipExampleSecond,
};

export default ClickableChipState;
