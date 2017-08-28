import * as React from 'react';
import { Image } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class ImageExampleFirst extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    };
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    const url = 'https://www.w3schools.com/css/trolltunga.jpg';
    const alt = 'No Image.. Thanks!!';

    return (
      <div className={styles.example}>
          1. Image:
          <br/><br/>
          <Image source={url} alt={alt} />
      </div>
    );
  }
}

export default ImageExampleFirst;
