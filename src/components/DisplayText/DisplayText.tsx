import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import { HeadingTagName } from '../../types';
import { DISPLAY_TEXT } from '../ThemeIdentifiers';
import * as baseTheme from './DisplayText.scss';

export type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface Props {
  // Name of element to use for text from H1 to H6 and p
  element?: HeadingTagName;
  // The content to display for displaytext
  children?: React.ReactNode;
  // Size of the text small, medium, large or extralarge
  customSize?: Size;
  // Theme to be injected via css-themr
  theme?: any;
}

const displayText = ({
  children,
  theme,
  customSize = 'medium',
  element: ELEMENT = 'p',
}: Props) => {
  const className = classNames(
  theme.displayText,
  customSize && theme[variationName('size', customSize)]
);
  return <ELEMENT className={className}>{children}</ELEMENT>;
};

export default themr(DISPLAY_TEXT, baseTheme)(displayText) as ThemedComponentClass<Props, {}>;
