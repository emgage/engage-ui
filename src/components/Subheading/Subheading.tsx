import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import {HeadingTagName} from '../../types';

import { SUBHEADING } from '../ThemeIdentifiers';

import * as baseTheme from './Subheading.scss';

export interface Props {
  element?: HeadingTagName,
  children?: React.ReactNode,
  theme?: any,
}

const Subheading = ({
  element: Element = 'h3',
  children,
  theme,
}: Props) => {
  const ariaLabel = typeof children === 'string' ? children : null;
  return <Element aria-label={ariaLabel} className={theme.Subheading}>{children}</Element>;
}

export default themr(SUBHEADING, baseTheme)(Subheading) as ThemedComponentClass<Props, {}>;
