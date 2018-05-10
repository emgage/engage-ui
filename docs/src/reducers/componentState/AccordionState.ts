import { IDocument } from '../../Types';
import AccordionExampleFirst from '../../examples/AccordionExample/AccordionExampleFirst';
import AccordionExampleSecond from '../../examples/AccordionExample/AccordionExampleSecond';

const AccordionExampleCodeFirst = require('!raw-loader!../../examples/AccordionExample/AccordionExampleFirst') as string;
const AccordionExampleCodeSecond = require('!raw-loader!../../examples/AccordionExample/AccordionExampleSecond') as string;

const AccordionState: IDocument = {
  id: 'accordion',
  heading: 'Accordion',
  subheading: `Create a list of items that can be shown individually by clicking an item's header.`,
  property: [
    {
      name: 'Items',
      type: 'AccordionItemProps',
      desc: 'Items of the accordion',
    }, {
      name: 'mode',
      type: 'Mode',
      desc: 'Mode of accordion. it can be collapsible or multiple',
    }, {
      name: 'openIndex',
      type: 'number',
      desc: 'Index of item which you want to be active',
    }, {
      name: 'closeIndex',
      type: 'number',
      desc: 'Index of item which you want to be in-active',
    },
  ],
  exampleCode: AccordionExampleCodeFirst,
  exampleComponent: AccordionExampleFirst,
  exampleCodeHeader: '1. Accordion:',
  exampleCodeDescription: 'Use to give general information or actions',
  exampleCode1: AccordionExampleCodeFirst,
  exampleComponent1: AccordionExampleFirst,
  exampleCodeHeader1: '1. Collapsible Accordion:',
  exampleCodeDescription1: 'Accodtion of collapsible mode'
};

export default AccordionState;