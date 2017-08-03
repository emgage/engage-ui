import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import UnstyledLink from '../UnstyledLink';
import { LINK } from '../ThemeIdentifiers';

export interface Props {
  url?: string;
  children?: React.ReactNode;
  external?: boolean;
  theme?: any;
  onClick?(): void;
}

const link = ({ url, children, onClick, external, theme }: Props) => {
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
