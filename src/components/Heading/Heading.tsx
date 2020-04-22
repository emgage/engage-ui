import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { HeadingTagName } from '../../types';
import { classNames, variationName } from '@shopify/react-utilities/styles';
import { HEADING } from '../ThemeIdentifiers';
import * as baseTheme from './Heading.scss';
export type Color = 'text' | 'darker' | 'darkest' | 'mid' | 'reverse' | 'danger';
export interface Props {
  componentClass?: string;
  componentStyle?: any;

  componentColor?: Color;
  // The element name to use for the heading. Available options: h1 | h2 | h3 | h4 | h5 | h6
  element?: HeadingTagName;
  // The content to display inside the heading.
  children?: React.ReactNode;
  // Theme to be injected via css-themr.
  theme?: any;
}

const heading = ({
  componentClass = '',
  componentStyle = {},
  element: ELEMENT = 'h2',
  componentColor = 'text',
  children,
  theme,
}: Props) => {
  const headingClass = classNames(
    componentClass,
    theme.heading,
    componentColor && theme[variationName('color', componentColor)],
  );

  return <ELEMENT className={headingClass} style={componentStyle}>{children}</ELEMENT>;
};

export default themr(HEADING, baseTheme)(heading) as ThemedComponentClass<Props, {}>;
