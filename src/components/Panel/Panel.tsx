import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { PANEL } from '../ThemeIdentifiers';
import * as baseTheme from './Panel.scss';

export interface Props {
  // If heading needs to be added into panel
  heading: string | React.ReactNode;
  // When need to add video into panel
  video?: React.ReactNode;
  children?: React.ReactNode;
  // Theme to be injected via css-themr.
  theme?: any;
  // To apply custom styling.
  componentStyle?: React.CSSProperties;
}

class Panel extends React.PureComponent<Props, any> {
  render() {
    return (
            <div className={this.props.theme.panel} style={this.props.componentStyle}>
                {
                  typeof this.props.heading === 'string'
                        ? <div className={this.props.theme.heading}>{this.props.heading}</div>
                        : this.props.heading
                }
                <div className={this.props.theme.body}>
                    {this.props.video}
                    {this.props.children}
                </div>
            </div>
    );
  }
}

export default themr(PANEL, baseTheme)(Panel) as ThemedComponentClass<Props, {}>;
