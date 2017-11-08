import * as React from 'react';
import { Message } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const MessageExampleFirst = () => (
  <div className={styles.example}>
    <Message
      id = "1010101010"
      isVisible
    >
      Test message
    </Message>
  </div>
);
export default MessageExampleFirst;
