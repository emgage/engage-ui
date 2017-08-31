import * as React from 'react';
import { Heading } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class HeadingExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>Default Heading(Without any element):</h3>
        <Heading>Online store dashboard</Heading>
      </div>
    );
  }
}

export default HeadingExampleFirst;
