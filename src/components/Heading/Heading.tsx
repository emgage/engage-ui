import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { HeadingTagName } from '../../types';
import { classNames } from '@shopify/react-utilities/styles';
import { HEADING } from '../ThemeIdentifiers';
import * as baseTheme from './Heading.scss';
export interface Props {
  componentClass?: string;
  componentStyle?: any;
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
  children,
  theme,
}: Props) => {
  const headingClass = classNames(
    componentClass,
    theme.heading
  );

  return <ELEMENT className={headingClass} style={componentStyle}>{children}</ELEMENT>;
};

export default themr(HEADING, baseTheme)(heading) as ThemedComponentClass<Props, {}>;
