import * as React from 'react';
import { Alert } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const AlertExample = () => (
  <div className={styles.example}>
    <Alert customType="success">
      Alert Example 3
    </Alert>
  </div>
);

export default AlertExample;
