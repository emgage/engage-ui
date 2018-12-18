import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { VISUALLY_HIDDEN } from '../ThemeIdentifiers';
import * as baseTheme from './VisuallyHidden.scss';

export interface Props {
  // The content to be hidden visually.
  children?: React.ReactNode;
  // Theme to be injected via css-themr.
  theme?: any;
}

const visuallyHidden = ({ children, theme }: Props) => {
  return (
    <span className={theme.visuallyHidden}>{children}</span>
  );
};

export default themr(VISUALLY_HIDDEN, baseTheme)(visuallyHidden) as ThemedComponentClass<Props, {}>;
