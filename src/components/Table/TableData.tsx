import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

// All props start with `acc` are accessibility props
export interface Props {
  accheaders?: string;
  colSpan?: number;
  rowSpan?: number;
}

class TableData extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render () {
    const { accheaders, colSpan, rowSpan } = this.props;

    return (
      <td
        headers={accheaders}
        colSpan={colSpan}
        rowSpan={rowSpan}>
        { this.props.children }
      </td>
    );
  }
}

export default themr(TABLE, baseTheme)(TableData) as ThemedComponentClass<Props, {}>;
