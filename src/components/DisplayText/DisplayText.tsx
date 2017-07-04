import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import {HeadingTagName} from '../../types';
import { DISPLAY_TEXT } from '../ThemeIdentifiers';
import * as baseTheme from './DisplayText.scss';

export type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface Props {
  element?: HeadingTagName,
  children?: React.ReactNode,
  size?: Size,
  theme?: any,
};

const DisplayText = ({
  element: Element = 'p',
  children,
  size = 'medium',
  theme,
}: Props) => {
  const className = classNames(
  theme.DisplayText,
  size && theme[variationName('size', size)],
);
  return <Element className={className}>{children}</Element>;
};

export default themr(DISPLAY_TEXT, baseTheme)(DisplayText) as ThemedComponentClass<Props, {}>;
