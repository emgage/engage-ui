import * as React from 'react';
import { Video, VideoType } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const posterUrl = new URL('https://cdn.joomlacontenteditor.net/images/media/big_buck_bunny.jpg');

const singleVideoSource = [
  {
    src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
    type: VideoType.MP4,
  }];

const VideoExample = () => (
  <div className={styles.example}>
    <Video
      poster={posterUrl}
      src={singleVideoSource}
      componentStyle={{ height: 300, width: 300 }} />
  </div>
);

export default VideoExample;
