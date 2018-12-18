import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { HeadingTagName } from '../../types';

import { SUBHEADING } from '../ThemeIdentifiers';

import * as baseTheme from './Subheading.scss';

export interface Props {
  // The element name to use for the subheading. Available options: h1, h2, h3, h4, h5, h6
  element?: HeadingTagName;
  // Text to display in subheading.
  children?: React.ReactNode;
  // Theme to be injected via css-themr.
  theme?: any;
}

const subheading = ({
  element: ELEMENT = 'h3',
  children,
  theme,
}: Props) => {
  const ariaLabel = typeof children === 'string' ? children : null;

  if (ariaLabel === null) {
    return <ELEMENT className={theme.subheading}>{children}</ELEMENT>;
  }
  return <ELEMENT aria-label={ariaLabel} className={theme.subheading}>{children}</ELEMENT>;
};

export default themr(SUBHEADING, baseTheme)(subheading) as ThemedComponentClass<Props, {}>;
