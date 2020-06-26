import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

export interface Props {}

class TableFooter extends React.PureComponent<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render () {
    return (
      <tfoot>
        { this.props.children }
      </tfoot>
    );
  }
}

export default themr(TABLE, baseTheme)(TableFooter) as ThemedComponentClass<Props, {}>;
