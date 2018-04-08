import * as React from 'react';
import {
  Table
} from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const tableData = [
  {
    id: 1,
    name: 'Dheeraj',
    description: 'Test description',
    status: 'Published',
    type: 'admin',
  }, {
    id: 2,
    name: 'Dheeraj4',
    description: 'Test description2',
    status: 'Published',
    type: 'admin',
  }, {
    id: 3,
    name: 'Dheeraj3',
    description: 'Test description3',
    status: 'Deleted',
    type: 'admin',
  }, {
    id: 4,
    name: 'Dheeraj2',
    description: 'Test description2',
    status: 'Deleted',
    type: 'admin',
  },
];

const columnConfig = [
  {
    label: 'Name',
    key: 'name',
    className: '',
    style: { width: '200px' },
    sort: true,
  }, {
    label: 'Description',
    key: 'description',
    style: { width: 'auto' },
  }, {
    label: 'Status',
    key: 'status',
    sort: true,
    style: { width: '150px' },
  }, {
    label: 'Type',
    key: 'type',
    style: { width: '100px' },
  },
];

const TableExample = () => (
  <div className={styles.example}>
    <Table
      data={tableData}
      column={columnConfig}
      filterData={this.state.filterConfig}
      defaultSortField="name"
      defaultSortOrder="asc"
      bordered highlight sorting />
  </div>
);

export default TableExample;
