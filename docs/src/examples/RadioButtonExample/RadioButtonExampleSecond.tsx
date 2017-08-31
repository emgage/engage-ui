import * as React from 'react';
import { RadioButton } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class RadioButtonExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>3.Disabled RadioButton and checked by default:</h3>
        <RadioButton label="Accounts are disabled" helpText="Customers will only be able to check out as guests" checked id="Radioid"
          name="Radioname" value="Test" disabled labelHidden/>
      </div>
    );
  }
}

export default RadioButtonExampleSecond;
