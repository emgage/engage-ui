import * as React from 'react';
import { ValidatedForm, ValidatedTextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  txtAppName: string;
  txtAppDesc: string;
}

class ValidateTextFieldExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      txtAppName: '',
      txtAppDesc: '',
    };
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <ValidatedForm>
          <ValidatedTextField
            id="AppName"
            required={true}
            label="App Name"
            placeholder=""
            helpText="We recommend keeping app name less then 25 characters."
            onChange={this.valueUpdater('txtAppName')}
            name="App Name"
            value={this.state.txtAppName}
            validateTrigger={['onBlur', 'onChange']}
            validateRules={[{ required: true, message: 'App Name is required.' },
            ]}
          />
          <ValidatedTextField
            id="AppDescription"
            required={true}
            label="App Description"
            placeholder=""
            helpText="We recommend keeping app description less then 256 characters."
            onChange={this.valueUpdater('txtAppDesc')}
            name="App Description"
            value={this.state.txtAppDesc}
            validateTrigger={['onBlur', 'onChange']}
            validateRules={[{ required: true, message: 'App Description is required.' }]}
            multiline
          />
        </ValidatedForm>
      </div>
    );
  }
}

export default ValidateTextFieldExampleFirst;
