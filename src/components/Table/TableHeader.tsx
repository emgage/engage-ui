import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

export interface Props {
  theme?: any;
}

class TableHeader extends React.PureComponent<Props, never> {
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

export default themr(TABLE, baseTheme)(TableHeader) as ThemedComponentClass<Props, {}>;
