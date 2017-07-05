import Immutable from 'immutable';

export default {

  getColumn(columns: any, idx: any) {
    if (Array.isArray(columns)) {
      return columns[idx];
    }else if (typeof Immutable !== 'undefined') {
      return columns.get(idx);
    }
  },

  spliceColumn(metrics: any, idx: any, column: any) {
    if (Array.isArray(metrics.columns)) {
      metrics.columns.splice(idx, 1, column);
    }else if (typeof Immutable !== 'undefined') {
      metrics.columns = metrics.columns.splice(idx, 1, column);
    }
    return metrics;
  },

  getSize(columns: any) {
    if (Array.isArray(columns)) {
      return columns.length;
    } else if (typeof Immutable !== 'undefined') {
      return columns.size;
    }
  },

  // Logic extented to allow for functions to be passed down in column.editable
  // this allows us to deicde whether we can be edting from a cell level
  canEdit(col: any, rowData: any, enableCellSelect: any) {
    if (col.editable != null && typeof(col.editable) === 'function') {
      return enableCellSelect === true && col.editable(rowData);
    }
    return enableCellSelect === true && (!!col.editor || !!col.editable);
  },

  getValue(column: any, property: any) {
    let value;
    if (column.toJSON && column.get) {
      value = column.get(property);
    } else  {
      value = column[property];
    }
    return value;
  },
};
