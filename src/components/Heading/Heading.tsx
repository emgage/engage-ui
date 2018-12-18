import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { HeadingTagName } from '../../types';

import { HEADING } from '../ThemeIdentifiers';
import * as baseTheme from './Heading.scss';

export interface Props {
  // The element name to use for the heading. Available options: h1 | h2 | h3 | h4 | h5 | h6
  element?: HeadingTagName;
  // The content to display inside the heading.
  children?: React.ReactNode;
  // Theme to be injected via css-themr.
  theme?: any;
}

const heading = ({
  element: ELEMENT = 'h2',
  children,
  theme,
}: Props) => {
  return <ELEMENT className={theme.heading}>{children}</ELEMENT>;
};

export default themr(HEADING, baseTheme)(heading) as ThemedComponentClass<Props, {}>;
