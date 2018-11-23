import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

export interface Props {
  callbackValue?: any;
  onClick?(id: number | string): void;
  showView?(id: any): void;
  selectRow?: any;
}

class TableRow extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    this.props.showView ? this.props.showView(this.props.selectRow) : null;
  }

  // componentDidMount() {
  //   debugger;
  //   this.props.showView ? this.props.showView(this.props.selectRow) : null;
  // }

  rowClickCallback = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.callbackValue);
    }
  }

  showCirculares() {
    this.props.showView ? this.props.showView(this.props.selectRow) : null;
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
