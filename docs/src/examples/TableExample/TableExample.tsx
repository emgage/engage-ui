import * as React from 'react';
import {
  Badge,
  Checkbox,
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
          <TableHead accScopeAttr="col"><Checkbox label="" /></TableHead>
          <TableHead accScopeAttr="col">NAME</TableHead>
          <TableHead accScopeAttr="col">DESCRIPTION</TableHead>
          <TableHead accScopeAttr="col">STATUS</TableHead>
          <TableHead accScopeAttr="col">TYPE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableData><Checkbox label="" /></TableData>
          <TableData>App members</TableData>
          <TableData>Use this group to grant users contribute permissions</TableData>
          <TableData>
            <Badge status="success">
              Published
            </Badge>
          </TableData>
          <TableData>Internal, External or Anonymous</TableData>
        </TableRow>
        <TableRow>
          <TableData><Checkbox label="" /></TableData>
          <TableData>App members</TableData>
          <TableData>Use this group to grant users contribute permissions</TableData>
          <TableData>
            <Badge status="success">
              Published
            </Badge>
          </TableData>
          <TableData>Internal, External or Anonymous</TableData>
        </TableRow>
        <TableRow>
          <TableData><Checkbox label="" /></TableData>
          <TableData>App members</TableData>
          <TableData>Use this group to grant users contribute permissions</TableData>
          <TableData>
            <Badge status="success">
              Published
            </Badge>
          </TableData>
          <TableData>Internal, External or Anonymous</TableData>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead accScopeAttr="col"><Checkbox label="" /></TableHead>
          <TableHead accScopeAttr="col">NAME</TableHead>
          <TableHead accScopeAttr="col">DESCRIPTION</TableHead>
          <TableHead accScopeAttr="col">STATUS</TableHead>
          <TableHead accScopeAttr="col">TYPE</TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
);

export default TableExample;
