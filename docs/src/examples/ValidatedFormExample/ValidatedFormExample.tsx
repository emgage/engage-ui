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
  appName: string;
  appDescription: string;
}

class ValidatedFormExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      appName: '',
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
              id="AppName"
              required={true}
              label="App Name"
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
              multiline
              id="appDescription"
              required={true}
              name="App Description"
              value={this.state.appDescription}
              label="App Description"
              helpText="Provide an engaging description that highlights the features and functionality of your app."
              onChange={this.valueUpdater('appDescription')}
              validateTrigger={['onBlur']}
              validateRules={[
                { required: true, message: 'App Description is required.' },
              ]}
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

export default ValidatedFormExample;
