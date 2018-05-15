import * as React from 'react';
import { Alert } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const AlertExample = () => (
  <div className={styles.example}>
    <Alert type="warning">
      Alert Example 4
    </Alert>
  </div>
);

export default AlertExample;
