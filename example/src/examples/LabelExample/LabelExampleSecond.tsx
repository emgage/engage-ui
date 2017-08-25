import * as React from 'react';
import { Label } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class LabelExampleSecond extends React.Component<IProps, IState> {
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
        <h3>Label with all properties:</h3>
        <Label id="lblid" hidden={false} required focused hasValue>Test</Label>
      </div>
    );
  }
}

export default LabelExampleSecond;
