import * as React from 'react';
import ReactDataExample from './ReactDataExample';
import SingleDatePickerWrapper from './SingleDatePickerWrapper';
import DateRangePickerWrapper from './DateRangePickerWrapper';
import PickerAutoSuggestExample from './PickerAutoSuggestExample';

import {
  Banner,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Chip,
  ChoiceList,
  ClickableChip,
  Column,
  DisplayText,
  Drawer,
  DrawerContent,
  FlexBox,
  FormLayout,
  Heading,
  Link,
  List,
  Item,
  Loading,
  // OffCanvas,
  Panel,
  Picker,
  Select,
  TextField,
  Tooltip,
  ValidatedTextField,
  ValidatedForm,
  Video,
  VideoType,
  Modal,
  Caption,
  Spinner,
} from '../../src/components';

interface State {
  appName?: string;
  appDescription: string;
  appTextCounter: string;
  columns: object[];
  rows: object[];
  isMenuOpened: boolean;
  drawer: boolean;
  drawerContent: any;
  activeDrawerId: string;
}

class App extends React.Component<{}, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      appName: '',
      appDescription: '',
      appTextCounter: '',
      columns: [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' },
        { key: 'count', name: 'Count' },
      ],
      rows: [
        { id: 1, title: 'Title 1', count: 1 },
        { id: 2, title: 'Title 2', count: 2 },
        { id: 3, title: 'Title 3', count: 3 },
      ],
      isMenuOpened: false,
      drawer: false,
      drawerContent: {
        content1: false,
        content2: true,
      },
      activeDrawerId: 'content1',
    };
  }

  rowGetter = (index: number) => this.state.rows[index];

  chipClick = () => {
    console.log('chip clicked...');
  }

  chipRemove = () => {
    console.log('chip removed...');
  }

  onDrawerOpen = () => {
    console.log('drawer open');
  }

  onDrawerClose = () => {
    console.log('drawer close');
  }

  toggleDrawer = () => {
    this.setState({ drawer: !this.state.drawer });
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

    const pickerdata = [
      { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', description: 'John Doe', email: 'test@gmail.com' },
      { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', description: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
      { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', description: 'Jane Doe', email: 'jane@gmail.com' },
      { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', description: 'Person McPerson', email: 'yahoogmail@gmail.com' },
      { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
      { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'LauraPerson', description: 'Laura Person', email: 'slkjgmail@gmail.com' },
    ];

    return (
      <div>
        <Badge children={'Badge'} />
        <Badge children={'Badge'} status={'success'} />
        <Badge children={'Badge'} status={'info'} />
        <Badge children={'Badge'} status={'attention'} />
        <Badge children={'Badge'} status={'warning'} />
        <Badge children={'Badge'} progress={'incomplete'} />
        <Badge children={'Badge'} progress={'partiallyComplete'} />
        <Badge children={'Badge'} progress={'complete'} />
        <div>
          <h1>This is my Modal Component!!</h1>
          <Modal
            id="test1"
            // close
            closeOnBackgroud={true}
            closeOnEsc
            modalOverflow
            overlay
            header="This is my modal header"
            footer={<Button>OK</Button>}
            activator={<Button>Modal</Button>}
            width="medium"
          >
            <Heading>Heading test</Heading>
            <p>
            Modal test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in


            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in

            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in

            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in

            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in

            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in

            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in

            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            </p>
          </Modal>
        </div>
        <div>
          <h1>This is my Modal Component!!</h1>
          <Modal
            id="test2"
            close
            // modalOverflow
            // header="This is my modal header"
            // footer={<Button>OK</Button>}
            activator={<Button>Modal</Button>}
            width="400px"
          >
            <Heading>Heading test</Heading>
            <p>
              test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in


            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in

            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in

            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in

            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in

            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in

            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in

            test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
              </p>
          </Modal>
        </div>
        <br />
        <Caption style={{ color: 'red' }}>This is Caption</Caption>
        <br />
        <Checkbox label={'I am a checkbox'} />
        <Banner title={'banner'} status={'success'} />
        <Banner title={'banner'} status={'info'} />
        <Banner title={'banner'} status={'warning'} />
        <Banner title={'banner'} status={'critical'} />
        <PickerAutoSuggestExample />
        <SingleDatePickerWrapper />
        <DateRangePickerWrapper />
        <div>
          <Button onClick={this.toggleDrawer}>Drawer open</Button>
          <Drawer
            toggleDrawer={this.toggleDrawer}
            active={ this.state.drawer }
            activeContentId={this.state.activeDrawerId}
            onOpen={this.onDrawerOpen}
            onClose={this.onDrawerClose}
            mode="push"
            width="large"
            overlay
            closeButton>
            <DrawerContent id="content1" mode="slide">
              <p>Reveal Test</p>
              <ul>
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
                <li>Link 4</li>
                <li>Link 5</li>
              </ul>

              <Button onClick={ () => this.setState({ activeDrawerId: 'content2' }) }>Content2 open</Button>
            </DrawerContent>

            <DrawerContent id="content2" mode="slide">
              I am inside drawer content 2

              <Button onClick={ () => this.setState({ activeDrawerId: 'content1' }) }>Content1 open</Button>
              <Button onClick={ () => this.setState({ drawer: false }) }>Close</Button>
            </DrawerContent>
          </Drawer>

        </div>

        <p> Some text with a
          <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip> in it
        </p>
        <Tooltip
          content="This order has shipping."
        >
          <Link>Tooltip 2</Link>
        </Tooltip>
        <div>

          <ReactDataExample
            columns={this.state.columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={2}
          /> */}
          <Heading>Popover</Heading>
          <TextField
            id="TestName"
            label="Text Counter"
            placeholder="test-placeholder"
            value={this.state.appTextCounter}
            helpText="Helper Text"
            enableTextCounter
            maxLength={101}
            minLength={5}
            onChange={this.valueUpdater('appTextCounter')}
          />
          <TextField
            id="TestName1"
            label="Text Counter"
            placeholder="test-placeholder"
            value={this.state.appTextCounter}
            helpText="Helper Text"
            maxLength={101}
            minLength={5}
            multiline
            resizable
            onChange={this.valueUpdater('appTextCounter')}
          />
          <p> Some text with a
          <Tooltip content="This order has shipping labels.">
              <Link>Tooltip 1</Link>
            </Tooltip> in it
        </p>
          <Tooltip
            content="This order has shipping."
          >
            <Link>Tooltip 2</Link>
          </Tooltip>
          <p> Some text with a
          <Tooltip content="This order has shipping labels.">
              <Link>Tooltip 1</Link>
            </Tooltip> in it
        </p>
          <Tooltip
            content="This order has shipping."
          >
            <Link>Tooltip 2</Link>
          </Tooltip>
          <TextField id="TestName" label="Text Counter" placeholder="test-placeholder" value={this.state.appTextCounter} helpText="Helper Text" enableTextCounter={true} maxLength={100} onChange={this.valueUpdater('appTextCounter')} />
          <ClickableChip chip={<Chip>Batman</Chip>}>
            <Card title="More about Batman">
              <p>Batman is a fictional superhero who appears in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger, and first appeared in Detective Comics #27</p>
            </Card>
          </ClickableChip>
          <p> Some text with a
          <Tooltip content="This order has shipping labels.">
              <Link>Tooltip 1</Link>
            </Tooltip> in it
        </p>
          <Tooltip
            content="This order has shipping."
          >
            <Link>Tooltip 2</Link>
          </Tooltip>
          <p> Some text with a
          <Tooltip content="This order has shipping labels.">
              <Link>Tooltip 1</Link>
            </Tooltip> in it
        </p>
          <Tooltip
            content="This order has shipping."
          >
            <Link>Tooltip 2</Link>
          </Tooltip>
          <Heading>List</Heading>
          <List type="bullet">
            <Item>Yellow shirt</Item>
            <Item>Red shirt</Item>
            <List type="bullet">
              <Item>Yellow shirt</Item>
              <Item>Red shirt</Item>
              <Item>Green shirt</Item>
              <List type="bullet">
                <Item>Yellow shirt</Item>
                <Item>Red shirt</Item>
                <Item>Green shirt</Item>
              </List>
            </List>
            <Item>Yellow shirt</Item>
            <Item>Red shirt</Item>
            <Item>Green shirt</Item>
          </List>
          <List type="number">
            <Item>First item</Item>
            <Item>Second item</Item>
            <Item>Third Item</Item>
          </List>
          <ChoiceList
            title="Company name"
            choices={[
              {
                label: 'Hidden',
                value: 'hidden',
              },
              {
                label: 'Optional',
                value: 'optional',
              },
              {
                label: 'Required',
                value: 'required',
              },
            ]}
            selected={['hidden']}
          />
          <Loading />
          <Picker
            chipComponent={Chip}
            filterPlaceHolder="!People!!"
            searchResultComponent={Chip}
            source={pickerdata}
            maxSelectedItems={5}
            minSelectedItems={2}
            autoSuggest
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

          <Heading>Connected Text Field</Heading>
          <Loading />
          <TextField
            label="Connected Text Field"
            type="text"
            placeholder=""
            value={this.state.appTextCounter}
            helpText="Helper Text"
            maxLength={100}
            onChange={this.valueUpdater('appTextCounter')}
            connectedRight={<Select label="Weight unit" labelHidden options={[
              'kg',
              'lb',
            ]} />}
          />
          <Heading>Flexbox</Heading>
          <FlexBox>
            <div style={{ backgroundColor: 'aqua' }}>Demo 1</div>
            <div style={{ backgroundColor: 'pink' }}>Demo 2</div>
            <div style={{ backgroundColor: 'lime' }}>Demo 3</div>
          </FlexBox>

          <FlexBox direction="Column" align="Stretch" justify="Center">
            <div style={{ backgroundColor: 'aqua' }}>Demo 1</div>
            <div style={{ backgroundColor: 'pink' }}>Demo 2</div>
            <div style={{ backgroundColor: 'lime' }}>Demo 3</div>
          </FlexBox>

          <p> Some text with a
          <Tooltip content="This order has shipping labels.">
              <Link>Tooltip 1</Link>
            </Tooltip> in it
        </p>
          <Tooltip
            content="This order has shipping."
          >
            <Link>Tooltip 2</Link>
          </Tooltip>

          <FlexBox direction="Row" align="Stretch" justify="SpaceAround">
            <div style={{ backgroundColor: 'aqua' }}>Demo 1</div>
            <div style={{ backgroundColor: 'pink' }}>Demo 2</div>
            <div style={{ backgroundColor: 'lime' }}>Demo 3</div>
          </FlexBox>

          <FlexBox inline={true} direction="Column" align="Stretch" justify="Center">
            <div style={{ backgroundColor: 'aqua' }}>Demo 1</div>
            <div style={{ backgroundColor: 'pink' }}>Demo 2</div>
            <div style={{ backgroundColor: 'lime' }}>Demo 3</div>
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
              onRemove={this.chipRemove}
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
          <p> Some text with a
          <Tooltip content="This order has shipping labels.">
              <Link>Tooltip 1</Link>
            </Tooltip> in it
        </p>
          <Tooltip
            preferredPosition="below"
            content="This order has shipping."
          >
            <Link>Tooltip 2</Link>
          </Tooltip>
          <p> Some text with a
          <Tooltip content="This order has shipping labels.">
              <Link>Tooltip 1</Link>
            </Tooltip> in it
        </p>
          <Tooltip
            preferredPosition="below"
            content="This order has shipping."
          >
            <Link>Tooltip 2</Link>
          </Tooltip>
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
        <p> Some text with a
        <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip> in it
      </p>
        <Tooltip
          content="This order has shipping."
        >
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p> Some text with a
        <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip> in it
      </p>
        <Tooltip
          content="This order has shipping."
        >
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p> Some text with a
        <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip> in it
      </p>
        <Tooltip
          content="This order has shipping."
        >
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p> Some text with a
        <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip> in it
      </p>
        <Tooltip
          content="This order has shipping."
        >
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p> Some text with a
        <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip> in it
      </p>
        <Tooltip
          content="This order has shipping."
        >
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p> Some text with a
        <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip> in it
      </p>
        <Tooltip
          content="This order has shipping."
        >
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p> Some text with a
        <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip> in it
      </p>
        <Tooltip
          content="This order has shipping."
        >
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p> Some text with a
        <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip> in it
      </p>
        <Tooltip
          content="This order has shipping."
        >
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p> Some text with a
        <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip> in it
      </p>
        <Tooltip
          content="This order has shipping."
        >
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p> Some text with a
        <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip> in it
      </p>
        <Tooltip
          content="This order has shipping."
        >
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <Button icon="add" primary>
          Create Role
      </Button>
        <br />
        <Spinner color="inkLightest" size="small" />
        <br />
        <Spinner style={{ height: '100px' }} />
        <br />
        <ButtonGroup segmented>
          <Button primary>Save Draft</Button>
          <Button primary>Publish</Button>
        </ButtonGroup>
      </div>
    );
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  handleChange(value: string) {
    return (value: any) => this.setState({ [value]: value });
  }

  popoverClose(field: any) {
    return;
  }
}

export default App;
