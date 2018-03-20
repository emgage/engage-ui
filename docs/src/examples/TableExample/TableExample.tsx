import * as React from 'react';
import {
  Table
} from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TableExample = () => (
  <div className={styles.example}>
    <Table bordered highlight />
  </div>
);

export default TableExample;
