import * as React from 'react';
import { findDOMNode } from 'react-dom';
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

import { ColumnConfig, FilterConfig, NestedChild, SortState } from './interface';
import * as baseTheme from './Table.scss';

export type RowSelection = 'checkbox' | 'radio';
export type SortOrder = 'asc' | 'desc';

export interface Props {
  // Prop to gather all the widths of row, which than can be used to assign width to nested table
  allRowWidth?: number[];
  // To make table bordered
  bordered?: boolean;
  // Column config, which renders the header
  column: ColumnConfig[];
  // Custom styling
  componentStyle?: any;
  // New class passed from parent
  componentClass?: string;
  // Get the data & use it to populate tds
  data?: any;
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
  // Pass this if row should be expanded bydefault on page load
  rowExpandOnLoad?: boolean;
  // This helps to add checkbox or radio to select the row & do bulk actions
  selectRow?: RowSelection;
  // Use this key to fetch the unique id from data & send it back to selectedrow
  selectCallbackValue?: string;
  // Use when you need multuple call back values
  multipleCallBackValue?: any[];
  // Function to get called when row got selected
  selectRowCallback?(rows: number[] | string[]): void;
  // Function to get called when single row got selected, it will return only one row value not the arrat
  singleSelectRowCallback?(row: number | string | any): void;
  // Flag to indentify if table is sortable, if passed "all" then add sorting to all the columns
  sorting?: boolean | string;
  // Set greyed background for odd rows
  striped?: boolean;
  // Used when same table component is nested as child component
  isChildParentConfigSame?: boolean;
  theme?: any;
}

export interface State {
  allRowWidth?: number[];
  allRowChecked?: boolean;
  data: any;
  expandedRow: any;
  sort: SortState;
  selectedRows: any;
  searchKey: string;
  totalRowCount: number;
}

let callBackSelectedRows: any;

class Table extends React.Component<Props, State> {
  public allRowWidth: number[] = [];
  private checkboxColWidth: string = '42px';
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

      if (search && (this.props.filterData)) {
        this.triggerSearch(searchKey, field);
      }
    }

    if (newProps.data.length !== this.props.data.length && JSON.stringify(newProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({ data: newProps.data });
    }

    if (JSON.stringify(newProps.nestedChildData) !== JSON.stringify(this.props.nestedChildData)) {
      this.expandRowOnLoad();
    }
  }

  componentDidMount() {
    const { allRowWidth = [] } = this.props;

    if (allRowWidth.length) {
      this.setState({ allRowWidth });
    }
  }

  getInitialState() {
    const { data, defaultSortField, defaultSortOrder } = this.props;
    return {
      data,
      allRowChecked: false,
      expandedRow: [],
      selectedRows: callBackSelectedRows === undefined || callBackSelectedRows.length < 1 ? [] : callBackSelectedRows,
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
      totalRowCount: 0,
    };
  }

  // Get class names for table
  getTableClassName = () => {
    const {
      bordered,
      highlight,
      striped,
      theme,
      componentClass = '',
    } = this.props;

    return classNames(
      theme.table,
      bordered && theme.bordered,
      highlight && theme.highlight,
      striped && theme.striped,
      striped && theme.striped,
      componentClass
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

  getPartExpression = (object: string, data: any) => {
    let partExpression = '';

    // Extract all '{variable}'
    const variables = object.match(/\{.*?\}/g);
    let obj = object;
    if (variables) {
      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i].replace(/[{}]/g, '');
        // Not using check for undefined or null. That can be directly done by user in the expression
        // if i substitute undefined with '' then '' == 0  is evaluating to true.
        obj = object.replace(variables[i], '"' + data[variable] + '"'); // variable has to be quoted other wise the value will be say abcd and javascrit will expect a variable like that.
      }
      partExpression = obj;
    }

    return partExpression;
  }

  getExpression = (expressionStr: string, data: any) => {
    let expression: string = ' ( ';
    expression += this.getPartExpression(expressionStr, data);
    expression += ' ) ';

    return expression;
  }

  // Render the thead with th & contain specific header label
  // Used certain flags which will help to add sorting for any specific fields
  renderHeader = () => {
    const { column, sorting, rowAction } = this.props;
    const { field, order } = this.state.sort;
    this.allRowWidth = [];

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
                  clickHandler={this.sortData}
                  ref={(thisRef: any) => {
                    const thisDom: any = findDOMNode(thisRef);
                    if (thisDom) {
                      this.allRowWidth.push(thisDom.getBoundingClientRect().width);
                    }
                  }}>
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
    const { children, column, expandingRowId = [], hideRow, rowExpandOnLoad, selectRow } = this.props;
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
        if (rowExpandOnLoad && expandingRowId.indexOf(item.id) !== -1 && expandedRow.indexOf(item.id) === -1) {
          this.openNestedRow(item.id);
        }

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

  evaluate = (expressionStr: string, data: any) => {
    if (data) {
      // tslint:disable-next-line:no-eval
      if (eval(this.getExpression(expressionStr, data))) {
        return true;
      }
    }

    return false;
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

  // Render the main table row
  renderTbodyRows = (item: any, index: number | string) => {
    const { allRowWidth = [], column, expandingRowId = [], hideExpandedIcon, nestedChildData, rowAction } = this.props;
    return (
      <TableRow key={index}>
        { this.renderRowSelection(item, 'body') }
        {
          column.map((colItem: any, index: number) => {
            const thisRowWidth = allRowWidth[index] !== undefined ? index === 0 ? allRowWidth[index] - 32 : allRowWidth[index] : undefined;
            const renderCheckbox = (!index && nestedChildData && !hideExpandedIcon && (!expandingRowId.length || expandingRowId.indexOf(item.id) >= 0));

            return (
              <TableData
                key={colItem.key}
                componentStyle={{ ...colItem.style, width: thisRowWidth }}
                dataLabel={colItem.label}
              >
                {/*
                  Here injectBody helps to inject any custom component to td,
                  we also return the specifc value, which then can be used in injected component
                */}
                { renderCheckbox ? this.renderCheckColumn(item, false) : ''}
                {colItem.injectBody ? colItem.injectBody(item) : renderCheckbox ? <span style={{ paddingLeft: '16px' }}>{item[colItem.key]}</span> : item[colItem.key] }
              </TableData>
            );
          })
        }

        { rowAction ? <RowAction actionConfig={rowAction} data={item} /> : '' }
      </TableRow>
    );
  }

  callBackSelectedRows(selectedRows: any) {
    callBackSelectedRows = selectedRows;
  }

  // Function to render nested children for each row, this could be nested table or any other component
  renderNestedChildren = (key: string, id: number) => {
    const { column,  nestedChildData = [], rowAction, filterData, isChildParentConfigSame, children, theme, selectRow } = this.props;
    const field = filterData !== undefined ? filterData.field : 'id';
    const colSpanVal = column.length + (selectRow ? 1 : 0) + (rowAction ? 1 : 0);
    // Get current row's nested component by matching its id
    const thisNestedComponent = nestedChildData.filter((item: any) => item.rowId === id);

    const thisNestedChildrenComponent = thisNestedComponent && thisNestedComponent.length > 0 ? thisNestedComponent[0].component.props.data : null;

    const result = thisNestedChildrenComponent && thisNestedChildrenComponent.length > 0 ?
    thisNestedChildrenComponent.filter((item: any) => {
      const thisVal = item[field].toLowerCase();

      if (thisVal.indexOf(this.state.searchKey) !== -1) {
        return true;
      }
    }) : null;

    if (isChildParentConfigSame && result) {
      return result.map((item: any, index: number) => {
        return (
          <TableRow key={index} componentClass= {theme.parentChildTable}>
          { this.renderRowSelection(item, 'body') }
          {
            column.map((colItem: any, index: number) => {
              return (
                <TableData
                  key={colItem.key}
                  dataLabel={colItem.label}
                >
                  {/*
                    Here injectBody helps to inject any custom component to td,
                    we also return the specifc value, which then can be used in injected component
                  */}
                  {colItem.injectBody ? colItem.injectBody(item) : item[colItem.key]}
                </TableData>
              );
            })
          }

          { rowAction ? <RowAction actionConfig={rowAction} data={item} /> : '' }
        </TableRow>
        );
      });
    }

    return (
      <TableRow key={key} callBackSelectedRows={this.callBackSelectedRows} selectRow={this.state.selectedRows}>
        <TableData colSpan={colSpanVal}>
          {thisNestedComponent.length ? React.cloneElement(thisNestedComponent[0].component, { allRowWidth: this.allRowWidth, componentClass: theme.nestedTable }) : children}
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
    const { expandingRowId = [], hideExpandedIcon, nestedChildData, selectRow } = this.props;

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

      if (selectRow === 'checkbox') {
        return this.addHeaderCheckbox();
      }
    }

    return null;
  }

  // Function to add checkbox in header as well
  addHeaderCheckbox = (): React.ReactElement<any> => {

    const rowChecked = ((this.state.totalRowCount - this.state.selectedRows.length) > 0 &&  this.state.totalRowCount > 0) ? true : false;

    const allRowChecked = (this.state.selectedRows.length > 0 && this.state.totalRowCount > 0 && this.state.totalRowCount === this.state.selectedRows.length) ? true : this.state.allRowChecked;

    const isAllChildChecked = this.props.nestedChildData && this.props.nestedChildData.length > 0 &&
                              this.state.totalRowCount > 0 && this.state.selectedRows.length > 0 &&
                              this.state.selectedRows.length === 1 &&
                              this.state.totalRowCount !== this.state.selectedRows.length &&
                              this.props.nestedChildData.filter(
                                (item: any) => this.state.selectedRows.indexOf(item.rowId) !== -1);
    const totalRowUnchecked = (isAllChildChecked && isAllChildChecked.length > 0 && this.state.selectedRows.length > 0 && this.state.totalRowCount > 0 && ((this.state.totalRowCount - this.state.selectedRows.length) === (this.state.totalRowCount - 1))) ? true : false;

    return <TableHead componentStyle={{ width: this.checkboxColWidth }}>
    <Checkbox label="" checked={(rowChecked && (!isAllChildChecked || (isAllChildChecked !== undefined ? isAllChildChecked.length === 0 : true))) && this.state.selectedRows.length > 0 ? true : allRowChecked} indeterminante={totalRowUnchecked ? false : rowChecked} onChange={this.toggleAllRowSelection} />
    </TableHead>;
  }

  // Function to add checkbox for the row selection
  renderCheckColumn(rowData: any, newColumn: boolean = true): React.ReactElement<any> {
    const columnStyle = this.props.allRowWidth ? this.props.theme.nestedCheckbox : '';

    return newColumn ? <TableData componentClass={columnStyle}>{this.renderCheckbox(rowData)}</TableData> : <span style={{ display: 'inline-block' }}>{this.renderCheckbox(rowData)}</span>;
  }

  renderCheckbox(rowData: any) {
    const { selectedRows } = this.state;
    const { selectCallbackValue } = this.props;
    const uniqueId = selectCallbackValue ? rowData[selectCallbackValue] : rowData.id;
    const childData = this.props.nestedChildData && this.props.nestedChildData.filter(item => uniqueId === item.rowId);
    const expandedRowId = (childData && childData.length > 0 && childData[0].rowId);

    const isAllChildChecked = childData && childData.length > 0
      && childData[0].component.props.data.filter((item: any) => selectedRows.indexOf(item.id) === -1);

    const isCheckBoxIndeterminante = (isAllChildChecked &&
                                      isAllChildChecked.length > 0 &&
                                      uniqueId === expandedRowId
                                      ) ? true : false;

    const isParentUncheked = (childData && childData.length > 0 &&
                              childData[0].component.props.data.length === isAllChildChecked.length) ? true : false;
    return (
      <Checkbox
        value={uniqueId}
        checked={(((selectedRows.indexOf(uniqueId) !== -1) || (isAllChildChecked && isAllChildChecked.length > 0) || (childData && childData.length > 0 && !isCheckBoxIndeterminante)) && (!isParentUncheked)) ? true : false}
        indeterminante={isCheckBoxIndeterminante ? true : false}
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

  // Function to expand the row on the page load
  expandRowOnLoad = () => {
    const { expandingRowId = [] } = this.props;

    expandingRowId.forEach((item: number) => {
      this.openNestedRow(item);
    });
  }

  render () {
    const { componentStyle = {} } = this.props;
    const tableClass = this.getTableClassName();
    const renderedHeader = !this.props.hideHeader ? this.renderHeader() : null;
    const renderedBody = this.renderBody();
    return (
      <table className={tableClass} style={componentStyle}>
        { renderedHeader }
        { renderedBody }
      </table>
    );
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
    const allRowIds = this.getAllRowIds();
    this.setState({ totalRowCount: allRowIds.length });

    const selectedRows = [...this.state.selectedRows];
    const { singleSelectRowCallback, multipleCallBackValue, selectCallbackValue } = this.props;
    const uniqueId = selectCallbackValue ? rowData[selectCallbackValue] : rowData.id;
    const allChildData = [];
    let allRowId: any = [];

    const childData = this.props.nestedChildData && this.props.nestedChildData;
    const expandedRowId = (childData && childData.length > 0 && childData[0].rowId);
    const isAllChildChecked = childData && childData.length > 0
    && childData[0].component.props.data.filter((item: any) => selectedRows.indexOf(item.id) === -1);
    const isCheckBoxIndeterminante = (isAllChildChecked &&
                                    isAllChildChecked.length > 0 &&
                                    uniqueId === expandedRowId
                                    ) ? true : false;

    const isParentUncheked = (childData && childData.length > 0 &&
                            childData[0].component.props.data.length === isAllChildChecked.length) ? true : false;

    if (this.props.nestedChildData !== undefined && this.props.nestedChildData.length > 0) {
      const childData = this.props.nestedChildData.filter(item => uniqueId === item.rowId);
      if (childData !== undefined && childData.length > 0) {
        for (const key in childData) {
          if (childData[key].component.props.data.length > 0) {
            for (const index in childData[key].component.props.data) {
              allChildData.push(childData[key].component.props.data[index]);
            }
          }
        }
        allRowId = allChildData.map((item: any) => {
          return item.id;
        });
      }
    }
    if (this.state.selectedRows.length > 0 && checkedStatus) {
      for (const key in this.state.selectedRows) {
        allRowId.push(this.state.selectedRows[key]);
      }
    }
    allRowId.push(uniqueId);


    if (expandedRowId && allRowId.indexOf(expandedRowId) === -1 && !isParentUncheked && !isCheckBoxIndeterminante) {
      allRowId.push(expandedRowId);
    }
    this.setState({ selectedRows: allRowId }, () => {
      if (!checkedStatus) {
        if (allRowId.length > 1) {
          for (let key = 0; key < allRowId.length; key++) {
            if (selectedRows.indexOf(allRowId[key]) > -1) {
              selectedRows.splice(selectedRows.indexOf(allRowId[key]), 1);
            }
          }
        } else {
          selectedRows.splice(selectedRows.indexOf(uniqueId), 1);
        }
        this.setState({ selectedRows, allRowChecked: false }, () => {
          this.rowSelectionCallback();
        });
      } else {
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
      }
    });
  }

  // Function to select all the rows on click of header  checkbox
  toggleAllRowSelection = (checkedStatus: boolean) => {
    const allRowIds = this.getAllRowIds();
    this.setState({ totalRowCount: allRowIds.length });

    if (checkedStatus) {
      this.setState({ allRowChecked: true, selectedRows: allRowIds }, () => {
        this.rowSelectionCallback();
      });
    } else {
      this.setState({ allRowChecked: false, selectedRows: [] }, () => {
        this.rowSelectionCallback();
      });
    }
  }

  getAllRowIds = () => {
    const { nestedChildCallback, expandingRowId } = this.props;
    const data = expandingRowId;
    if (data && data.length > 0) {
      data.map((item: any) => {
        nestedChildCallback && nestedChildCallback(item, true);
      });
    }

    const allChildData: any = [];
    if (this.props.nestedChildData !== undefined && this.props.nestedChildData.length > 0) {
      for (const key in this.props.nestedChildData) {
        if (this.props.nestedChildData[key].component.props.data.length > 0) {
          for (const index in this.props.nestedChildData[key].component.props.data) {
            allChildData.push(this.props.nestedChildData[key].component.props.data[index]);
          }
        }
      }
    }

    allChildData.push(...this.state.data);
    const allData = [...new Map(allChildData.map((childData: any) => [childData.id, childData])).values()];

    const allRowId = allData.map((item: any) => {
      return item.id;
    });
    return allRowId;
  }

  // Function to make search in data
  triggerSearch = (searchKey: string, field: string) => {
    const trimmedSearchKey = searchKey.trim().toLowerCase();
    const { data } =  this.getInitialState();
    const { expandingRowId = [] } = this.props;

    if (trimmedSearchKey) {
      const result = data.filter((item: any) => {
        const thisVal = item[field].toLowerCase();
        if (thisVal.indexOf(trimmedSearchKey) !== -1 || expandingRowId.indexOf(item.id) !== -1) {
          return true;
        }
      });
      this.setState({ data: result, searchKey: trimmedSearchKey });
    } else {
      this.setState({ data });
    }
  }
}

export default themr(TABLE, baseTheme)(Table) as ThemedComponentClass<Props, State>;
