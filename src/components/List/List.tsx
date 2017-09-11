import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import { LIST } from '../ThemeIdentifiers';

import * as baseTheme from './List.scss';
import Item from './Item';

export type Type = 'bullet' | 'number' | 'default' | 'striped' | 'divider';

export interface Props {
  children?: React.ReactNode;
  type?: Type;
  theme?: any;
}

class ContentList extends React.PureComponent<Props, never> {
  static Item = Item;

  render() {
    const { children, type = 'bullet', theme } = this.props;
    const background = type === 'divider' ? baseTheme['list-divider'] : type === 'striped' ? baseTheme['list-striped'] : type === 'default' ? baseTheme['naked'] : '';
    const className = classNames(
      theme.list,
      type && theme[variationName('type', type)],
    );

    const LISTELEMENT = type === 'number' ? 'ol' : 'ul';
    return <LISTELEMENT className={className + ' ' + background}>{children}</LISTELEMENT>;
  }
}

export default themr(LIST, baseTheme)(ContentList) as ThemedComponentClass<Props, {}>;
