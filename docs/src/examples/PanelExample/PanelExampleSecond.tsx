import * as React from 'react';
import { Panel, Video, VideoType } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const singleVideoSource = [{
  src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
  type: VideoType.MP4,
}];
const singleVideo =
    <Video
        poster={new URL('https://wallpaperscraft.com/image/horse_silhouette_shadow_sunset_94999_480x800.jpg')}
        src={singleVideoSource}
        autoplay={false}
        controls={true}
        customStyle={{
          height: 100,
          width: 100,
        }}
    />;

const PanelExampleSecond = () => (
  <div className={styles.example}>
    <Panel heading="Basic panel heading" video={singleVideo}>
        <div>
        Basic panel children
        </div>
    </Panel>
  </div>
);

export default PanelExampleSecond;
