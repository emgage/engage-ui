import * as React from 'react';
import { Label } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';
import { Action } from '../../../../src/types';

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
    const action : Action =
      {
        content: 'Click Here',
        onAction:() => {alert('You have performed Click Action.');},
      };
    return (
      <div className={styles.example}>
        <h3>Label with action property:</h3>
        <Label action={action} id="lblid" hidden={false} required focused hasValue >
          Testing Label
        </Label>
      </div>
    );
  }
}

export default LabelExampleSecond;
