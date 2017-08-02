import * as React from 'react';
import ReactTable from 'react-table';

export interface IProps {
    children?: React.ReactNode,
    data?: any,
}

const columns = [{
    Header: 'Property',
    accessor: 'property',
  }, {
    Header: 'Type',
    accessor: 'type',
  }, {
    Header: 'Default Value',
    accessor: 'value',
  }, {
    Header: 'Notes',
    accessor: 'notes',
}];

const PropertiesCmp = ({children, data}: IProps) => {
    return (
        <ReactTable
            showPagination={false}
            sortable={false}
            resizable={false}
            minRows={0}
            data={data}
            columns={columns} />
    );
};

export default PropertiesCmp;
