import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

export interface Props {
  // To make table bordered
  bordered?: boolean;
  // Highlight rows on hover
  highlight?: boolean;
  // Make table responsive
  responsive?: boolean;
  // Set greyed background for odd rows
  striped?: boolean;
  theme?: any;
}

class Table extends React.Component<Props, never> {
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

export default themr(TABLE, baseTheme)(Table) as ThemedComponentClass<Props, {}>;
