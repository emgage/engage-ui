import * as React from 'react';
import { Video ,VideoType } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class VideoExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const posterUrl = new URL('http://4.bp.blogspot.com/_JSR8IC77Ub4/TKB-XAWXmhI/AAAAAAAABJA/MqOpdFTOaHo/w1200-' +
      'h630-p-k-no-nu/C:%5Cfakepath%5Cbird1.jpg');

    const multiVideoSource = [
      {
        src: 'http://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_30mb.mp4',
        type: VideoType.MP4,
      },
      {
        src: 'http://video.webmfiles.org/big-buck-bunny_trailer.webm',
        type: VideoType.WebM,
      }];

    return (
      <div className={styles.example}>
        <h3>3.Multi Video Source with Controls:</h3>
        <Video poster={posterUrl} src={multiVideoSource} autoplay={false} controls={true} style={{ height: 400, width: 400 }} />

        <h3>4.Video with all properties:</h3>
        <Video poster={posterUrl} src={multiVideoSource} autoplay={false} controls={true}
        preload="auto" loop={false} muted style={{ height: 400, width: 400 }} />
      </div>
    );
  }
}

export default VideoExampleSecond;
