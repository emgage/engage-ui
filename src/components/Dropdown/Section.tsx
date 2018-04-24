import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { DROPDOWN } from '../ThemeIdentifiers';

import * as baseTheme from './Dropdown.scss';

export interface Props {
  children?: React.ReactNode;
  theme?: any;
}

const section = ({ children, theme }: Props) => {
  return <div className={theme.section}>{children}</div>;
};

export default themr(DROPDOWN, baseTheme)(section) as ThemedComponentClass<Props, {}>;
