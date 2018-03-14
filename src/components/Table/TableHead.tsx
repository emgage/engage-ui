import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

// Accessibility values for scope will be col or row
// If its for thead > th then use 'col'
// If its for tbody > th then use 'col'
export type Scope = 'col' | 'row' | string;

// All props start with `acc` are accessibility props
export interface Props {
  accId?: string;
  accScopeAttr?: Scope;
  colSpan?: number;
  rowSpan?: number;
}

class TableHead extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render () {
    const { accId, accScopeAttr, colSpan, rowSpan } = this.props;
    return (
      <th
        scope={accScopeAttr}
        id={accId}
        colSpan={colSpan}
        rowSpan={rowSpan}>
        { this.props.children }
      </th>
    );
  }
}

export default themr(TABLE, baseTheme)(TableHead) as ThemedComponentClass<Props, {}>;
