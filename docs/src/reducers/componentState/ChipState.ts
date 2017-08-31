import { IDocument } from '../../Types';
import ChipExampleFirst from '../../examples/ChipExample/ChipExampleFirst';

const ChipExampleFirstCode = require('!raw-loader!../../examples/ChipExample/ChipExampleFirst') as string;

const ChipState: IDocument = {
  id: 'chip',
  heading: 'Chip Component',
  subheading: `Chips represent complex entities in small blocks. A chip may contain brief information in the form of a photo, icon, and/or short text.`,
  property: [
    {
      name: 'Image',
      type: 'obj{url,alt}',
      desc: 'The image url and alt tag that will be shown in the chip.',
    }, {
      name: 'Trasparent',
      type: 'boolean',
      desc: 'Is the chip transparent?',
    }, {
      name: 'Clickable',
      type: 'boolean',
      desc: 'Makes the chips body area clickable.',
    }, {
      name: 'Removable',
      type: 'boolean',
      desc: 'Enables the deletion of chips through the remove icon or the Delete/Backspace key.',
    }, {
      name: 'OnRemove',
      type: 'function(event: any)',
      desc: 'Fired when remove button on chip is clicked.',
    }, {
      name: 'OnClick',
      type: 'function(event: any)',
      desc: 'Makes the chips body area clickable.',
    }, {
      name: 'moreInfoComponent',
      type: 'React.ReactNode',
      desc: '',
    }, {
      name: 'moreInfoComponentShowOn',
      type: 'DisplayMoreInfo:{onHover, onClick}',
      desc: '',
    }, {
      name: 'handleMoreInfo',
      type: 'function()',
      desc: '',
    },
  ],
  exampleCode: ChipExampleFirstCode,
  exampleComponent: ChipExampleFirst,
};

export default ChipState;
