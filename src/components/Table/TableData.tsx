import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

// All props start with `acc` are accessibility props
export interface Props {
  // Used for accessibility, match this with id set in <th>
  accessibilityHeaders?: string;
  colSpan?: number;
  // This stores the key of specific json value, which needs to be rendered for this td
  dataKey?: string;
  rowSpan?: number;
  // Custom style, if user wants to add in th
  componentStyle?: any;
  componentClass?: string;
  dataLabel?: string;
}

class TableData extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render () {
    const { accessibilityHeaders, children, colSpan, componentClass = '', dataKey, dataLabel, rowSpan, componentStyle } = this.props;

    return (
      <td data-label={dataLabel}
        headers={accessibilityHeaders}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={componentStyle}
        className={componentClass}
      >
        { dataKey ? dataKey : children }
      </td>
    );
  }
}

export default themr(TABLE, baseTheme)(TableData) as ThemedComponentClass<Props, {}>;
