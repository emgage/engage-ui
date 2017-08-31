import { IDocument } from '../../Types';
import LabelledExampleFirst from '../../examples/LabelledExample/LabelledExampleFirst';

import LabelledExampleSecond from '../../examples/LabelledExample/LabelledExampleSecond';

const  LabelledExampleCode = require('!raw-loader!../../examples/LabelledExample/LabelledExampleFirst') as string;
const  LabelledExampleSecondCode = require('!raw-loader!../../examples/LabelledExample/LabelledExampleSecond') as string;

const  LabelledState: IDocument = {
  id: 'labelled',
  heading: 'Labelled Component',
  subheading: `Labelled component used to provide label to any item or other component.`,
  property: [
    {
      name: 'id',
      type: 'string',
      desc: 'Set id of label.',
    }, {
      name: 'label',
      type: 'String',
      desc: 'To display the text of label.',
    }, {
      name: 'errors',
      type: '[string] | Error',
      desc: 'To display the errors.',
    }, {
      name: 'action',
      type: 'action',
      desc: 'To Perform Actions.',
    }, {
      name: 'helpText',
      type: 'React.ReactNode',
      desc: 'To display the helpingtext.',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'Content to display.',
    }, {
      name: 'labelHidden',
      type: 'boolean',
      desc: 'Display label or not.',
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
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'To provide styling.',
    }, {
      name: 'theme',
      type: 'React.CSSProperties',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCode: LabelledExampleCode,
  exampleComponent: LabelledExampleFirst,
  exampleCodeExtra: LabelledExampleSecondCode,
  exampleComponentExtra: LabelledExampleSecond,
};

export default LabelledState;
