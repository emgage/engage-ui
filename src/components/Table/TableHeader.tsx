import * as React from 'react';
import { themr } from '@friendsofreactjs/react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

export interface Props {}

class TableHeader extends React.Component<Props, never> {
  static displayName = 'TableHeader';

  constructor(props: Props) {
    super(props);
  }

  render () {
    return (
      <thead>
        { this.props.children }
      </thead>
    );
  }
}

export default themr(TABLE, baseTheme)(TableHeader);
