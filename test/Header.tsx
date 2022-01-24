import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

// import { HEADER } from '../ThemeIdentifiers';
const baseTheme = require('./styles/header.scss');

export interface Props {
  // The content to display inside the app header.
  children: any;
  // Theme to be injected via css-themr.
  theme?: any;
}


const Header = ({
  children,
  theme,
}: Props) => {

  return (
    <header className={theme.appHeader}>
      {children}
    </header>
  );
}

export default themr("HEADER", baseTheme)(Header) as ThemedComponentClass<Props, {}>;
