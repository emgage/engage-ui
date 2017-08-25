import * as React from 'react';
import { Heading } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class HeadingExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
    };
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>Heading with h1 element:</h3>
        <Heading element="h1">Online store dashboard</Heading>
      </div>
    );
  }
}

export default HeadingExampleSecond;
