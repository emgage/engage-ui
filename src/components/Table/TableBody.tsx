import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

export interface Props {
  theme?: any;
}

class TableBody extends React.PureComponent<Props, never> {
  static displayName = 'TableBody';
  constructor(props: Props) {
    super(props);
  }

  render () {
    return (
      <tbody>
        { this.props.children }
      </tbody>
    );
  }
}

export default themr(TABLE, baseTheme)(TableBody) as ThemedComponentClass<Props, {}>;
