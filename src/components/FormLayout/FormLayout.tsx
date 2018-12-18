import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { wrapWithComponent, isElementOfType } from '../../utilities';

import Group from './Group';
import Item, { Props as ItemProps } from './Item';
import { FORM_LAYOUT } from '../ThemeIdentifiers';

import * as baseTheme from './FormLayout.scss';

export interface Props {
  // The content to display inside the formlayout
  children?: React.ReactNode;
  // Set the style via css
  componentStyle?: React.CSSProperties;
  // Theme to be injected via css-themr
  theme?: any;
}

class FormLayout extends React.PureComponent<Props, never> {
  static Group = Group;

  render() {
    const {
      children,
      componentStyle,
      theme,
      ...otherProps
    } = this.props;

    return (
      <div className={theme.formLayout} style={componentStyle}>
        {React.Children.map(children, (child: React.ReactElement<{}>, index: number) => {
          return wrapChildren(child, index, otherProps);
        })}
      </div>
    );
  }
}

function wrapChildren(child: React.ReactNode, index: number, props: {}) {
  if (isElementOfType(child, Group)) { return child; }
  return wrapWithComponent(child, Item, { key: index, ...props } as ItemProps);
}

export default themr(FORM_LAYOUT, baseTheme)(FormLayout) as ThemedComponentClass<Props, {}>;
