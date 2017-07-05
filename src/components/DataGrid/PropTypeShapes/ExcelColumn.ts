import * as React from 'react';

interface ExcelColumn {
  name: React.ReactNode,
  key: string,
  width: number,
  filterable: boolean,
};

export default ExcelColumn;
