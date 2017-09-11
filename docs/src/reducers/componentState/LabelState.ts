import { IDocument } from '../../Types';
import LabelExampleFirst from '../../examples/LabelExample/LabelExampleFirst';
import LabelExampleSecond from '../../examples/LabelExample/LabelExampleSecond';

const LabelExampleFirstCode = require('!raw-loader!../../examples/LabelExample/LabelExampleFirst') as string;
const LabelExampleSecondCode = require('!raw-loader!../../examples/LabelExample/LabelExampleSecond') as string;

const LabelState: IDocument = {
  id: 'label',
  heading: 'Label Component',
  subheading: `Label component is used to provide label to any item or other component.`,
  property: [
    {
      name: 'children',
      type: 'string',
      desc: 'Content to display.',
    }, {
      name: 'id',
      type: 'string',
      desc: 'Set id of label.',
    }, {
      name: 'action',
      type: 'Action',
      desc: 'Perform Actions.',
    }, {
      name: 'hidden',
      type: 'boolean',
      desc: 'Display label or not.',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'To provide styling.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    }, {
      name: 'required',
      type: 'boolean',
      desc: 'Set as required or not.',
    }, {
      name: 'focused',
      type: 'boolean',
      desc: 'Set as focused or not.',
    }, {
      name: 'hasValue',
      type: 'boolean',
      desc: 'Provide values.',
    },
  ],
  exampleCode: LabelExampleFirstCode,
  exampleComponent: LabelExampleFirst,
  exampleCodeExtra: LabelExampleSecondCode,
  exampleComponentExtra: LabelExampleSecond,
};

export default LabelState;
