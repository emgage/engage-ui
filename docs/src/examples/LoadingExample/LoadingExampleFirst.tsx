import * as React from 'react';
import { Loading } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class LoadingExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3> Loading Icon </h3>
        <Loading/>
      </div>
    );
  }
}

export default LoadingExampleFirst;
