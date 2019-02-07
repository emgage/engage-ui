import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

export interface Props {
  callbackValue?: any;
  onClick?(id: number | string): void;
  callBackSelectedRows?(id: number): void;
  selectRow?: any;
  componentStyle?: any;
}

class TableRow extends React.Component<Props, never> {
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
    return (
      <tr onClick={this.rowClickCallback}>
        { this.props.children }
      </tr>
    );
  }
}

export default themr(TABLE, baseTheme)(TableRow) as ThemedComponentClass<Props, {}>;
