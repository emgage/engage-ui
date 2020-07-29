import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';
import Spinner from '../Spinner';

export interface Props {
  callbackValue?: any;
  onClick?(id: number | string): void;
  callBackSelectedRows?(id: number): void;
  selectRow?: any;
  componentStyle?: any;
  componentClass?: string;
  isRowLoading?: boolean;
  theme?: any;
}

class TableRow extends React.PureComponent<Props, never> {
  constructor(props: Props) {
    super(props);
    this.props.callBackSelectedRows ? this.props.callBackSelectedRows(this.props.selectRow) : null;
  }

  rowClickCallback = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.callbackValue);
    }
  }

  render () {
    const { componentClass, isRowLoading = false } = this.props;
    return (
      <tr onClick={this.rowClickCallback} className={componentClass} style ={this.props.componentStyle} aria-disabled={true}>
        { this.props.children } {isRowLoading && <td><Spinner componentSize="small" componentColor="disabled" /></td>}
      </tr>
    );
  }
}

export default themr(TABLE, baseTheme)(TableRow) as ThemedComponentClass<Props, {}>;
