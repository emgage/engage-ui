import * as React from 'react';
import {
  Button,
  TextField,
  ValidatedTextField,
  ValidatedForm,
  Chip,
  Video,
  VideoType,
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

const posterUrl = new URL('http://4.bp.blogspot.com/_JSR8IC77Ub4/TKB-XAWXmhI/AAAAAAAABJA/MqOpdFTOaHo/w1200-' +
    'h630-p-k-no-nu/C:%5Cfakepath%5Cbird1.jpg');
const singleVideoSource = [
              {
                src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
                type: VideoType.MP4,
              }];
const multiVideoSource = [
              {
                src: 'http://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_30mb.mp4',
                type: VideoType.MP4,
              },
              {
                src: 'http://www.sample-videos.com/video/mp4/240/big_buck_bunny_240p_30mb.mp4',
                type: VideoType.MP4,
              }];

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

      <div>
        <br/>
        <Chip>
          Basic Chip
        </Chip>
        < br />
        <Chip onClick={this.chipClick} clickable={true}>
          Clickable Chip
        </Chip>
        < br />
        <Chip onRemove={this.chipRemove} removable={true}>
          Removable Chip
        </Chip>
        <br/>
      </div>
      <div>
        <h4>Single source video</h4>
        <Video poster={posterUrl} src={singleVideoSource} autoplay={false} controls={true} style={{height: 400, width: 400}} />
        <h4>Multi source video</h4>
        <Video poster={posterUrl} src={multiVideoSource} autoplay={false} controls={true} style={{height: 400, width: 400}} />
      </div>
      </div>
    );
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({[field]: value});
  }
}

export default App;
