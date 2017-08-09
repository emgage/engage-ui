import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { VISUALLY_HIDDEN } from '../ThemeIdentifiers';
import * as baseTheme from './VisuallyHidden.scss';

export interface Props {
  children?: React.ReactNode;
  theme?: any;
}

const visuallyHidden = ({ children, theme }: Props) => {
  return (
    <span className={theme.visuallyHidden}>{children}</span>
  );
};

export default themr(VISUALLY_HIDDEN, baseTheme)(visuallyHidden) as ThemedComponentClass<Props, {}>;
