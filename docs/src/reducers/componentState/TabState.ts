import { IDocument } from '../../Types';
import TabExampleFirst from '../../examples/TabExample/TabExampleFirst';
import TabExampleSecond from '../../examples/TabExample/TabExampleSecond';
// import TabExampleThird from '../../examples/TabExample/TabExampleThird';

const TabExampleCodeFirst = require('!raw-loader!../../examples/TabExample/TabExampleFirst') as string;
const TabExampleCodeSecond = require('!raw-loader!../../examples/TabExample/TabExampleSecond') as string;
// const TabExampleCodeThird = require('!raw-loader!../../examples/TabExample/TabExampleThird') as string;

const TabState: IDocument = {
  id: 'Tab',
  heading: 'Tab',
  subheading: `Tabs allow to simply switch between different content.`,
  property: [
    {
      name: 'position',
      type: 'Position',
      desc: 'Can change position of tabs in TabPanel',
    }, {
      name: 'alignment',
      type: 'Alignment',
      desc: 'Can change alignment of tabs in TabPanel',
    }, {
      name: 'defaultTabId',
      type: 'string',
      desc: 'Can assign default tab from multiple available tabs in TabPanel',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'Set the style for TabPanel component',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: TabExampleCodeFirst,
  exampleComponent: TabExampleFirst,
  exampleCodeHeader: '1. Tab with alignment:',
  exampleCodeDescription: 'User can set alignment as left, center or right for tabs in TabPanel.',
  exampleCode1: TabExampleCodeSecond,
  exampleComponent1: TabExampleSecond,
  exampleCodeHeader1: '2. Tab with Position:',
  exampleCodeDescription1: 'User can chooes the position of tabs, it should be at a top/ bottom/ left/ right of tabContent. ',
  // exampleCode2: TabExampleCodeThird,
  // exampleComponent2: TabExampleThird,
  // exampleCodeHeader2: '3. Small Tab:',
  // exampleCodeDescription2: 'Use to make small size model.',
};

export default TabState;
