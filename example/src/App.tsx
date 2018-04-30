import * as React from 'react';
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
  DescriptionList,
  // ListItem,
  Loading,
  // OffCanvas,
  Panel,
  Picker,
  // Popover,
  Select,
  TextField,
  Tooltip,
  ValidatedTextField,
  ValidatedSelectField,
  ValidatedForm,
  Video,
  VideoType,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Caption,
  Spinner,
  Table,
  TableColumnConfig,
} from '../../src/components';

interface State {
  appName?: string;
  appDescription: string;
  appCity: string;
  appTextCounter: string;
  columns: object[];
  rows: object[];
  isMenuOpened: boolean;
  popoverActive: boolean;
  bulkAction: any;
  filterConfig: any;
  modalOpen: boolean;
  drawer: boolean;
  drawerContent: any;
  activeDrawerId: string;
}

class App extends React.Component<{}, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      modalOpen: false,
      appName: '',
      appDescription: '',
      appCity: '',
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
      popoverActive: false,
      bulkAction: {
        selectedRow: [],
      },
      filterConfig: {
        searchKey: '',
        search: false,
        field: 'name',
      },
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

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  onModalOpen = () => {
    console.log('Modal open');
  }

  onModalClose = () => {
    console.log('Modal close');
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

    const tableData = [
      {
        id: 1,
        name: 'Dheeraj',
        description: 'Test description',
        status: 'Published',
        type: 'admin',
      }, {
        id: 2,
        name: 'Dheeraj4',
        description: 'Test description2',
        status: 'Published',
        type: 'admin',
      }, {
        id: 3,
        name: 'Dheeraj3',
        description: 'Test description3',
        status: 'Deleted',
        type: 'admin',
      }, {
        id: 4,
        name: 'Dheeraj2',
        description: 'Test description2',
        status: 'Deleted',
        type: 'admin',
      },
    ];

    /*
      label: Table header lable which will be visible
      key: Match it with json data, this will help to get specific value from the data
      headerValue: In case of custom component, if any value is required, here it can be stored
      classname: any custom classname, this can be used to set width or any other style
      style: same like class but for inline styling
      noSort: if sorting="all" & we want to disable sorting of specifc column
      sort: Enable sorting for specific column
      injectBody: To inject custom component in td
      injectHeader: To inject custom component in th
    */
    const columnConfig: TableColumnConfig[] = [
      {
        label: 'Name',
        key: 'name',
        className: '',
        style: { width: '200px' },
        sort: true,
      }, {
        label: 'Description',
        key: 'description',
        style: { width: 'auto' },
      }, {
        label: 'Status',
        key: 'status',
        sort: true,
        style: { width: '150px' },
        injectBody: (value: any) => <Badge status={value.status === 'Published' ? 'success' : 'warning'}>{value.status}</Badge>,
      }, {
        label: 'Type',
        key: 'type',
        style: { width: '100px' },
      },
    ];

    /* 
      Filtering table data
      mode: Mode of filteration, right now we have only one which is search
      search: If mode is search then it holds search config
        event: When the search should fire, on click or on input
        field: Name of field by which search should happen
        placeholder: Filed placeholder
        title: Title of field
    */

    const rowActionConfig = [
      {
        label: 'View',
        action: (value: any) => { console.log('View:', value); },
      }, {
        label: 'Delete',
        action: (value: any) => { console.log('Delete:', value); },
      }, {
        label: 'Archive',
        action: (value: any) => { console.log('Archive:', value); },
      }, {
        label: 'Version History',
        action: (value: any) => { console.log('Version:', value); },
      },
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
          <Caption style={{ color: 'red' }}>This is modal</Caption>
          <Button onClick={this.toggleModal}>Medium button</Button>
          <Modal
            active={this.state.modalOpen}
            toggle={this.toggleModal}
            onOpen={this.onModalOpen}
            onClose={this.onModalClose}
            width="medium"
            closeOnBackgroud
            closeOnEsc
            closeButton>
            <ModalHeader>Modal title</ModalHeader>
            <ModalBody modalOverflow>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae ex pellentesque, pretium lorem vel, tempor ipsum. Phasellus suscipit lacus in velit malesuada, at bibendum mi gravida. Sed cursus nisi sem, non pellentesque ligula euismod eget. Sed quis fringilla nibh, at vestibulum turpis. Donec sed sagittis sapien. Nam quis ex quis nulla porta molestie. Vestibulum eu lorem porta, facilisis orci a, tempor quam. Suspendisse et sollicitudin nulla. Aenean consectetur imperdiet leo nec condimentum. Aliquam scelerisque magna ut tortor accumsan condimentum.

              Nulla quis ante sit amet leo lobortis rhoncus. Cras mollis quis leo nec tincidunt. Aliquam blandit est vitae leo ultrices, ut egestas sapien pharetra. Suspendisse nec aliquet orci. Suspendisse rutrum odio sed neque scelerisque, ut consectetur erat tincidunt. Duis ultrices metus eget ante posuere eleifend. Ut luctus felis neque, sit amet efficitur neque maximus id. Aliquam porta, tellus ut pellentesque facilisis, odio neque maximus erat, venenatis semper nisi metus id augue. Cras vel sem eu elit blandit laoreet id vitae tortor. Morbi sit amet mi rutrum, sagittis enim lacinia, dictum turpis.
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.toggleModal}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>

        {/* <div>
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
        </div> */}
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

        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Caption style={{ color: 'red' }}>This is Table field</Caption>
            <Button>
              { `Delete ${this.state.bulkAction.selectedRow.length ? `(${this.state.bulkAction.selectedRow.length})` : ''}` }
            </Button>

            <div className="fieldGroup">
              <input type="text" value={this.state.filterConfig.searchKey} onChange={(event: any) => this.setState({ filterConfig: { ...this.state.filterConfig, searchKey: event.target.value, search: false } })} />
              <div className="fieldGroupAddon">
                  <Button onClick={(val: any) => this.setState({ filterConfig: { ...this.state.filterConfig, search: true } })}>Search</Button>
              </div>
            </div>
          <Table
            data={tableData}
            column={columnConfig}
            hideRow={{ status: 'Deleted' }}
            filterData={this.state.filterConfig}
            defaultSortField="name"
            defaultSortOrder="asc"
            selectRow="checkbox"
            rowAction={rowActionConfig}
            selectCallbackValue="id"
            selectRowCallback={(val: any) => this.setState({ bulkAction: { selectedRow: val } })}
            bordered highlight sorting />
        </div>

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
*/}
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
          <Heading>Description List</Heading> 
          <DescriptionList type="default" style="Inline"           
            items={[
            {
              term: 'Logistics',
              description: 'The management of products or other resources as they travel between a point of origin and a destination.',
            },
            {
              term: 'Sole proprietorship',
              description: 'A business structure where a single individual both owns and runs the company.',
            },
            {
              term: 'Discount code',
              description: 'A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.',
            },
          ]}
          />
          <DescriptionList type="default" style="Stacked"           
            items={[
            {
              term: 'Logistics',
              description: 'The management of products or other resources as they travel between a point of origin and a destination.',
            },
            {
              term: 'Sole proprietorship',
              description: 'A business structure where a single individual both owns and runs the company.',
            },
            {
              term: 'Discount code',
              description: 'A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.',
            },
          ]}
          />
          <DescriptionList type="divider" style="Stacked"           
            items={[
            {
              term: 'Logistics',
              description: 'The management of products or other resources as they travel between a point of origin and a destination.',
            },
            {
              term: 'Sole proprietorship',
              description: 'A business structure where a single individual both owns and runs the company.',
            },
            {
              term: 'Discount code',
              description: 'A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.',
            },
          ]}
          />
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
          <ValidatedForm
            onSubmitError={(value: [any], error: Error) => console.log('value:', value, 'error:', error)}
            onSubmit={(value: [any]) => console.log('Submit Value:', value)}
          >

            <Heading>App Basics</Heading>

            <DisplayText size="large">This is Display Text, which is used to make a bold visual statement.</DisplayText>
            <p>This is just some fun regular text.</p>

            <FormLayout>
              <ValidatedTextField
                id="AppName"
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

              <ValidatedSelectField
                id="appCity"
                required={true}
                name="Select city"
                label="Select city"
                options={[{ value: 'xyz', label: 'xyz' }, { value: 'abc', label: 'abc' }]}
                value={this.state.appCity}
                onChange={this.valueUpdater('appCity')}
                validateTrigger={['onBlur']}
                validateRules={[
                  { required: true, message: 'City is required.' },
                ]}
              />
              <ButtonGroup>
                <Button>Cancel</Button>
                <Button primary submit>Next</Button>
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
