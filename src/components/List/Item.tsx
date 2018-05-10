import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { LIST } from '../ThemeIdentifiers';

import * as baseTheme from './List.scss';

export interface Props {
  children?: React.ReactNode;
  theme?: any;
  image?: string;
  name?: string;
  email?: string;
  grey?: boolean;
  onClick?(val?: any): boolean;
}

const item = ({ children, onClick, theme }: Props) => {
  if (onClick) {
    return <li className={theme.item} onClick={() => onClick()}>{children}</li>;
  }

  return <li className={theme.item}>{children}</li>;
};

export default themr(LIST, baseTheme)(item) as ThemedComponentClass<Props, {}>;
