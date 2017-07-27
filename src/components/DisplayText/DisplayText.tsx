import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import { HeadingTagName } from '../../types';
import { DISPLAY_TEXT } from '../ThemeIdentifiers';
import * as baseTheme from './DisplayText.scss';

export type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface Props {
  element?: HeadingTagName;
  children?: React.ReactNode;
  size?: Size;
  theme?: any;
}

const displayText = ({
  children,
  theme,
  size = 'medium',
  element: ELEMENT = 'p',
}: Props) => {
  const className = classNames(
  theme.displayText,
  size && theme[variationName('size', size)],
);
  return <ELEMENT className={className}>{children}</ELEMENT>;
};

export default themr(DISPLAY_TEXT, baseTheme)(displayText) as ThemedComponentClass<Props, {}>;
