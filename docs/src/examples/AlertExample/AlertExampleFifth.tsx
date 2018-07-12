import * as React from 'react';
import { Alert } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const AlertExample = () => (
  <div className={styles.example}>
    <Alert componentType="danger">
      Alert Example 5
    </Alert>
  </div>
);

export default AlertExample;
