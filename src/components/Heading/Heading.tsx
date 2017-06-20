import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import {HeadingTagName} from '../../types';

import { HEADING } from '../ThemeIdentifiers';
import * as baseTheme from './Heading.scss';

export interface Props {
  element?: HeadingTagName,
  children?: React.ReactNode,
  theme?: any,
};

const Heading = ({
  element: Element = 'h2',
  children,
  theme,
}: Props) => {
  return <Element className={theme.Heading}>{children}</Element>;
};

export default themr(HEADING, baseTheme)(Heading) as ThemedComponentClass<Props, {}>;
