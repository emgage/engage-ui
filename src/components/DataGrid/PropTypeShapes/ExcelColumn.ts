import * as React from 'react';

interface ExcelColumn {
  name: React.ReactNode,
  key: string,
  width: number,
  filterable: boolean,
  // left // required in HeaderCell.tsx
  // resizable // required in HeaderCell.tsx
  // locked // required in HeaderCell.tsx
  // cellClass // required in HeaderCell.tsx
};

export default ExcelColumn;
