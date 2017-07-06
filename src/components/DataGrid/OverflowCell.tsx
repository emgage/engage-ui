import * as React from 'react';
import focusableComponentWrapper, { State } from './focusableComponentWrapper';
// TODO: Add CSS import '../../../themes/react-data-grid-cell.css';

export interface Props {
  rowIdx: number,
  idx: number,
  height: number,
  column: any,
  cellMetaData: any,
};

export class OverflowCell extends React.Component<Props, State> {

  public static displayName = 'Cell';
  public static isScrolling = (props: any) => props.cellMetaData.isScrollingHorizontallyWithKeyboard;
  public static isSelected = (props: any) => {
    const { cellMetaData, rowIdx, idx }  = props;
    if (cellMetaData == null) { return false; }

    const { selected } = cellMetaData;

    return selected && selected.rowIdx === rowIdx && selected.idx === idx;
  }

  getStyle() {
    const style = {
      position: 'absolute' as any,
      width: this.props.column.width,
      height: this.props.height,
      left: this.props.column.left,
      border: '1px solid #eee',
    };
    return style;
  }

  render() {
    return (<div tabIndex={-1} style={this.getStyle() } width="100%" className="react-grid-Cell"></div>);
  }
};

const OverflowCellComponent = OverflowCell;
export default focusableComponentWrapper(OverflowCell);
export { OverflowCellComponent };
