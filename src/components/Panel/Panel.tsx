import * as React from 'react';

export interface Props {
    heading: string | React.ReactNode,
    video?: React.ReactNode,
    children?: React.ReactNode,
    theme?: any,
    style?: React.CSSProperties,
};

export default class Panel extends React.PureComponent<Props, any> {
    render() {
        return (
            <div className={this.props.theme ? this.props.theme.Panel : ''}>
                {
                    this.props.heading as string
                        ? <div className={this.props.theme ? this.props.theme.Heading : ''}>{this.props.heading}</div>
                        : this.props.heading
                }
                <div className={this.props.theme ? this.props.theme.Body : ''}>
                    {this.props.video}
                    {this.props.children}
                </div>
            </div>
        );
    }
}
