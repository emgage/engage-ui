import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
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
import BannerRow  from './BannerRow';

import { ColumnConfig, FilterConfig, NestedChild, SortState, ServerSort } from './interface';
import * as baseTheme from './Table.scss';
import Spinner from '../Spinner';

export type RowSelection = 'checkbox' | 'radio';
export type SortOrder = 'asc' | 'desc';

export interface Props {
  // Use for disabled or enable selected Row checkbox and RowAction button
  actionInProgress?: boolean;
  // To make table bordered
  bordered?: boolean;
  callChildCallback?: boolean;
  // Column config, which renders the header
  column: ColumnConfig[];
  columnFirstChildWidth?: string;
  // Custom styling
  componentStyle?: any;
  // Set a custom class
  componentClass?: string;
  // Unique ID
  componentId?: string;
  //   temp & we need to use the defaultCheckedDataId prop in future
  checkedRowsId?: number[];
  // Get the data & use it to populate tds
  data?: any;
  // If we want to select any data by default, then pass the id here
  defaultCheckedDataId?: any;
  // On load by default it will be sorted by this field
  defaultSortField?: string;
  // Value could be 'asc' || 'desc'
  defaultSortOrder?: string;
  // If not all the rows are expandable then pass the id of expanding row
  expandingRowId?: number[];
  // Filter config, if data needs to be filtered by any mode like search
  filterData?: FilterConfig;
  // This will hide the expanding row if passed
  hideExpandedIcon?: boolean;
  // Hide header: Its mainly used for nested table, but user can also hide it for main table
  hideHeader?: boolean;
  // Hide specific row & show them when its being asked to show
  hideRow?: any;
  // hide header checkbox for selected row
  hideSelectAll?: boolean;
  // Highlight rows on hover
  highlight?: boolean;
  // Used when same table component is nested as child component
  isChildParentConfigSame?: boolean;
  // Use when you need multuple call back values
  multipleCallBackValue?: any[];
  // Nested data callback, when rows been clicked, rows id sent to parent and nested child data gets updated
  nestedChildCallback?(id: number | string, toggleStatus: boolean): void;
  // prop to receive nested data
  nestedChildData?: NestedChild[];
  // Function to get call when row got clikced
  onRowClick?(value: any): void;
  // Callback function from child to parent, this will help to do any operation needed
  parentCallback?(parentId: number | string, otherParam?: any): void;
  // This will help to know if the current component is child component & what's its parent id is
  parentRowId?: number | string;
  // This array is to store parent selected row id
  parentSelectedRow?: boolean;
  // Make table responsive
  responsive?: boolean;
  // Prop to define if we want to add header checkbox or not
  renderHeaderCheckbox?: boolean;
  // Put more action button as first column
  rowActionLeft?: boolean;
  // Use this key to fetch the unique id from data & send it back to clickedrow
  rowCallbackValue?: string;
  // Individual row action, if available add it in last of the column
  rowAction?: any;
  // Pass this if row should be expanded by default on page load
  rowExpandOnLoad?: boolean;
  // This helps to add checkbox or radio to select the row & do bulk actions
  selectRow?: RowSelection;
  // Use this key to fetch the unique id from data & send it back to selectedrow
  selectCallbackValue?: string;
  // Function to get called when row got selected
  selectRowCallback?(rows: number[] | string[]): void;
  // Callback function to do the server sort
  serverSort?: ServerSort;
  // Function to get called when single row got selected, it will return only one row value not the array
  singleSelectRowCallback?(row: number | string | any, checked: boolean, rows: number[] | string[], rowData: any): void;
  // Callback function to header checkbox, it will return checked status
  disableAllRowCallback?(checked: boolean): void;
  // Flag to indentify if table is sortable, if passed "all" then add sorting to all the columns
  sorting?: boolean | string;
  // Set greyed background for odd rows
  striped?: boolean;
  theme?: any;
}

export interface State {
  data: any;
  disableAllRow: boolean;
  expandedRow: any;
  intermediateRow: any;
  sort: SortState;
  selectedRows: number[];
  searchKey: string;
  callChildCallback: boolean;
  nestedChildData?: NestedChild[];
}

let callBackSelectedRows: any;

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
    const { defaultCheckedDataId } = newProps;

    if (newProps.filterData) {
      const { field, searchKey, search = false } = newProps.filterData;

      if (search && (this.props.filterData)) {
        this.triggerSearch(searchKey, field);
      }
    }

    if (newProps.data.length !== this.props.data.length && JSON.stringify(newProps.data) !== JSON.stringify(this.props.data)) {
      let { selectedRows } = this.state;
      if (selectedRows.length) {
        const allItemId = newProps.data.map((item: any) => item.id);
        selectedRows = selectedRows.filter(selectedItem => allItemId.includes(selectedItem));
      }
      this.setState({ selectedRows, data: newProps.data });
    }

    if (JSON.stringify(newProps.nestedChildData) !== JSON.stringify(this.props.nestedChildData)) {
      this.setState({ nestedChildData: newProps.nestedChildData });
      this.expandRowOnLoad();
    }

    if ((newProps.callChildCallback && newProps.callChildCallback !== this.props.callChildCallback)) {
      this.reRenderRow();
    }

    if (!newProps.nestedChildData && JSON.stringify(newProps.data) !== JSON.stringify(this.state.data)) {
      this.setState({ data: newProps.data });
    }

    // Updated selectedRows if defaultCheckedDataId has been passed, this will help to check the checkbpx
    if (defaultCheckedDataId && JSON.stringify(defaultCheckedDataId) !== JSON.stringify(this.props.defaultCheckedDataId)) {
      this.setState({ selectedRows: defaultCheckedDataId });

      if (newProps.selectRowCallback) {
        newProps.selectRowCallback(defaultCheckedDataId);
      }
    }
  }

  getInitialState() {
    const { checkedRowsId, data, defaultCheckedDataId = [], defaultSortField, defaultSortOrder, parentSelectedRow, selectRowCallback = () => {}, serverSort } = this.props;
    let selectedRows = callBackSelectedRows === undefined || callBackSelectedRows.length < 1 || defaultCheckedDataId.length ? [] : callBackSelectedRows;

    // If parent is selected than store those Id to the child's selectedRow state
    if (parentSelectedRow) {
      selectedRows = data.map((item: any) => item.id);

      selectRowCallback(selectedRows);
    }

    return {
      data,
      selectedRows: checkedRowsId || selectedRows,
      expandedRow: [],
      intermediateRow: [],
      sort: {
        // Current sorting filed should be saved here, which can be used to show specific icons on specifc th
        field: defaultSortField || (serverSort && serverSort.field) || '',
        order: {
          // New order is for sorting the table with that order
          new: defaultSortOrder || (serverSort && serverSort.order) || 'asc',
          // Current order is store the current sorted order
          current: defaultSortOrder || (serverSort && serverSort.order) || 'asc',
        },
      },
      searchKey: '',
      callChildCallback: false,
      disableAllRow: false,
      nestedChildData: this.props.nestedChildData,
    };
  }

  // Get class names for table
  getTableClassName = () => {
    const {
      bordered = false,
      highlight = false,
      striped = false,
      theme,
      componentClass = '',
    } = this.props;

    return classNames(
      theme.table,
      bordered && theme.bordered,
      highlight && theme.highlight,
      striped && theme.striped,
      componentClass
    );
  }

  hideRow = (item: any) => {
    const { hideRow } = this.props;
    let hideStatus: boolean = false;

    Object.keys(hideRow).forEach((key) => {
      if (item[key] && item[key] === hideRow[key]) {
        hideStatus = true;
      }
    });

    return hideStatus;
  }

  // Render the thead with th & contain specific header label
  // Used certain flags which will help to add sorting for any specific fields
  renderHeader = () => {
    const { column, sorting, rowAction, rowActionLeft = false, theme, componentId = '' } = this.props;
    const { field, order } = this.state.sort;

    return (
      <TableHeader theme={theme}>
        <TableRow theme={theme}>
          { this.renderRowSelection(null, 'head') }
          {
            column.map((item: ColumnConfig) => {
              const { key, sort, noSort, sortBy, id = '' } = item;
              const thisSort: string = (sorting === 'all' || sort) && !noSort ? key : '';

              return (
                <TableHead
                  key={key}
                  sort={thisSort}
                  sortBy={sortBy}
                  componentStyle={item.style}
                  accessibilityId={id}
                  componentId={componentId ? `${componentId}Col${item.label?.replace(/ /g, '')}` : ''}
                  className={item.className}
                  order={field === item.key ? order.current : ''}
                  clickHandler={this.sortData}
                  serverSort={this.serverSort}
                  theme={theme}>
                  {/*
                    Here injectheader helps to inject any custom component,
                    Header value can be sent & then used in custom component
                  */}
                  {item.injectHeader ? item.injectHeader(item.headerValue) : item.label}
                </TableHead>
              );
            })
          }
          { rowAction && !rowActionLeft ? <TableHead key="headRowAction" theme={theme} /> : '' }
        </TableRow>
      </TableHeader>
    );
  }

  // Function to render tbody & td with specifc data & if user passed any custom component that can also get rendered
  renderBody = () => {
    const { children, column, expandingRowId = [], hideRow, rowAction, rowExpandOnLoad = false, selectRow, theme } = this.props;
    const { data, expandedRow } = this.state;

    if (!children) {
      return (
        <TableBody theme={theme}>
          {
            data.map((item: any, index: number) => {
              if (!this.props.hideRow || !this.hideRow(item)) {
                return this.renderTbodyRows(item, index);
              }
            })
          }
          { !data.length ? <TableRow theme={theme}><TableData theme={theme} colSpan={column.length + (selectRow ? 1 : 0) + (rowAction ? 1 : 0)}>No record found</TableData></TableRow> : null }
        </TableBody>
      );
    }

    // If there is no children for the table component (which is being used to open when the row gets expanded)
    return data.map((item: any, index: number) => {
      if (!hideRow || !this.hideRow(item)) {
        if (rowExpandOnLoad && expandingRowId.indexOf(item.id) !== -1 && expandedRow.indexOf(item.id) === -1) {
          this.openNestedRow(item.id);
        }

        return (
          <TableBody theme={theme} key={index}>
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
    const {
      actionInProgress = false,
      column,
      expandingRowId = [],
      hideExpandedIcon = false,
      onRowClick,
      rowActionLeft = false,
      rowCallbackValue,
      rowAction,
      selectRow,
      componentId = '',
      theme
    } = this.props;
    const { nestedChildData } = this.state;
    const { renderBanner } = item;
    let totalColumn = column && column.length;
    if (renderBanner) {
      if (rowAction) totalColumn++;
      if (selectRow) totalColumn++;
    }
    return(
      <React.Fragment key={index}>
        <TableRow theme={theme}>
          { this.renderRowSelection(item, 'body') }
          {
            column.map((colItem: any, index: number) => {
              const renderCheckbox = (!index && nestedChildData && nestedChildData.length && !hideExpandedIcon && (!expandingRowId.length || expandingRowId.indexOf(item.id) >= 0));
              const tableDataClick = colItem.key !== 'rowAction' && !renderCheckbox && onRowClick && !item['isRowClickDisable'] ? theme.tableDataClick : '';

              return (
                <TableData
                  key={colItem.key}
                  callbackValue={rowCallbackValue && item[rowCallbackValue]}
                  componentStyle={ colItem.style }
                  componentClass={tableDataClick}
                  dataLabel={colItem.label}
                  theme={theme}
                  onClick={((colItem.key !== 'rowAction' && !renderCheckbox) && !item['isRowClickDisable']) ? onRowClick : undefined}
                >
                  {/*
                    Here injectBody helps to inject any custom component to td,
                    we also return the specifc value, which then can be used in injected component
                  */}
                  { colItem.key === 'rowAction' ? <RowAction componentId={componentId} theme={theme} actionInProgress={actionInProgress} isRowLoading={item.isRowLoading} actionConfig={rowAction}  data={item} rowActionLeft /> : '' }
                  { renderCheckbox ? this.renderCheckColumn(item, false) : ''}
                  { colItem.injectBody ? colItem.injectBody(item) : renderCheckbox ? <span style={{ paddingLeft: '16px' }}>{item[colItem.key]}</span> : <span className={theme.tableDataWrap}>{item[colItem.key]}</span> }
                  {item.isRowLoading && <Spinner componentSize="small" componentColor="disabled" />}
                </TableData>
              );
            })
          }

          { rowAction && !rowActionLeft ? <TableData componentClass={theme.lastData} componentStyle={{ float: 'right' }}>{item.isRowLoading && <Spinner componentSize="small" componentColor="disabled" />} <RowAction componentId={componentId} actionInProgress={actionInProgress && !!item.processing} isRowLoading={item.isRowLoading} actionConfig={rowAction} data={item} theme={theme} /> </TableData> : '' }
        </TableRow>
        { renderBanner &&
        <TableRow>
          <TableData colSpan={totalColumn} componentClass={baseTheme.bannerRow}>
            <BannerRow
              bannerTitle={renderBanner.bannerTitle}
              bannerType={renderBanner.bannerType}
              bannerIcon={renderBanner.bannerIcon}
              dropdownItems={renderBanner.items}
              disabled={renderBanner.disabled}
              rowItem={item}
              loading={renderBanner.loading}
              onChange={renderBanner.onChange}
              onFocus={renderBanner.onFocus}
              selectPlaceholder={renderBanner.placeholder}
              selectedValue={renderBanner.selectedValue}
            />
          </TableData>
        </TableRow> }
      </React.Fragment>
    );
  }

  callBackSelectedRows(selectedRows: any) {
    callBackSelectedRows = selectedRows;
  }

  // Function to render nested children for each row, this could be nested table or any other component
  renderNestedChildren = (key: string, id: number) => {
    const { column, children, selectRow, rowAction, theme } = this.props;
    const { nestedChildData = [], selectedRows } = this.state;
    const colSpanVal = column.length + (selectRow ? 1 : 0) + (rowAction ? 1 : 0);

    // Get current row's nested component by matching its id
    const thisNestedComponent = nestedChildData.filter(item => item.rowId === id);

    return (
      <TableRow key={key} callBackSelectedRows={this.callBackSelectedRows} selectRow={this.state.selectedRows} theme={theme}>
        <TableData colSpan={colSpanVal} theme={theme}>
          {thisNestedComponent.length ? React.cloneElement(thisNestedComponent[0].component, {
            componentClass: theme.nestedTable,
            parentRowId: id,
            parentCallback: this.toggleParentCheckbox,
            parentSelectedRow: selectedRows.indexOf(id) !== -1,
          }) : children}
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
    const {
      columnFirstChildWidth = '30px',
      disableAllRowCallback,
      expandingRowId = [],
      hideExpandedIcon = false,
      renderHeaderCheckbox = false,
      selectRow,
      nestedChildData,
      theme
    } = this.props;

    if (selectRow) {
      if (rowType === 'body') {
        // If row will be expanding then expanding element needs to be placed instead of checkbox
        // Expanding icon will not render if hideExpandedIcon is true & if expandingRowId does not match with rowId
        if (nestedChildData && !hideExpandedIcon && (!expandingRowId.length || expandingRowId.indexOf(rowData.id) !== -1)) {
          return this.expandedRowElement(rowData.id);
        }

        if (selectRow === 'checkbox') {
          return this.renderCheckColumn(rowData);
        }

        return this.renderRadio(rowData);
      }

      if (selectRow === 'checkbox' && disableAllRowCallback) {
        return this.addHeaderDisableAllRowCheckbox();
      }

      if (selectRow === 'checkbox' && (renderHeaderCheckbox || renderHeaderCheckbox === undefined)) {
        return this.addHeaderCheckbox();
      }

      return <TableHead theme={theme} componentStyle={{ width: columnFirstChildWidth }}></TableHead>;
    }

    return null;
  }

  // Function to add the icon or anything which is required to expand or collapse the table row
  expandedRowElement = (rowId: number | string) => {
    const { theme } = this.props;

    return (
      <TableData theme={theme}>
        <Icon
          theme={theme}
          onClick={this.openNestedRow}
          callbackValue={rowId}
          source="chevronDown"
          componentStyle={{ margin: 0 }} />
      </TableData>
    );
  }

  // Function to add checkbox in header as well
  addHeaderCheckbox = (): React.ReactElement<any> => {
    const { data = [], intermediateRow = [], selectedRows = [] } = this.state;
    const { columnFirstChildWidth = '30px', theme, hideSelectAll = false, actionInProgress = false } = this.props;

    // This gives the checked status: true means all child are checked, intermediate atlease one child is checked, false means nothing is checked
    const rowCheckedStatus = !intermediateRow.length ?
      (selectedRows.length && data.length === selectedRows.length ?
        true : (selectedRows.length ?
          'indeterminate' : false))
      : 'indeterminate';

    return (
      <TableHead componentStyle={{ width: columnFirstChildWidth }} theme={theme}>
         { !hideSelectAll && <Checkbox
          labelHidden
          theme={theme}
          label="Select all"
          disabled={actionInProgress}
          checked={rowCheckedStatus}
          onChange={this.toggleAllRowSelection} /> }
      </TableHead>
    );
  }

  addHeaderDisableAllRowCheckbox = ():  React.ReactElement<any> => {
    const { disableAllRow } = this.state;
    const { columnFirstChildWidth = '30px', theme, disableAllRowCallback } = this.props;

    return (<TableHead componentStyle={{ width: columnFirstChildWidth }} theme={theme}>
           <Checkbox
              labelHidden
              theme={theme}
              label="Disable all"
              checked={disableAllRow}
              onChange={(checked: boolean) => this.setState({ disableAllRow: checked }, () => {
                if (disableAllRowCallback) {
                  disableAllRowCallback(checked);
                }
              })}/>
        </TableHead>);
  }

  // Function to add checkbox for the row selection
  renderCheckColumn(rowData: any, newColumn: boolean = true): React.ReactElement<any> {
    return newColumn ? <TableData theme={this.props.theme}>{this.renderCheckbox(rowData)}</TableData> : <span style={{ display: 'inline-block' }}>{this.renderCheckbox(rowData)}</span>;
  }

  // Function to render table row checkboxes
  renderCheckbox(rowData: any) {
    const { disableAllRow, intermediateRow, selectedRows = [] } = this.state;
    const { selectCallbackValue, actionInProgress = false, theme  } = this.props;
    const uniqueId = selectCallbackValue ? rowData[selectCallbackValue] : rowData.id;
    const rowCheckedStatus = selectedRows.indexOf(uniqueId) !== -1 ? true : intermediateRow.indexOf(uniqueId) !== -1 ? 'indeterminate' : false;

    return (
      <Checkbox
        label={`Check ${rowData.name}`}
        labelHidden
        theme={theme}
        disabled={(disableAllRow ? disableAllRow : actionInProgress) || rowData.isRowLoading}
        checked={rowCheckedStatus}
        onChange={(checkedStatus: boolean) => {
          this.toggleSingleRowSelection(rowData, checkedStatus);
        }}
      />
    );
  }

  // Function to add checkbox for the row selection
  renderRadio = (rowData: any): React.ReactElement<any> => {
    const { theme } = this.props;

    return <TableData theme={theme}><Checkbox label={`Check ${rowData.name}`} labelHidden theme={theme} value={rowData.id} checked={rowData.checked ? true : false} /></TableData>;
  }

  reRenderRow = () => {
    const { nestedChildCallback = () => {} } = this.props;
    const { expandedRow = [] } = this.state;

    expandedRow.forEach((item: number) => {
      nestedChildCallback(item, true);
    });
  }

  // Function to expand the row on the page load
  expandRowOnLoad = () => {
    const { expandingRowId = [] } = this.props;

    expandingRowId.forEach((item: number) => {
      this.openNestedRow(item);
    });
  }

  render () {
    const { componentStyle = {}, componentId = '', hideHeader = false } = this.props;
    const tableClass = this.getTableClassName();
    const renderedHeader = !hideHeader ? this.renderHeader() : null;
    const renderedBody = this.renderBody();

    return (
      <table className={tableClass} style={componentStyle} id={componentId} >
        { renderedHeader }
        { renderedBody }
      </table>
    );
  }

  serverSort = (field: string, sortBy: string) => {
    const { serverSort } = this.props;
    const { order } = this.state.sort;

    if (serverSort) {
      this.setState({
        sort: {
          field,
          order: {
            new: order.new === 'asc' ? 'desc' : 'asc',
            current: order.new,
          },
        },
      });

      serverSort.callback(field, order.new, sortBy);
    }
  }

  // Function to sort the data
  sortData = (field: string, sortBy: string = '') => {
    const { data } = this.props;
    const { order } = this.state.sort;
    const sortedData = data.sort((item1: any, item2: any) => {
      // Converting strings to uppercase so for comparisions there will be no issue
      const value1 = (item1[field] !== undefined && item1[field] !== null) ? (!sortBy ? item1[field].toUpperCase() : item1[field][sortBy].toUpperCase()) : '';
      const value2 = (item2[field] !== undefined && item2[field] !== null) ? (!sortBy ? item2[field].toUpperCase() : item2[field][sortBy].toUpperCase()) : '';

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
      sortedData.sort((item1: any, item2: any) => {
        // Converting strings to uppercase so for comparisions there will be no issue
        const value1 = (item1[field] !== undefined && item1[field] !== null) ? (!sortBy ? item1[field].toUpperCase() : item1[field][sortBy].toUpperCase()) : '';
        const value2 = (item2[field] !== undefined && item2[field] !== null) ? (!sortBy ? item2[field].toUpperCase() : item2[field][sortBy].toUpperCase()) : '';

        if (value1 > value2) {
          return -1;
        }
        if (value1 < value2) {
          return 1;
        }
        // if both values are same
        return 0;
      });
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
    const { parentRowId, parentCallback = () => {}, selectRowCallback, singleSelectRowCallback } = this.props;
    const { data, intermediateRow, nestedChildData, selectedRows } = this.state;
    const currentSelectedRows = JSON.parse(JSON.stringify(selectedRows));
    const currentIntermediateRow = JSON.parse(JSON.stringify(intermediateRow));
    // This get you the selected row id index, if its already selected, else gives -1
    // If already selected than remove that from the list
    const currentSelectedRowIndex = currentSelectedRows.indexOf(rowData.id);
    const currentIntermediateRowIndex = currentIntermediateRow.indexOf(rowData.id);

    if (currentSelectedRowIndex !== -1) {
      // If selecting row is already in selectedRow state, then remove from array else push it
      currentSelectedRows.splice(currentSelectedRowIndex, 1);
    } else if (checkedStatus) {
      currentSelectedRows.push(rowData.id);
    }

    // When unchecking intermediate then remove it from the array
    if (currentIntermediateRowIndex !== -1) {
      currentIntermediateRow.splice(currentIntermediateRowIndex, 1);
    }

    // Save the new state
    this.setState({ selectedRows: currentSelectedRows });

    // Check if callback is passed, if passed then call it
    if (selectRowCallback) {
      selectRowCallback(currentSelectedRows);
    }

    if (singleSelectRowCallback) {
      singleSelectRowCallback(rowData.id, checkedStatus, currentSelectedRows, rowData);
    }

    if (parentRowId) {
      const parentCheckStatus = data.length === currentSelectedRows.length ? 'all' : currentSelectedRows.length ? 'inter' : 'none';
      parentCallback(parentRowId, parentCheckStatus);
    }

    // Check if there is nestedChildData for this row.
    // We need to select all the child data on selecting parent data
    if (nestedChildData && nestedChildData.length) {
      this.toggleDefaultCheckedId(rowData.id, false, checkedStatus);
    }
  }

  // Function to toggle parent checkbox unchecked / intermediate
  // Depending on the child select status
  toggleParentCheckbox = (parentRowId: number, checkStatus: string) => {
    const { intermediateRow, selectedRows } = this.state;
    const intermediateRowIndex = intermediateRow.indexOf(parentRowId);
    const selectedRowsIndex = selectedRows.indexOf(parentRowId);

    if (intermediateRowIndex !== -1) {
      intermediateRow.splice(intermediateRowIndex, 1);
    }

    if (selectedRowsIndex !== -1) {
      selectedRows.splice(selectedRowsIndex, 1);
    }

    if (checkStatus === 'all') {
      this.setState({ intermediateRow, selectedRows: this.state.selectedRows.concat([parentRowId]) });
    } else if (checkStatus === 'none') {
      this.toggleDefaultCheckedId(parentRowId, true);
      this.setState({ selectedRows, intermediateRow });
    } else {
      this.setState({ selectedRows, intermediateRow: intermediateRow.concat([parentRowId]) });
    }
  }

  // Function to pass defaultCheckedDataId to nested table
  toggleDefaultCheckedId = (rowId: number, noDefaultCheck: boolean = false, checkedStatus: boolean = false) => {
    const { nestedChildData = [] } = this.state;

    let thisNestedIndex = 0;

    const thisRowNestedData: any = nestedChildData.filter((item, index) => {
      if (item.rowId === rowId) {
        thisNestedIndex = index;
        return item;
      }
    });

    if (thisRowNestedData.length) {
      // Get the data id of nested table
      const nestedDataId = thisRowNestedData[0].component.props.data.map((item: any) => item.id);

      // Updated nested child data with the filtered data
      // Check if parent is checked than select the child (pass defaultCheckedDataId) else not
      const newNestedChildData = nestedChildData.map((item: any, index: number) => {
        if (thisNestedIndex === index) {
          const newItem = {
            ...item,
            component: React.cloneElement(item.component, {
              defaultCheckedDataId: checkedStatus && !noDefaultCheck ? nestedDataId : []
            })
          };

          return newItem;
        }

        const newItem = {
          ...item,
          component: React.cloneElement(item.component)
        };

        return newItem;
      });

      this.setState({ nestedChildData: newNestedChildData });
    }
  }

  // Function to select all the rows on click of header  checkbox
  toggleAllRowSelection = (checkedStatus: boolean) => {
    const { data } = this.state;
    const allRowIds = data.map((item: any) => item.id);

    if (checkedStatus) {
      this.setState({ selectedRows: allRowIds }, () => {
        this.rowSelectionCallback();
      });
    } else {
      this.setState({ selectedRows: [] }, () => {
        this.rowSelectionCallback();
      });
    }

    this.toggleAllNestedRowSelection(checkedStatus);
  }

  // Function to check/uncheck the nested rows
  toggleAllNestedRowSelection = (checkedStatus: boolean) => {
    const { data, nestedChildData = [] } = this.state;

    data.forEach((item: any) => {
      nestedChildData.some((nestedItem: any) => {
        if (nestedItem.rowId === item.id) {
          setTimeout(() => this.toggleDefaultCheckedId(item.id, false, checkedStatus), 200);

          return true;
        }

        return false;
      });
    });
  }

  // Function to make search in data
  triggerSearch = (searchKey: string, field: string, thisData?: any) => {
    const trimmedSearchKey = searchKey.trim().toLowerCase();
    const { data, nestedChildData = [] } =  this.getInitialState();
    const { expandingRowId = [] } = this.props;
    const currentData = thisData ? thisData : data;

    if (trimmedSearchKey) {
      const result = currentData.filter((item: any) => {
        // Get the value by making it lowercase
        const thisVal = item[field].toLowerCase();

        if (thisVal.indexOf(trimmedSearchKey) !== -1) {
          // Check if the row is expanded, so it will search on that as well
          if (expandingRowId.indexOf(item.id) !== -1) {
            let nestedIndex = 0;

            // Get the nesteddata for expanded row
            const filteredChildData = nestedChildData.filter((nestedItem: any, index: number) => {
              if (nestedItem.rowId === item.id) {
                nestedIndex = index;
                return nestedItem;
              }
            });

            if (filteredChildData.length) {
              // Get the searched data of nested data
              const newChildData = this.triggerNestedSearch(filteredChildData[0], searchKey, field);
              const newNestedChildData = JSON.parse(JSON.stringify(nestedChildData));

              // Updated nested child data with the filtered data
              newNestedChildData[nestedIndex] = {
                ...newNestedChildData[nestedIndex],
                component: React.cloneElement(nestedChildData[nestedIndex].component, { data: newChildData })
              };

              this.setState({ nestedChildData: newNestedChildData });
            }
          }

          return true;
        }
      });

      if (!thisData) {
        this.setState({ data: result, searchKey: trimmedSearchKey });
      }

      return result;
    }

    if (!thisData) {
      this.setState({ nestedChildData, data: currentData });
    } else {
      return currentData;
    }
  }

  // Function to trigger search for nested data
  triggerNestedSearch = (data: any, searchKey: string, field: string) => {
    const nestedData = data.component.props.data;
    // Trigger search for nesteddata
    const newData = this.triggerSearch(searchKey, field, nestedData);

    return newData;
  }
}

export default themr(TABLE, baseTheme)(Table) as ThemedComponentClass<Props, State>;
