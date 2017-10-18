import { IDocument } from '../../Types';
import ModalExampleFirst from '../../examples/ModalExample/ModalExampleFirst';

const ModalExampleCodeFirst = require('!raw-loader!../../examples/ModalExample/ModalExampleFirst') as string;

const ModalState: IDocument = {
  id: 'modal',
  heading: 'Modal Component',
  subheading: `Modal component is used to show particular information/details in modal popup.`,
  property: [
    {
      name: 'activator',
      type: 'React.ReactNode',
      desc: 'The content use to activate the modal',
    }, {
      name: 'header',
      type: 'React.ReactNode',
      desc: 'Set the header value of the modal',
    }, {
      name: 'footer',
      type: 'React.ReactNode',
      desc: 'Set the footer value of the modal',
    }, {
      name: 'show',
      type: 'boolean',
      desc: 'Set the value to show or not show modal content',
    }, {
      name: 'size',
      type: 'Size',
      desc: 'Define the size of the modal',
    }, {
      name: 'backdropEnabled',
      type: 'boolean',
      desc: 'Set the value to access or not access outside the modal',
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
      name: 'id',
      type: 'string',
      desc: 'Set the id for the modal',
    }, {
      name: 'trigger',
      type: 'ITrigger',
      desc: 'Set the trigger for the modal',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: ModalExampleCodeFirst,
  exampleComponent: ModalExampleFirst,
};

export default ModalState;
