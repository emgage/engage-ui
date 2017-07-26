import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { HeadingTagName } from '../../types';

import { HEADING } from '../ThemeIdentifiers';
import * as baseTheme from './Heading.scss';

export interface Props {
  element?: HeadingTagName;
  children?: React.ReactNode;
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
