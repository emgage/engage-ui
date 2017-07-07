import * as React from 'react';
import utils from './utils';
import cellMetaDataShape from './PropTypeShapes/CellMetaDataShape';

// TODO: Add CSS import '../../../themes/react-data-grid-row.css';

export interface DefaultRowGroupRendererProps {
  onRowExpandClick: any,
  onRowExpandToggle: any,
  isExpanded: boolean,
  treeDepth: number,
  name: string,
  columnGroupName: string,
};

export class DefaultRowGroupRenderer extends React.Component<DefaultRowGroupRendererProps, any> {
  treeDepth = this.props.treeDepth || 0;
  marginLeft = this.treeDepth * 20;

  style = {
    height: '50px',
    border: '1px solid #dddddd',
    paddingTop: '15px',
    paddingLeft: '5px',
  };

  onKeyDown = (e: any) => {
    if (e.key === 'ArrowLeft') {
      this.props.onRowExpandToggle(false);
    }
    if (e.key === 'ArrowRight') {
      this.props.onRowExpandToggle(true);
    }
    if (e.key === 'Enter') {
      this.props.onRowExpandToggle(!this.props.isExpanded);
    }
  }

  render() {
    return (
      <div style={this.style} onKeyDown={this.onKeyDown} tabIndex={0}>
        <span className="row-expand-icon" style={{float: 'left', marginLeft: this.marginLeft, cursor: 'pointer'}} onClick={this.props.onRowExpandClick} >{this.props.isExpanded ? String.fromCharCode(9660) : String.fromCharCode(9658)}</span>
        <strong>{this.props.columnGroupName} : {this.props.name}</strong>
      </div>
    );
  }
};

export interface Props {
  height: number,
  columns: any,
  row: any,
  cellRenderer: Function,
  cellMetaData: cellMetaDataShape,
  isSelected: boolean,
  idx: number,
  expandedRows: any,
  extraClasses: string,
  forceUpdate: boolean,
  subRowDetails: any,
  isRowHovered: boolean,
  colVisibleStart: number,
  colVisibleEnd: number,
  colDisplayStart: number,
  colDisplayEnd: number,
  isScrolling: boolean,
  columnGroupName: string,
  isExpanded: boolean,
  treeDepth: number,
  name: string,
  renderer: Function,
};

class RowGroup extends React.Component<Props, any> {
  public static defaultProps: Partial<Props> = {
    renderer: DefaultRowGroupRenderer,
  };

  rowGroupRenderer: any;

  constructor(props: Props) {
    super(props);

    this.onRowExpandToggle = this.onRowExpandToggle.bind(this);
    this.onRowExpandClick = this.onRowExpandClick.bind(this);
    this.setScrollLeft = this.setScrollLeft.bind(this);
  }

  onRowExpandToggle(expand: any) {
    const shouldExpand = expand == null ? !this.props.isExpanded : expand;
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onRowExpandToggle && typeof(meta.onRowExpandToggle) === 'function') {
      meta.onRowExpandToggle({rowIdx: this.props.idx, shouldExpand, columnGroupName: this.props.columnGroupName, name: this.props.name});
    }
  }

  onRowExpandClick() {
    this.onRowExpandToggle(!this.props.isExpanded);
  }

  setScrollLeft(scrollLeft: any) {
    if (this.rowGroupRenderer) {
      this.rowGroupRenderer.setScrollLeft ? this.rowGroupRenderer.setScrollLeft(scrollLeft) : null;
    }
  }

  render() {
    const lastColumn = utils.last(this.props.columns);
    const style = {width: lastColumn.left + lastColumn.width};
    const RowGroupRenderer = this.props.renderer as any;

    return (
      <div style={style} className="react-grid-row-group">
         <RowGroupRenderer ref={(node: any) => {this.rowGroupRenderer = node; }} {...this.props} onRowExpandClick={this.onRowExpandClick} onRowExpandToggle={this.onRowExpandToggle}/>
      </div>
    );
  }
};

export default RowGroup;
