import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { LIST } from '../ThemeIdentifiers';

import * as baseTheme from './List.scss';

export interface Props {
  children?: React.ReactNode;
  theme?: any;
}

const item = ({ children, theme }: Props) => {
  return <li className={theme.item}>{children}</li>;
};

export default themr(LIST, baseTheme)(item) as ThemedComponentClass<Props, {}>;
