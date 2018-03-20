import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { TABLE } from '../ThemeIdentifiers';

import TableHeader from './TableHeader';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableData from './TableData';

import * as baseTheme from './Table.scss';

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
  // Highlight rows on hover
  highlight?: boolean;
  // Make table responsive
  responsive?: boolean;
  // Flag to indentify if table is sortable, if passed "all" then add sorting to all the columns
  sorting?: boolean | string;
  // Set greyed background for odd rows
  striped?: boolean;
  theme?: any;
}

export interface State {
  data?: any;
  sort?: any;
}

class Table extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { data, sorting, defaultSortField, defaultSortOrder } = this.props;

    // If sorting is enabled then check for default sort order or field & set that in state
    if (sorting) {
      this.state = {
        data,
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
      };
    }
  }

  componentWillMount() {
    // If user asked to sort the data by default then call the sortdata before rendering
    if (this.props.defaultSortField) {
      this.sortData(this.props.defaultSortField);
    }
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

  /*** 
    // Function to take childrens of this component & render it with actual values
    renderChildren() {
      return React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
        // Get the name of component, this could be either ThemedTableHeader, ThemedTableBody, ThemedTableFooter
        const componentName = typeof child.type === 'function' ? child.type.displayName : '';

        // Get table body & iterate through data received in props
        // This data then should be initialized in specific td's by checking there dataKey
        if (componentName === 'ThemedTableBody') {
          // Last argument is the children return after going through the process of creating rows with actual data
          return React.cloneElement(child, {}, this.renderTableBody(child));
        }

        // Returning thead as it is
        return child;
      });
    }

    // Function to take tbody & get its children which most probably always will be tr
    // Here iterate through the data received by Table component & create / clone tr with those data
    renderTableBody(tableBody: React.ReactElement<any>): any {
      const { data } = this.props;

      return React.Children.map(tableBody.props.children, (child: React.ReactElement<any>) => {
        return data.map((item: any) => {
          // Data here will be like {name: '', email: '', ...}
          // This will match with the dataKey passed through TableData & replace its value with data.name, data.emai, ...
          return React.cloneElement(child, {}, this.renderTableRow(item, child));
        });
      });
    }

    // Get the children row & replace the values with actual data
    // Match data.key with dataKey sent in TableData
    renderTableRow(jsonRow:any, tableRow: React.ReactElement<any>): any {
      return React.Children.map(tableRow.props.children, (child: React.ReactElement<any>) => {
        if (jsonRow[child.props.dataKey]) {
          return React.cloneElement(child, { dataKey: jsonRow[child.props.dataKey] });
        }

        return React.cloneElement(child);
      });
    }
 */

 // Render the thead with th & contain specific header label
 // Used certain flags which will help to add sorting for any specific fields
  renderHeader() {
    const { column, sorting } = this.props;
    const { field, order } = this.state.sort;

    return (
      <TableHeader>
        <TableRow>
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
    const { column } = this.props;
    const { data } = this.state;

    return (
      <TableBody>
        {
          data.map((item: any, index: number) => {
            return (
              <TableRow key={index}>
                {
                  column.map((colItem: any) => {
                    return (
                      <TableData key={colItem.key}>
                        {/* 
                          Here injectBody helps to inject any custom component to td,
                          we also return the specifc value, which then can be used in injected component
                        */}
                        {colItem.injectBody ? colItem.injectBody(item[colItem.key]) : item[colItem.key]}
                      </TableData>
                    );
                  })
                }
              </TableRow>
            );
          })
        }
      </TableBody>
    );
  }

  render () {
    const tableClass = this.getTableClassName();
    // const renderedTable = this.renderChildren();
    const renderedHeader = this.renderHeader();
    const renderedBody = this.renderBody();

    return (
      <table className={tableClass}>
        { renderedHeader }
        { renderedBody }
      </table>
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
}

export default themr(TABLE, baseTheme)(Table) as ThemedComponentClass<Props, State>;
