import * as React from 'react';
import joinClasses from 'classnames';

export const DEFINE_SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
  NONE: 'NONE',
};

export interface Props {
  columnKey: string,
  column: {name: any},
  sortDirection: string,
  onSort(col: string, dir: string): void,
}

interface IUnicodeKeys {
  ASC: number,
  DESC: number,
  [key: string]: number,
}

class SortableHeaderCell extends React.Component<Props, {}> {

  onClick = () => {
    let direction;
    switch (this.props.sortDirection) {
    default:
    case null:
    case undefined:
    case DEFINE_SORT.NONE:
      direction = DEFINE_SORT.ASC;
      break;
    case DEFINE_SORT.ASC:
      direction = DEFINE_SORT.DESC;
      break;
    case DEFINE_SORT.DESC:
      direction = DEFINE_SORT.NONE;
      break;
    }
    this.props.onSort(
      this.props.columnKey,
      direction);
  }

  getSortByText = () => {
    const unicodeKeys: IUnicodeKeys = {
      ASC: 9650,
      DESC: 9660,
    };
    return this.props.sortDirection === 'NONE' ? '' : String.fromCharCode(unicodeKeys[this.props.sortDirection]);
  }

  render() {
    const className = joinClasses({
      'react-grid-HeaderCell-sortable': true,
      'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
      'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC',
    });

    return (
      <div className={className}
        onClick={this.onClick}
        style={{cursor: 'pointer'}}>
        <span className="pull-right">{this.getSortByText()}</span>
        {this.props.column.name}
      </div>
    );
  }

}

export default SortableHeaderCell;
