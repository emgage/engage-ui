import * as React from 'react';
import { Subheading } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class SubheadingExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>Subheading with h1 element:</h3>
        <Subheading element="h1">Online store dashboard</Subheading>
      </div>
    );
  }
}

export default SubheadingExampleSecond;
