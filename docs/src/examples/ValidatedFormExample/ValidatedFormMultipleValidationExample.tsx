import * as React from 'react';
import { ValidatedForm, FormLayout, ValidatedTextField, Button, ButtonGroup } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
  form: {
    getFieldProps: any,
    getFieldError: any,
    validateFieldsAndScroll: any,
  };
  style?: React.CSSProperties;
  onSubmit: (values: [any]) => void;
  onSubmitError: (values: [any], error: Error) => void;
}
export interface IState {
  appID: number;
  appName: string;
  appPassword: string;
  appDescription: string;
}

class ValidatedFormMultipleValidationExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      appID: 1,
      appName: '',
      appPassword: '',
      appDescription: '',
    };
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <ValidatedForm>
          <FormLayout>
            <ValidatedTextField
              id="AppID"
              required={true}
              type="number"
              label="App ID"
              placeholder=""
              helpText="We recommend keeping your app ID length maximum 5 digit."
              onChange={this.valueUpdater('appID')}
              value={this.state.appID.toString()}
              name="App ID"
              validateTrigger={['onBlur']}
              validateRules={[
                { required: true, message: 'App ID is required.' },
                { type: 'number', message: 'App ID should be number.' },
              ]}
            />
            <ValidatedTextField
              id="AppName"
              required={true}
              label="App Name"
              placeholder=""
              helpText="We recommend keeping your app name under 23 characters."
              onChange={this.valueUpdater('appName')}
              value={this.state.appName}
              name="App Name"
              validateTrigger={['onBlur']}
              validateRules={[
                { required: true, message: 'App Name is required.' },
              ]}
            />
            <ValidatedTextField
              id="AppPassword"
              required={true}
              type="password"
              label="App Password"
              helpText="We recommend keeping your app password alpha, numeric and special character."
              onChange={this.valueUpdater('appPassword')}
              value={this.state.appPassword}
              name="App Password"
              validateTrigger={['onBlur']}
              validateRules={[
                { required: true, message: 'App Password is required.' },
              ]}
            />
            <ValidatedTextField
              multiline
              id="appDescription"
              name="App Description"
              value={this.state.appDescription}
              label="App Description"
              helpText="Provide an engaging description that highlights the features and functionality of your app."
              onChange={this.valueUpdater('appDescription')}
            />
            <ButtonGroup>
              <Button submit primary>Submit</Button>
            </ButtonGroup>
          </FormLayout>
        </ValidatedForm>
      </div>
    );
  }
}

export default ValidatedFormMultipleValidationExample;
