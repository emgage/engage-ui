import * as React from 'react';
import { DisplayText } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const DisplayTextExample = () => (
  <div className={styles.example}>
    <DisplayText
      element="h3"
      customSize="small"
    >
      DisplayText with element and size
    </DisplayText>
  </div>
);

export default DisplayTextExample;
