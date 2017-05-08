import * as React from 'react';
import { themr } from 'react-css-themr';
import UnstyledLink from '../UnstyledLink';
import { LINK } from '../ThemeIdentifiers';

export interface Props {
  url?: string,
  children?: React.ReactNode,
  external?: boolean,
  theme?: any,
  onClick?(): void,
}

class Link extends React.Component<Props, {}> {
  render() {
    const {
      url,
      children,
      onClick,
      external,
      theme,
    } = this.props;
    return url
    ? (
      <UnstyledLink className={theme.Link} url={url} external={external}>
        {children}
      </UnstyledLink>
    )
    : (
      <button onClick={onClick} className={theme.Link}>
        {children}
      </button>
    );
  }
}

export default themr(LINK)(Link);
