import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { VISUALLY_HIDDEN } from '../ThemeIdentifiers';
import * as baseTheme from './VisuallyHidden.scss';

export interface Props {
  children?: React.ReactNode;
  theme?: any;
}

const VisuallyHidden = ({ children, theme }: Props) => {
  return (
    <span className={theme.VisuallyHidden}>{children}</span>
  );
};

export default themr(VISUALLY_HIDDEN, baseTheme)(VisuallyHidden) as ThemedComponentClass<Props, {}>;
