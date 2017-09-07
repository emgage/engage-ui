import { IDocument } from '../../Types';
import MessageExampleFirst from '../../examples/MessageExample/MessageExampleFirst';

const MessageExampleCodeFirst = require('!raw-loader!../../examples/MessageExample/MessageExampleFirst') as string;

const MessageState: IDocument = {
  id: 'message',
  heading: 'Message Component',
  subheading: `Message component is used to highlight messages for related filed, as an example to view error.`,
  property: [
    {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'The content to display inside the message',
    }, {
      name: 'isVisible',
      type: 'boolean',
      desc: 'Set the value to view and hide message',
    }, {
      name: 'id',
      type: 'string',
      desc: 'Set the id of the message',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'Set the style via css',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: MessageExampleCodeFirst,
  exampleComponent: MessageExampleFirst,
};

export default MessageState;
