import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { PANEL } from '../ThemeIdentifiers';
import * as baseTheme from './Panel.scss';

export interface Props {
  heading: string | React.ReactNode;
  video?: React.ReactNode;
  children?: React.ReactNode;
  theme?: any;
  style?: React.CSSProperties;
}

class Panel extends React.PureComponent<Props, any> {
  render() {
    return (
            <div className={this.props.theme.panel} style={this.props.style}>
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
