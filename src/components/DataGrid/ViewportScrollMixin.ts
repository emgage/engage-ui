import * as React from 'react';
import ReactDOM from 'react-dom';
import ColumnUtils from './ColumnUtils';
import * as DOMMetrics from './DOMMetrics';
const min = Math.min;
const max = Math.max;
const floor = Math.floor;
const ceil = Math.ceil;

export interface ViewportScrollState {
  displayStart: number,
  displayEnd: number,
  height: number,
  scrollTop: number,
  scrollLeft: number,
  visibleStart: number,
  visibleEnd: number,
  colVisibleStart: number,
  colVisibleEnd: number,
  colDisplayStart: number,
  colDisplayEnd: number,
};

export default {

  propTypes: {
    rowHeight: React.PropTypes.number,
    rowsCount: React.PropTypes.number.isRequired,
  },

  mixins: [DOMMetrics.MetricsMixin],

  DOMMetrics: {
    viewportHeight(): number {
      return (ReactDOM.findDOMNode(this) as HTMLElement).offsetHeight;
    },
    viewportWidth(): number {
      return (ReactDOM.findDOMNode(this) as HTMLElement).offsetWidth;
    },
  },

  getDefaultProps(): { rowHeight: number } {
    return {
      rowHeight: 30,
    };
  },

  getInitialState(): ViewportScrollState {
    return this.getGridState(this.props);
  },

  getGridState(props: { rowHeight: number; rowsCount: number; minHeight: number; columnMetrics: any; rowOffsetHeight: any; }): ViewportScrollState {
    let totalNumberColumns = ColumnUtils.getSize(props.columnMetrics.columns);
    let canvasHeight = props.minHeight - props.rowOffsetHeight;
    let renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
    let totalRowCount = min(renderedRowsCount * 4, props.rowsCount);
    return {
      displayStart: 0,
      displayEnd: totalRowCount,
      visibleStart: 0,
      visibleEnd: totalRowCount,
      height: canvasHeight,
      scrollTop: 0,
      scrollLeft: 0,
      colVisibleStart: 0,
      colVisibleEnd: totalNumberColumns,
      colDisplayStart: 0,
      colDisplayEnd: totalNumberColumns,
    };
  },

  getRenderedColumnCount(displayStart: any, width: any) {
    let remainingWidth = width && width > 0 ? width : this.props.columnMetrics.totalWidth;
    if (remainingWidth === 0) {
      remainingWidth = (ReactDOM.findDOMNode(this) as HTMLElement).offsetWidth;
    }
    let columnIndex = displayStart;
    let columnCount = 0;
    while (remainingWidth > 0) {
      let column = ColumnUtils.getColumn(this.props.columnMetrics.columns, columnIndex);

      if (!column) {
        break;
      }

      columnCount++;
      columnIndex++;
      remainingWidth -= column.width;
    }
    return columnCount;
  },

  getVisibleColStart(scrollLeft: any) {
    let remainingScroll = scrollLeft;
    let columnIndex = -1;
    while (remainingScroll >= 0) {
      columnIndex++;
      remainingScroll -= ColumnUtils.getColumn(this.props.columnMetrics.columns, columnIndex).width;
    }
    return columnIndex;
  },

  resetScrollStateAfterDelay() {
    if (this.resetScrollStateTimeoutId) {
      clearTimeout(this.resetScrollStateTimeoutId);
    }

    this.resetScrollStateTimeoutId = setTimeout(
      this.resetScrollStateAfterDelayCallback,
      500,
    );
  },

  resetScrollStateAfterDelayCallback() {
    this.resetScrollStateTimeoutId = null;
    this.setState({
      isScrolling: false,
    });
  },

  updateScroll(scrollTop: number, scrollLeft: number, height: number, rowHeight: number, length: number, width: any) {
    let isScrolling = true;
    this.resetScrollStateAfterDelay();

    let renderedRowsCount = ceil(height / rowHeight);

    let visibleStart = max(0, floor(scrollTop / rowHeight));

    let visibleEnd = min(visibleStart + renderedRowsCount, length);

    let displayStart = max(0, visibleStart - this.props.overScan.rowsStart);

    let displayEnd = min(visibleEnd + this.props.overScan.rowsEnd, length);

    let totalNumberColumns = ColumnUtils.getSize(this.props.columnMetrics.columns);
    let colVisibleStart = (totalNumberColumns > 0) ? max(0, this.getVisibleColStart(scrollLeft)) : 0;
    let renderedColumnCount = this.getRenderedColumnCount(colVisibleStart, width);
    let colVisibleEnd = (renderedColumnCount !== 0) ? colVisibleStart + renderedColumnCount : totalNumberColumns;
    let colDisplayStart = max(0, colVisibleStart - this.props.overScan.colsStart);
    let colDisplayEnd = min(colVisibleEnd + this.props.overScan.colsEnd, totalNumberColumns);

    const nextScrollState = {
      visibleStart,
      visibleEnd,
      displayStart,
      displayEnd,
      height,
      scrollTop,
      scrollLeft,
      colVisibleStart,
      colVisibleEnd,
      colDisplayStart,
      colDisplayEnd,
      isScrolling,
    };

    this.setState(nextScrollState);
  },

  metricsUpdated() {
    const height = this.DOMMetrics.viewportHeight();
    const width = this.DOMMetrics.viewportWidth();
    if (height) {
      this.updateScroll(
        this.state.scrollTop,
        this.state.scrollLeft,
        height,
        this.props.rowHeight,
        this.props.rowsCount,
        width,
      );
    }
  },

  componentWillReceiveProps(nextProps: { rowHeight: number; rowsCount: number, rowOffsetHeight: number, minHeight: any, columnMetrics: any }) {
    if (this.props.rowHeight !== nextProps.rowHeight ||
      this.props.minHeight !== nextProps.minHeight ||
      ColumnUtils.getSize(this.props.columnMetrics.columns) !== ColumnUtils.getSize(nextProps.columnMetrics.columns)) {
      this.setState(this.getGridState(nextProps));
    } else if (this.props.rowsCount !== nextProps.rowsCount) {
      this.updateScroll(
        this.state.scrollTop,
        this.state.scrollLeft,
        this.state.height,
        nextProps.rowHeight,
        nextProps.rowsCount,
      );
      // Added to fix the hiding of the bottom scrollbar when showing the filters.
    } else if (this.props.rowOffsetHeight !== nextProps.rowOffsetHeight) {
      // The value of height can be positive or negative and will be added to the current height to cater for changes in the header height (due to the filer)
      const height = this.props.rowOffsetHeight - nextProps.rowOffsetHeight;

      this.updateScroll(
        this.state.scrollTop,
        this.state.scrollLeft,
        this.state.height + height,
        nextProps.rowHeight,
        nextProps.rowsCount,
      );
    }
  },
};
