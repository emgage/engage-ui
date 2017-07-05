import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import ColumnMetrics, { Column, ColumnMetricsType } from './ColumnMetrics';
import DOMMetrics from './DOMMetrics';
import ColumnUtils from './ColumnUtils';

export interface Props {
    columns: Array<Column>,
    minColumnWidth: number,
    columnEquality: Function,
    onColumnResize: Function,
}

export default {
  mixins: [DOMMetrics.MetricsMixin],

  DOMMetrics: {
    gridWidth(): number {
      return (ReactDOM.findDOMNode(this).parentElement as any).offsetWidth;
    },
  },

  getDefaultProps(): {minColumnWidth: number; columnEquality: (a: Column, b: Column) => boolean}  {
    return {
      minColumnWidth: 80,
      columnEquality: ColumnMetrics.sameColumn,
    };
  },

  componentWillMount() {
    this._mounted = true;
  },

  componentWillReceiveProps(nextProps: ColumnMetricsType) {
    if (nextProps.columns) {
      if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality) ||
          nextProps.minWidth !== this.props.minWidth) {
        let columnMetrics = this.createColumnMetrics(nextProps);
        this.setState({columnMetrics: columnMetrics});
      }
    }
  },

  getTotalWidth() {
    let totalWidth = 0;
    if (this._mounted) {
      totalWidth = this.DOMMetrics.gridWidth();
    } else {
      totalWidth = ColumnUtils.getSize(this.props.columns) * this.props.minColumnWidth;
    }
    return totalWidth;
  },

  getColumnMetricsType(metrics: ColumnMetricsType): ColumnMetricsType {
    let totalWidth = metrics.totalWidth || this.getTotalWidth();
    let currentMetrics: ColumnMetricsType = {
      columns: metrics.columns,
      totalWidth,
      minColumnWidth: metrics.minColumnWidth,
      width: 0,
      minWidth: 0,
    };
    let updatedMetrics = ColumnMetrics.recalculate(currentMetrics);
    return updatedMetrics;
  },

  getColumn(idx: any) {
    let columns = this.state.columnMetrics.columns;
    if (Array.isArray(columns)) {
      return columns[idx];
    }else if (typeof Immutable !== 'undefined') {
      return columns.get(idx);
    }
  },

  getSize() {
    let columns = this.state.columnMetrics.columns;
    if (Array.isArray(columns)) {
      return columns.length;
    }else if (typeof Immutable !== 'undefined') {
      return columns.size;
    }
  },

  metricsUpdated() {
    let columnMetrics = this.createColumnMetrics();
    this.setState({columnMetrics});
  },

  createColumnMetrics(props = this.props) {
    let gridColumns = this.setupGridColumns(props);
    return this.getColumnMetricsType({
      columns: gridColumns,
      minColumnWidth: this.props.minColumnWidth,
      totalWidth: props.minWidth
    });
  },

  onColumnResize(index: number, width: number) {
    let columnMetrics = ColumnMetrics.resizeColumn(this.state.columnMetrics, index, width);
    this.setState({columnMetrics});
    if (this.props.onColumnResize) {
      this.props.onColumnResize(index, width);
    }
  },
};
