import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import UnstyledLink from '../UnstyledLink';
import { LINK } from '../ThemeIdentifiers';

export interface Props {
  // The url to link to.
  url?: string;
  // The content to display inside link.
  children?: React.ReactNode;
  // Use for a links that open a different site
  external?: boolean;
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when a link is clicked
  onClick?(): void;
}

const link = ({ url, children, onClick, external = false, theme }: Props) => {
  return url
    ? (
      <UnstyledLink className={theme.link} url={url} external={external}>
        {children}
      </UnstyledLink>
    )
    : (
      <button onClick={onClick} className={theme.link}>
        {children}
      </button>
    );
};

export default themr(LINK)(link) as ThemedComponentClass<Props, {}>;
