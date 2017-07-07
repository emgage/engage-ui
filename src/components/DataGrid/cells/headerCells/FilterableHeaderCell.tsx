import * as React from 'react';
import ExcelColumn from '../../PropTypeShapes/';

export interface State {
  filterTerm: string,
};

export interface Props {
  column?: ExcelColumn,
  onChange(e: any): void,
};

class FilterableHeaderCell extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filterTerm: '',
    };
  }

  handleChange = (e: any) => {
    const val = e.target.value;
    this.setState({filterTerm: val });
    this.props.onChange({filterTerm: val, column: this.props.column});
  }

  renderInput = () => {
    if (this.props.column && this.props.column.filterable === false) {
      return <span/>;
    }

    const inputKey = 'header-filter-' + (this.props.column ? this.props.column.key : '');
    return (<input key={inputKey} type="text" className="form-control input-sm" placeholder="Search" value={this.state.filterTerm} onChange={this.handleChange}/>);
  }

  render() {
    return (
      <div>
        <div className="form-group">
          {this.renderInput()}
        </div>
      </div>
    );
  }
}

export default FilterableHeaderCell;
