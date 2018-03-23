import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { TABLE } from '../ThemeIdentifiers';

import Button from '../Button';
import Checkbox from '../Checkbox';
import TableHeader from './TableHeader';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableData from './TableData';

import * as baseTheme from './Table.scss';

export type RowSelection = 'checkbox' | 'radio';

export interface Props {
  // To make table bordered
  bordered?: boolean;
  // Column config, which renders the header
  column?: any;
  // Get the data & use it to populate tds
  data?: any;
  // On load by default it will be sorted by this field
  defaultSortField?: string;
  // Value could be 'asc' || 'desc'
  defaultSortOrder?: string;
  // Filter config, if data needs to be filtered by any mode like search
  filterData?: any;
  // Highlight rows on hover
  highlight?: boolean;
  // Make table responsive
  responsive?: boolean;
  // This helps to add checkbox or radio to select the row & do bulk actions
  selectRow?: RowSelection;
  // Function to get called when row got selected
  selectRowCallback?(rows: any): void;
  // Flag to indentify if table is sortable, if passed "all" then add sorting to all the columns
  sorting?: boolean | string;
  // Set greyed background for odd rows
  striped?: boolean;
  theme?: any;
}

export interface State {
  allRowChecked?: boolean;
  data: any;
  sort?: any;
  selectedRows: any[];
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

  getInitialState() {
    const { data, defaultSortField, defaultSortOrder } = this.props;

    return {
      data,
      allRowChecked: false,
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
  getTableClassName() {
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

  // Function to handle search, this saves the searching text to state
  handleSearch(event: any) {
    this.setState({ searchKey: event.target.value });
  }

  // Render the thead with th & contain specific header label
  // Used certain flags which will help to add sorting for any specific fields
  renderHeader() {
    const { column, sorting } = this.props;
    const { field, order } = this.state.sort;

    return (
      <TableHeader>
        <TableRow>
          { this.renderRowSelection(null, 'head') }
          {
            column.map((item: any) => {
              const thisSort: string = (sorting === 'all' || item.sort) && !item.noSort ? item.key : '';

              return (
                <TableHead
                  key={item.key}
                  sort={thisSort}
                  style={item.style}
                  className={item.className}
                  order={field === item.key ? order.current : ''}
                  clickHandler={this.sortData.bind(this)}>
                  {/* 
                    Here injectheader helps to inject any custom component,
                    Header value can be sent & then used in custom component
                  */}
                  {item.injectHeader ? item.injectHeader(item.headerValue) : item.label}
                </TableHead>
              );
            })
          }
        </TableRow>
      </TableHeader>
    );
  }

  // Function to render tbody & td with specifc data & if user passed any custom component that can also get rendered
  renderBody() {
    const { column, selectRow } = this.props;
    const { data } = this.state;

    return (
      <TableBody>
        {
          data.map((item: any, index: number) => {
            return (
              <TableRow key={index}>
                { this.renderRowSelection(item, 'body') }
                {
                  column.map((colItem: any) => {
                    return (
                      <TableData key={colItem.key}>
                        {/* 
                          Here injectBody helps to inject any custom component to td,
                          we also return the specifc value, which then can be used in injected component
                        */}
                        {colItem.injectBody ? colItem.injectBody(item) : item[colItem.key]}
                      </TableData>
                    );
                  })
                }
              </TableRow>
            );
          })
        }

        { !data.length ? <TableRow><TableData colSpan={column.length + (selectRow ? 1 : 0)}>No record found</TableData></TableRow> : null }
      </TableBody>
    );
  }

  // Function to add filter box for filtering table data
  renderFilterField() {
    const { filterData } = this.props;

    switch (filterData.mode) {
      case 'search': {
        return this.renderSearchField();
      }
      default:
        return null;
    }
  }

  // Function to render search field
  renderSearchField() {
    const { theme } = this.props;
    const { event, placeholder, title } = this.props.filterData.search;

    const searchFieldContainer = classNames(
      theme.searchField
    );

    const searchField = classNames(
      theme.fieldGroup
    );

    const searcAction = classNames(
      theme.fieldGroupAddon
    );

    return (
      <div className={searchFieldContainer}>
        { title ? <label></label> : null }
        <div className={searchField}>
          <input type="text" placeholder={placeholder} value={this.state.searchKey} onChange={this.handleSearch.bind(this)} />
          {
            event ?
            (<div className={searcAction}>
              <Button onClick={(val: any) => this.triggerSearch()}>Search</Button>
            </div>) : ''
          }
        </div>
      </div>
    );
  }

  // Function to call the callback function on row selection
  rowSelectionCallback() {
    const { selectRowCallback } = this.props;

    if (selectRowCallback) {
      selectRowCallback(this.state.selectedRows);
    }
  }

  // Add checkbox or radio component to select the row, depending on `selectrow` flag
  renderRowSelection(rowData: any, rowType: string) {
    const { selectRow } = this.props;

    if (selectRow) {
      if (rowType === 'body') {
        if (selectRow === 'checkbox') {
          return this.renderCheckbox(rowData);
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
  addHeaderCheckbox(): React.ReactElement<any> {
    return <TableHead style={{ width: 'auto' }}><Checkbox label="" checked={this.state.allRowChecked} onChange={this.toggleAllRowSelection.bind(this)} /></TableHead>;
  }

  // Function to add checkbox for the row selection
  renderCheckbox(rowData: any): React.ReactElement<any> {
    const { selectedRows } = this.state;

    return (
      <TableData>
        <Checkbox
          label=""
          value={rowData.id}
          checked={selectedRows.indexOf(rowData.id) !== -1 ? true : false}
          onChange={(checkedStatus: boolean) => {
            this.toggleSingleRowSelection(rowData.id, checkedStatus);
          }} />
      </TableData>
    );
  }

  // Function to add checkbox for the row selection
  renderRadio(rowData: any): React.ReactElement<any> {
    return <TableData><Checkbox label="" value={rowData.id} checked={rowData.checked ? true : false} /></TableData>;
  }

  render () {
    const tableClass = this.getTableClassName();
    // const renderedTable = this.renderChildren();
    const renderedHeader = this.renderHeader();
    const renderedBody = this.renderBody();

    return (
      <div>
        { this.renderFilterField() }
        <table className={tableClass}>
          { renderedHeader }
          { renderedBody }
        </table>
      </div>
    );
  }

  // Function to sort the data
  sortData(field: string) {
    const { data } = this.props;
    const { order } = this.state.sort;

    const sortedData = data.sort((item1: any, item2: any) => {
      // Converting strings to uppercase so for comparisions there will be no issue
      const value1 = item1[field].toUpperCase();
      const value2 = item2[field].toUpperCase();

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
  toggleSingleRowSelection(dataId: string | number, checkedStatus: boolean) {
    const selectedRows = [...this.state.selectedRows];

    if (!checkedStatus) {
      selectedRows.splice(selectedRows.indexOf(dataId), 1);
      this.setState({ selectedRows, allRowChecked: false }, () => {
        this.rowSelectionCallback();
      });
    } else {
      this.setState({ selectedRows: this.state.selectedRows.concat([dataId]) }, () => {
        this.rowSelectionCallback();
      });
    }
  }

  // Function to select all the rows on click of header  checkbox
  toggleAllRowSelection(checkedStatus: boolean) {
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
  triggerSearch() {
    const { searchKey } = this.state;
    const { field } = this.props.filterData.search;
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
