import * as React from 'react';

interface ExcelColumn {
  name: React.ReactNode,
  key: string,
  width: number,
  filterable: boolean,
  left?: any,
  resizable?: any,
  locked?: any,
  cellClass?: any,
  formatter?: any,
  isLastColumn?: any,
  editor?: any,
  editable?: any,
  events?: any,
  hidden?: any,
  getRowMetaData?(rd?: any, col?: any): any,
  getUpdateCellClass?(a?: any, b?: any, c?: any): any,
};

export default ExcelColumn;
