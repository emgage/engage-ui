import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import { HeadingTagName } from '../../types';
import { BODY_TEXT } from '../ThemeIdentifiers';
import * as baseTheme from './BodyText.scss';

export type Size = 'small' | 'default' | 'large';

export type Color =
  | 'text'
  | 'darkest'
  | 'darker'
  | 'mid'
  | 'reverse'
  | 'danger'
  | 'link';

type TagName = HeadingTagName | 'div';

export interface Props {
  // Name of element to use for text from H1 to H6, p and div
  element?: TagName;
  // The content to display for bodytext
  children?: React.ReactNode;
  // Size of the text small, medium, large or extralarge
  componentSize?: Size;
  // Color of component
  componentColor?: Color;
  // Css class name
  componentClass?: string;
  // Custom css style
  componentStyle?: React.CSSProperties;
  // Theme to be injected via css-themr
  theme?: any;
}

const bodyText = ({
  children,
  theme,
  componentClass = '',
  componentStyle = {},
  componentSize = 'default',
  componentColor = 'text',
  element: ELEMENT = 'p',
}: Props) => {
  const className = classNames(
    componentClass,
    theme.bodyText,
    componentSize && theme[variationName('size', componentSize)],
    componentColor && theme[variationName('color', componentColor)]
  );

  return (
    <ELEMENT className={className} style={componentStyle}>
      {children}
    </ELEMENT>
  );
};

export default themr(BODY_TEXT, baseTheme)(bodyText) as ThemedComponentClass<
  Props,
  {}
>;
