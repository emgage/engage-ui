import * as React from 'react';
import { RadioButton } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class RadioButtonExampleFirst extends React.Component<IProps, IState> {
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
        <h3>1.Default RadioButton(By default Checked):</h3>
        <RadioButton label="Accounts are disabled" checked/>

        <h3>2.RadioButton:</h3>
        <RadioButton label="Accounts are disabled"/>
      </div>
    );
  }
}

export default RadioButtonExampleFirst;
