import * as React from 'react';
// TODO: Add CSS require('../../../../themes/react-data-grid-checkbox.css');

export interface Props {
    value: boolean,
    rowIdx: number,
    column: {
      key: string,
      onCellChange: any,
    },
    dependentValues: {},
}

class CheckboxEditor extends React.Component<Props, {}> {
  handleChange = (e: any) => {
    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, this.props.dependentValues, e);
  }

  render() {
    const checked = this.props.value != null ? this.props.value : false;
    const checkboxName = 'checkbox' + this.props.rowIdx;
    return (
      <div className="react-grid-checkbox-container checkbox-align" onClick={this.handleChange}>
          <input className="react-grid-checkbox" type="checkbox" name={checkboxName} checked={checked} />
          <label htmlFor={checkboxName} className="react-grid-checkbox-label"></label>
      </div>);
  }
};

export default CheckboxEditor;
