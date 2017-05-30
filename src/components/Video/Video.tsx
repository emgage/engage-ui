import * as React from 'react';

export type CrossOrigin = 'anonymous' | 'use-credentials';

export type Preload = 'none' | 'metadata' | 'auto';

export interface Props {
    poster: URL,
    src: string[],
    autoplay: boolean,
    controls?: boolean,
    crossorigin?: CrossOrigin,
    loop?: boolean,
    muted?: boolean,
    preload?: Preload,
    theme?: any,
    style?: React.CSSProperties,
};

export default class Video extends React.PureComponent<Props, any> {
    public static defaultProps: Partial<Props> = {
        loop: false,
        muted: false,
    };
    render() {
        return (
            <video
                src={this.props.src[0]}
                autoPlay={this.props.autoplay}
                poster={this.props.poster.toString()}
                controls={this.props.controls}
                loop={this.props.loop}
                muted={this.props.muted}
                style={this.props.style}
                preload={this.props.preload}
                crossOrigin = {this.props.crossorigin}
                />
        );
    }
}

// TODO: theme={this.props.theme}
