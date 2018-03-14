import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

export interface Props {
  bordered?: boolean;
  highlight?: boolean;
  responsive?: boolean;
  striped?: boolean;
  theme?: any;
}

export interface State {}

class Table extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  getTableClassName() {
    const {
      bordered,
      highlight,
      striped,
      theme,
    } = this.props;

    return classNames(
      theme.table,
      bordered && theme.bordered,
      highlight && theme.highlight,
      striped && theme.striped
    );
  }

  render () {
    const tableClass = this.getTableClassName();

    return (
      <table className={tableClass}>
        { this.props.children }
      </table>
    );
  }
}

export default themr(TABLE, baseTheme)(Table) as ThemedComponentClass<Props, State>;
