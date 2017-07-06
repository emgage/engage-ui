import * as React from 'react';
import * as ReactDOM from 'react-dom';
import joinClasses from 'classnames';
import shallowEqual from 'fbjs/lib/shallowEqual';
import ScrollShim from './ScrollShim';
import Row from './Row';
import RowsContainer from './RowsContainer';
import RowGroup from './RowGroup';
import RowUtils from './RowUtils';
// TODO: Add CSS require('../../../themes/react-data-grid-core.css');

export interface Props {
    rowRenderer: any,
    rowHeight: number,
    height: number,
    width: number,
    totalWidth: any,
    style: string,
    className: string,
    displayStart: number,
    displayEnd: number,
    visibleStart: number,
    visibleEnd: number,
    colVisibleStart: number,
    colVisibleEnd: number,
    colDisplayStart: number,
    colDisplayEnd: number,
    rowsCount: number,
    rowGetter: any,
    expandedRows: any,
    onRows: Function,
    onScroll: Function,
    columns: any,
    cellMetaData: any,
    selectedRows: any,
    rowKey: string,
    rowScrollTimeout: number,
    contextMenu: any,
    getSubRowDetails: Function,
    rowSelection: any,
    rowGroupRenderer: Function,
    isScrolling: boolean,
};

class Canvas extends React.Component<Props, any> {
  public static defaultProps: Partial<Props> = {
      rowRenderer: Row,
      onRows: () => { },
      selectedRows: [],
      rowScrollTimeout: 0,
  };

  mixins: [ScrollShim];

  rows: any[];
  _currentRowsLength = 0;
  _currentRowsRange: { start: 0, end: 0 };
  _scroll: { scrollTop: 0, scrollLeft: 0 };

  constructor(props: Props) {
    super(props);

    this.state = {
        displayStart: this.props.displayStart,
        displayEnd: this.props.displayEnd,
        scrollingTimeout: null,
      };
  };

  componentWillMount() {
    this._currentRowsLength = 0;
    this._currentRowsRange = { start: 0, end: 0 };
    this._scroll = { scrollTop: 0, scrollLeft: 0 };
  }

  componentDidMount() {
    this.onRows();
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.displayStart !== this.state.displayStart
      || nextProps.displayEnd !== this.state.displayEnd) {
      this.setState({
        displayStart: nextProps.displayStart,
        displayEnd: nextProps.displayEnd,
      });
    }
  }

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    let shouldUpdate = nextState.displayStart !== this.state.displayStart
      || nextState.displayEnd !== this.state.displayEnd
      || nextState.scrollingTimeout !== this.state.scrollingTimeout
      || nextProps.rowsCount !== this.props.rowsCount
      || nextProps.rowHeight !== this.props.rowHeight
      || nextProps.columns !== this.props.columns
      || nextProps.width !== this.props.width
      || nextProps.height !== this.props.height
      || nextProps.cellMetaData !== this.props.cellMetaData
      || this.props.colDisplayStart !== nextProps.colDisplayStart
      || this.props.colDisplayEnd !== nextProps.colDisplayEnd
      || this.props.colVisibleStart !== nextProps.colVisibleStart
      || this.props.colVisibleEnd !== nextProps.colVisibleEnd
      || !shallowEqual(nextProps.style, this.props.style);
    return shouldUpdate;
  }

  componentWillUnmount() {
    this._currentRowsLength = 0;
    this._currentRowsRange = { start: 0, end: 0 };
    this._scroll = { scrollTop: 0, scrollLeft: 0 };
  }

  componentDidUpdate() {
    if (this._scroll.scrollTop !== 0 && this._scroll.scrollLeft !== 0) {
      this.setScrollLeft(this._scroll.scrollLeft);
    }
    this.onRows();
  }

  onRows() {
    if (this._currentRowsRange !== { start: 0, end: 0 }) {
      this.props.onRows(this._currentRowsRange);
      this._currentRowsRange = { start: 0, end: 0 };
    }
  }

  onScroll(e: any) {
    if (ReactDOM.findDOMNode(this) !== e.target) {
      return;
    }
    this.appendScrollShim();
    let scrollLeft = e.target.scrollLeft;
    let scrollTop = e.target.scrollTop;
    let scroll = { scrollTop, scrollLeft };
    this._scroll = scroll;
    this.props.onScroll(scroll);
  }

  getRows(displayStart: any, displayEnd: any) {
    this._currentRowsRange = { start: displayStart, end: displayEnd };
    if (Array.isArray(this.props.rowGetter)) {
      return this.props.rowGetter.slice(displayStart, displayEnd);
    }
    let rows = [];
    let i = displayStart;
    while (i < displayEnd) {
      let row = this.props.rowGetter(i);
      let subRowDetails = {};
      if (this.props.getSubRowDetails) {
        subRowDetails = this.props.getSubRowDetails(row);
      }
      rows.push({ row, subRowDetails });
      i++;
    }
    return rows;
  }

  getScrollbarWidth() {
    let scrollbarWidth = 0;
    // Get the scrollbar width
    let canvas = ReactDOM.findDOMNode(this);
    scrollbarWidth = canvas.offsetWidth - canvas.clientWidth;
    return scrollbarWidth;
  }

  getScroll() {
    let {scrollTop, scrollLeft} = ReactDOM.findDOMNode(this);
    return { scrollTop, scrollLeft };
  }

  isRowSelected(idx: any, row: any) {
    // Use selectedRows if set
    if (this.props.selectedRows !== null) {
      let selectedRows = this.props.selectedRows.filter((r: any) => {
        let rowKeyValue = row.get ? row.get(this.props.rowKey) : row[this.props.rowKey];
        return r[this.props.rowKey] === rowKeyValue;
      });
      return selectedRows.length > 0 && selectedRows[0].isSelected;
    }

    // Else use new rowSelection props
    if (this.props.rowSelection) {
      let {keys, indexes, isSelectedKey} = this.props.rowSelection;
      return RowUtils.isRowSelected(keys, indexes, isSelectedKey, row, idx);
    }

    return false;
  }

  setScrollLeft(scrollLeft: any) {
    if (this._currentRowsLength !== 0) {
      if (!this.rows) return;
      for (let i = 0, len = this._currentRowsLength; i < len; i++) {
        if (this.rows[i]) {
          let row = this.getRowByRef(i);
          if (row && row.setScrollLeft) {
            row.setScrollLeft(scrollLeft);
          }
        }
      }
    }
  }

  getRowByRef(i: number) {
    // check if wrapped with React DND drop target
    let wrappedRow = this.rows[i].getDecoratedComponentInstance ? this.rows[i].getDecoratedComponentInstance(i) : null;
    if (wrappedRow) {
      return wrappedRow.row;
    }
    return this.rows[i];
  }

  renderRow(props: any) {
    let row = props.row;
    if (row.__metaData && row.__metaData.getRowRenderer) {
      return row.__metaData.getRowRenderer(this.props, props.idx);
    }
    if (row.__metaData && row.__metaData.isGroup) {
      return (<RowGroup
        {...props}
        {...row.__metaData}
        name={row.name}
        renderer={this.props.rowGroupRenderer} />);
    }
    let RowsRenderer = this.props.rowRenderer;
    if (typeof RowsRenderer === 'function') {
      return <RowsRenderer {...props}/>;
    }

    if (React.isValidElement(this.props.rowRenderer)) {
      return React.cloneElement(this.props.rowRenderer, props);
    }
  }

  renderPlaceholder(key: string, height: number) {
    // just renders empty cells
    // if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
    return (<div key={ key } style={{ height: height }}>
      {
        this.props.columns.map(
          (column: any, idx: any) => <div style={{ width: column.width }} key={idx} />,
        )
      }
    </div >
    );
  }

  render() {
    const { displayStart, displayEnd } = this.state;
    const { rowHeight, rowsCount } = this.props;

    let rows = this.getRows(displayStart, displayEnd)
      .map((r, idx) => this.renderRow({
        key: `row-${displayStart + idx}`,
        ref: (node: any) => this.rows[idx] = node,
        idx: displayStart + idx,
        visibleStart: this.props.visibleStart,
        visibleEnd: this.props.visibleEnd,
        row: r.row,
        height: rowHeight,
        onMouseOver: this.onMouseOver,
        columns: this.props.columns,
        isSelected: this.isRowSelected(displayStart + idx, r.row),
        expandedRows: this.props.expandedRows,
        cellMetaData: this.props.cellMetaData,
        subRowDetails: r.subRowDetails,
        colVisibleStart: this.props.colVisibleStart,
        colVisibleEnd: this.props.colVisibleEnd,
        colDisplayStart: this.props.colDisplayStart,
        colDisplayEnd: this.props.colDisplayEnd,
        isScrolling: this.props.isScrolling
      }));

    this._currentRowsLength = rows.length;

    if (displayStart > 0) {
      rows.unshift(this.renderPlaceholder('top', displayStart * rowHeight));
    }

    if (rowsCount - displayEnd > 0) {
      rows.push(
        this.renderPlaceholder('bottom', (rowsCount - displayEnd) * rowHeight));
    }

    let style = {
      position: 'absolute',
      top: 0,
      left: 0,
      overflowX: 'auto',
      overflowY: 'scroll',
      width: this.props.totalWidth,
      height: this.props.height,
    };

    return (
      <div
        style={style as any}
        onScroll={this.onScroll}
        className={joinClasses('react-grid-Canvas', this.props.className, { opaque: this.props.cellMetaData.selected && this.props.cellMetaData.selected.active }) }>
        <RowsContainer
          width={this.props.width}
          rows={rows}
          contextMenu={this.props.contextMenu}
          rowIdx={this.props.cellMetaData.selected.rowIdx}
          idx={this.props.cellMetaData.selected.idx} />
      </div>
    );
  }
};

export default Canvas;
