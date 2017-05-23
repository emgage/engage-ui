import * as React from 'react';
import {
  Button,
  ButtonGroup,
  DisplayText,
  FormLayout,
  Heading,
  //Link,
  //TextField,
  ValidatedTextField,
  ValidatedForm,
} from '../../src/components';

interface State {
  appName?: string,
  appDescription: string,
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      appName: '',
      appDescription: '',
    };
  }

  render() {
    return (
      <ValidatedForm>

         <Heading>App Basics</Heading>

         <DisplayText size="small">Some fun text can go here.</DisplayText>

        <FormLayout>
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
                { required: true, message: 'App Name is required.'},
            ]}
          />
          <ValidatedTextField
            multiline
            id="appDescription"
            name="App Description"
            value={this.state.appDescription}
            label="App Description"
            placeholder=""
            helpText="Provide an engaging description that highlights the features and functionality of your app. Let potential users know what makes your app unique and why they will love it."
            onChange={this.valueUpdater('appDescription')}
            validateTrigger={['onBlur']}
            validateRules={[
                { required: true, message: 'App Description is required.'},
            ]}
          />

          <ButtonGroup>
            <Button>Cancel</Button>
            <Button primary>Next</Button>
          </ButtonGroup>
        </FormLayout>
      </ValidatedForm>
    );
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({[field]: value});
  }
}

export default App;
