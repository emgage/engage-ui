import * as React from 'react';
import {wrapWithComponent, isElementOfType} from '@shopify/react-utilities/components';

import Group from './Group';
import Item, {Props as ItemProps} from './Item';
import * as styles from './FormLayout.scss';

export interface Props {
  children?: React.ReactNode,
}

export default class FormLayout extends React.PureComponent<Props, never> {
  static Group = Group;

  render() {
    const {children, ...otherProps} = this.props;

    return (
      <div className={styles.FormLayout}>
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
