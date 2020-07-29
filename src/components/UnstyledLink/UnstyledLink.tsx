import * as React from 'react';
import { ReactComponent } from '@shopify/react-utilities/types';
import { unstyled } from '../shared';

export interface Props extends React.HTMLProps<HTMLAnchorElement> {
  // The url to link to.
  url: string;
  // Use for a links that open a different site
  external?: boolean;
  // The content to display inside link.  
  children?: React.ReactNode;
  [key: string]: any;
  // To apply custom styling.
  componentStyle?: React.CSSProperties;
}

export type LinkLikeComponent = ReactComponent<Props>;

let LINKCOMPONENT: LinkLikeComponent;

export default class UnstyledLink extends React.PureComponent<Props, never> {
  static use(newLinkComponent: LinkLikeComponent) {
    LINKCOMPONENT = newLinkComponent;
  }

  render() {
    if (LINKCOMPONENT) {
      return <LINKCOMPONENT {...this.props} {...unstyled.props} />;
    }

    const { external = false, url, ...rest } = this.props;
    const target = external ? '_blank' : undefined;
    const rel = external ? 'noopener noreferrer' : undefined;
    return <a style={this.props.componentStyle} target={target} {...rest} href={url} rel={rel} {...unstyled.props} />;
  }
}
