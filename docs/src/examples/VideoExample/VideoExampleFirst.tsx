import * as React from 'react';
import { Video ,VideoType } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}


class VideoExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const posterUrl = new URL('https://cdn.joomlacontenteditor.net/images/media/big_buck_bunny.jpg');
    const singleVideoSource = [
      {
        src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
        type: VideoType.MP4,
      }];

    return (
      <div className={styles.example}>
        <h3>1.Default Video without Controls:</h3>
        <Video
          poster={posterUrl}
          src={singleVideoSource}
          style={{ height: 300, width: 300 }}/>

        <h3>2.Single Video Source with Controls:</h3>
        <Video
          poster={posterUrl}
          src={singleVideoSource}
          controls={true}
          style={{ height: 400, width: 400 }} />
      </div>
    );
  }
}

export default VideoExampleFirst;
