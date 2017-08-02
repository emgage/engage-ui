import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { HeadingTagName } from '../../types';

import { SUBHEADING } from '../ThemeIdentifiers';

import * as baseTheme from './Subheading.scss';

export interface Props {
  element?: HeadingTagName;
  children?: React.ReactNode;
  theme?: any;
}

const subheading = ({
  element: ELEMENT = 'h3',
  children,
  theme,
}: Props) => {
  const ariaLabel = typeof children === 'string' ? children : null;
  return <ELEMENT aria-label={ariaLabel} className={theme.subheading}>{children}</ELEMENT>;
};

export default themr(SUBHEADING, baseTheme)(subheading) as ThemedComponentClass<Props, {}>;
