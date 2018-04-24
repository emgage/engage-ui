import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import { LIST } from '../ThemeIdentifiers';

import * as baseTheme from './List.scss';
import Item from './Item';

export type Type = 'default' | 'divider';

export interface Props {
    items?: string[];
    type?: Type;
    theme?: any;
}

class DescriptionList extends React.PureComponent<Props, never> {
    static Item = Item;
  
    render() {
      const { items, type = 'default', theme } = this.props;
      const background = type === 'divider' ? baseTheme['list-divider'] : type === 'default' ? baseTheme['naked'] : '';
      const className = classNames(
        theme.list,
        type && theme[variationName('type', type)]
      );
  
      return <dl className={className + ' ' + background}>{items}</dl>;
    }
  }
  
  export default themr(LIST, baseTheme)(DescriptionList) as ThemedComponentClass<Props, {}>;
  