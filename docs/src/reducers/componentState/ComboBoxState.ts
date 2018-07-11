import { IDocument } from '../../Types';
import ComboBoxExampleFirst from '../../examples/ComboBoxExample/ComboBoxExampleFirst';
import ComboBoxExampleSecond from '../../examples/ComboBoxExample/ComboBoxExampleSecond';
import ComboBoxExampleThird from '../../examples/ComboBoxExample/ComboBoxExampleThird';
import ComboBoxExampleFourth from '../../examples/ComboBoxExample/ComboBoxExampleFourth';

const ComboBoxExampleCodeFirst = require('!raw-loader!../../examples/ComboBoxExample/ComboBoxExampleFirst') as string;
const ComboBoxExampleCodeSecond = require('!raw-loader!../../examples/ComboBoxExample/ComboBoxExampleSecond') as string;
const ComboBoxExampleCodeThird = require('!raw-loader!../../examples/ComboBoxExample/ComboBoxExampleThird') as string;
const ComboBoxExampleCodeFourth = require('!raw-loader!../../examples/ComboBoxExample/ComboBoxExampleFourth') as string;

const ComboBoxState: IDocument = {
  id: 'combobox',
  heading: 'CpmboBox',
  subheading: `Create a list of searchable combobox, with support of rendering different components.`,
  property: [
    {
      name: 'items',
      type: 'ComboBoxProps',
      desc: 'Items of the combobox',
    }, {
      name: 'label',
      type: 'String',
      desc: 'Label to attach with Combobox',
    }, {
      name: 'style',
      type: 'object',
      desc: 'To add custom style to the combobox list.',
    }
  ],
  exampleCode: ComboBoxExampleCodeFirst,
  exampleComponent: ComboBoxExampleFirst,
  exampleCodeHeader: '1. Simple Combobox:',
  exampleCodeDescription: 'Combobox with list of items.',

  exampleCode1: ComboBoxExampleCodeSecond,
  exampleComponent1: ComboBoxExampleSecond,
  exampleCodeHeader1: '2. Object Combobox:',
  exampleCodeDescription1: 'Combobox with list of items as object',

  exampleCode2: ComboBoxExampleCodeThird,
  exampleComponent2: ComboBoxExampleThird,
  exampleCodeHeader2: '3. Combobox with Accordion:',
  exampleCodeDescription2: 'Combobox containing accordian as items',

  exampleCode3: ComboBoxExampleCodeFourth,
  exampleComponent3: ComboBoxExampleFourth,
  exampleCodeHeader3: '4. Combobox with custom rendering:',
  exampleCodeDescription3: 'Combobox containing accordian as items and render custom.'

  //
};

export default ComboBoxState;
