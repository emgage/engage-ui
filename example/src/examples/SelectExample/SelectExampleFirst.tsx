import * as React from 'react';
import { Select } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  selected: string;
  helptextvalue: string;
}

class SelectExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selected:'',
      helptextvalue:'Please Select City',
    };
  }

  valueUpdater() {
    return (value: any) => this.setState({ selected: value, helptextvalue:'Selected City: ' + value });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3> 1. Default Select </h3>
        <Select
        label="City"
        options={[
          'New York',
          'New Jersey',
          'Washigton DC',
        ]}
        placeholder="Select"
        value={this.state.selected}
        helpText={this.state.helptextvalue}
        id="SelectId"
        name="Select Name"
        onChange={this.valueUpdater()}
      />

      <h3> 2. Disabled Select </h3>
        <Select
        label="City"
        options={[
          'New York',
          'New Jersey',
          'Washigton DC',
        ]}
        placeholder="Select"
        disabled
        id="SelectId"
        name="Select Name"
      />
      </div>
    );
  }
}

export default SelectExampleFirst;
