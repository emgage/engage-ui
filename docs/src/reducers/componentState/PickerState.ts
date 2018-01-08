import { IDocument } from '../../Types';
import PickerExampleFirst from '../../examples/PickerExample/PickerExampleFirst';

const PickerExampleCodeFirst = require('!raw-loader!../../examples/PickerExample/PickerExampleFirst') as string;

const PickerState: IDocument = {
  id: 'picker',
  heading: 'Picker',
  subheading: `Picker component will work like the people picker control. It can get items from a source. User can then filter and add items (in form of chips) to the picker. Optionally, user can remove chips. User can also click chips to open more items.`,
  property: [
    {
      name: 'chipComponent',
      type: 'React.ReactNode',
      desc: 'Component to shown selected item inside the input.',
    }, {
      name: 'filterPlaceHolder',
      type: 'string',
      desc: 'Placerholder inside textfield.',
    }, {
      name: 'searchResultComponent',
      type: 'React.ReactNode',
      desc: 'Component to shown search result item in results dropdown.',
    }, {
      name: 'source',
      type: 'IPickerInfo[]',
      desc: 'The source from where data will be retrieved.',
    }, {
      name: 'maxSelectedItems',
      type: 'number',
      desc: 'If specified, maximum number of items that can be selected.',
    }, {
      name: 'minSelectedItems',
      type: 'number',
      desc: 'If specified, minimum number of items that can be selected.',
    }, {
      name: 'moreInfoComponent',
      type: 'DisplayMoreInfo',
      desc: 'Component to show when chip is clicked or hovered.',
    },
  ],
  exampleCode: PickerExampleCodeFirst,
  exampleComponent: PickerExampleFirst,
};

export default PickerState;
