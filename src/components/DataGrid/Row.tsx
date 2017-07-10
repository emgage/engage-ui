import * as React from 'react';
import joinClasses from 'classnames';
import OverflowCell from './OverflowCell';
import rowComparer from './RowComparer';
import Cell from './Cell';
import ColumnUtilsMixin from './ColumnUtils';
import cellMetaDataShape from './PropTypeShapes/CellMetaDataShape';
import createObjectWithProperties from './createObjectWithProperties';

// TODO: Add CSS require('../../../themes/react-data-grid-row.css');

const CellExpander = (props: any) => {
  return <Cell {...props} />;
};

// The list of the propTypes that we want to include in the Row div
const knownDivPropertyKeys = ['height'];

export interface Props {
    height: number,
    columns: any,
    row: any,
    cellRenderer: Function,
    cellMetaData: cellMetaDataShape,
    isSelected: boolean,
    idx: number,
    expandedRows: any,
    extraClasses: string,
    forceUpdate: boolean,
    subRowDetails: any,
    isRowHovered: boolean,
    colVisibleStart: number,
    colVisibleEnd: number,
    colDisplayStart: number,
    colDisplayEnd: number,
    isScrolling: boolean,
};

class Row extends React.Component<Props, any> {

  public static defaultProps: Partial<Props> = {
      cellRenderer: Cell,
      isSelected: false,
      height: 35,
  };

  [key: string]: React.ReactNode;

  shouldComponentUpdate(nextProps: Props) {
    return rowComparer(nextProps, this.props);
  }

  handleDragEnter() {
    const handleDragEnterRow = this.props.cellMetaData.handleDragEnterRow;
    if (handleDragEnterRow) {
      handleDragEnterRow(this.props.idx);
    }
  }

  getSelectedColumn() {
    if (this.props.cellMetaData) {
      const selected = this.props.cellMetaData.selected;
      if (selected && selected.idx) {
        return ColumnUtilsMixin.getColumn(this.props.columns, selected.idx);
      }
    }
  }

  getCellRenderer(columnKey: any) {
    const CellRenderer = this.props.cellRenderer;
    if (this.props.subRowDetails && this.props.subRowDetails.field === columnKey) {
      return CellExpander;
    }
    return CellRenderer;
  }

  getCell(column: any, i: any, selectedColumn: any) {
    const CellRenderer: any = this.props.cellRenderer;
    const { colVisibleStart, colVisibleEnd, idx, cellMetaData } = this.props;
    const { key, formatter, locked } = column;
    const baseCellProps = { key: `${key}-${idx}`, idx: i, rowIdx: idx, height: this.getRowHeight(), column, cellMetaData };

    if ((i < colVisibleStart || i > colVisibleEnd) && !locked) {
      return <OverflowCell ref={(node) => this[key] = node} {...baseCellProps} />;
    }

    const { row, isSelected } = this.props;
    const cellProps = {
      ref: (node: any) => this[key] = node,
      value: this.getCellValue(key || i),
      rowData: row,
      isRowSelected: isSelected,
      expandableOptions: this.getExpandableOptions(key),
      selectedColumn,
      formatter,
      isScrolling: this.props.isScrolling,
    };

    return <CellRenderer {...baseCellProps} {...cellProps} />;
  }

  getCells() {
    let cells: any[] = [];
    let lockedCells: any = [];
    let selectedColumn = this.getSelectedColumn();
    let lastColumnIdx = this.props.columns.size - 1;
    if (this.props.columns) {
      this.props.columns.forEach((column: any, i: any) => {
        if (i === lastColumnIdx) {
          column.isLastColumn = true;
        }
        let cell = this.getCell(column, i, selectedColumn);
        if (column.locked) {
          lockedCells.push(cell);
        } else {
          cells.push(cell);
        }
      });
    }

    return cells.concat(lockedCells);
  }

  getRowHeight() {
    let rows = this.props.expandedRows || null;
    if (rows && this.props.idx) {
      let row = rows[this.props.idx] || null;
      if (row) {
        return row.height;
      }
    }
    return this.props.height;
  }

  getCellValue(key: any) {
    let val;
    if (key === 'select-row') {
      return this.props.isSelected;
    } else if (typeof this.props.row.get === 'function') {
      val = this.props.row.get(key);
    } else {
      val = this.props.row[key];
    }
    return val;
  }

  isContextMenuDisplayed() {
    if (this.props.cellMetaData) {
      let selected = this.props.cellMetaData.selected;
      if (selected && selected.contextMenuDisplayed && selected.rowIdx === this.props.idx) {
        return true;
      }
    }
    return false;
  }

  getExpandableOptions(columnKey: any) {
    let subRowDetails = this.props.subRowDetails;
    if (subRowDetails) {
      return { canExpand: subRowDetails && subRowDetails.field === columnKey && ((subRowDetails.children && subRowDetails.children.length > 0) || subRowDetails.group === true), field: subRowDetails.field, expanded: subRowDetails && subRowDetails.expanded, children: subRowDetails && subRowDetails.children, treeDepth: subRowDetails ? subRowDetails.treeDepth : 0, subRowDetails: subRowDetails };
    }
    return {};
  }

  setScrollLeft(scrollLeft: any) {
    this.props.columns.forEach((column: any) => {
      if (column.locked) {
        if (!this[column.key]) return;
        (this[column.key] as any).setScrollLeft(scrollLeft);
      }
    });
  }

  getKnownDivProps() {
    return createObjectWithProperties(this.props, knownDivPropertyKeys);
  }

  renderCell(props: any) {
    if (typeof this.props.cellRenderer === 'function') {
      this.props.cellRenderer.call(this, props);
    }
    if (React.isValidElement(this.props.cellRenderer)) {
      return React.cloneElement(this.props.cellRenderer, props);
    }

    return this.props.cellRenderer(props);
  }

  render() {
    let className = joinClasses(
      'react-grid-Row',
      `react-grid-Row--${this.props.idx % 2 === 0 ? 'even' : 'odd'}`,
      {
        'row-selected': this.props.isSelected,
        'row-context-menu': this.isContextMenuDisplayed(),
      },
      this.props.extraClasses,
    );

    let style = {
      height: this.getRowHeight(),
      overflow: 'hidden',
      contain: 'layout',
    };

    let cells = this.getCells();
    return (
      <div {...this.getKnownDivProps() } className={className} style={style} onDragEnter={this.handleDragEnter} >
        {
          React.isValidElement(this.props.row) ?
            this.props.row : cells
        }
      </div >
    );
  }
};

export default Row;
