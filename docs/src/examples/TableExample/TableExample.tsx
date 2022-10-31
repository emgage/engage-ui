import * as React from 'react';
import {
  Table
} from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';
import { xor, isMatch } from 'lodash';

const allIds = [1, 2, 3, 4, 5];
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

const TableExample = () => {
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

  React.useEffect(() => {
    setSelectedIds([1, 2, 5]);
  // tslint:disable-next-line: align
  }, []);

  let checkboxStatus: any;
  if (selectedIds.length > 0) {
    if (isMatch([selectedIds], [allIds])) {
      checkboxStatus = true;
    } else {
      checkboxStatus = 'indeterminate';
    }
  }
  const selectAllHandle = (isSelectAll:boolean) => {
    setSelectedIds(isSelectAll ? allIds :[]);
  };

  const handleSingleRowSelect = (rowId:any) => {
    const newList = xor(selectedIds, [rowId]);
    setSelectedIds(newList);

    // setCheckboxStatus(selectedAll);
    console.log('rowClick', rowId);
  };
  return (
    <div className={styles.example}>
      <Table
        data={tableData}
        column={columnConfig}
        defaultSortField="name"
        defaultSortOrder="asc"
        bordered
        highlight
        sorting
        selectRow="checkbox"
        defaultCheckedDataId={selectedIds}
        headerCheckboxStatus={checkboxStatus}
        selectRowCallback={(newSelectedIds, from) => {
          if (from === 'header') {
            selectAllHandle(newSelectedIds.length > 0);
          }
        }}
        singleSelectRowCallback={handleSingleRowSelect}
        rowCallbackValue="id"
        onRowClick={handleSingleRowSelect}
        renderHeaderCheckbox
        circleCheckbox
         />
    </div>
  );
};

export default TableExample;
