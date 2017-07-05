import * as React from 'react';

export interface Props {
  value: any,
}

class SimpleCellFormatter extends React.Component<Props, any> {
  shouldComponentUpdate(nextProps: any): boolean {
    return nextProps.value !== this.props.value;
  }

  render() {
    return <div title={this.props.value}>{this.props.value}</div>;
  }
};

export default SimpleCellFormatter;
