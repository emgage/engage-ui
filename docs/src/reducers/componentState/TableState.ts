import { IDocument } from '../../Types';
import TableExample from '../../examples/TableExample/TableExample';

const TableExampleCode = require('!raw-loader!../../examples/TableExample/TableExample') as string;

const TableState: IDocument = {
  id: 'Table',
  heading: 'Table component',
  subheading: `Basic table component, with colspan, rowspan & accessibility options (scope, id & header)`,
  property: [
    {
      name: 'bordered',
      type: 'boolean',
      desc: 'To make table bordered',
    }, {
      name: 'highlight',
      type: 'boolean',
      desc: 'Hightlight rows on hover',
    }, {
      name: 'responsive',
      type: 'boolean',
      desc: 'Coming soon: To make table responsive',
    }, {
      name: 'striped',
      type: 'boolean',
      desc: 'Make all odd rows stripped with light grey background color',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },
  ],
  exampleCodeHeader: 'Basic Table Component',
  exampleCodeDescription: 'Table with header, footer & accessibility',
  exampleCode: TableExampleCode,
  exampleComponent: TableExample,
};

export default TableState;
