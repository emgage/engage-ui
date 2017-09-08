import * as React from 'react';
import { Image } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class ImageExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    return (
      <div className={styles.example}>
          1. Image:
          <br/><br/>
          <Image
            source={'https://www.w3schools.com/css/trolltunga.jpg'}
            alt={'No Image.. Thanks!!'}
          />
      </div>
    );
  }
}

export default ImageExampleFirst;
