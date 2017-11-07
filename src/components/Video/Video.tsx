import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { VIDEO } from '../ThemeIdentifiers';
import * as baseTheme from './Video.scss';

export type CrossOrigin = 'anonymous' | 'use-credentials';

export type Preload = 'none' | 'metadata' | 'auto';

export enum VideoType {
    WebM,
    MP4,
    Ogg,
}

export interface VideoSource {
  src: string;
  type: VideoType;}

export interface Props {
  poster: URL;
  src: VideoSource[];
  autoplay?: boolean;
  controls?: boolean;
  crossorigin?: CrossOrigin;
  loop?: boolean;
  muted?: boolean;
  preload?: Preload;
  theme?: any;
  style?: React.CSSProperties;
}

class Video extends React.PureComponent<Props, any> {
  public static defaultProps: Partial<Props> = {
    loop: false,
    muted: false,
    autoplay: false,
  };

  getVideoType = (videoType: VideoType): string => {
    let result = '';
    switch (videoType) {
      case VideoType.MP4:
        result = 'video/mp4';
        break;
      case VideoType.WebM:
        result = 'video/webm';
        break;
      case VideoType.Ogg:
        result = 'video/ogg';
        break;
      default:
        break;
    }
    return result;
  }

  render() {
    return (
    <video
                autoPlay={this.props.autoplay}
                    poster={this.props.poster.toString()}
                    controls={this.props.controls}
                    loop={this.props.loop}
                    muted={this.props.muted}
                    style={this.props.style}
                    preload={this.props.preload}
                    crossOrigin = {this.props.crossorigin}>
                    {
                        this.props.src.map((obj, index) => (
                                <source
                                    src={obj.src}
                                    type={this.getVideoType(obj.type)} key={index} />
                        ))
                    }
                </video>
    );
  }
}

export default themr(VIDEO, baseTheme)(Video) as ThemedComponentClass<Props, {}>;
