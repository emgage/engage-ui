import * as React from 'react';
import { Video, VideoType } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const posterUrl = new URL('https://cdn.joomlacontenteditor.net/images/media/big_buck_bunny.jpg');

const multiVideoSource = [
  {
    src: 'http://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_30mb.mp4',
    type: VideoType.MP4,
  },
  {
    src: 'http://video.webmfiles.org/big-buck-bunny_trailer.webm',
    type: VideoType.WebM,
  }];

const VideoExample2 = () => (
  <div className={styles.example}>
    <Video
      poster={posterUrl}
      src={multiVideoSource}
      autoplay={false}
      controls={true}
      customStyle={{ height: 400, width: 400 }} />
  </div>
);

export default VideoExample2;
