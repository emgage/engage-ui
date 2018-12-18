import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { LIST } from '../ThemeIdentifiers';

import * as baseTheme from './List.scss';

export interface Props {
  // To render item inside ListItem.
  children?: React.ReactNode;
  // Theme to be injected via css-themr
  theme?: any;
  // To display image for ListItem.
  image?: string;
  // To display name of ListItem.
  componentName?: string;
  // To display email for ListItem.
  email?: string;
  // Callback function whenever listitem is clicked.
  onClick?(val?: any): boolean;
}

const item = ({ children, onClick, theme }: Props) => {
  if (onClick) {
    return <li className={theme.item} onClick={() => onClick()}>{children}</li>;
  }

  return <li className={theme.item}>{children}</li>;
};

export default themr(LIST, baseTheme)(item) as ThemedComponentClass<Props, {}>;
