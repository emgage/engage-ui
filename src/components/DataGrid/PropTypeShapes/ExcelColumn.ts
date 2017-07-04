import * as React from 'react';

const ExcelColumnShape = {
  name: React.PropTypes.node.isRequired,
  key: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  filterable: React.PropTypes.bool,
};

export default ExcelColumnShape;
