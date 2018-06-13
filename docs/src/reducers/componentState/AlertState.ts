import { IDocument } from '../../Types';
import AlertExampleFirst from '../../examples/AlertExample/AlertExampleFirst';
import AlertExampleSecond from '../../examples/AlertExample/AlertExampleSecond';
import AlertExampleThird from '../../examples/AlertExample/AlertExampleThird';
import AlertExampleFourth from '../../examples/AlertExample/AlertExampleFourth';
import AlertExampleFifth from '../../examples/AlertExample/AlertExampleFifth';

const AlertExampleCodeFirst = require('!raw-loader!../../examples/AlertExample/AlertExampleFirst') as string;
const AlertExampleCodeSecond = require('!raw-loader!../../examples/AlertExample/AlertExampleSecond') as string;
const AlertExampleCodeThird = require('!raw-loader!../../examples/AlertExample/AlertExampleThird') as string;
const AlertExampleCodeFourth = require('!raw-loader!../../examples/AlertExample/AlertExampleFourth') as string;
const AlertExampleCodeFifth = require('!raw-loader!../../examples/AlertExample/AlertExampleFifth') as string;

const AlertState: IDocument = {
  id: 'alert',
  heading: 'Alert',
  subheading: `Alerts are used to display basic, primary, success, warning and error messages.`,
  property: [
    {
      name: 'children',
      type: 'string',
      desc: 'The content to display inside the alert',
    }, {
      name: 'type',
      type: 'type',
      desc: 'Set the color of the alert for the given type. It can be primary, success, warning or danger.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: AlertExampleCodeFirst,
  exampleComponent: AlertExampleFirst,
  exampleCodeHeader: '1. Default Alert:',
  exampleCode1: AlertExampleCodeSecond,
  exampleComponent1: AlertExampleSecond,
  exampleCodeHeader1: '2. Primary Alert:',
  exampleCodeDescription1: 'Use to indicate a promient style for message.',
  exampleCode2: AlertExampleCodeThird,
  exampleComponent2: AlertExampleThird,
  exampleCodeHeader2: '3. Success Alert:',
  exampleCodeDescription2: 'Use to indicate success or a positive message.',
  exampleCode3: AlertExampleCodeFourth,
  exampleComponent3: AlertExampleFourth,
  exampleCodeHeader3: '4. Warning Alert:',
  exampleCodeDescription3: 'Use to indicate a message containing a warning.',
  exampleCode4: AlertExampleCodeFifth,
  exampleComponent4: AlertExampleFifth,
  exampleCodeHeader4: '5. Danger Alert:',
  exampleCodeDescription4: 'Use to indicate an important or error message.',
};

export default AlertState;
