import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

export interface Props {}

class TableHeader extends React.Component<Props, never> {
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
