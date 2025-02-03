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

// const columnConfig = [
//   {
//     label: 'Name',
//     key: 'name',
//     className: '',
//     style: { width: '200px' },
//     sort: true,
//   }, {
//     label: 'Description',
//     key: 'description',
//     style: { width: 'auto' },
//   }, {
//     label: 'Status',
//     key: 'status',
//     sort: true,
//     style: { width: '150px' },
//   }, {
//     label: 'Type',
//     key: 'type',
//     style: { width: '100px' },
//   },
// ];

const TableExample = () => {
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [columns, setColumns] = React.useState<any[]>([
    {
      label: 'Name',
      key: 'name',
      className: '',
      style: { width: '200px' },
      sort: true,
    }, {
      label: 'Description',
      key: 'description',
      style: { width: '100px' },
    }, {
      label: 'Status',
      key: 'status',
      sort: true,
      style: { width: '100px' },
    }, {
      label: 'Type',
      key: 'type',
      style: { width: 'auto' },
    },
  ]);

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
        column={columns}
        defaultSortField="name"
        defaultSortOrder="asc"
        bordered
        highlight
        sorting
        selectRow="checkbox"
        defaultCheckedDataId={selectedIds}
        headerCheckboxStatus={checkboxStatus}
        allowAddRow
        onPlusClick={(c,p)=>{
          console.log('onPlusClick',c,p);
        }}
        selectRowCallback={(newSelectedIds, from) => {
          console.log("checked", newSelectedIds, from)
          if (from === 'header') {
            selectAllHandle(newSelectedIds.length > 0);
          }
        }}
        singleSelectRowCallback={(...allparams)=>{
          console.log('singleSelectRowCallback', allparams);
          handleSingleRowSelect(allparams[0]);

        }}
        rowCallbackValue="id"
        onRowClick={(...allparams)=>{
          console.log('onRowClick', allparams);
          handleSingleRowSelect(...allparams);
        }}
        allowColumnResize
        onResize={(col,newWidth,nextNewWidth)=>{
          setColumns(prevCol=>{
            const newColumns = [...prevCol];
            const index = newColumns.findIndex((c)=>c.key === col.key);
            newColumns[index] = {...newColumns[index], style: {width: `${newWidth}px`}};
            newColumns[index+1] = {...newColumns[index+1], style: {width: `${nextNewWidth}px`}};
            return newColumns;
          });
          }}
        
        renderHeaderCheckbox
        circleCheckbox={true}
         />
    </div>
  );
};

export default TableExample;
