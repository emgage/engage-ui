import * as React from 'react';
import createObjectWithProperties from './createObjectWithProperties';
// TODO: Add CSS require('../../../themes/react-data-grid-header.css');

// The list of the propTypes that we want to include in the Draggable div
const knownDivPropertyKeys = ['onDragStart', 'onDragEnd', 'onDrag', 'style'];

export interface Props {
    onDragStart: Function,
    onDragEnd: Function,
    onDrag: Function,
    style: any,
    className: any,
};

class Draggable extends React.Component<Props, any> {

  public static defaultProps: Partial<Props> = {
      onDragStart: () => true,
      onDragEnd: () => {},
      onDrag: () => {},
  };

  constructor(props: Props) {
    super(props);

    this.state = {drag: null};
  }

  componentWillUnmount() {
    this.cleanUp();
  }

  onMouseDown(e: any) {
    const drag = this.props.onDragStart(e);

    if (drag === null && e.button !== 0) {
      return;
    }

    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchend', this.onMouseUp);
    window.addEventListener('touchmove', this.onMouseMove);

    this.setState({drag});
  }

  onMouseMove(e: any) {
    if (this.state.drag === null) {
      return;
    }

    if (e.preventDefault) {
      e.preventDefault();
    }

    this.props.onDrag(e);
  }

  onMouseUp(e: any) {
    this.cleanUp();
    this.props.onDragEnd(e, this.state.drag);
    this.setState({drag: null});
  }

  cleanUp() {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchend', this.onMouseUp);
    window.removeEventListener('touchmove', this.onMouseMove);
  }

  getKnownDivProps() {
    return createObjectWithProperties(this.props, knownDivPropertyKeys);
  }

  render() {
    const classname = this.props.className ? this.props.className : 'react-grid-HeaderCell__draggable';
    return (
      <div {...this.getKnownDivProps()}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onMouseDown}
        className={classname} />
    );
  }
};

export default Draggable;
