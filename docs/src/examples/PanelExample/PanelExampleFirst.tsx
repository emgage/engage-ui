import * as React from 'react';
import { Panel, Video, VideoType } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class PanelExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    const posterUrl = new URL('https://wallpaperscraft.com/image/horse_silhouette_shadow_sunset_94999_480x800.jpg');
    const singleVideoSource = [
      {
        src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
        type: VideoType.MP4,
      }];

    const singleVideo =
      <Video
        poster={posterUrl}
        src={singleVideoSource}
        autoplay={false}
        controls={true}
        style={{
          height: 100,
          width: 100,
        }}
      />;
    const singleVideoAutoplay =
    <Video
      poster={posterUrl}
      src={singleVideoSource}
      autoplay={true}
      controls={true}
      style={{
        height: 300,
        width: 300,
      }}
    />;

    return (
      <div className={styles.example}>
        <h3>1. Basic panel:</h3>
        <br/>
        <Panel heading="Basic panel heading">
          <div>
            Basic panel children
          </div>
        </Panel>
        <br/>
        <h3>2. Panel with single video:</h3>
        <br/>
        <Panel heading="Basic panel heading" video={singleVideo}>
          <div>
            Basic panel children
          </div>
        </Panel>
        <br/>
        <h3>3. Panel with autoplay video:</h3>
        <br/>
        <Panel heading="Basic panel heading" video={singleVideoAutoplay}>
          <div>
            Basic panel children
          </div>
        </Panel>
      </div>
    );
  }
}

export default PanelExample;
