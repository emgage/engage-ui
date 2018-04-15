import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

export interface Props {}

class TableRow extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render () {
    return (
      <tr>
        { this.props.children }
      </tr>
    );
  }
}

export default themr(TABLE, baseTheme)(TableRow) as ThemedComponentClass<Props, {}>;
