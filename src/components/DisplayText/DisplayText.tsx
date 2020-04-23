import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import { HeadingTagName } from '../../types';
import { DISPLAY_TEXT } from '../ThemeIdentifiers';
import * as baseTheme from './DisplayText.scss';

export type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export type Color = 'text' | 'darker' | 'darkest' | 'mid' | 'reverse' | 'danger';

export interface Props {
  // Name of element to use for text from H1 to H6 and p
  element?: HeadingTagName;
  // The content to display for displaytext
  children?: React.ReactNode;
  // Size of the text small, medium, large or extralarge
  componentSize?: Size;
  // Color of component
  componentColor?: Color;
  // Theme to be injected via css-themr
  theme?: any;
}

const displayText = ({
  children,
  theme,
  componentSize = 'medium',
  componentColor = 'darkest',
  element: ELEMENT = 'p',
}: Props) => {

  const className = classNames(
  theme.displayText,
  componentSize && theme[variationName('size', componentSize)],
  componentColor && theme[variationName('color', componentColor)]

);

  return <ELEMENT className={className}>{children}</ELEMENT>;
};

export default themr(DISPLAY_TEXT, baseTheme)(displayText) as ThemedComponentClass<Props, {}>;
