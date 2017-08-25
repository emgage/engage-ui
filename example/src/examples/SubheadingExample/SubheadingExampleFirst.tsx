import * as React from 'react';
import { Subheading } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class SubheadingExampleFirst extends React.Component<IProps, IState> {
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
        <h3>Default Subheading(Without any element):</h3>
        <Subheading>Online store dashboard</Subheading>
      </div>
    );
  }
}

export default SubheadingExampleFirst;
