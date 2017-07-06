import * as React from 'react';
import ReactDOM from 'react-dom';
import joinClasses from 'classnames';
import ExcelColumn from './PropTypeShapes/ExcelColumn';
import ResizeHandle from './ResizeHandle';
// TODO: Add CSS require('../../../themes/react-data-grid-header.css');

function simpleCellRenderer(objArgs: any) {
  const headerText = objArgs.column.rowType === 'header' ? objArgs.column.name : '';
  return <div className="widget-HeaderCell__value">{headerText}</div>;
}

export interface Props {
    renderer: any,
    column: ExcelColumn,
    onResize: Function,
    height: number,
    onResizeEnd: Function,
    className: string,
};

class HeaderCell extends React.Component<Props, any> {

  public static defaultProps: Partial<Props> = {
    renderer: simpleCellRenderer,
  };

  constructor(props: Props) {
    super(props);
    this.state = {resizing: false};
  }

  onDragStart(e: any) {
    this.setState({resizing: true});
    // need to set dummy data for FF
    if (e && e.dataTransfer && e.dataTransfer.setData) e.dataTransfer.setData('text/plain', 'dummy');
  }

  onDrag(e: any) {
    let resize = this.props.onResize || null; // for flows sake, doesnt recognise a null check direct
    if (resize) {
      let width = this.getWidthFromMouseEvent(e);
      if (width > 0) {
        resize(this.props.column, width);
      }
    }
  }

  onDragEnd(e: any) {
    let width = this.getWidthFromMouseEvent(e);
    this.props.onResizeEnd(this.props.column, width);
    this.setState({resizing: false});
  }

  getWidthFromMouseEvent(e: any): number {
    let right = e.pageX || (e.touches && e.touches[0] && e.touches[0].pageX) || (e.changedTouches && e.changedTouches[e.changedTouches.length - 1].pageX);
    let left = ReactDOM.findDOMNode(this).getBoundingClientRect().left;
    return right - left;
  }

  getCell() {
    if (React.isValidElement(this.props.renderer)) {
      // if it is a string, it's an HTML element, and column is not a valid property, so only pass height
      if (typeof this.props.renderer.type === 'string') {
        return React.cloneElement(this.props.renderer as any, {height: this.props.height});
      }
      return React.cloneElement(this.props.renderer as any, {column: this.props.column, height: this.props.height});
    }
    return this.props.renderer({column: this.props.column});
  }

  getStyle() {
    return {
      width: this.props.column.width,
      left: this.props.column.left,
      display: 'inline-block',
      position: 'absolute' as any,
      height: this.props.height,
      margin: 0,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };
  }

  setScrollLeft(scrollLeft: number) {
    let node = ReactDOM.findDOMNode(this) as HTMLElement;
    node.style.webkitTransform = `translate3d(${scrollLeft}px, 0px, 0px)`;
    node.style.transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
  }

  removeScroll() {
    let node = ReactDOM.findDOMNode(this) as HTMLElement;
    if (node) {
      let transform = 'none';
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  }

  render() {
    let resizeHandle;
    if (this.props.column.resizable) {
      resizeHandle = (<ResizeHandle
      onDrag={this.onDrag}
      onDragStart={this.onDragStart}
      onDragEnd={this.onDragEnd}
      />);
    }
    let className = joinClasses({
      'react-grid-HeaderCell': true,
      'react-grid-HeaderCell--resizing': this.state.resizing,
      'react-grid-HeaderCell--locked': this.props.column.locked
    });
    className = joinClasses(className, this.props.className, this.props.column.cellClass);
    let cell = this.getCell();
    return (
      <div className={className} style={this.getStyle()}>
        {cell}
        {resizeHandle}
      </div>
    );
  }
};

export default HeaderCell;
