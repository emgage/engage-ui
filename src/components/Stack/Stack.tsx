import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';
import { elementChildren, wrapWithComponent } from '@shopify/react-utilities/components';

import { STACK } from '../ThemeIdentifiers';

import * as baseTheme from './Stack.scss';
import Item, { Props as ItemProps } from './Item';

export type Spacing = 'tight' | 'loose' | 'none';
export type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';
export type Distribution = 'equalSpacing' | 'leading' | 'trailing' | 'center' | 'fill' | 'fillEvenly';

export interface Props {
  children?: any;
  vertical?: boolean;
  spacing?: Spacing;
  alignment?: Alignment;
  distribution?: Distribution;
  theme?: any;
}

class Stack extends React.PureComponent<Props, never> {

  render() {
    const {
      children,
      vertical,
      spacing,
      distribution,
      alignment,
      theme,
    } = this.props;

    const className = classNames(
      theme.stack,
      vertical && theme.vertical,
      spacing && theme[variationName('spacing', spacing)],
      distribution && theme[variationName('distribution', distribution)],
      alignment && theme[variationName('alignment', alignment)],
    );

    const itemMarkup = elementChildren(children)
      .map((child, index) => wrapWithComponent(child, Item, { key: index } as ItemProps));

    return <div className={className}>{itemMarkup}</div>;
  }
}

export default themr(STACK, baseTheme)(Stack) as ThemedComponentClass<Props, {}>;
