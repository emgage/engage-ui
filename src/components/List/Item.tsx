import * as React from 'react';
import { themr } from 'react-css-themr';

import { LIST } from '../ThemeIdentifiers';

import * as baseTheme from './List.scss';

export interface Props {
  children?: React.ReactNode,
  theme?: any,
}

const Item = ({children, theme}: Props) => {
  return <li className={theme.Item}>{children}</li>;
}

export default themr(LIST, baseTheme)(Item);