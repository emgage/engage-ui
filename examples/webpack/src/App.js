import React, {Component} from 'react';
import {
  Link,
  Button,
  TextField,
} from 'engage-ui';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      email: '',
      checkboxes: [],
      connected: false,
    };
  }

  render() {

    return (
      <div>
        <TextField
          value={this.state.first}
          label="First Name"
          placeholder="Tom"
          onChange={this.valueUpdater('first')}
        />
        <TextField
          value={this.state.last}
          label="Last Name"
          placeholder="Ford"
          onChange={this.valueUpdater('last')}
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
      </div>
    );
  }

  valueUpdater(field) {
    return (value) => this.setState({[field]: value});
  }
  toggleConnection() {
    this.setState(({connected}) => ({connected: !connected}));
  }
}

export default App;
