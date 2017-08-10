import * as React from 'react';

import * as styles from '../../styles/properties.scss';

export interface IProps{
  tableValues: any[];
}

class Properties extends React.Component<IProps, any> {
  createHeadings = () => {
    // creates an array of th components based on the keys in the first object
    return Object.keys(this.props.tableValues[0]).map((value, index) => {
      return <th key={index} className={styles.border}>{value}</th>;
    });
  }

  createRows = () => {
    // creates an array of rows and cells
    return this.props.tableValues.map((row: any, index: number) => {
      const cells = this.createCells(row);
      return (
        <tr
          key={index}
          className={styles.border}
        >
        {cells}
        </tr>
      );
    });
  }

  createCells = (row: any) => {
    // takes in a row object and returns an array of cells
    return Object.keys(row).map((key: string, index: number) => {
      return (
        <td
          key={index}
          className={styles.border}
        >
          {row[key]}
        </td>);
    });
  }

  render() {
    const headings = this.createHeadings();
    const contents = this.createRows();
    return (
      <table className={styles.border + ' ' + styles.table}>
        <thead className={styles.heading}>
          <tr>{headings}</tr>
        </thead>
        <tbody>
          {contents}
        </tbody>
      </table>
    );
  }
}

export default Properties;
