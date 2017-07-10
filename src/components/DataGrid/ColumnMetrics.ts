import shallowCloneObject from './shallowCloneObject';
import sameColumn from './ColumnComparer';
import ColumnUtils from './ColumnUtils';
import getScrollbarSize from './getScrollbarSize';
import isColumnsImmutable from './utils/isColumnsImmutable';

export interface Column {
  left: number,
  width: number,
  [key: string]: number,
};

export interface ColumnMetricsType {
    columns: Array<Column>,
    totalWidth: number,
    minColumnWidth: number,
    width: any,
    minWidth: any,
};

function setColumnWidths(columns: any, totalWidth: any) {
  return columns.map((column: any) => {
    let colInfo = Object.assign({}, column);
    if (column.width) {
      if (/^([0-9]+)%$/.exec(column.width.toString())) {
        colInfo.width = Math.floor(
          column.width / 100 * totalWidth);
      }
    }
    return colInfo;
  });
}

function setDefferedColumnWidths(columns: any, unallocatedWidth: any, minColumnWidth: any) {
  let defferedColumns = columns.filter((c: any) => !c.width);
  return columns.map((column: any) => {
    if (!column.width) {
      if (unallocatedWidth <= 0) {
        column.width = minColumnWidth;
      } else {
        let columnWidth = Math.floor(unallocatedWidth / (ColumnUtils.getSize(defferedColumns)));
        if (columnWidth < minColumnWidth) {
          column.width = minColumnWidth;
        } else {
          column.width = columnWidth;
        }
      }
    }
    return column;
  });
}

function setColumnOffsets(columns: any) {
  let left = 0;
  return columns.map((column: any) => {
    column.left = left;
    left += column.width;
    return column;
  });
}

/**
 * Update column metrics calculation.
 *
 * @param {ColumnMetricsType} metrics
 */
function recalculate(metrics: ColumnMetricsType): ColumnMetricsType {
    // compute width for columns which specify width
  let columns = setColumnWidths(metrics.columns, metrics.totalWidth);

  let unallocatedWidth = columns.filter((c: any) => c.width).reduce((w: any, column: any) => {
    return w - column.width;
  }, metrics.totalWidth);
  unallocatedWidth -= getScrollbarSize();

  let width = columns.filter((c: any) => c.width).reduce((w: any, column: any) => {
    return w + column.width;
  }, 0);

  // compute width for columns which doesn't specify width
  columns = setDefferedColumnWidths(columns, unallocatedWidth, metrics.minColumnWidth);

  // compute left offset
  columns = setColumnOffsets(columns);

  return {
    columns,
    width,
    totalWidth: metrics.totalWidth,
    minColumnWidth: metrics.minColumnWidth,
    minWidth: metrics.minWidth,
  };
}

/**
 * Update column metrics calculation by resizing a column.
 *
 * @param {ColumnMetricsType} metrics
 * @param {Column} column
 * @param {number} width
 */
function resizeColumn(metrics: ColumnMetricsType, index: number, width: number): ColumnMetricsType {
  let column = ColumnUtils.getColumn(metrics.columns, index);
  let metricsClone = shallowCloneObject(metrics);
  metricsClone.columns = metrics.columns.slice(0);

  let updatedColumn = shallowCloneObject(column);
  updatedColumn.width = Math.max(width, metricsClone.minColumnWidth);

  metricsClone = ColumnUtils.spliceColumn(metricsClone, index, updatedColumn);

  return recalculate(metricsClone);
}

function areColumnsImmutable(prevColumns: Array<Column>, nextColumns: Array<Column>) {
  return isColumnsImmutable(prevColumns) && isColumnsImmutable(nextColumns);
}

function compareEachColumn(prevColumns: Array<Column>, nextColumns: Array<Column>, isSameColumn: (a: Column, b: Column) => boolean) {
  let i;
  let len;
  let column;
  let prevColumnsByKey: { [key:string]: Column } = {};
  let nextColumnsByKey: { [key:string]: Column } = {};


  if (ColumnUtils.getSize(prevColumns) !== ColumnUtils.getSize(nextColumns)) {
    return false;
  }

  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
    column = prevColumns[i];
    prevColumnsByKey[column.key] = column;
  }

  for (i = 0, len = ColumnUtils.getSize(nextColumns); i < len; i++) {
    column = nextColumns[i];
    nextColumnsByKey[column.key] = column;
    let prevColumn = prevColumnsByKey[column.key];
    if (prevColumn === undefined || !isSameColumn(prevColumn, column)) {
      return false;
    }
  }

  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
    column = prevColumns[i];
    let nextColumn = nextColumnsByKey[column.key];
    if (nextColumn === undefined) {
      return false;
    }
  }
  return true;
}

function sameColumns(prevColumns: Array<Column>, nextColumns: Array<Column>, isSameColumn: (a: Column, b: Column) => boolean): boolean {
  if (areColumnsImmutable(prevColumns, nextColumns)) {
    return prevColumns === nextColumns;
  }

  return compareEachColumn(prevColumns, nextColumns, isSameColumn);
}

export default { recalculate, resizeColumn, sameColumn, sameColumns };
