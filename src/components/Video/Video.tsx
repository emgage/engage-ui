import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
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
  type: VideoType;
}

export interface Props {
  // To give Image URL for Video.
  poster: URL;
  // Provide source of any video.
  src: VideoSource[];
  // To autoplay or not.
  autoplay?: boolean;
  // See controls i.e.Play/Pause,Volume etc.
  controls?: boolean;
  // Give cross origine to video. Availabel options: anonymous | use-credentials
  crossorigin?: CrossOrigin;
  // If true, upon reaching the end, the video will automatically replay.
  loop?: boolean;
  // To mute video or not.
  muted?: boolean;
  // Provide preload. Available options: none | metadata | auto
  preload?: Preload;
  // Theme to be injected via css-themr.
  theme?: any;
  // To provide styling.
  componentStyle?: React.CSSProperties;
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
                    style={this.props.componentStyle}
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
