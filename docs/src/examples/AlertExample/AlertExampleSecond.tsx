import * as React from 'react';
import { Alert } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const AlertExample = () => (
  <div className={styles.example}>
    <Alert type="primary">
      Alert Example 2
    </Alert>
  </div>
);

export default AlertExample;
