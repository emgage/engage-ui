import { IDocument } from '../../Types';
import AccordionExampleFirst from '../../examples/AccordionExample/AccordionExampleFirst';

const AccordionExampleCodeFirst = require('!raw-loader!../../examples/AccordionExample/AccordionExampleFirst') as string;

const AccordionState: IDocument = {
  id: 'accordion',
  heading: 'Accordion',
  subheading: `Create a list of items that can be shown individually by clicking an item's header.`,
  property: [
    {
      name: 'Items',
      type: 'AccordionItemProps',
      desc: 'Items of the accordion',
    },
  ],
  exampleCode: AccordionExampleCodeFirst,
  exampleComponent: AccordionExampleFirst,
  exampleCodeHeader: '1. Accordion:',
  exampleCodeDescription: 'Use to give general information or actions'
};

export default AccordionState;