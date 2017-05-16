import * as React from 'react';
import { themr } from 'react-css-themr';
import { wrapWithComponent, isElementOfType } from '../../utilities';

import Group from './Group';
import Item, {Props as ItemProps} from './Item';
import { FORM_LAYOUT } from '../ThemeIdentifiers';

export interface Props {
  children?: React.ReactNode,
  theme?: any,
  style?: React.CSSProperties,
}

class FormLayout extends React.PureComponent<Props, never> {
  static Group = Group;

  render() {
    const {children, style, theme, ...otherProps} = this.props;

    return (
      <div className={theme.FormLayout} style={style}>
        {React.Children.map(children, (child: React.ReactElement<{}>, index: number) => {
          return wrapChildren(child, index, otherProps);
        })}
      </div>
    );
  }
}

function wrapChildren(child: any, index: number, props: {}) {
  // TODO: isElementOfType(child, Group) does not work because themr HOC shadows the underlying component.
  // This is a wacky workaround until we figure out a better approach to this.
  if (isElementOfType(child, Group)) { return child; }
  return wrapWithComponent(child, Item, {key: index, ...props} as ItemProps);
}

export default themr(FORM_LAYOUT)(FormLayout);