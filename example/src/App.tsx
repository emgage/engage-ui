import * as React from 'react';
import { FlexAlign, FlexDirection, FlexJustify } from '../../src/components/FlexBox/FlexProps';
import { PeoplePickerSearchType } from './PickerEnum';
import { PeoplePickerSource } from './PickerSource';

import {
  Button,
  ButtonGroup,
  Card,
  Chip,
  ClickableChip,
  Column,
  DisplayText,
  FlexBox,
  FormLayout,
  Heading,
  Link,
  Loading,
  OffCanvas,
  OffCanvasMenu,
  OffCanvasBody,
  OffCanvasAnimationType,
  Panel,
  Picker,
  TextField,
  ValidatedTextField,
  ValidatedForm,
  Video,
  VideoType,
} from '../../src/components';

interface State {
  appName?: string,
  appDescription: string,

  isMenuOpened: boolean,
  animation?: OffCanvasAnimationType,

  appTextCounter: string,
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      appName: '',
      appDescription: '',

      isMenuOpened: false,
      appTextCounter: ''
    };
  }

  chipClick = () => {
    console.log('chip clicked...');
  }

  chipRemove = () => {
    console.log('chip removed...');
  }

  handleClick = () => {
    this.setState({isMenuOpened: !this.state.isMenuOpened});
  }

  handleClickSlide = () => {
    this.setState({isMenuOpened: !this.state.isMenuOpened, animation: OffCanvasAnimationType.Slide});
  }

  handleClickReveal = () => {
    this.setState({isMenuOpened: !this.state.isMenuOpened, animation: OffCanvasAnimationType.Reveal});
  }

  handleClickNone = () => {
    this.setState({isMenuOpened: !this.state.isMenuOpened, animation: OffCanvasAnimationType.None});
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

    return (
      <div> 
        <OffCanvas width={270} transitionDuration={270} isMenuOpened={this.state.isMenuOpened}>
            <OffCanvasBody animation={this.state.animation}>
              <p>This is the main body container.</p>
              <p><a href="#" onClick={this.handleClickSlide}>Slide</a> to toggle the menu.</p>
              <p><a href="#" onClick={this.handleClickReveal}>Reveal</a> to toggle the menu.</p>
              <p><a href="#" onClick={this.handleClickNone}>None</a> to toggle the menu.</p>
            </OffCanvasBody>
            <OffCanvasMenu animation={this.state.animation}>
              <p>Placeholder content.</p>
              <ul>
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
                <li>Link 4</li>
                <li>Link 5</li>
                <li><a href="#" onClick={this.handleClick}>Toggle Menu</a></li>
              </ul>
            </OffCanvasMenu>
          </OffCanvas>       
        <div>
          <Heading>Popover</Heading>
          <TextField id="TestName" label="Text Counter" placeholder="" value={this.state.appTextCounter} helpText="Helper Text" enableTextCouter={true} maxLength={100} onChange={this.valueUpdater('appTextCounter')}/>
          <ClickableChip chip={<Chip>Batman</Chip>}>
            <Card title="More about Batman">
              <p>Batman is a fictional superhero who appears in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger, and first appeared in Detective Comics #27</p>
            </Card>
          </ClickableChip>
        </div>
        <Loading>
          <div><span>Loading!!!!!</span></div>
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

        <Heading>Flexbox</Heading>
        <FlexBox>
          <div>Demo 1</div>
          <div>Demo 2</div>
          <div>Demo 3</div>
        </FlexBox>

        <FlexBox direction={FlexDirection.Column} align={FlexAlign.Stretch} justify={FlexJustify.Center}>
          <div>Demo 1</div>
          <div>Demo 2</div>
          <div>Demo 3</div>
        </FlexBox>

        <FlexBox direction={FlexDirection.Row} align={FlexAlign.Stretch} justify={FlexJustify.SpaceAround}>
          <div>Demo 1</div>
          <div>Demo 2</div>
          <div>Demo 3</div>
        </FlexBox>

        <FlexBox inline={true} direction={FlexDirection.Column} align={FlexAlign.Stretch} justify={FlexJustify.Center}>
          <div>Demo 1</div>
          <div>Demo 2</div>
          <div>Demo 3</div>
        </FlexBox>

        <Heading>Chip</Heading>
        <div>
          <Chip>
            Basic Chip
          </Chip>
          <Chip
            image={{
              url: 'example/src/images/netguru-cartoon-characters3.png',
              alt: 'Your mom',
            }}
            removable={true}
          >
            Image Chip
          </Chip>
          <Chip onClick={this.chipClick} clickable={true}>
            Clickable Chip
          </Chip>
          <Chip onRemove={this.chipRemove} removable={true}>
            Removable Chip
          </Chip>
          <Chip transparent>
            Transparent Chip
          </Chip>
        </div>

        <div>
          <h4>Single source video</h4>
          <Video
            poster={posterUrl}
            src={
              [{
                src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
                type: VideoType.MP4,
              }]
            }
            autoplay={false}
            controls={true}
            style={{ height: 400, width: 400 }}
          />
          <h4>Multi source video</h4>
          <Video poster={posterUrl} src={multiVideoSource} autoplay={false} controls={true} style={{ height: 400, width: 400 }} />
        </div>
        <h4>Panel Component</h4>
        <Panel heading="BASIC PANEL">
          <div>
            Lorem ipsum lorem ipsum
        </div>
        </Panel>
        <Panel heading="BASIC PANEL WITH VIDEO" video={sampleVideoCmp}>
          <div>
            Lorem ipsum lorem ipsum
        </div>
        </Panel>
        <Panel heading={<div>Custom Panel</div>}>
          <div>
            Lorem ipsum lorem ipsum
        </div>
        </Panel>
        <Panel heading={<div>Custom Panel with Video</div>} video={sampleVideoCmp}>
          <div>
            Lorem ipsum lorem ipsum
        </div>
        </Panel>
        <h2>Column Component Demo</h2>
        <div>
          <Column small="1-1">
            <p>Small 1-1!</p>
          </Column>
        </div>
       
       <Heading>Grid</Heading>
        <FlexBox>
          <Column small="1-2" medium="1-4" large="3-5">
            <span>Hello small=1-2 medium=1-4 large=3-5</span>
          </Column>
          <Column small="1-2" medium="3-4" large="4-10">
            <span>Hello small=1-2 medium=3-4 large=4-10</span>
          </Column>
        </FlexBox>
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
