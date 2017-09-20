import * as React from 'react';
import { Checkbox } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class CheckBoxExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>4. Checkbox with helpText:</h3>
        <Checkbox
          label="With helpText "
          helpText="Some help"
          id="MyCheckbox"
          name="checkbox"
          value="Some value"
        />
        <h3>5. Checkbox with error:</h3>
        <Checkbox
          label="With error"
          id="MyCheckbox"
          name="checkbox"
          value="Some value"
          error="Some error"
        />
        <h3>6.Checkbox with all properties:</h3>
        <Checkbox
          label="Checkbox"
          labelHidden
          checked
          helpText="Some help"
          id="MyCheckbox"
          name="checkbox"
          value="Some value"
          error="Some error" disabled={false}
        />
      </div>
    );
  }
}

export default CheckBoxExampleSecond;
