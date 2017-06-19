import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { POPOVER } from '../ThemeIdentifiers';

import * as baseTheme from './Popover.scss';

export interface Props {
  children?: React.ReactNode,
  theme?: any,
}

const Section = ({children, theme}: Props) => {
  return <div className={theme.Section}>{children}</div>;
}

export default themr(POPOVER, baseTheme)(Section) as ThemedComponentClass<Props, {}>;
