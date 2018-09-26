import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { STICKY } from '../ThemeIdentifiers';
import { classNames } from '@shopify/react-utilities/styles';
import * as baseTheme from './Sticky.scss';

export type Position = 'top' | 'bottom';

export interface Props {
  children?: React.ReactNode;
  position: Position;
  style?: React.CSSProperties;
  // Theme to be injected via css-themr.
  theme?: any;

}

class Sticky extends React.PureComponent<Props, any> {

  render() {
    const { position, theme } = this.props;

    const classes = classNames(
      position === 'top' ? theme.headerSticky : theme.footerSticky,
      theme.footerStyle
    );

    return (
    <div>
      <div className={ theme.Sticky } style={this.props.style}/>
      <div className={ classes }>{this.props.children}</div>
    </div>
    );
  }
}

export default themr(STICKY, baseTheme)(Sticky) as ThemedComponentClass<Props, {}>;
