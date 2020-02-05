import { IDocument } from '../../Types';
import ChipExampleFirst from '../../examples/ChipExample/ChipExampleFirst';
import ChipExampleSecond from '../../examples/ChipExample/ChipExampleSecond';
import ChipExampleThird from '../../examples/ChipExample/ChipExampleThird';
import ChipExampleFourth from '../../examples/ChipExample/ChipExampleFourth';
import ChipExampleFifth from '../../examples/ChipExample/ChipExampleFifth';

const ChipExampleCodeFirst = require('!raw-loader!../../examples/ChipExample/ChipExampleFirst') as string;
const ChipExampleCodeSecond = require('!raw-loader!../../examples/ChipExample/ChipExampleSecond') as string;
const ChipExampleCodeThird = require('!raw-loader!../../examples/ChipExample/ChipExampleThird') as string;
const ChipExampleCodeFourth = require('!raw-loader!../../examples/ChipExample/ChipExampleFourth') as string;
const ChipExampleCodeFifth = require('!raw-loader!../../examples/ChipExample/ChipExampleFifth') as string;

const ChipState: IDocument = {
  id: 'chip',
  heading: 'Chip',
  subheading: 'Chips represent complex entities in small blocks. A chip may contain brief information in the form of a photo, icon, and/or short text.',
  property: [
    {
      name: 'image',
      type: 'obj{url,alt}',
      desc: 'The image url and alt tag that will be shown in the chip.',
    }, {
      name: 'children',
      type: 'string',
      desc: 'The content to display inside chip.',
    }, {
      name: 'trasparent',
      type: 'boolean',
      desc: 'Make the chip transparent.',
    }, {
      name: 'clickable',
      type: 'boolean',
      desc: 'Makes the chips body area clickable.',
    }, {
      name: 'removable',
      type: 'boolean',
      desc: 'Enables the deletion of chips through the remove icon or the Delete/Backspace key.',
    }, {
      name: 'onRemove',
      type: 'function()',
      desc: 'Fired when remove button on chip is clicked.',
    }, {
      name: 'onClick',
      type: 'function()',
      desc: 'Makes the chips body area clickable.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: ChipExampleCodeFirst,
  exampleComponent: ChipExampleFirst,
  exampleCodeHeader: '1. Default Chip:',
  exampleCodeDescription: 'Use to show simple entity or information.',
  exampleCode1: ChipExampleCodeSecond,
  exampleComponent1: ChipExampleSecond,
  exampleCodeHeader1: '2. Image Chip:',
  exampleCodeDescription1: 'Use to show entity with its image.',
  exampleCode2: ChipExampleCodeThird,
  exampleComponent2: ChipExampleThird,
  exampleCodeHeader2: '3. Clickable Chip:',
  exampleCodeDescription2: 'Make chip clickable.',
  exampleCode3: ChipExampleCodeFourth,
  exampleComponent3: ChipExampleFourth,
  exampleCodeHeader3: '4. Removable Chip:',
  exampleCodeDescription3: 'Make chip removable.',
  exampleCode4: ChipExampleCodeFifth,
  exampleComponent4: ChipExampleFifth,
  exampleCodeHeader4: '5. Transparent Chip',
  exampleCodeDescription4: 'Use to show entity with transparent background.',
};

export default ChipState;
