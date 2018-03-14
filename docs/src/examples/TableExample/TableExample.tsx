import * as React from 'react';
import {
  Table,
  TableBody,
  TableData,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TableExample = () => (
  <div className={styles.example}>
    <Table bordered highlight>
      <TableHeader>
        <TableRow>
          <TableHead accScopeAttr="col">S.No.</TableHead>
          <TableHead accScopeAttr="col">Name</TableHead>
          <TableHead accScopeAttr="col">Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableData>1. </TableData>
          <TableData>Dheeraj Agrawal</TableData>
          <TableData>dheeraja@emgage.com</TableData>
        </TableRow>
        <TableRow>
          <TableData>2. </TableData>
          <TableData>Dheeraj Agrawal</TableData>
          <TableData>dheeraja@emgage.com</TableData>
        </TableRow>
        <TableRow>
          <TableData>3. </TableData>
          <TableData>Dheeraj Agrawal</TableData>
          <TableData>dheeraja@emgage.com</TableData>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead>S.No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
);

export default TableExample;
