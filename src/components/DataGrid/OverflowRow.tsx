import * as React from 'react';
import focusableComponentWrapper, { State } from './focusableComponentWrapper';
// TODO: Add CSS import '../../../themes/react-data-grid-row.css';

export interface Props {
  idx: number,
  height: number,
  cellMetaData: any,
};

export class OverflowRow extends React.Component<Props, State> {
  public static isSelected = (props: any) => {
    const { cellMetaData, idx } = props;
    if (cellMetaData == null) { return false; }

    const { selected } = cellMetaData;

    return selected && selected.rowIdx === idx;
  }

  public static isScrolling = (props: any) => props.cellMetaData.isScrollingVerticallyWithKeyboard;

  render() {
    return (<div tabIndex={-1} style={{ border: '1px solid #eee', height: this.props.height + 'px' }} width="100%" className="react-grid-Row"></div>);
  }
};


const OverflowRowComponent = OverflowRow;
export default focusableComponentWrapper(OverflowRow);
export { OverflowRowComponent };
