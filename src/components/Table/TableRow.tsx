import * as React from 'react';
import { themr } from '@friendsofreactjs/react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

export interface Props {
  callbackValue?: any;
  onClick?(id: number | string): void;
}

class TableRow extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
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

export default themr(TABLE, baseTheme)(TableRow);
