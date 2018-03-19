import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

export interface Props {
  // To make table bordered
  bordered?: boolean;
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
  // Flag to indentify if table is sortable
  sorting?: boolean;
  // Set greyed background for odd rows
  striped?: boolean;
  theme?: any;
}

export interface State {
  sortOrder?: string;
  sortField?: string;
}

class Table extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // If sorting is enabled then check for default sort order or field & set that in state
    if (this.props.sorting) {
      this.state = {
        sortOrder: this.props.defaultSortOrder || 'asc',
        sortField: this.props.defaultSortField || '',
      };
    }
  }

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

  render () {
    const tableClass = this.getTableClassName();
    const renderedTable = this.renderChildren();

    return (
      <table className={tableClass}>
        { renderedTable }
      </table>
    );
  }

  // Function to sort the data
  sortData(primer: any) {
    // const { data } = this.props;
  }
}

export default themr(TABLE, baseTheme)(Table) as ThemedComponentClass<Props, State>;
