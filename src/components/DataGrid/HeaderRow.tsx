import * as React from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';
import BaseHeaderCell from './HeaderCell';
import getScrollbarSize from './getScrollbarSize';
import ColumnUtilsMixin from './ColumnUtils';
import SortableHeaderCell, { DEFINE_SORT } from './cells/headerCells/SortableHeaderCell';
import FilterableHeaderCell from './cells/headerCells/FilterableHeaderCell';
import { HeaderCellType } from './HeaderCellType';
import createObjectWithProperties from './createObjectWithProperties';
// TODO: Add CSS require('../../../themes/react-data-grid-header.css');

export interface HeaderRowStyle {
  overflow: string,
  width: any,
  height: number,
  position: string,
};

export interface Props {
    width: any,
    height: number,
    columns: any,
    onColumnResize: Function,
    onSort: any,
    onColumnResizeEnd: Function,
    style: HeaderRowStyle,
    sortColumn: string,
    sortDirection: typeof DEFINE_SORT,
    cellRenderer: Function,
    headerCellRenderer: Function,
    filterable: boolean,
    onFilterChange: any,
    resizing: {},
    onScroll: Function,
    rowType: string,
    draggableHeaderCell: any,
    onHeaderDrop: Function,
};

// The list of the propTypes that we want to include in the HeaderRow div
const knownDivPropertyKeys = ['width', 'height', 'style', 'onScroll'];

class HeaderRow extends React.Component<Props, any> {

  cells: any;
  mixins: [ColumnUtilsMixin];

  componentWillMount() {
    this.cells = [];
  }

  shouldComponentUpdate(nextProps: any): boolean {
    return (
      nextProps.width !== this.props.width
      || nextProps.height !== this.props.height
      || nextProps.columns !== this.props.columns
      || !shallowEqual(nextProps.style, this.props.style)
      || this.props.sortColumn !== nextProps.sortColumn
      || this.props.sortDirection !== nextProps.sortDirection
    );
  }

  getHeaderCellType(column: any) {
    if (column.filterable) {
      if (this.props.filterable) return HeaderCellType.FILTERABLE;
    }

    if (column.sortable && column.rowType !== 'filter') return HeaderCellType.SORTABLE;

    return HeaderCellType.NONE;
  }

  getFilterableHeaderCell(column: any) {
    let FilterRenderer = FilterableHeaderCell;
    if (column.filterRenderer !== undefined) {
      FilterRenderer = column.filterRenderer;
    }
    return <FilterRenderer {...this.props} onChange={this.props.onFilterChange} />;
  }

  getSortableHeaderCell(column: any) {
    let sortDirection = (this.props.sortColumn === column.key) ? this.props.sortDirection : DEFINE_SORT.NONE;
    return <SortableHeaderCell columnKey={column.key} onSort={this.props.onSort} sortDirection={sortDirection.toString()}/>;
  }

  getHeaderRenderer(column: any) {
    let renderer;
    if (column.headerRenderer && !this.props.filterable) {
      renderer = column.headerRenderer;
    } else {
      let headerCellType = this.getHeaderCellType(column);
      switch (headerCellType) {
      case HeaderCellType.SORTABLE:
        renderer = this.getSortableHeaderCell(column);
        break;
      case HeaderCellType.FILTERABLE:
        renderer = this.getFilterableHeaderCell(column);
        break;
      default:
        break;
      }
    }
    return renderer;
  }

  getStyle(): HeaderRowStyle {
    return {
      overflow: 'hidden',
      width: '100%',
      height: this.props.height,
      position: 'absolute'
    };
  }

  getCells() {
    let cells = [];
    let lockedCells = [];
    for (let i = 0, len = this.getSize(this.props.columns); i < len; i++) {
      let column = Object.assign({ rowType: this.props.rowType }, this.getColumn(this.props.columns, i));
      let _renderer = this.getHeaderRenderer(column);
      if (column.key === 'select-row' && this.props.rowType === 'filter') {
        _renderer = <div></div>;
      }
      let HeaderCell = column.draggable ? this.props.draggableHeaderCell : BaseHeaderCell;
      let cell = (
        <HeaderCell
          ref={(node: any) => this.cells[i] = node}
          key={i}
          height={this.props.height}
          column={column}
          renderer={_renderer}
          resizing={this.props.resizing === column}
          onResize={this.props.onColumnResize}
          onResizeEnd={this.props.onColumnResizeEnd}
          onHeaderDrop={this.props.onHeaderDrop}
          />
      );
      if (column.locked) {
        lockedCells.push(cell);
      } else {
        cells.push(cell);
      }
    }

    return cells.concat(lockedCells);
  }

  setScrollLeft(scrollLeft: number) {
    this.props.columns.forEach( (column: any, i: any) => {
      if (column.locked) {
        this.cells[i].setScrollLeft(scrollLeft);
      } else {
        if (this.cells[i] && this.cells[i].removeScroll) {
          this.cells[i].removeScroll();
        }
      }
    });
  }

  getKnownDivProps() {
    return createObjectWithProperties(this.props, knownDivPropertyKeys);
  }

  render() {
    let cellsStyle = {
      width: this.props.width ? (this.props.width + getScrollbarSize()) : '100%',
      height: this.props.height,
      whiteSpace: 'nowrap',
      overflowX: 'hidden' as any,
      overflowY: 'hidden' as any,
    };

    let cells = this.getCells();
    return (
      <div {...this.getKnownDivProps()} className="react-grid-HeaderRow">
        <div style={cellsStyle}>
          {cells}
        </div>
      </div>
    );
  }
};

export default HeaderRow;
