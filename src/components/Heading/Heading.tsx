import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { HeadingTagName } from '../../types';
import { classNames, variationName } from '@shopify/react-utilities/styles';
import { HEADING } from '../ThemeIdentifiers';
import * as baseTheme from './Heading.scss';

export type Size = 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle';

export type Color = 'text';

export interface Props {
  componentClass?: string;
  componentStyle?: any;
  // Unique Id
  componentId?: string;
  // The element name to use for the heading. Available options: h1 | h2 | h3 | h4 | h5 | h6
  element?: HeadingTagName;
  // The content to display inside the heading.
  children?: React.ReactNode;
  // Size of the text small, medium, large or extralarge
  headingSize?: Size;
  // Color of component
  headingColor?: Color;
  // Theme to be injected via css-themr.
  theme?: any;
}

const heading = ({
  componentClass = '',
  componentStyle = {},
  componentId = '',
  element: ELEMENT = 'h2',
  headingSize = 'subtitle',
  headingColor = 'text',
  children,
  theme,
}: Props) => {
  const headingClass = classNames(
    componentClass,
    theme.heading,
    headingSize && theme[variationName('size', headingSize)],
    headingColor && theme[variationName('color', headingColor)]
  );

  return <ELEMENT className={headingClass} style={componentStyle} id={componentId} >{children}</ELEMENT>;
};

export default themr(HEADING, baseTheme)(heading) as ThemedComponentClass<Props, {}>;
