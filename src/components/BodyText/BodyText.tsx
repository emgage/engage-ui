import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import { HeadingTagName } from '../../types';
import { BODY_TEXT } from '../ThemeIdentifiers';
import * as baseTheme from './BodyText.scss';

export type Size = 'small' | 'default' | 'large';

export type Color = 'text' | 'darkest'  | 'darker' | 'mid' | 'reverse' | 'danger' | 'link';

export interface Props {
  // Name of element to use for text from H1 to H6 and p
  element?: HeadingTagName;
  // The content to display for bodytext
  children?: React.ReactNode;
  // Size of the text small, medium, large or extralarge
  componentSize?: Size;
  // Color of component
  componentColor?: Color;
  // Theme to be injected via css-themr
  theme?: any;
}

const bodyText = ({
  children,
  theme,
  componentSize = 'default',
  componentColor = 'text',
  element: ELEMENT = 'p',
}: Props) => {

  const className = classNames(
  theme.bodyText,
  componentSize && theme[variationName('size', componentSize)],
  componentColor && theme[variationName('color', componentColor)]

);

  return <ELEMENT className={className}>{children}</ELEMENT>;
};

export default themr(BODY_TEXT, baseTheme)(bodyText) as ThemedComponentClass<Props, {}>;
