import * as React from 'react';
import {
  Button,
  TextField,
  FlexBox,
  ValidatedTextField,
  ValidatedForm,
} from '../../src/components';

interface State {
  first?: string,
  last?: string,
  email?: string,
  autoGrow: string,
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      first: '',
      last: '',
      email: '',
      autoGrow: '',
    };
  }

  render() {
    return (
       <div>
          <ValidatedForm>
            <ValidatedTextField
              id="tom"
              required={true}
              label="First Name"
              placeholder="Tom"
              onChange={this.valueUpdater('last')}
              value={this.state.first}
              name="tom"
              validateTrigger={['onBlur']}
              validateRules={[
                  { required: true, message: 'This is required dude.'},
                  { type: 'email', message: 'This should be an email dude.'},
              ]}
            />
            <ValidatedTextField
              id="last"
              name="last"
              value={this.state.last}
              label="Last Name"
              placeholder="Ford"
              onChange={this.valueUpdater('last')}
              validateTrigger={['onBlur']}
              validateRules={[
                  { required: true, message: 'This is required too dude.'},
              ]}
            />

            <TextField
              value={this.state.email}
              label="Email"
              placeholder="example@email.com"
              onChange={this.valueUpdater('email')}
            />

            <TextField
              multiline
              label="How did you hear about us?"
              placeholder="Website, ads, email, etc."
              value={this.state.autoGrow}
              onChange={this.valueUpdater('autoGrow')}
            />

            <Button primary>Submit</Button>
          </ValidatedForm>
      
          <br />
          <FlexBox>
            <div>Demo 1</div>
            <div>Demo 2</div>
            <div>Demo 3</div>
          </FlexBox>
          <br />
          <FlexBox direction="row" align="stretch" justify="start">
            <div>Demo 1</div>
            <div>Demo 2</div>
            <div>Demo 3</div>
          </FlexBox>
          <br />
          <FlexBox inline={true} direction="column" align="stretch" justify="center">
            <div>Demo 1</div>
            <div>Demo 2</div>
            <div>Demo 3</div>
          </FlexBox>
          <br />
          
      </div>
    );
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({[field]: value});
  }
}

export default App;
