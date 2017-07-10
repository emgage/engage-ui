import * as React from 'react';
import Draggable from './Draggable';
// TODO: Add CSS require('../../../themes/react-data-grid-header.css');

export interface Props {
  style?: any,
  onDragStart: any,
  onDragEnd: any,
  onDrag: any,
}

class ResizeHandle extends React.Component<Props, any> {

  public static defaultProps: Partial<Props> = {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 6,
      height: '100%',
    },
  };

  render() {
    return (
      <Draggable {...this.props}
      className="react-grid-HeaderCell__resizeHandle"
      style={this.props.style}
      />
    );
  }
};

export default ResizeHandle;
