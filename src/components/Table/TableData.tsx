import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

// All props start with `acc` are accessibility props
export interface Props {
  // Used for accessibility, match this with id set in <th>
  accHeaders?: string;
  colSpan?: number;
  // This stores the key of specific json value, which needs to be rendered for this td
  dataKey?: string;
  rowSpan?: number;
}

class TableData extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render () {
    const { accHeaders, children, colSpan, dataKey, rowSpan } = this.props;

    return (
      <td
        headers={accHeaders}
        colSpan={colSpan}
        rowSpan={rowSpan}>
        { dataKey ? dataKey : children }
      </td>
    );
  }
}

export default themr(TABLE, baseTheme)(TableData) as ThemedComponentClass<Props, {}>;
