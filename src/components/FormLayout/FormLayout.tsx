import * as React from 'react';
import { themr } from 'react-css-themr';
import {wrapWithComponent, isElementOfType} from '@shopify/react-utilities/components';

import Group from './Group';
import Item, {Props as ItemProps} from './Item';
import { FORM_LAYOUT } from '../ThemeIdentifiers';

export interface Props {
  children?: React.ReactNode,
  theme?: any,
}

class FormLayout extends React.PureComponent<Props, never> {
  static Group = Group;

  render() {
    const {children, theme, ...otherProps} = this.props;

    return (
      <div className={theme.FormLayout}>
        {React.Children.map(children, (child: React.ReactElement<{}>, index: number) => {
          return wrapChildren(child, index, otherProps);
        })}
      </div>
    );
  }
}

function wrapChildren(child: React.ReactElement<{}>, index: number, props: {}) {
  if (isElementOfType(child, Group)) { return child; }
  return wrapWithComponent(child, Item, {key: index, ...props} as ItemProps);
}

export default themr(FORM_LAYOUT)(FormLayout);