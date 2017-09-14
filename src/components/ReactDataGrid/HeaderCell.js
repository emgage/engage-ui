const React          = require('react');
const ReactDOM      = require('react-dom');
const joinClasses    = require('classnames');
const ExcelColumn    = require('./PropTypeShapes/ExcelColumn');
const ResizeHandle   = require('./ResizeHandle');
require('./themes/react-data-grid-header.scss');

const PropTypes      = React.PropTypes;

function simpleCellRenderer(objArgs: {column: {name: string}}): ReactElement {
  let headerText = objArgs.column.rowType === 'header' ? objArgs.column.name : '';
  return <div className="widget-HeaderCell__value">{headerText}</div>;
}

const HeaderCell = React.createClass({

  propTypes: {
    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    column: PropTypes.shape(ExcelColumn).isRequired,
    onResize: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    onResizeEnd: PropTypes.func.isRequired,
    className: PropTypes.string
  },

  getDefaultProps(): {renderer: ReactComponent | (props: {column: {name: string}}) => ReactElement} {
    return {
      renderer: simpleCellRenderer
    };
  },

  getInitialState(): {resizing: boolean} {
    return {resizing: false};
  },

  onDragStart(e: SyntheticMouseEvent) {
    this.setState({resizing: true});
    // need to set dummy data for FF
    if (e && e.dataTransfer && e.dataTransfer.setData) e.dataTransfer.setData('text/plain', 'dummy');
  },

  onDrag(e: SyntheticMouseEvent) {
    let resize = this.props.onResize || null; // for flows sake, doesnt recognise a null check direct
    if (resize) {
      let width = this.getWidthFromMouseEvent(e);
      if (width > 0) {
        resize(this.props.column, width);
      }
    }
  },

  onDragEnd(e: SyntheticMouseEvent) {
    let width = this.getWidthFromMouseEvent(e);
    this.props.onResizeEnd(this.props.column, width);
    this.setState({resizing: false});
  },

  getWidthFromMouseEvent(e: SyntheticMouseEvent): number {
    let right = e.pageX || (e.touches && e.touches[0] && e.touches[0].pageX) || (e.changedTouches && e.changedTouches[e.changedTouches.length - 1].pageX);
    let left = ReactDOM.findDOMNode(this).getBoundingClientRect().left;
    return right - left;
  },

  getCell(): ReactComponent {
    if (React.isValidElement(this.props.renderer)) {
      // if it is a string, it's an HTML element, and column is not a valid property, so only pass height
      if (typeof this.props.renderer.type === 'string') {
        return React.cloneElement(this.props.renderer, {height: this.props.height});
      }
      return React.cloneElement(this.props.renderer, {column: this.props.column, height: this.props.height});
    }
    return this.props.renderer({column: this.props.column});
  },

  getStyle(): {width:number; left: number; display: string; position: string; overflow: string; height: number; margin: number; textOverflow: string; whiteSpace: string } {
    return {
      width: this.props.column.width,
      left: this.props.column.left,
      display: 'inline-block',
      position: 'absolute',
      height: this.props.height,
      margin: 0,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textAlign: 'left',
    };
  },

  setScrollLeft(scrollLeft: number) {
    let node = ReactDOM.findDOMNode(this);
    node.style.webkitTransform = `translate3d(${scrollLeft}px, 0px, 0px)`;
    node.style.transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
  },

  removeScroll() {
    let node = ReactDOM.findDOMNode(this);
    if (node) {
      let transform = 'none';
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  },

  render(): ?ReactElement {
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
      <th className={className} style={this.getStyle()}>
        {cell}
        {resizeHandle}
      </th>
    );
  }
});

module.exports = HeaderCell;
