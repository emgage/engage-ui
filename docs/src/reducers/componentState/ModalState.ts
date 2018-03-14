import { IDocument } from '../../Types';
import ModalExampleFirst from '../../examples/ModalExample/ModalExampleFirst';
// import ModalExampleSecond from '../../examples/ModalExample/ModalExampleSecond';
// import ModalExampleThird from '../../examples/ModalExample/ModalExampleThird';

const ModalExampleCodeFirst = require('!raw-loader!../../examples/ModalExample/ModalExampleFirst') as string;
// const ModalExampleCodeSecond = require('!raw-loader!../../examples/ModalExample/ModalExampleSecond') as string;
// const ModalExampleCodeThird = require('!raw-loader!../../examples/ModalExample/ModalExampleThird') as string;

const ModalState: IDocument = {
  id: 'modal',
  heading: 'Modal',
  subheading: `Modal component is used to show particular information/details in modal popup.`,
  property: [
    {
      name: 'active',
      type: 'boolean',
      desc: 'Flag to help set the open or close state of modal',
    }, {
      name: 'modalOverflow',
      type: 'boolean',
      desc: 'Set the value to display scrollbar as per content of the Modal',
    }, {
      name: 'closeOnEsc',
      type: 'boolean',
      desc: 'Set the value to close modal on escape',
    }, {
      name: 'closeOnBackgroud',
      type: 'boolean',
      desc: 'Set the value to close modal on click of background',
    }, {
      name: 'close',
      type: 'boolean',
      desc: 'Set the value to close modal by clicking on cross icon of modal',
    }, {
      name: 'className',
      type: 'css class name',
      desc: 'Set the css-class for the modal',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    }, {
      name: 'width',
      type: 'string',
      desc: 'Set size of modal: small, medium, large or px',
    },
  ],
  exampleCode: ModalExampleCodeFirst,
  exampleComponent: ModalExampleFirst,
  exampleCodeHeader: '1. Medium Modal:',
  exampleCodeDescription: 'Use to make medium size model. User can close the model by clicking on close button, by clicking outside of model or by pressing Esc.',
  // exampleCode1: ModalExampleCodeSecond,
  // exampleComponent1: ModalExampleSecond,
  // exampleCodeHeader1: '2. Medium Modal:',
  // exampleCodeDescription1: 'Use to make medium size model. ',
  // exampleCode2: ModalExampleCodeThird,
  // exampleComponent2: ModalExampleThird,
  // exampleCodeHeader2: '3. Small Modal:',
  // exampleCodeDescription2: 'Use to make small size model.',
};

export default ModalState;
