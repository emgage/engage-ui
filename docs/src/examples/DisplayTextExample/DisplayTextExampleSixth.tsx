import * as React from 'react';
import { DisplayText } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const DisplayTextExample = () => (
  <div className={styles.example}>
    <DisplayText
      customSize="large"
    >
      Large DisplayText
    </DisplayText>
  </div>
);

export default DisplayTextExample;
