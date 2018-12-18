import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import { LIST } from '../ThemeIdentifiers';

import * as baseTheme from './List.scss';
import Item from './Item';

export type Type = 'bullet' | 'number' | 'default' | 'striped' | 'divider';

export interface Props {
  // Display list item elements
  children?: React.ReactNode;
  // Type of list to display. Available options: bullet | number | default | striped | divider
  componentType?: Type;
  // Theme to be injected via css-themr
  theme?: any;
}

class ContentList extends React.PureComponent<Props, never> {
  static Item = Item;

  render() {
    const { children, componentType = 'bullet', theme } = this.props;
    const background = componentType === 'divider' ? baseTheme['list-divider'] : componentType === 'striped' ? baseTheme['list-striped'] : componentType === 'default' ? baseTheme['naked'] : '';
    const className = classNames(
      theme.list,
      componentType && theme[variationName('type', componentType)]
    );

    const LISTELEMENT = componentType === 'number' ? 'ol' : 'ul';
    return <LISTELEMENT className={className + ' ' + background}>{children}</LISTELEMENT>;
  }
}

export default themr(LIST, baseTheme)(ContentList) as ThemedComponentClass<Props, {}>;
