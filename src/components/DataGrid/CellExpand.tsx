import * as React from 'react';
import AppConstants from './AppConstants';

export interface Props {
    expandableOptions: {
      expanded: boolean,
    },
    onCellExpand: Function,
};

class CellExpand extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);

    this.state = {expanded: this.props.expandableOptions && this.props.expandableOptions.expanded};
  }

  onCellExpand(e: any) {
    this.setState({ expanded: !this.state.expanded });
    this.props.onCellExpand(e);
  }

  render() {
    return (
      <span className="rdg-cell-expand" onClick={this.onCellExpand} >
        {this.state.expanded ? AppConstants.CellExpand.DOWN_TRIANGLE : AppConstants.CellExpand.RIGHT_TRIANGLE}
      </span>
    );
  }
};

export default CellExpand;
