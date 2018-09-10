import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { TABLE } from '../ThemeIdentifiers';

import Checkbox from '../Checkbox';
import Icon from '../Icon';
import RowAction from './RowAction';
import TableHeader from './TableHeader';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableData from './TableData';

import { ColumnConfig, FilterConfig, NestedChild, SortState } from './interface';
// import { DropdownItemProps } from '../';
import * as baseTheme from './Table.scss';

export type RowSelection = 'checkbox' | 'radio';
export type SortOrder = 'asc' | 'desc';

export interface Props {
  // To make table bordered
  bordered?: boolean;
  // Column config, which renders the header
  column: ColumnConfig[];
  // Get the data & use it to populate tds
  data?: any;
  // On load by default it will be sorted by this field
  defaultSortField?: string;
  // Value could be 'asc' || 'desc'
  defaultSortOrder?: string;
  // Filter config, if data needs to be filtered by any mode like search
  filterData?: FilterConfig;
  // Hide header: Its mainly used for nested table, but user can also hide it for main table
  hideHeader?: boolean;
  // Hide specific row & show them when its being asked to show
  hideRow?: any;
  // Highlight rows on hover
  highlight?: boolean;
  // Nested data callback, when rows been clicked, rows id sent to parent and nested child data gets updated
  nestedChildCallback?(id: number | string, toggleStatus: boolean): void;
  // prop to receive nested data
  nestedChildData?: NestedChild[];
  // Make table responsive
  responsive?: boolean;
  // Individual row action, if available add it in last of the column
  rowAction?: any;
  // This helps to add checkbox or radio to select the row & do bulk actions
  selectRow?: RowSelection;
  // Use this key to fetch the unique id from data & send it back to selectedrow
  selectCallbackValue?: string;
  // Use when you need multuple call back values
  multipleCallBackValue?: any[];
  // Function to get called when row got selected
  selectRowCallback?(rows: any): void;
  // Function to get called when single row got selected, it will return only one row value not the arrat
  singleSelectRowCallback?(row: number | string | any): void;
  // Flag to indentify if table is sortable, if passed "all" then add sorting to all the columns
  sorting?: boolean | string;
  // Set greyed background for odd rows
  striped?: boolean;
  theme?: any;
}

export interface State {
  allRowChecked?: boolean;
  data: any;
  expandedRow: any;
  sort: SortState;
  selectedRows: any;
  searchKey: string;
}

class Table extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = this.getInitialState();
  }

  componentWillMount() {
    // If user asked to sort the data by default then call the sortdata before rendering
    if (this.props.defaultSortField) {
      this.sortData(this.props.defaultSortField);
    }
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.filterData) {
      const { field, searchKey, search } = newProps.filterData;

      if (search && (this.props.filterData && !this.props.filterData.search)) {
        this.triggerSearch(searchKey, field);
      }
    }

    if (newProps.data.length !== this.props.data.length && JSON.stringify(newProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({ data: newProps.data });
    }
  }

  getInitialState() {
    const { data, defaultSortField, defaultSortOrder } = this.props;

    return {
      data,
      allRowChecked: false,
      expandedRow: [],
      selectedRows: [],
      sort: {
        // Current sorting filed should be saved here, which can be used to show specific icons on specifc th
        field: defaultSortField || '',
        order: {
          // New order is for sorting the table with that order
          new: defaultSortOrder || 'asc',
          // Current order is store the current sorted order
          current: defaultSortOrder || 'asc',
        },
      },
      searchKey: '',
    };
  }

  // Get class names for table
  getTableClassName = () => {
    const {
      bordered,
      highlight,
      striped,
      theme,
    } = this.props;

    return classNames(
      theme.table,
      bordered && theme.bordered,
      highlight && theme.highlight,
      striped && theme.striped
    );
  }

  hideRow = (item: any) => {
    const { hideRow } = this.props;
    let hideStatus: boolean = false;

    Object.keys(hideRow).forEach((key, index) => {
      if (item[key] && item[key] === hideRow[key]) {
        hideStatus = true;
      }
    });

    return hideStatus;
  }

  // Render the thead with th & contain specific header label
  // Used certain flags which will help to add sorting for any specific fields
  renderHeader = () => {
    const { column, sorting, rowAction } = this.props;
    const { field, order } = this.state.sort;

    return (
      <TableHeader>
        <TableRow>
          { this.renderRowSelection(null, 'head') }
          {
            column.map((item: ColumnConfig) => {
              const { key, sort, noSort, sortBy } = item;
              const thisSort: string = (sorting === 'all' || sort) && !noSort ? key : '';

              return (
                <TableHead
                  key={key}
                  sort={thisSort}
                  sortBy={sortBy}
                  componentStyle={item.style}
                  className={item.className}
                  order={field === item.key ? order.current : ''}
                  clickHandler={this.sortData}>
                  {/* 
                    Here injectheader helps to inject any custom component,
                    Header value can be sent & then used in custom component
                  */}
                  {item.injectHeader ? item.injectHeader(item.headerValue) : item.label}
                </TableHead>
              );
            })
          }
          { rowAction ? <TableHead key="headRowAction" /> : '' }
        </TableRow>
      </TableHeader>
    );
  }

  // Function to render tbody & td with specifc data & if user passed any custom component that can also get rendered
  renderBody = () => {
    const { children, column, hideRow, selectRow } = this.props;
    const { data, expandedRow } = this.state;

    if (!children) {
      return (
        <TableBody>
          {
            data.map((item: any, index: number) => {
              if (!this.props.hideRow || !this.hideRow(item)) {
                return this.renderTbodyRows(item, index);
              }
            })
          }

          { !data.length ? <TableRow><TableData colSpan={column.length + (selectRow ? 1 : 0)}>No record found</TableData></TableRow> : null }
        </TableBody>
      );
    }

    // If there is no children for the table component (which is being used to open when the row gets expanded)
    return data.map((item: any, index: number) => {
      if (!hideRow || !this.hideRow(item)) {
        return (
          <TableBody key={index}>
            { this.renderTbodyRows(item, index + '_nested') }

            { expandedRow.indexOf(item.id) > -1 ? this.renderNestedChildren(index + 'nest', item.id) : null }
          </TableBody>
        );
      }
    });
  }

  // Function to toggle between the expanded row
  openNestedRow = (currentId: number | string) => {
    const { nestedChildCallback } = this.props;
    let expandedRow = Object.assign([], this.state.expandedRow);
    const rowIndex = expandedRow.indexOf(currentId);

    if (rowIndex === -1) {
      expandedRow = expandedRow.concat(currentId);
    } else {
      expandedRow.splice(rowIndex, 1);
    }

    this.setState({ expandedRow });

    if (nestedChildCallback) {
      nestedChildCallback(currentId, rowIndex === -1);
    }
  }

  // Render the main table row
  renderTbodyRows = (item: any, index: number | string) => {
    const { column, nestedChildData, rowAction } = this.props;

    return (
      <TableRow key={index}>
        { this.renderRowSelection(item, 'body') }
        {
          column.map((colItem: any, index: number) => {
            return (
              <TableData
                key={colItem.key}
                style={colItem.style}
                dataLabel={colItem.label}
              >
                {/* 
                  Here injectBody helps to inject any custom component to td,
                  we also return the specifc value, which then can be used in injected component
                */}

                {!index && nestedChildData ? this.renderCheckColumn(item, false) : ''}
                {colItem.injectBody ? colItem.injectBody(item) : item[colItem.key]}
              </TableData>
            );
          })
        }

        { rowAction ? <RowAction actionConfig={rowAction} data={item} /> : '' }
      </TableRow>
    );
  }

  // Function to render nested children for each row, this could be nested table or any other component
  renderNestedChildren = (key: string, id: number) => {
    const { column, children, nestedChildData = [], selectRow, rowAction } = this.props;

    const colSpanVal = column.length + (selectRow ? 1 : 0) + (rowAction ? 1 : 0);

    // Get current row's nested component by matching its id
    const thisNestedComponent = nestedChildData.filter(item => item.rowId === id);

    return (
      <TableRow key={key}>
        <TableData colSpan={colSpanVal}>
          {thisNestedComponent.length ? thisNestedComponent[0].component : children}
        </TableData>
      </TableRow>
    );
  }

  // Function to call the callback function on row selection
  rowSelectionCallback = () => {
    const { selectRowCallback } = this.props;

    if (selectRowCallback) {
      selectRowCallback(this.state.selectedRows);
    }
  }

  // Add checkbox or radio component to select the row, depending on `selectrow` flag
  renderRowSelection = (rowData: any, rowType: string) => {
    const { nestedChildData, selectRow } = this.props;

    if (selectRow) {
      if (rowType === 'body') {
        // If row will be expanding then expanding element needs to be placed instead of checkbox
        if (nestedChildData) {
          return this.expandedRowElement(rowData.id);
        }

        if (selectRow === 'checkbox') {
          return this.renderCheckColumn(rowData);
        }

        return this.renderRadio(rowData);
      }

      if (selectRow === 'checkbox') {
        return this.addHeaderCheckbox();
      }
    }

    return null;
  }

  // Function to add the icon or anything which is required to expand or collapse the table row
  expandedRowElement = (rowId: number | string) => {
    return (
      <TableData>
        <Icon
          onClick={this.openNestedRow}
          callbackValue={rowId}
          source="chevronDown"
          componentStyle={{ margin: 0 }} />
      </TableData>
    );
  }

  // Function to add checkbox in header as well
  addHeaderCheckbox = (): React.ReactElement<any> => {
    return <TableHead componentStyle={{ width: 'auto' }}><Checkbox label="" checked={this.state.allRowChecked} onChange={this.toggleAllRowSelection} /></TableHead>;
  }

  // Function to add checkbox for the row selection
  renderCheckColumn(rowData: any, newColumn: boolean = true): React.ReactElement<any> {
    return newColumn ? <TableData>{this.renderCheckbox(rowData)}</TableData> : <span style={{ display: 'inline-block' }}>{this.renderCheckbox(rowData)}</span>;
  }

  renderCheckbox(rowData: any) {
    const { selectedRows } = this.state;
    const { selectCallbackValue } = this.props;
    const uniqueId = selectCallbackValue ? rowData[selectCallbackValue] : rowData.id;

    return (
      <Checkbox
        value={uniqueId}
        checked={selectedRows.indexOf(uniqueId) !== -1 ? true : false}
        onChange={(checkedStatus: boolean) => {
          this.toggleSingleRowSelection(rowData, checkedStatus);
        }}
      />
    );
  }

  // Function to add checkbox for the row selection
  renderRadio = (rowData: any): React.ReactElement<any> => {
    return <TableData><Checkbox value={rowData.id} checked={rowData.checked ? true : false} /></TableData>;
  }

  render () {
    const tableClass = this.getTableClassName();
    // const renderedTable = this.renderChildren();
    const renderedHeader = !this.props.hideHeader ? this.renderHeader() : null;
    const renderedBody = this.renderBody();

    return (
      <div>
        <table className={tableClass}>
          { renderedHeader }
          { renderedBody }
        </table>
      </div>
    );
  }

  // Function to sort the data
  sortData = (field: string, sortBy: string = '') => {
    const { data } = this.props;
    const { order } = this.state.sort;

    const sortedData = data.sort((item1: any, item2: any) => {
      // Converting strings to uppercase so for comparisions there will be no issue
      const value1 = !sortBy ? item1[field].toUpperCase() : item1[field][sortBy].toUpperCase();
      const value2 = !sortBy ? item2[field].toUpperCase() : item2[field][sortBy].toUpperCase();

      if (value1 < value2) {
        return -1;
      }
      if (value1 > value2) {
        return 1;
      }

      // if both values are same
      return 0;
    });

    // If desending is required then reverse the data
    if (order.new === 'desc') {
      sortedData.reverse();
    }

    // Set the sorted data to the state
    // Setting sorting field & order to the state
    this.setState({
      data: sortedData,
      sort: {
        field,
        order: {
          new: order.new === 'asc' ? 'desc' : 'asc',
          current: order.new,
        },
      },
    });
  }

  // Function to toggle single row selection
  toggleSingleRowSelection = (rowData: any, checkedStatus: boolean) => {
    const selectedRows = [...this.state.selectedRows];
    const { singleSelectRowCallback, multipleCallBackValue } = this.props;
    const { selectCallbackValue } = this.props;
    const uniqueId = selectCallbackValue ? rowData[selectCallbackValue] : rowData.id;

    if (!checkedStatus) {
      selectedRows.splice(selectedRows.indexOf(uniqueId), 1);
      this.setState({ selectedRows, allRowChecked: false }, () => {
        this.rowSelectionCallback();
      });
    } else {
      this.setState({ selectedRows: this.state.selectedRows.concat([uniqueId]) }, () => {
        this.rowSelectionCallback();
        if (singleSelectRowCallback) {
          if (multipleCallBackValue && multipleCallBackValue.length) {
            const returnVal: any = {};

            multipleCallBackValue.forEach((item) => {
              returnVal[item] = rowData[item] !== undefined ? rowData[item] : '';
            });

            singleSelectRowCallback(returnVal);
          } else {
            singleSelectRowCallback(uniqueId);
          }
        }
      });
    }
  }

  // Function to select all the rows on click of header  checkbox
  toggleAllRowSelection = (checkedStatus: boolean) => {
    const allRowId = this.state.data.map((item: any) => {
      return item.id;
    });

    if (checkedStatus) {
      this.setState({ allRowChecked: true, selectedRows: allRowId }, () => {
        this.rowSelectionCallback();
      });
    } else {
      this.setState({ allRowChecked: false, selectedRows: [] }, () => {
        this.rowSelectionCallback();
      });
    }
  }

  // Function to make search in data
  triggerSearch = (searchKey: string, field: string) => {
    const trimmedSearchKey = searchKey.trim().toLowerCase();
    const { data } = this.getInitialState();

    if (trimmedSearchKey) {
      const result = data.filter((item: any) => {
        const thisVal = item[field].toLowerCase();

        if (thisVal.indexOf(trimmedSearchKey) !== -1) {
          return true;
        }
      });

      this.setState({ data: result });
    }
  }
}

export default themr(TABLE, baseTheme)(Table) as ThemedComponentClass<Props, State>;
