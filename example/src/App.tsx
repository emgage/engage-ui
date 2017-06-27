import * as React from 'react';
import { FlexAlign, FlexDirection, FlexJustify } from '../../src/components/FlexBox/FlexProps';
import { PeoplePickerSearchType } from './PickerEnum';
import { PeoplePickerSource } from './PickerSource';

import {
  Button,
  ButtonGroup,
  DisplayText,
  FormLayout,
  Heading,
  Link,
  TextField,
  FlexBox,
  ValidatedTextField,
  ValidatedForm,
  Chip,
  Video,
  VideoType,
  Panel,
  Picker,
  Card,
  ClickableChip,
  Loading,
  MaskTextField,
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

    const sampleVideoCmp = <Video
      poster={posterUrl}
      src={singleVideoSource}
      autoplay={false}
      controls={false}
      style={{
        height: 100,
        width: 100,
      }} />;

    const theme = {
      Panel: 'thm-pnl',
      Heading: 'thm-hdr',
      Body: 'thm-body',
    };

    return (
      <div>
        <div>
          <MaskTextField label="lb1" value={this.state.appName} mask="card" onChange={this.valueUpdater('appName')} />
        </div>
        <div>
          <Heading>Popover</Heading>
          <ClickableChip chip={<Chip>Batman</Chip>}>
            <Card title="More about Batman">
              <p>Batman is a fictional superhero who appears in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger, and first appeared in Detective Comics #27</p>
            </Card>
          </ClickableChip>
        </div>
        <Loading />
        <Loading>
          <div><span>Ranmal</span></div>
        </Loading>

        <Picker required={true}
          chipComponent={Chip}
          filterPlaceHolder="People"
          searchResultComponent={Chip}
          source={new PeoplePickerSource(PeoplePickerSearchType.Both)}
          maxSelectedItems={5}
          minSelectedItems={2}
          millisecondsToWaitBeforeSearch={20}
          moreInfoComponent={<Button children="ranmal" />}

        />
        <ValidatedForm>

          <Heading>App Basics</Heading>

          <DisplayText size="large">This is Display Text, which is used to make a bold visual statement.</DisplayText>
          <p>This is just some fun regular text.</p>

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
                { required: true, message: 'App Name is required.' },
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
                { required: true, message: 'App Description is required.' },
              ]}
            />

            <ButtonGroup>
              <Button>Cancel</Button>
              <Button primary>Next</Button>
            </ButtonGroup>
          </FormLayout>
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
          <br />
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
          <br />
        </div>
        <div>
          <h4>Single source video</h4>
          <Video poster={posterUrl} src={singleVideoSource} autoplay={false} controls={true} style={{ height: 400, width: 400 }} />
          <h4>Multi source video</h4>
          <Video poster={posterUrl} src={multiVideoSource} autoplay={false} controls={true} style={{ height: 400, width: 400 }} />
        </div>
        <div>
          <h4>Panel Component</h4>
          <Panel heading="BASIC PANEL" theme={theme}>
            <div>
              Lorem ipsum lorem ipsum
          </div>
          </Panel>
          <br />
          <Panel heading="BASIC PANEL WITH VIDEO" video={sampleVideoCmp}>
            <div>
              Lorem ipsum lorem ipsum
          </div>
          </Panel>
          <br />
          <Panel heading={<div>Custom Panel</div>}>
            <div>
              Lorem ipsum lorem ipsum
          </div>
          </Panel>
          <br />
          <Panel heading={<div>Custom Panel with Video</div>} video={sampleVideoCmp} theme={theme}>
            <div>
              Lorem ipsum lorem ipsum
          </div>
          </Panel>
        </div>
      </div>
    );
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  popoverClose(field: any) {
    return;
  }
}

export default App;
