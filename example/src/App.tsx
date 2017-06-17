import * as React from 'react';
import { FlexAlign, FlexDirection, FlexJustify } from '../../src/components/FlexBox/FlexProps';
import { PeoplePickerSearchType } from '../../src/components/Picker/PickerEnum';
import { PeoplePickerSource } from './PickerSource';

import {
  Button,
  TextField,
  FlexBox,
  ValidatedTextField,
  ValidatedForm,
  Chip,
  Picker,
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

  chipClick = () => {
    console.log('chip clicked...');
  }

  chipRemove = () => {
    console.log('chip removed...');
  }

  render() {
    return (
      <div>
        <Picker required={true}
        chipComponent={Chip}
        filterPlaceHolder="People"
        peoplePickerSearchType={PeoplePickerSearchType.Both}
        searchResultComponent={Chip}
        source={new PeoplePickerSource(PeoplePickerSearchType.Both)}
        maxSelectedItems={5}
        minSelectedItems={2}
        millisecondsToWaitBeforeSearch={20}
        moreInfoComponent ={<Button children="ranmal"/>}

         />
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
      <FlexBox direction={FlexDirection.Column} align={FlexAlign.Stretch} justify={FlexJustify.Center}>
        <div>Demo 1</div>
        <div>Demo 2</div>
        <div>Demo 3</div>
      </FlexBox>
      <br />
      <FlexBox inline={true} direction={FlexDirection.Column} align={FlexAlign.Stretch} justify={FlexJustify.Center}>
        <div>Demo 1</div>
        <div>Demo 2</div>
        <div>Demo 3</div>
      </FlexBox>
      <br />

      <div>
        <br/>
        <Chip>
          Basic Chip
        </Chip>
        <Chip onClick={this.chipClick} clickable={true}>
          Clickable Chip
        </Chip>
        <Chip onRemove={this.chipRemove} removable={true}>
          Removable Chip
        </Chip>
        <br/>
      </div>
      </div>
    );
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({[field]: value});
  }
}

export default App;
