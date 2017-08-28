import * as React from 'react';
import { Checkbox } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class CheckboxExample extends React.Component<IProps, IState> {
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
        <h3>1. Default checkbox:</h3>
        <Checkbox
          label="Default"
        />
        <h3>2. By default checkbox checked:</h3>
        <Checkbox
          label="Checked"
          checked
          id="MyCheckbox"
          name="checkbox"
          value="Some value"
        />
        <h3>3. Disabled checkbox:</h3>
        <Checkbox
          label="Disabled"
          disabled
          name="checkbox"
          id="MyCheckbox"
          value="Some value"
        />
      </div>
    );
  }
}

export default CheckboxExample;
