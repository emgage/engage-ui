import { IDocument } from '../../Types';
import ClickableChipExampleFirst from '../../examples/ClickableChipExample/ClickableChipExampleFirst';

const ClickableChipExampleFirstCode = require('!raw-loader!../../examples/ClickableChipExample/ClickableChipExampleFirst') as string;

const ClickableChipState: IDocument = {
  id: 'clickablechip',
  heading: 'ClickableChip',
  subheading: `ClickableChips is used to provide clickability of Chip component. Clicking on that it displays details.`,
  property: [
    {
      name: 'chip',
      type: 'React.ReactElement<any>',
      desc: 'Chip component is used as property.',
    }, {
      name: 'onClick',
      type: 'function()',
      desc: 'Function used for clicking the chip.',
    }, {
      name: 'customStyle',
      type: 'React.CSSProperties',
      desc: 'To display the styling.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },

  ],
  exampleCode: ClickableChipExampleFirstCode,
  exampleComponent: ClickableChipExampleFirst,
  exampleCodeHeader: '1. Default ClickableChip:',
  exampleCodeDescription: 'Use to show some entity, when user clicks on it opens a popup.',
};

export default ClickableChipState;
