import * as React from 'react';
import PickerAutoSuggestExample from './PickerAutoSuggestExample';
import { ISourceData } from '../../src/components/BreadCrumb/BreadCrumb';
import { INavigationData } from '../../src/components/SideNavigation/SideNavigation';

import {
  Alert,
  AppBar,
  Banner,
  Badge,
  Button,
  BodyText,
  ButtonGroup,
  Calendar,
  Card,
  CardHeader,
  CardFooter,
  CardSection,
  CardBody,
  Checkbox,
  Chip,
  ChoiceList,
  ClickableChip,
  Column,
  DisplayText,
  Drawer,
  DrawerContent,
  SideNavigation,
  FlexBox,
  Icon,
  // FormLayout,
  Heading,
  Link,
  List,
  Item,
  MultipleCheckboxFacets,
  DescriptionList,
  Term,
  Description,
  // ListItem,
  Loading,
  Panel,
  Popover,
  Picker,
  PopoverPicker,
  Dropdown,
  DateTimePicker,
  Select,
  TextField,
  Tooltip,
  ValidatedCheckbox,
  ValidatedTextField,
  ValidatedSelectField,
  ValidatedForm,
  Video,
  VideoType,
  Modal,
  // ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Caption,
  Spinner,
  Table,
  TableColumnConfig,
  TableNestedData,
  AccordionItemProps,
  Accordion,
  DropdownItemProps,
  TabPanel,
  Tab,
  TreeView,
  TreeSource,
  BreadCrumb,
  ComboBox,
  // ComboBoxItemType,
  Grid,
  GridContent,
  GridDescription,
  GridFooter,
  GridHeader,
  GridImage,
  GridTitle,
  GridType,
  GridStyle,
  Sticky,
  Process,
  ToggleButtonGroup,
  Pagination,
  PaginationDefaultProps,
  PageSize,
  RangeSlider,
  SwitchCheckbox,
  LazyPicker,
} from '../../src/components';
import { IconList } from '../../src/components/Icon';

interface State {
  appName?: string;
  appUri?: string;
  appDescription: string;
  appCity: string;
  appRadio1: string;
  appRadio2: string;
  appRadioVal: string;
  appNumberCounter: string;
  appTextCounter: string;
  appTextCounter1: string;
  columns: object[];
  checkboxState: boolean;
  currentPageSize: number;
  rows: object[];
  isMenuOpened: boolean;
  popoverActive: boolean;
  popoverActive2: boolean;
  popoverActiveContainer: boolean;
  bulkAction: any;
  filterConfig: any;
  modalOpen: boolean;
  modalOpen2: boolean;
  modalOpen3: boolean;
  drawer: boolean;
  drawerContent: any;
  activeDrawerId: string;
  outterDrawer: boolean;
  innerDrawer: boolean;
  outterDrawerId: string;
  outterDrawerLabel: string;
  innerDrawerId: string;
  activeModalId: string;
  AccordionItemOpen?: number;
  AccordionItemClose?: number;
  anchorEl?: HTMLElement;
  anchorEl2?: HTMLElement;
  popoverAnchorEl?: HTMLElement;
  activeTabId: string;
  nestedChildData: TableNestedData[];
  gridView: GridType;
  gridStyle: GridStyle;
  [key: string]: any;
  processComponentState: number;
  processLength: number;
  callChildCallback: boolean;
  popoverActiveState: boolean;
  dPopoverActive: boolean;
  dAnchorEle?: HTMLElement;
  error: any;
  showError: boolean;
  treeAnchor?: any;
  ChoiceListSelected: any[];
  paginationCurrent: number;
  multipleCheckboxFacetsOptions: any[];
  rangeSliderValue?: any;
  isOpen: boolean; // for SwitchCheckbox
}

class App extends React.Component<{}, State> {
  private baseUrl = `/`;

  constructor(props: any) {
    super(props);
    this.state = {
      comboBoxItems: [
        {
          description:
            'This field stores simple text. It cannot be rich text or HTML. Limited to 50 characters',
          name: 'Short Text',
          id: 1048586,
          uri: 'ShortText',
        },
        {
          description:
            'This field stores simple text. It cannot be rich text or HTML. Limited to 512 characters',
          name: 'Simple Text',
          id: 2097162,
          uri: 'SimpleText',
        },
        {
          description:
            'This field stores rich text. It may contain simple… contents. Limited to 1,024 characters in length.',
          name: 'Rich Text',
          id: 3145738,
          uri: 'RichText',
        },
        {
          description:
            'This field stores rich text. It may contain simple…ng this field could adversely impact performance!',
          name: 'Rich Text (Long)',
          id: 4194314,
          uri: 'RichTextLong',
        },
        {
          description: 'This is "True" or "False".',
          name: 'True or False',
          id: 5242890,
          uri: 'TrueFalse',
        },
        {
          description:
            'This field stores a URL or URI. It is either pure …ontain URL label. It contains a Label and URL/URI',
          name: 'Link or URI',
          id: 6291466,
          uri: 'Link',
        },
        {
          description: 'This field stores a valid email address.',
          name: 'Email Address',
          id: 7340042,
          uri: 'Email',
        },
        {
          description: 'This field stores a valid phone number.',
          name: 'Phone Number',
          id: 8388618,
          uri: 'Phone',
        },
        {
          description:
            'This field stores whole numbers. lower limit -9,22…854,775,808 upper limit 9,223,372,036,854,775,807',
          name: 'Whole Number',
          id: 9437194,
          uri: 'Number',
        },
        {
          description:
            'This field represents a decimal value that can acc…te 19.5 places, such as nnnnnnnnnnnnnnnnnnn.ddddd',
          name: 'Number with decimal',
          id: 10485770,
          uri: 'Decimal',
        },
        {
          description:
            'This field represents currency. Both value and Cur…,477.5808 upper limit is 922,337,203,685,477.5807',
          name: 'Money',
          id: 11534346,
          uri: 'Money',
        },
        {
          description:
            'This is a date and time field. Value is stored a U…:00:00.000 upper limit is 9999-12-31,23:59:59:999',
          name: 'Date and Time',
          id: 12582922,
          uri: 'DateTime',
        },
        {
          description:
            'This is a date field. Value is stored a Universal …mit is 0001-01-01 upper limit is 9999-12-31,23:59',
          name: 'Date',
          id: 13631498,
          uri: 'Date',
        },
        {
          description:
            'This is a time field. Value is stored a Universal …limit is 00:00:00.001 upper limit is 23:59:59.999',
          name: 'Time',
          id: 14680074,
          uri: 'Time',
        },
        {
          description:
            'This field represents duration. The smallest incri…ticks upper limit 9,223,372,036,854,775,807 ticks',
          name: 'Duration',
          id: 15728650,
          uri: 'Duration',
        },
        {
          description:
            'Represents a duration of time between two date/tim…Date and Time End Date and Time',
          name: 'Date Time Span',
          id: 16777226,
          uri: 'DateTimeSpan',
        },
        {
          description:
            'Gemotry and Geography data representing a single 0…may contain Z (elevation) and M (measure) values.',
          name: 'Geo Point',
          id: 17825802,
          uri: 'GeoPoint',
        },
        {
          description:
            'Gemotry and Geography data representing a zero or …may contain Z (elevation) and M (measure) values.',
          name: 'Geo Points',
          id: 18874378,
          uri: 'GeoPoints',
        },
        {
          description:
            'Geomtry and Geography data representing a single o… of points and the line segments connecting them.',
          name: 'Geo Line',
          id: 19922954,
          uri: 'GeoLineString',
        },
        {
          description:
            'Geomtry and Geography data representing a zero or … of points and the line segments connecting them.',
          name: 'Geo Lines',
          id: 20971530,
          uri: 'GeoLineStrings',
        },
        {
          description:
            'Geomtry and Geography data representing a single t…or bounding ring and zero or more interior rings.',
          name: 'Geo Polygon',
          id: 22020106,
          uri: 'GeoPolygon',
        },
        {
          description:
            'Geomtry and Geography data representing a zero or …or bounding ring and zero or more interior rings.',
          name: 'Geo Polygons',
          id: 23068682,
          uri: 'GeoPolygons',
        },
        {
          description:
            'Represents a country or entity as specified by ISO 3166 standards.',
          name: 'Country',
          id: 24117258,
          uri: 'Country',
        },
        {
          description:
            'Represents states, provinces, territories, emirate…r countries as specified by ISO 3166-2 standards.',
          name: 'Country Subdivision',
          id: 25165834,
          uri: 'CountrySub',
        },
        {
          description:
            'Name for a person. Contains First Name, Middle Name and Last Name.',
          name: 'Person Name',
          id: 26214410,
          uri: 'PersonName',
        },
        {
          description: 'Physical address, such as mailing or postal address.',
          name: 'Physical Address',
          id: 27262986,
          uri: 'PhysicalAddress',
        },
      ],
      modalOpen: false,
      modalOpen2: false,
      modalOpen3: false,
      appName: '',
      appUri: '',
      appDescription: '',
      appRadio1: 'active1',
      appRadio2: 'active2',
      appRadioVal: '',
      appCity: '',
      appCity1: '',
      appNumberCounter: '',
      appTextCounter: '',
      appTextCounter1: '',
      checkboxState: true,
      columns: [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' },
        { key: 'count', name: 'Count' },
      ],
      currentPageSize: 10,
      rows: [
        { id: 1, title: 'Title 1', count: 1 },
        { id: 2, title: 'Title 2', count: 2 },
        { id: 3, title: 'Title 3', count: 3 },
      ],
      isMenuOpened: false,
      dPopoverActive: false,
      popoverActive: false,
      popoverActive2: false,
      popoverActiveContainer: false,
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
      outterDrawer: false,
      innerDrawer: false,
      outterDrawerId: 'dcontent1',
      innerDrawerId: 'innerDrContent',
      activeDrawerId: 'content1',
      activeModalId: 'modalcontent1',
      outterDrawerLabel: '',
      AccordionItemOpen: undefined,
      AccordionItemClose: undefined,
      activeTabId: 'tab3',
      nestedChildData: [],
      gridView: 'block',
      gridStyle: 'basic',
      processComponentState: 0,
      processLength: 2,
      callChildCallback: false,
      popoverActiveState: false,
      error: {},
      showError: false,
      treeAnchor: {},
      ChoiceListSelected: [1],
      paginationCurrent: 3,
      multipleCheckboxFacetsOptions: [
        {
          name: 'New',
          value: '1',
          count: 10,
          selected: false,
        },
        {
          name: 'Published',
          value: '2',
          count: 10,
          selected: false,
        },
      ],
      rangeSliderValue:[5, 10],
      isOpen: false,
    };

    this.popovertoggle = this.popovertoggle.bind(this);
    this.popoverToggleContainer = this.popoverToggleContainer.bind(this);
    this.toggleAccordionOpen = this.toggleAccordionOpen.bind(this);
    this.toggleAccordionClose = this.toggleAccordionClose.bind(this);
    this.popoverUpdate = this.popoverUpdate.bind(this);
    this.popoverUpdateContainer = this.popoverUpdateContainer.bind(this);
    this.closed1 = this.closed1.bind(this);
  }

  handleSwitchCheckboxToggle = (isOpen: boolean) => {
    this.setState({ isOpen });
    console.log('SwitchCheckbox toggle...');
  }

  rowGetter = (index: number) => this.state.rows[index];

  chipClick = () => {
    console.log('chip clicked...');
  }

  chipRemove = () => {
    console.log('chip removed...');
  }

  processNext = () => {
    if (this.state.processComponentState < this.state.processLength - 1) {
      this.setState({
        processComponentState: this.state.processComponentState + 1,
      });
    }
  }

  processPrevious = () => {
    if (
      this.state.processComponentState > 0 &&
      this.state.processComponentState < this.state.processLength + 1
    ) {
      this.setState({
        processComponentState: this.state.processComponentState - 1,
      });
    }
  }

  updateProcessState(processLength: number, processComponentState: number) {
    this.setState({ processLength, processComponentState });
  }

  updateProcessStateonClick(processComponentState: number) {
    this.setState({ processComponentState });
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  toggleModal2 = () => {
    this.setState({ modalOpen2: !this.state.modalOpen2 });
  }

  toggleModal3 = () => {
    this.setState({ modalOpen3: !this.state.modalOpen3 });
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

  onInnerDrawerOpen = () => {
    this.setState({ outterDrawerLabel: 'Contact' });
  }

  onInnerDrawerClose = () => {
    this.setState({ outterDrawerLabel: '' });
  }

  onDrawerClose = () => {
    console.log('drawer close');
  }

  toggleDrawer = (drawerKey: string) => {
    this.setState({ [drawerKey]: !this.state.drawer });
  }

  toggleDrawerOuter = (drawerKey: string) => {
    this.setState({ [drawerKey]: !this.state.outterDrawer });
  }

  toggleDrawerInner = (drawerKey: string) => {
    this.setState({ [drawerKey]: !this.state.innerDrawer });
  }

  BreadcrumbClick = () => {
    console.log('Breadcrumb clicked...');
  }

  // toggleStatus if true that means row is open else its not
  nestedChildCallback = (rowId: number, toggleStatus: boolean) => {
    const max = 90;
    const min = 1;
    const randomNumber = Math.floor(Math.random() * (+max - +min)) + +min;
    const { nestedChildData } = this.state;
    const childtableData = [
      {
        id: 11 + rowId,
        name: `Dheir${rowId}`,
        description: 'Test description',
        status: { itemID: 1, itemName: 'New' },
        type: 'admin',
      },
      {
        id: 13 + rowId,
        name: `DheePat${rowId}`,
        description: 'Test description3',
        status: { itemID: 3, itemName: 'Draft' },
        type: 'admin',
      },
    ];

    childtableData.push({
      id: randomNumber + rowId,
      name: `Dheir${randomNumber}`,
      description: 'Test description',
      status: { itemID: 1, itemName: 'New' },
      type: 'admin',
    });
    const childrowActionConfig = [
      {
        content: 'View',
        onClick: (value: any) => {
          console.log('View:', value);
        },
      },
      {
        content: 'Delete',
        onClick: (value: any) => {
          console.log('Delete:', value);
        },
      },
      {
        content: 'Archive',
        onClick: (value: any) => {
          console.log('Archive:', value);
        },
      },
      {
        content: 'Version History',
        onClick: (value: any) => {
          console.log('Version:', value);
        },
      },
    ];

    const childcolumnConfig: TableColumnConfig[] = [
      {
        label: 'Name',
        key: 'name',
        className: '',
        sort: true,
      },
      {
        label: 'Description',
        key: 'description',
        sort: true,
      },
      {
        label: 'Status',
        key: 'status',
        sort: true,
        sortBy: 'itemName',
        injectBody: (value: any) => (
          <Badge status={value.status.itemID === 1 ? 'success' : 'warning'}>
            {value.status.itemName}
          </Badge>
        ),
      },
      {
        label: 'Type',
        key: 'type',
      },
    ];
    const newData: TableNestedData = {
      rowId,
      component: (
        <Table
          highlight={true}
          sorting="all"
          data={childtableData}
          column={childcolumnConfig}
          selectRow="checkbox"
          selectRowCallback={(val: any) =>
            console.log('nested table callback:', val)
          }
          rowAction={childrowActionConfig}
          bordered
          renderHeaderCheckbox={false}
        />
      ),
    };

    nestedChildData.some((item: TableNestedData, index: number): boolean => {
      if (item.rowId === rowId) {
        nestedChildData.splice(index, 1);
        return true;
      }

      return false;
    });

    nestedChildData.push(newData);

    this.setState({ nestedChildData, callChildCallback: false });
  }

  getErrors = (error: any, name: string) => {
    this.setState({ error: { ...this.state.error, [name]: error || [] } });
  }

  isValidate = (): boolean => {
    let allErrors: any[] = [];
    Object.values(this.state.error).forEach(
      (value) => (allErrors = allErrors.concat(value))
    );
    return !!allErrors.length;
  }

  onPublish = () => {
    this.setState({ showError: true });
  }

  rowDisbled = (item: any) => {
    return item.id === 2;
  }

  getDropdown = (thisId: number) => {
    const dropdownItems = [];

    for (let i = 0; i <= 4; i++) {
      dropdownItems.push({ content: `Test${i} - ${thisId}` });
    }

    return (
      <span>
        <Button
          plain
          icon="horizontalDots"
          onClick={(event: React.FormEvent<HTMLElement>) =>
            this.setState({
              treeAnchor: { [thisId]: event.currentTarget as HTMLElement },
            })
          }
        />
        <Dropdown
          dropdownItems={dropdownItems}
          anchorEl={this.state.treeAnchor[thisId]}
          preferredAlignment="left"
        />
      </span>
    );
  }

  lazyGetAll = (_config: any, _method: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ currentPage: 1, pageCount: 2 });
      }, 2000);
    })
  }

  render() {
    const Accordionitems: AccordionItemProps[] = [
      {
        children: <Banner componentTitle={'banner'} status={'success'} />,
        header: <Button>sk</Button>,
      },
      {
        children: <Banner componentTitle={'banner11'} status={'warning'} />,
        header: <Button>sk1</Button>,
      },
      {
        children: <Banner componentTitle={'banner13'} status={'warning'} />,
        header: <Button>sk3</Button>,
      },
    ];

    const items: DropdownItemProps[] = [
      {
        content: 'Item 1',
        onClick: this.closed1,
      },
      {
        content: 'Item 2',
        divider: true,
      },
      {
        content: 'Itemasdadmmm 3',
        disabled: true,
      },
      {
        content: 'Item 4',
        header: true,
      },
    ];

    const posterUrl = new URL(
      'http://4.bp.blogspot.com/_JSR8IC77Ub4/TKB-XAWXmhI/AAAAAAAABJA/MqOpdFTOaHo/w1200-' +
        'h630-p-k-no-nu/C:%5Cfakepath%5Cbird1.jpg'
    );
    const singleVideoSource = [
      {
        src:
          'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
        type: VideoType.MP4,
      },
    ];
    const multiVideoSource = [
      {
        src:
          'http://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_30mb.mp4',
        type: VideoType.MP4,
      },
      {
        src:
          'http://www.sample-videos.com/video/mp4/240/big_buck_bunny_240p_30mb.mp4',
        type: VideoType.MP4,
      },
    ];

    const sampleVideoCmp = (
      <Video
        poster={posterUrl}
        src={singleVideoSource}
        autoplay={false}
        controls={false}
        componentStyle={{
          height: 100,
          width: 100,
        }}
      />
    );

    const steps = [
      { name: 'Completed', status: 'completed' },
      { name: 'Active', status: 'active' },
      { name: 'Upcoming' },
    ];

    // const pickerdata = [
    //   {
    //     key: 1,
    //     image:
    //       'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg',
    //     name: 'John Doe',
    //     description: 'John Doe',
    //     email: 'test@gmail.com',
    //     icon: 'filter',
    //   },
    //   {
    //     key: 2,
    //     image:
    //       'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg',
    //     name: 'Pedro Sanchez',
    //     description: 'Pedro Sanchez',
    //     email: 'pedrosanchez@gmail.com',
    //   },
    //   {
    //     key: 3,
    //     image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg',
    //     name: 'Jane Doe',
    //     description: 'Jane Doe',
    //     email: 'jane@gmail.com',
    //   },
    //   {
    //     key: 4,
    //     image:
    //       'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png',
    //     name: 'Person McPerson',
    //     description: 'Person McPerson',
    //     email: 'yahoogmail@gmail.com',
    //   },
    //   {
    //     key: 5,
    //     image:
    //       'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg',
    //     name: 'Laura Person',
    //     description: 'Laura Person',
    //     email: 'yahooldjadslkjgmail@gmail.com',
    //   },
    //   {
    //     key: 6,
    //     image:
    //       'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg',
    //     name: 'LauraPerson',
    //     description: 'Laura Person',
    //     email: 'slkjgmail@gmail.com',
    //   },
    //   {
    //     key: 7,
    //     image: '',
    //     name:
    //       'HirenHirenHirenHirenHirenHirenHirenHirenHirenHirenHirenHirenHirenHirenHirenHirenHirenHirenHirenHiren ',
    //     description: 'Hiren descHiren descHiren descHiren desc',
    //     email: 'hiren@test.com',
    //   },
    // ];

    const pickerdata = [
      { "id": -1, "name": "All Subscribers", "icon": 'filter', "key": -1, onIconClick: () => { }, "image": IconList.users },
      { "id": 1532945, "name": "Bright", "text": "Bright", "key": 1532945, "description": "" },
      { "id": 1532948, "name": "Blue", "text": "Blue", "key": 1532948, "description": "" },
      { "id": 1531924, "name": "Green", "text": "Green", "key": 1531924, "description": "" },
      { "id": 1528852, "name": "Red", "text": "Red", "key": 1528852, "description": "" },
      { "id": 1529876, "name": "White", "text": "White", "key": 1529876, "description": "" },
      { "id": 1527828, "name": "Yellow", "text": "Yellow", "key": 1527828, "description": "" }
    ];
    const selectedPickerdata = [{ "id": 1534996, "name": "Black", "text": "Black", "key": 1534996, "description": "" }];

    const columnConfigPicker: TableColumnConfig[] = [
      {
        label: 'Name',
        key: 'name',
        sort: true,
        sortBy: 'name'
      },
      {
        label: 'Description',
        key: 'description',
        sort: true,
        sortBy: 'description',
      },
    ];

    const renderPickerHeader = (column: any) => {
      return (<div style={{marginBottom: '.5rem', minWidth: '12rem', maxWidth: '100rem', position: 'relative', zIndex: 22, padding: '1rem', backgroundColor: '#f5f5f5', boxSizing: 'border-box'}}>
                  <FlexBox align="Center">
                    {
                      column.map((c: any) => <div style={{flex: '1'}}>
                        <b>{c.label}</b>
                        <span style={{verticalAlign: 'middle', display: 'inline-block', marginLeft: '.3rem'}}>
                        <Icon source="caretUp" componentStyle={{fill: '#212121',width: '1.3rem', height: '1.3rem'}}/>
                        <Icon source="caretDown"  componentStyle={{fill: '#212121',width: '1.3rem', height: '1.3rem', marginTop: '-7px'}}/>
                        </span>
                      </div>
                      )}
                  </FlexBox>
                </div>
                );
    }

    const renderPickerItem = (suggestion: any, isHighlighted?: string, query?: string) => {
      let name = suggestion.name;
      // let highlightedStyle = {backgroundColor: '#ebebeb'};
      return (<div style={{minWidth: '100rem', maxWidth: '100rem'}} >
            <FlexBox align="Center">
              <div style={{flex: '1', width: '50%', padding: '1rem', boxSizing: 'border-box'}}>{name}</div>
              <div style={{flex: '1', width: '50%', padding: '1rem', boxSizing: 'border-box', marginLeft: '-2rem'}}>{name}</div>
            </FlexBox>
          </div>
        )
    }
    // const columnConfigPicker: TableColumnConfig[] = [
    //   {
    //     label: 'Name',
    //     key: 'name',
    //     sort: true,
    //     sortBy: 'name'
    //   },
    //   {
    //     label: 'Description',
    //     key: 'description',
    //     sort: true,
    //     sortBy: 'description',
    //   },
    // ];

    const tableData = [
      {
        id: 1,
        name: 'Hiren',
        description:
          'Test description Test description Test description Test description',
        status: { itemID: 1, itemName: 'New' },
        type: 'admin',
        isRowClickDisable: true,
      },
      {
        id: 2,
        name: 'Dheeraj',
        renderBanner: {
          bannerTitle: 'Hello Please Check All Data',
          bannerType: 'critical',
          placeholder: 'Related Content',
          items: [
            {
              content: 'Item 1',
              contentId: 1,
              onClick: (value: any) => {
                console.log(value);
              },
            },
            {
              content: 'Item 2',
              contentId: 2,
              onClick: (value: any) => {
                console.log(value);
              },
            },
            {
              content: 'Item 3',
              contentId: 3,
              onClick: (value: any) => {
                console.log(value);
              },
            },
          ],
        },
        description: 'Test description2',
        status: { itemID: 2, itemName: 'Deleted' },
        type: 'admin',
      },
      {
        id: 3,
        name: 'Patel',
        description: 'Test description3',
        status: { itemID: 3, itemName: 'Draft' },
        type: 'admin',
      },
      {
        id: 4,
        name: 'Raj',
        description: 'Test description2',
        status: { itemID: 1, itemName: 'New' },
        type: 'admin',
      },
    ];

    const breadcrumbData: ISourceData[] = [
      {
        name: 'Home',
        type: 'default',
        onBreadcrumbClick: () => console.log('Home is clicked'),
      },
      {
        name: <Badge children={'Home1'} status={'success'} />,
        type: 'active',
        onBreadcrumbClick: () => console.log('Badge is clicked'),
      },
      {
        name: 'Home2',
        type: 'disabled',
      },
      {
        name: 'Home3',
        type: 'active',
        onBreadcrumbClick: () => console.log('Home3 is clicked'),
      },
    ];

    const handleHeadingClick = (index: number) => {
      const activeMenus: any = localStorage.getItem('active_navbar_menus');
      if(activeMenus) {
        let activeMenusObj: any = JSON.parse(activeMenus);
        
        if(activeMenusObj[index]) {
          activeMenusObj = { ...activeMenusObj, [index]: !activeMenusObj[index] };
        } else {
          activeMenusObj = { ...activeMenusObj, [index]: true };
        }

        localStorage.setItem('active_navbar_menus', JSON.stringify(activeMenusObj));
      } else {
        const newObject: any = { [index]: true };
        localStorage.setItem('active_navbar_menus', JSON.stringify(newObject));
      }
    }
    
    const sideNavigationData: INavigationData[] = [
      {
        id: 0.1,
        label: 'Select App',
        icon: 'chevronLeft',
        parentDivider: true,
        action: () => null,
      }, {
        id: 0.2,
        label: 'Global',
        parentDivider: true,
        currentApp: true,
        icon: 'external'
      }, {
        id: 1,
        label: 'Application',
        header: <Button componentSize="slim" plain fullWidth >Application</Button>,
        action: () => handleHeadingClick(1),
        children: [
          {
            id: 1.1,
            label: 'Basics',
            icon: 'infoCircle',
            action: () => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}` : null },
          }, {
            id: 1.2,
            label: 'Packaging',
            icon: 'notes',
            action: () => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}/feature` : null },
          }
        ]
      } , {
        id: 2,
        label: 'Content',
        header: <Button componentSize="slim" plain fullWidth >Content</Button>,
        action: () => handleHeadingClick(2),
        children: [
          {
            id: 2.1,
            label: 'Content Stores',
            icon: 'database',
            action: () => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}/contentStores` : null },
          },{
            id: 2.2,
            label: 'Data Importer',
            icon: 'database',
            action: () => null,
          }, {
            id: 2.3,
            label: 'Content Definitions',
            icon: 'database',
            action: () => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}/contentTemplates` : null},
          },{
            id: 2.4,
            label: 'Field Definitions',
            icon: 'database',
            action: () => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}/fieldTemplates` : null},
          }
        ]
      } , {
        id: 3,
        label: 'App Interfaces',
        header: <Button componentSize="slim" plain fullWidth >App Interfaces</Button>,
        action: () => handleHeadingClick(3),
        children: [
          {
            id: 3.1,
            label: 'Pages & Forms',
            icon: 'file',
            action:() => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}/pages` : null }
          }, {
            id: 3.2,
            label: 'Page Templates',
            icon: 'checkSquare',
            notActionable: true,
            action: () => console.log('Page Templates Item is clicked!'),
          }, {
            id: 3.3,
            label: 'Themes',
            icon: 'paintBrush',
            notActionable: true,
            action: () => console.log('Themes Item is clicked!'),
          }
        ]
      } , {
        id: 4,
        label: 'User Management',
        header: <Button componentSize="slim" plain fullWidth >User Management</Button>,
        action: () => handleHeadingClick(4),
        children: [
          {
            id: 4.1,
            label: 'Users',
            icon: 'user',
            action: () => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}/users` : null },
          }, {
            id: 4.2,
            label: 'Groups',
            icon: 'users',
            action: () => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}/groups` : null },
          }, {
            id: 4.3,
            label: 'Roles',
            icon: 'userMd',
            action: () => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}/roleDefs` : null },
          }, {
            id: 4.4,
            label: 'Access Policies',
            icon: 'lock',
            action: () => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}/accessPolicies` : null },
          }, {
            id: 4.5,
            label: 'Identity Management',
            icon: 'lock',
            notActionable: true,
            action: () => console.log('Identity Management Item is clicked!'),
          }
        ]
      } , {
        id: 5,
        label: 'Messaging',
        header: <Button componentSize="slim" plain fullWidth >Messaging</Button>,
        action: () => handleHeadingClick(5),
        children: [
          {
            id: 5.1,
            label: 'Sources',
            icon: 'inbox',
            action: () => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}/contentStores` : null},
          }, {
            id: 5.2,
            label: 'Channels',
            icon: 'comments',
            action: () => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}/messageChannelDefs` : null},
          }, {
            id: 5.3,
            label: 'Messages',
            icon: 'envelope',
            action: () => {(this.props as any).fromPageB ? window.location.href = `${this.baseUrl}/messageDefs` : null},
          }
        ]
      } , {
        id: 6,
        label: 'Workflow & Automation',
        header: <Button componentSize="slim" plain fullWidth >Workflow & Automation</Button>,
        action: () => handleHeadingClick(6),
        children: [
          {
            id: 6.1,
            label: 'Workflows',
            icon: 'puzzlePiece',
            action: () => null,
          }, {
            id: 6.2,
            label: 'Functions',
            icon: 'puzzlePiece',
            notActionable: true,
            action: () => console.log('Functions Item is clicked!'),
          }, {
            id: 6.3,
            label: 'Robots',
            icon: 'puzzlePiece',
            notActionable: true,
            action: () => console.log('Robots Item is clicked!'),
          }
        ]
      } , {
        id: 7,
        label: 'Data Sync',
        header: <Button componentSize="slim" plain fullWidth >Data Sync</Button>,
        action: () => handleHeadingClick(7),
        children: [
          {
            id: 7.1,
            label: 'SQL Mapping',
            icon: 'database',
            notActionable: true,
            action: () => console.log('SQL Mapping Item is clicked!'),
          }
        ]
      } , {
        id: 8,
        label: 'Media Management',
        header: <Button componentSize="slim" plain fullWidth >Media Management</Button>,
        action: () => handleHeadingClick(8),
        children: [
          {
            id: 8.1,
            label: 'File Policies',
            icon: 'lock',
            notActionable: true,
            action: () => console.log('File Policies Item is clicked!'),
          }, {
            id: 8.2,
            label: 'File Definitions',
            icon: 'file',
            notActionable: true,
            action: () => console.log('File Definitions Item is clicked!'),
          }
        ]
      } , {
        id: 9,
        label: 'Analytics',
        header: <Button componentSize="slim" plain fullWidth >Analytics</Button>,
        action: () => handleHeadingClick(9),
        children: [
          {
            id: 9.1,
            label: "Dashboards",
            icon: "tachometer",
            notActionable: true,
            action: () => console.log("Dashboards is clicked!")
          }, {
            id: 9.2,
            label: "Reports",
            icon: "chartBar",
            notActionable: true,
            action: () => console.log("Reports is clicked!")
          }
        ]
      } , {
        id: 10,
        label: 'Usage Analytics',
        header: <Button componentSize="slim" plain fullWidth >Usage Analytics</Button>,
        action: () => handleHeadingClick(10), // Has no effect right now as no child elements
        children: []
      } , {
        id: 11,
        label: 'Projects & Tasks',
        header: <Button componentSize="slim" plain fullWidth >Projects & Tasks</Button>,
        action: () => handleHeadingClick(11), // Has no effect right now as no child elements
        children: []
      } , {
        id: 12,
        label: 'Support Sherpa',
        header: <Button componentSize="slim" plain fullWidth >Support Sherpa</Button>,
        action: () => handleHeadingClick(12), // Has no effect right now as no child elements
        children: []
      }
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
        sort: true,
        sortBy: 'keyword',
        style: { width: '100px' },
      },
      {
        label: 'Description',
        key: 'description',
        noSort: true,
        style: { width: '250px' },
      },
      {
        label: 'Status',
        key: 'status',
        sort: true,
        sortBy: 'itemName',
        injectBody: (value: any) => (
          <Badge status={value.status.itemID === 1 ? 'success' : 'warning'}>
            {value.status.itemName}
          </Badge>
        ),
        style: { width: '100px' },
      },
      {
        label: 'Type',
        key: 'type',
        style: { width: '100px' },
      },
    ];

    const columnConfig1: TableColumnConfig[] = [
      {
        label: '',
        key: 'rowAction',
        className: '',
        sort: false,
        style: { width: '50px' },
      },
      {
        label: 'Name',
        key: 'name',
        className: '',
        sort: true,
        style: { width: '80px' },
      },
      {
        label: 'Description',
        key: 'description',
        style: { width: '250px' },
      },
      {
        label: 'Status',
        key: 'status',
        sort: true,
        sortBy: 'itemName',
        style: { width: '100px' },
        injectBody: (value: any) => (
          <Badge status={value.status.itemID === 1 ? 'success' : 'warning'}>
            {value.status.itemName}
          </Badge>
        ),
      },
      {
        label: 'Type',
        key: 'type',
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
        content: 'View',
        onClick: (value: any) => {
          console.log('View:', value);
        },
      },
      {
        content: 'Delete',
        onClick: (value: any) => {
          console.log('Delete:', value);
        },
      },
      {
        content: 'Archive',
        onClick: (value: any) => {
          console.log('Archive:', value);
        },
      },
      {
        content: 'Version History',
        onClick: (value: any) => {
          console.log('Version:', value);
        },
      }
    ];

    const treeSource: TreeSource[] = [
      {
        id: 1,
        component: () => (
          <span>
            I am component1
            <br />I am component1
            <br />I am component1
          </span>
        ),
        active: true,
        disable: true,
        onToggle: (status) => console.log('Tree node open:', status),
        children: [
          {
            id: 11,
            component: () => (
              <span>
                I am child component1
                <br />I am child component1
                <br />I am child component1
                <br />
                I am child component1
                <br />I am child component1
                <br />I am child component1
                <br />I am child component1 - {this.getDropdown(11)}
              </span>
            ),
            active: false,
          },
          {
            id: 12,
            component: () => (
              <span>
                I am child component2
                <br />I am child component2
                <br />I am child component2 {this.getDropdown(12)}
              </span>
            ),
            active: false,
            children: [
              {
                id: 121,
                component: () => (
                  <Card>
                    <p>
                      Batman is a fictional superhero who appears in American
                      comic books published by DC Comics. The character was
                      created by artist Bob Kane and writer Bill Finger, and
                      first appeared in Detective Comics #27
                    </p>
                  </Card>
                ),
                // component: () => <span>I am child child component1</span>,
                active: false,
                children: [
                  {
                    id: 1211,
                    component: () => (
                      <Card>
                        <p>
                          The American robin (Turdus migratorius) is a migratory
                          songbird of the true thrush genus and Turdidae, the
                          wider thrush family.
                        </p>
                      </Card>
                    ),
                    // component: () => <span>child component1</span>,
                    active: false,
                  },
                  {
                    id: 1212,
                    component: () => <span>child component2</span>,
                    active: false,
                    children: [
                      {
                        id: 12121,
                        component: () => <span>child component1</span>,
                        active: false,
                      },
                      {
                        id: 12122,
                        component: () => <span>child component2</span>,
                        active: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 122,
                component: () => <span>I am child component2</span>,
                active: false,
              },
            ],
          },
          {
            id: 13,
            label: 'This is normal component',
            active: false,
          },
          {
            id: 14,
            component: () => (
              <span>
                I am child component1
                <br />I am child component1
                <br />I am child component1
                <br />
                I am child component1
                <br />I am child component1
                <br />I am child component1
                <br />I am child component1
              </span>
            ),
            active: false,
          },
        ],
      },
      // , {
      //   id: 2,
      //   component: () => <span>I am component2</span>,
      //   active: false,
      //   onToggle: status => console.log('Tree node open:', status),
      // }
    ];

    const dummyArray = [
      { text: 'hello', icon: 'alert' },
      { text: 'How are you?', icon: 'alert' },
    ];

    return (
      <div style={{ width: 'calc(100% - 270px)', float: 'right', padding: '90px 0px 0px' }}>
        <AppBar
          enableGlobalGo
          enableGlobalElement={<Button icon="list" componentSize="slim"/>}
          isLoggedIn
          logo={'https://emgage.com/SiteAssets/Emgage-logo.png'}
          loginUrl={'loginUrl'}
          logoutUrl={'logoutUrl'}
          profilePic={
            'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg'
          }
          userName={'test@emgage.com'}
          additionalLIst={[{ content: 'extra Item', divider: true }]}
          enableSearch
          rightChildren={[
            <Button icon="notes" componentSize="slim"/>,
            <Button icon="userCog" componentSize="slim"/>,
            <Button icon="infoCircle" componentSize="slim"/>,
          ]}
        />
        <BodyText componentSize="small">This is Small Body Text</BodyText>
        <BodyText>This is Default Body Text</BodyText>
        <BodyText componentSize="large">This is Large Body Text</BodyText>
        <br/>
        <br/>
        <BodyText componentColor="text">Text Color of Body text</BodyText>
        <BodyText componentColor="danger">danger Color of Body text</BodyText>
        <BodyText componentColor="darker">darker Color of Body text</BodyText>
        <BodyText componentColor="darkest">darkest Color of Body text</BodyText>
        <BodyText componentColor="link">link Color of Body text</BodyText>
        <BodyText componentColor="mid">mid Color of Body text</BodyText>
        <BodyText componentColor="reverse">reverse Color of Body text</BodyText>
        <br/>
        <br/>
        <SwitchCheckbox isOpen={this.state.isOpen} handleToggle={this.handleSwitchCheckboxToggle}>
          SwitchCheckbox
        </SwitchCheckbox>
        <br/>
        <br/>
        <br/>
        <ToggleButtonGroup segmented={true} helpText="Test Help Text">
          <Button>On</Button>
          <Button>Off</Button>
        </ToggleButtonGroup>
        <Icon source="checkCircle" />
        <Icon source="grid" />
        <Icon source="list" />
        <Icon source="listAlt" />
        <Icon source="listHierarchy" />
        <Icon source="table" />
        <Icon source="hierarchy" />
        <Icon source="folder" />
        <Icon source="event" />
        <Icon source="enumList" />
        <Icon source="user" />
        <br></br>
        <span>Small change for test Change 3</span>
        <Badge children={'Badge'} working />
        <Badge children={'Badge'} />
        <Badge children={'Badge'} status={'success'} />
        <Badge children={'Badge'} status={'info'} />
        <Badge children={'Badge'} status={'attention'} />
        <Badge children={'Badge'} status={'warning'} />
        <Badge children={'New'} status={'new'} />
        <Badge children={'Draft'} status={'draft'} />
        <Badge children={'Published'} status={'published'} />
        <Badge children={'Working'} status={'working'} working />
        <Badge children={'Archive'} status={'archive'} />
        <Badge children={'Archived'} status={'archived'} />
        <Badge children={'Delete'} status={'delete'} />
        <Badge children={'Deleted'} status={'deleted'} />
        <Badge status={'locked'} icon>
          Locked
        </Badge>
        <Badge children={''} icon />
        <Badge
          children={'Draft'}
          status={'draft'}
          icon
          iconSource={'user'}
          iconColor={'orange'}
        />
        <Badge children={'Badge'} progress={'incomplete'} />
        <Badge children={'Badge'} progress={'partiallyComplete'} />
        <Badge children={'Badge'} progress={'complete'} />
        <Badge children={'Publishing'} status={'info'} working />
        <Badge status={'info'} working>
          Publishing
        </Badge>
        <Badge>
          <Spinner
            componentSize="small"
            componentStyle={{
              width: '1.1rem',
              height: '1.1rem',
              marginLeft: '-.5rem',
            }}
          />{' '}
          Badge
        </Badge>
        {/* <div>
          <Button onClick={(e: any) => this.newPopoverUpdate(e)}>Popover</Button>
          <Popover
            anchorEl={this.state.popoverAnchorEl}
            active={this.state.popoverActiveState}
          >
            This is popover component
          </Popover>
        </div> */}
        <div>
          Pagination:
          <Pagination {...PaginationDefaultProps} pageSizeList={[5, 10, 20, 50, 100]} showSizeChanger={true} onChange={(page: number) => this.setState({ paginationCurrent: page })} current={this.state.paginationCurrent} total={104}
            showPrevNextJumpers={true}
            showQuickJumper={true}
            hideOnSinglePage={false}
            showTitle={true}
            simplePagination={false}
            showJumpToPage={true}
          />
          PageSize:
          <PageSize
            onKeyPress={() => {}}
            currentPageSize={this.state.currentPageSize}
            onClick={(currentPageSize: number) =>
              this.setState({ currentPageSize })
            }
            pageSizeList={[5, 10, 20, 50, 100]}
            className="cl"
          />
        </div>

        <div>
          <Calendar/>
        </div>
        <br/>
        <br/>
        <div>
          <TabPanel defaultTabId="tab1" position={'top'} alignment={'center'}>
            <Tab
              tabDescription={<Badge children={'Home'} status={'success'} />}
              tabId={'tab1'}
            >
              <p>content 0</p>
            </Tab>
            <Tab tabDescription="User" tabId={'tab2'}>
              <div></div>
            </Tab>
            <Tab tabDescription="User1" tabId={'tab3'}>
              <p>content user1</p>
            </Tab>
            <Tab tabDescription="User2" tabId={'tab4'}>
              <p>content user2</p>
            </Tab>
            <Tab tabDescription="User3" tabId={'tab5'}>
              <p>content user3</p>
            </Tab>
          </TabPanel>
          <Button onClick={() => this.setState({ activeTabId: 'tab2' })}>
            Trigger User from here
          </Button>
        </div>
        <div>
          <Button onClick={this.toggleModal}>Medium button</Button>
          <Modal
            active={this.state.modalOpen}
            toggle={this.toggleModal}
            onOpen={this.onModalOpen}
            onClose={this.onModalClose}
            componentWidth="medium"
            closeOnBackgroud
            closeOnEsc
            closeButton
          >
            <ModalHeader>Modal title</ModalHeader>
            <ModalBody modalOverflow>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              vitae ex pellentesque, pretium lorem vel, tempor ipsum. Phasellus
              suscipit lacus in velit malesuada, at bibendum mi gravida. Sed
              cursus nisi sem, non pellentesque ligula euismod eget. Sed quis
              fringilla nibh, at vestibulum turpis. Donec sed sagittis sapien.
              Nam quis ex quis nulla porta molestie. Vestibulum eu lorem porta,
              facilisis orci a, tempor quam. Suspendisse et sollicitudin nulla.
              Aenean consectetur imperdiet leo nec condimentum. Aliquam
              scelerisque magna ut tortor accumsan condimentum. Nulla quis ante
              sit amet leo lobortis rhoncus. Cras mollis quis leo nec tincidunt.
              Aliquam blandit est vitae leo ultrices, ut egestas sapien
              pharetra. Suspendisse nec aliquet orci. Suspendisse rutrum odio
              sed neque scelerisque, ut consectetur erat tincidunt. Duis
              ultrices metus eget ante posuere eleifend. Ut luctus felis neque,
              sit amet efficitur neque maximus id. Aliquam porta, tellus ut
              pellentesque facilisis, odio neque maximus erat, venenatis semper
              nisi metus id augue. Cras vel sem eu elit blandit laoreet id vitae
              tortor. Morbi sit amet mi rutrum, sagittis enim lacinia, dictum
              turpis.
              <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>Sandwich: Keep Scrolling!</div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>You can scroll and see me!</div>
                <div>Top Content!</div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>Sandwich: Keep Scrolling!</div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>You can scroll and see me!</div>
                <div>Top Content!</div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>Sandwich: Keep Scrolling!</div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Sticky position={'bottom'} footerType="inline">
                  <span>footer content</span>
                </Sticky>
                You can scroll and see me!
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </Modal>
          <Caption componentStyle={{ color: 'red' }}>This is modal</Caption>
        </div>
        {/* this is treeview */}
        <div style={{ padding: '20px' }}>
          <label>This is treeview </label>

          <TreeView source={treeSource} />
        </div>
        <br />
        <div>
          <p>This is my Breadcrumbs!!</p>
          <BreadCrumb
            direction={'left'}
            source={breadcrumbData}
            displayStyle="primary"
          />
        </div>
        <div>
          {' '}
          This is my process indicator
          <Button onClick={() => this.processNext()}>Next Process</Button>
          <Button onClick={() => this.processPrevious()}>
            Previous Process
          </Button>
          <Process
            steps={steps}
            allowBackStepping
            onClick={(processComponentState: number) =>
              this.updateProcessStateonClick(processComponentState)
            }
            onComponentStateUpdate={(
              currentState: number,
              processComponentState: number
            ) => this.updateProcessState(currentState, processComponentState)}
            processComponentState={this.state.processComponentState}
          />
        </div>
        <br />
        <Caption componentStyle={{ color: 'red' }}>This is Caption</Caption>
        <br />
        <Heading>Alert</Heading>
        <Alert>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </Alert>
        <Alert componentType="primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </Alert>
        <Alert componentType="success">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </Alert>
        <Alert componentType="warning">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </Alert>
        <Alert componentType="danger">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </Alert>
        <Heading>Checkbox</Heading>
        <div style={{ padding: '20px' }}>
          <Checkbox
            helpText="Help Text"
            checked={this.state.checkboxState}
            label="Checkbox"
            onChange={(newValue: boolean) =>
              console.log('I am here:', newValue)
            }
          />
          <Checkbox helpText="Help Text" checked label="Checked Checkbox" />
          <Checkbox checked label="Checked Checkbox" />
          <Checkbox checked="indeterminate" label="Indeterminate Checkbox" />
          <Checkbox
            helpText="Help Text"
            disabled
            checked={this.state.checkboxState}
            label="Disabled Checkbox"
            onChange={(newValue: boolean) =>
              console.log('I am here:', newValue)
            }
          />
          <Checkbox
            helpText="Help Text"
            checked
            label="Hidden Label Checkbox"
            labelHidden
          />
          <Checkbox checked label="Hidden Label Checkbox" labelHidden />
        </div>
        <Heading>Banner</Heading>
        <Banner
          componentTitle={'banner'}
          status={'success'}
          secondaryText={dummyArray}
        />
        <Banner componentTitle={'banner'} status={'info'} />
        <Banner componentTitle={'banner'} status={'warning'} />
        <Banner componentTitle={'banner'} status={'critical'} />
        <Heading>Range Slider</Heading>
        <RangeSlider
          output
          label="Logo offset"
          min={0}
          max={100}
          value={this.state.rangeSliderValue}
          onChange={this.setRangeSliderValue}
        />
        <Heading>Picker</Heading>
        <PickerAutoSuggestExample />
        <Heading>Date Picker</Heading>
        <DateTimePicker
          defaultDateTime="2019-09-30T01:07:00.000Z"
          label="Expiration"
          timePicker
          onChange={(dateTime: any) =>
            console.log(dateTime.add(5.5, 'h').toISOString())
          }
          onBlur={(dateTime: string) => console.log(dateTime)}
        />
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Caption componentStyle={{ color: 'red' }}>
            This is Table field
          </Caption>
          <Button>
            {`Delete ${
              this.state.bulkAction.selectedRow.length
                ? `(${this.state.bulkAction.selectedRow.length})`
                : ''
            }`}
          </Button>

          <div className="fieldGroup">
            <input
              type="text"
              value={this.state.filterConfig.searchKey}
              onChange={(event: any) =>
                this.setState({
                  filterConfig: {
                    ...this.state.filterConfig,
                    searchKey: event.target.value,
                    search: true,
                  },
                })
              }
            />
            <div className="fieldGroupAddon">
              <Button
                onClick={(val: any) =>
                  this.setState({
                    filterConfig: { ...this.state.filterConfig, search: true },
                  })
                }
              >
                Search
              </Button>
            </div>

            <Button onClick={() => this.setState({ callChildCallback: true })}>
              Update child
            </Button>
          </div>
          <Table
            nestedChildData={this.state.nestedChildData}
            nestedChildCallback={this.nestedChildCallback}
            callChildCallback={this.state.callChildCallback}
            expandingRowId={[1, 2, 3, 4]}
            rowExpandOnLoad={false}
            hideExpandedIcon={false}
            data={tableData}
            column={columnConfig}
            hideRow={{ status: 'Deleted' }}
            filterData={this.state.filterConfig}
            defaultSortField="name"
            defaultSortOrder="asc"
            selectRow="checkbox"
            onRowClick={(name: any) => {
              console.log('Selected name ' + name);
            }}
            rowCallbackValue="id"
            rowAction={rowActionConfig}
            selectCallbackValue="id"
            isChildParentConfigSame
            selectRowCallback={(val: any) =>
              this.setState({ bulkAction: { selectedRow: val } })
            }
            bordered
            highlight
            sorting
          >
            Loading
          </Table>
          <Table
            actionInProgress={false}
            data={tableData}
            column={columnConfig1}
            filterData={this.state.filterConfig}
            defaultSortField="name"
            defaultSortOrder="asc"
            onRowClick={(name: any) => {
              console.log('Selected name ' + name);
            }}
            rowCallbackValue="name"
            rowAction={rowActionConfig}
            rowActionLeft
            selectCallbackValue="id"
            isChildParentConfigSame
            selectRowCallback={(val: any) =>
              this.setState({ bulkAction: { selectedRow: val } })
            }
            bordered
            highlight
            sorting
          >
            Loading
          </Table>

          <div>
            <strong>New table test</strong>
          </div>
          <Table
            data={tableData}
            column={columnConfig}
            filterData={this.state.filterConfig}
            checkedRowsId={[1, 2, 3]}
            selectRow="checkbox"
            defaultCheckedDataId={[1, 2, 3]}
            disableAllRowCallback={(val: any) => {
              console.log(val);
            }}
            rowAction={rowActionConfig}
            selectCallbackValue="id"
            selectRowCallback={(val: any) =>
              this.setState({ bulkAction: { selectedRow: val } })
            }
            serverSort={{
              field: 'name',
              order: 'asc',
              callback: (field, order, sortBy) =>
                console.log(
                  'field:',
                  field,
                  'order:',
                  order,
                  'sortBy:',
                  sortBy
                ),
            }}
            bordered
            highlight
            isRowDisabled={this.rowDisbled}

          />
        </div>
        <Sticky
          position={'top'}
          componentStyle={{ backgroundColor: '#FFF', color: 'inherit' }}
          footerType="inline"
        >
          <span>footer content</span>
          <Button onClick={this.toggleModal}>Medium buttonas</Button>
        </Sticky>
        <div>
          <Button
            onClick={(e: any) => {
              this.setState({
                dPopoverActive: true,
                dAnchorEle: e
                  ? (e.currentTarget as HTMLElement)
                  : this.state.dAnchorEle,
              });
            }}
          >
            DPopover
          </Button>
          <Popover anchorEl={this.state.dAnchorEle}>
            <span>Popover check</span>
          </Popover>

          <Button onClick={() => this.toggleDrawerOuter('outterDrawer')}>
            Drawer 1
          </Button>
          <Drawer
            toggleDrawer={() => this.toggleDrawerOuter('outterDrawer')}
            active={this.state.outterDrawer}
            activeContentId={this.state.outterDrawerId}
            mode="slide"
            componentWidth="530px"
            componentLabel={this.state.outterDrawerLabel}
            overlay
            fixedCloseButton
            closeButton
            flip
            master
          >
            <DrawerContent componentId="dcontent1" mode="slide">
              <Button onClick={() => this.toggleDrawerInner('innerDrawer')}>
                Inner Drawer
              </Button>
              <Drawer
                toggleDrawer={() => this.toggleDrawerInner('innerDrawer')}
                active={this.state.innerDrawer}
                activeContentId={this.state.innerDrawerId}
                mode="slide"
                componentWidth="large"
                onOpen={this.onInnerDrawerOpen}
                overlay
                fixedCloseButton
                closeButton
                flip
              >
                <DrawerContent componentId="innerDrContent" mode="slide">
                  I am inner
                  <div>
                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>

                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>

                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>

                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>

                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>

                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>

                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>

                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                  </div>
                </DrawerContent>
              </Drawer>
            </DrawerContent>
          </Drawer>

          <Button onClick={() => this.toggleDrawer('drawer')}>
            Drawer open
          </Button>
          <Drawer
            toggleDrawer={() => this.toggleDrawer('drawer')}
            active={this.state.drawer}
            activeContentId={this.state.activeDrawerId}
            onOpen={this.onDrawerOpen}
            onClose={this.onDrawerClose}
            mode="push"
            componentWidth="large"
            overlay
            closeButton
          >
            <Sticky position={'top'} footerType="inline">
              <span>Header content</span>
            </Sticky>
            <DrawerContent componentId="content1" mode="slide">
              <p>Reveal Test</p>
              <ul>
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
                <li>Link 4</li>
                <li>Link 5</li>
              </ul>

              <Button
                onClick={() => this.setState({ activeDrawerId: 'content2' })}
              >
                Content2 open
              </Button>
              <div>
                Top Content!
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>Sandwich: Keep Scrolling!</div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>You can scroll and see me!</div>
                <div>Top Content!</div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>Sandwich: Keep Scrolling!</div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>You can scroll and see me!</div>
                <div>Top Content!</div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>Sandwich: Keep Scrolling!</div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                You can scroll and see me!
              </div>
              <Sticky position={'bottom'} footerType="inline">
                <span>footer content</span>
              </Sticky>
            </DrawerContent>

            <DrawerContent componentId="content2" mode="slide">
              I am inside drawer content 2
              <Button
                onClick={() => this.setState({ activeDrawerId: 'content1' })}
              >
                Content1 open
              </Button>
              <Button onClick={() => this.setState({ drawer: false })}>
                Close
              </Button>
            </DrawerContent>
          </Drawer>
        </div>
        <p>
          {' '}
          Some text with a
          <Tooltip content="This order has shipping labels.sdfsdfg">
            <Link>Tooltip 1</Link>
          </Tooltip>{' '}
          in it
        </p>
        <Tooltip content="This order has shipping.">
          <Link>Tooltip 2</Link>
        </Tooltip>
        <div>
          <h1>{this.state.AccordionItemClose}</h1>
          <h1>{this.state.AccordionItemOpen}</h1>
          <Accordion
            items={Accordionitems}
            closeIndex={this.state.AccordionItemClose}
            openIndex={this.state.AccordionItemOpen}
          />

          <Button onClick={() => this.toggleAccordionOpen(0)}>
            item1 toggle open
          </Button>
          <Button onClick={() => this.toggleAccordionOpen(1)}>
            item2 toggle open
          </Button>
          <Button onClick={() => this.toggleAccordionOpen(2)}>
            item3 toggle open
          </Button>
          <Button onClick={() => this.toggleAccordionOpen(undefined)}>
            undefined toggle open
          </Button>

          <Button onClick={() => this.toggleAccordionClose(0)}>
            item1 toggle close
          </Button>
          <Button onClick={() => this.toggleAccordionClose(1)}>
            item2 toggle close
          </Button>
          <Button onClick={() => this.toggleAccordionClose(2)}>
            item3 toggle close
          </Button>
          <Button onClick={() => this.toggleAccordionClose(undefined)}>
            undefined toggle close
          </Button>

          <Heading>Popover</Heading>
          {/* <div style={{ marginLeft: '100px' }}>
            <button onClick={(e: any) => this.popoverUpdateContainer(e)}>Click Popover</button>
            <Popover active={this.state.popoverActiveContainer} direction="up" closeOnClickOutside toggle={() => this.popoverUpdateContainer} anchorEl={this.state.anchorEl} onClose={() => console.log('I am close')} onOpen={() => console.log('I am open')} callbackParent={newState => this.onChildChanged(newState)}>
              I am popover <Button>Hello popover</Button>
            </Popover>
          </div> */}
          <br />
          <div style={{ marginLeft: '100px' }}>
            <Button onClick={(e: any) => this.popoverUpdate(e)}>
              Dropdown active
            </Button>
            <Dropdown dropdownItems={items} anchorEl={this.state.anchorEl} />
          </div>
          <div style={{ marginLeft: '100px' }}>
            <Button onClick={(e: any) => this.popoverUpdate2(e)}>Dro</Button>
            <Dropdown
              dropdownItems={items}
              toggle={this.popoverUpdate2}
              anchorEl={this.state.anchorEl2}
              preferredAlignment="right"
              closeOnClickOutside
            />
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />

          <Column small="2-4" medium="2-4" large="2-4">
            <TextField
              type="text"
              disabled
              placeholder="Find Content Definition..."
              suffix={<Icon source="search" />}
            />

            <TextField type="text" label="Text Field with Prefix" prefix="$" />

            <TextField
              label="Number field"
              type="number"
              placeholder="placeholder"
              value={this.state.appNumberCounter}
              onChange={this.valueUpdater('appNumberCounter')}
              // showNumberIcon={false}
            />

            <TextField
              type="text"
              capital
              componentId="TestName"
              label="Text Counter"
              placeholder="test-placeholder"
              value={this.state.appTextCounter1}
              // value="Value"
              helpText="Helper Text"
              enableTextCounter
              maxLength={5}
              minLength={5}
              onChange={this.valueUpdater('appTextCounter1')}
              // disabled
              loading
              labelHidden
              // suffix={<Icon componentColor="inkLightest" source="users" />}
            />
            <TextField
              type="text"
              componentId="TestName1"
              label="Text Counter"
              placeholder="test-placeholder"
              value={this.state.appTextCounter}
              // value="Value"
              helpText="Helper Text"
              maxLength={101}
              minLength={5}
              multiline
              resizable
              onChange={this.valueUpdater('appTextCounter')}
              // disabled
              loading
              // labelHidden
              // suffix={<Icon componentColor="inkLightest" source="users" />}
            />
            <TextField
              type="text"
              componentId="TestName2"
              label="Read Only Text Field"
              value="Value"
              helpText="Helper Text"
              maxLength={101}
              minLength={5}
              enableTextCounter
              // disabled
              readOnly
              loading
              backdropHidden
              // multiline
              // labelHidden
            />
            <Select
              componentId="appCity1"
              name="Select city 2"
              label="Label"
              options={[
                { value: '', label: '' },
                { value: 'pasadena', label: 'Pasadena' },
                { value: 'altadena', label: 'Altadena' },
              ]}
              value={this.state.appCity1}
              // value="Value"
              onChange={this.valueUpdater('appCity1')}
              placeholder="Some stuff"
              helpText="Help Text"
              // disabled
              loading
              // labelHidden
            />
          </Column>

          <Card>
            <CardHeader>Online store dashboard - Card</CardHeader>
            <CardBody sectioned>
              <CardSection>
                <CardHeader>Reports</CardHeader>
                <p>View a summary of your online store’s performance.</p>
              </CardSection>
              <CardSection>
                <CardHeader>Summary Reports</CardHeader>
                <p>
                  View a summary of your online store’s performance, including
                  sales, visitors, top products, and referrals.
                </p>
              </CardSection>
            </CardBody>
          </Card>
          <div>this is card sep</div>
          <Card>
            <CardHeader>Grid Header1</CardHeader>
            <CardBody>
              <CardSection>This is card Section</CardSection>
            </CardBody>
            <CardFooter>
              <Button onClick={(e: any) => this.popoverUpdate2(e)}>
                Dropdown2 active
              </Button>
            </CardFooter>
          </Card>
          <p>
            {' '}
            Some text with a
            <Tooltip content="Order" preferredPosition="left" active>
              <Link>Tooltipss</Link>
            </Tooltip>{' '}
            in it
          </p>
          <p>
            {' '}
            Some text with a
            <Tooltip content="This order has" preferredPosition="above">
              <Link>Tooltip 1</Link>
            </Tooltip>{' '}
            in it
          </p>
          <Tooltip content="This order has shipping.">
            <Link>Tooltip 2</Link>
          </Tooltip>
          <TextField
            type="text"
            componentId="TestName"
            label="Text Counter"
            placeholder="test-placeholder"
            value={this.state.appTextCounter}
            helpText="Helper Text"
            enableTextCounter={true}
            maxLength={100} /* onChange={this.valueUpdater('appTextCounter')} */
          />
          <ClickableChip chip={<Chip>Batman</Chip>}>
            <Card>
              <p>
                Batman is a fictional superhero who appears in American comic
                books published by DC Comics. The character was created by
                artist Bob Kane and writer Bill Finger, and first appeared in
                Detective Comics #27
              </p>
            </Card>
          </ClickableChip>
          <Card>
            <CardHeader>More about Batman</CardHeader>
            <p>
              Batman is a fictional superhero who appears in American comic
              books published by DC Comics. The character was created by artist
              Bob Kane and writer Bill Finger, and first appeared in Detective
              Comics #27
            </p>
          </Card>
          <p>
            {' '}
            Some text with a
            <Tooltip content="This order has shipping labels.">
              <Link>Tooltipba 1</Link>
            </Tooltip>{' '}
            in it
          </p>
          <Tooltip content="This order has shipping.">
            <Link>Tooltip 2</Link>
          </Tooltip>
          <p>
            {' '}
            Some text with a
            <Tooltip content="This order has shipping labels.">
              <Link>Tooltip 1</Link>
            </Tooltip>{' '}
            in it
          </p>
          <Tooltip content="This order has shipping.">
            <Link>Tooltip 2</Link>
          </Tooltip>
          <SideNavigation
            accordian={true}
            source={sideNavigationData}
            activeItem={1}
            drawerOpen
            hideCollapse={false}
            drawerExpand={true}
          />
          <Heading>List</Heading>
          <List componentType="bullet">
            <Item>Yellow shirt</Item>
            <Item>Red shirt</Item>
            <List componentType="bullet">
              <Item>Yellow shirt</Item>
              <Item>Red shirt</Item>
              <Item>Green shirt</Item>
              <List componentType="bullet">
                <Item>Yellow shirt</Item>
                <Item>Red shirt</Item>
                <Item>Green shirt</Item>
              </List>
            </List>
            <Item>Yellow shirt</Item>
            <Item>Red shirt</Item>
            <Item>Green shirt</Item>
          </List>
          <List componentType="number">
            <Item>First item</Item>
            <Item>Second item</Item>
            <Item>Third Item</Item>
          </List>
          <Heading>Description List</Heading>
          <DescriptionList componentType="default" componentStyle="Inline">
            <Term>Logistics</Term>
            <Description>
              The management of products or other resources as they travel
              between a point of origin and a destination.
            </Description>
            <Term>Sole proprietorship</Term>
            <Description>
              A business structure where a single individual both owns and runs
              the company.
            </Description>
            <Term>Discount code</Term>
            <Description>
              A series of numbers and/or letters that an online shopper may
              enter at checkout to get a discount or special offer.
            </Description>
          </DescriptionList>
          <DescriptionList componentType="default" componentStyle="Stacked">
            <Term>Logistics</Term>
            <Description>
              The management of products or other resources as they travel
              between a point of origin and a destination.
            </Description>
            <Term>Sole proprietorship</Term>
            <Description>
              A business structure where a single individual both owns and runs
              the company.
            </Description>
            <Term>Discount code</Term>
            <Description>
              A series of numbers and/or letters that an online shopper may
              enter at checkout to get a discount or special offer.
            </Description>
          </DescriptionList>
          <DescriptionList componentType="divider" componentStyle="Stacked">
            <Term>Logistics</Term>
            <Description>
              The management of products or other resources as they travel
              between a point of origin and a destination.
            </Description>
            <Term>Sole proprietorship</Term>
            <Description>
              A business structure where a single individual both owns and runs
              the company.
            </Description>
            <Term>Discount code</Term>
            <Description>
              A series of numbers and/or letters that an online shopper may
              enter at checkout to get a discount or special offer.
            </Description>
          </DescriptionList>

          <Heading>Grid Block</Heading>
          <ButtonGroup segmented={true}>
            <Button onClick={() => this.setState({ gridView: 'block' })}>
              Block view
            </Button>
            <Button onClick={() => this.setState({ gridView: 'list' })}>
              List view
            </Button>
            <Button onClick={() => this.setState({ gridView: 'list' })}>
              List view
            </Button>
          </ButtonGroup>

          <br />
          <Grid gridType={this.state.gridView} gridStyle={this.state.gridStyle}>
            <GridContent onClick={(event) => console.log('event:', event)}>
              <GridHeader disableClick={true}>Grid Header</GridHeader>
              <GridImage>
                <Icon source="folder" />
              </GridImage>
              <GridTitle>Grid Title</GridTitle>
              <GridDescription>Grid Description</GridDescription>
              <GridFooter>Grid Footer</GridFooter>
            </GridContent>

            <GridContent>
              <GridHeader>Grid Header</GridHeader>
              <GridImage>
                <Icon source="folder" />
              </GridImage>
              <GridTitle>Grid Title</GridTitle>
              <GridDescription>Grid Description</GridDescription>
              <GridFooter>Grid Footer</GridFooter>
            </GridContent>

            <GridContent>
              <GridHeader>Grid Header</GridHeader>
              <GridImage>
                <Icon source="folder" />
              </GridImage>
              <GridTitle>Grid Title</GridTitle>
              <GridDescription>Grid Description</GridDescription>
              <GridFooter>Grid Footer</GridFooter>
            </GridContent>

            <GridContent>
              <GridHeader>Grid Header</GridHeader>
              <GridImage>
                <Icon source="folder" />
              </GridImage>
              <GridTitle>Grid Title</GridTitle>
              <GridDescription>Grid Description</GridDescription>
              <GridFooter>Grid Footer</GridFooter>
            </GridContent>

            <GridContent>
              <GridHeader>Grid Header</GridHeader>
              <GridImage>
                <Icon source="folder" />
              </GridImage>
              <GridTitle>Grid Title</GridTitle>
              <GridDescription>Grid Description</GridDescription>
              <GridFooter>Grid Footer</GridFooter>
            </GridContent>
          </Grid>
          <ChoiceList
            componentTitle="Company name"
            choices={[
              {
                label: 'Hidden',
                value: 1,
              },
              {
                label: 'Optional',
                value: 2,
              },
              {
                label: 'Required',
                value: 3,
              },
            ]}
            selected={this.state.ChoiceListSelected}
            onChange={(selected) =>
              this.setState({ ChoiceListSelected: selected })
            }
            horizontal
          />

      <div>ComboBox Table</div>
        <div style={{ width: '50%' }}>
          <ComboBox
            items={this.getComboBoxTableItems()}
            label="Select"
            currentValue="item1"
            suffix="user"
            loading={false}
            onSelect={(value: any) => console.log(value)}
            onChangeText={(value: any) => console.log(value)}
            sortEntity={(field, order, sortBy)=> this.handleSortComboBox(field, order, sortBy)}
          />
        </div>
            <br/>
            <br/>
          
        <div>Popover Picker</div>
          <PopoverPicker
            items={this.getPopoverPickerItems()}
            label="Popover Picker Component "
            currentValue="item1"
            // suffix="user"
            loading={false}
            onSelect={(value: any) => console.log(value)}
            onChangeText={(value: any) => console.log(value)}
            sortEntity={(field, order, sortBy) => this.handleSortComboBox(field, order, sortBy)}
            defaultSelectedItems={selectedPickerdata}
            noOptionsMessage={"No options available"}
            helpText={"This is HelpText Example"}
          />
        <br/>
        <br />

          <LazyPicker
            pickerProps={{
              label: 'Lazy Picker',
              helpText: 'Helper Text',
              source: pickerdata,
              defaultSelectedItems: [],
              maxSelectedItems: 5,
              minSelectedItems: 2,
              autoSuggest: true,
              loading: false,
              noOptionsMessage: 'No items Available',
              shouldRenderSuggestions: true,
            }}
            getAll={this.lazyGetAll}
          />

        <Picker
            label="Picker Component with render header"
            chipComponent={Chip}
            helpText="Helper Text"
            additionalText={'2 required'}
            source={pickerdata}
            defaultSelectedItems={selectedPickerdata}
            columns={columnConfigPicker}
            maxSelectedItems={5}
            minSelectedItems={2}
            autoSuggest
            loading
            renderPickerHeader={renderPickerHeader}
            renderPickerItem={renderPickerItem}
            noOptionsMessage={"No items Available"}
            shouldRenderSuggestions={false}
          />
        
        <br />
        <br />

        <Picker
            label="Picker Component with More"
            chipComponent={Chip}
            helpText="Helper Text"
            source={pickerdata}
            defaultSelectedItems={selectedPickerdata}
            maxSelectedItems={5}
            minSelectedItems={2}
            autoSuggest
            loading
            moreInfoComponent={<Button children="More Info" plain componentSize="slim" onClick={() => console.log('load more click')}/>}
            // disabled
            // readOnly
            noOptionsMessage={"No items Available"}
            // moreInfoComponent={<Button>More Info</Button>}
            shouldRenderSuggestions={false}
            // readOnly
          />
        <br/>

          <Picker
            label="Picker Component without render"
            chipComponent={Chip}
            helpText="Helper Text"
            source={pickerdata}
            defaultSelectedItems={selectedPickerdata}
            maxSelectedItems={5}
            minSelectedItems={2}
            autoSuggest
            loading
            // moreInfoComponent={<Button children="More Info" />}
            // disabled
            // readOnly
            noOptionsMessage={"No items Available"}
            // moreInfoComponent={<Button>More Info</Button>}
            shouldRenderSuggestions={false}
            // readOnly
          />
        <br/>
          

        <Picker
            label="Picker Component without render min max"
            chipComponent={Chip}
            helpText="Helper Text"
            source={pickerdata}
            defaultSelectedItems={selectedPickerdata}
            maxSelectedItems={2}
            minSelectedItems={1}
            autoSuggest
            // loading
            placeholder="hint text"
            // moreInfoComponent={<Button children="More Info" />}
            // disabled
            // readOnly
            noOptionsMessage={"No items Available"}
            // moreInfoComponent={<Button>More Info</Button>}
            shouldRenderSuggestions={false}
            // readOnly
          />
        <br/>


          <Picker
            label="Picker Component with render"
            chipComponent={Chip}
            helpText="Helper Text"
            source={pickerdata}
            defaultSelectedItems={selectedPickerdata}
            maxSelectedItems={5}
            minSelectedItems={2}
            autoSuggest
            loading
            renderPickerItem={renderPickerItem}
            // moreInfoComponent={<Button children="More Info" />}
            // disabled
            // readOnly
            noOptionsMessage={"No items Available"}
            // moreInfoComponent={<Button>More Info</Button>}
            shouldRenderSuggestions={false}
            // readOnly
          />

          <br />
          
          <Picker
            label="Picker Component with Focuse"
            chipComponent={Chip}
            helpText="Helper Text"
            source={pickerdata}
            defaultSelectedItems={selectedPickerdata}
            maxSelectedItems={5}
            minSelectedItems={2}
            autoSuggest
            loading
            renderPickerItem={renderPickerItem}
            // moreInfoComponent={<Button children="More Info" />}
            // disabled
            // readOnly
            noOptionsMessage={"No items Available"}
            // moreInfoComponent={<Button>More Info</Button>}
            shouldRenderSuggestions={true}
            readOnly
            backdropHidden
            // disabled
          />
          <ValidatedForm
            showError={this.state.showError}
            onSubmitError={(value: [any], error: Error) =>
              console.log('value:', value, 'error:', error)
            }
            onSubmit={(value: [any]) => console.log('Submit Value:', value)}
            formFields={[
              'AppName',
              'AppUri',
              'appDescription',
              'appCity',
              'appActive',
              'appRadioAction',
            ]}
          >
            <Heading>App Basics</Heading>

            <DisplayText componentSize="large">
              This is Display Text, which is used to make a bold visual
              statement.
            </DisplayText>
            <p>This is just some fun regular text.</p>

            {/* <FormLayout> */}

            <ValidatedTextField
              type="text"
              getErrors={this.getErrors}
              componentId="AppUri"
              label="App Uri"
              placeholder="App Uri"
              onChange={this.valueUpdater('appUri')}
              value={this.state.appUri}
              name="App Uri"
              validateTrigger={['onBlur']}
              validateRules={[
                { minLength: 2, message: 'AtList 2 character needed' },
                { required: true, message: 'App Uri is required' },
              ]}
            />
            <div style={{ width: '100px' }}>
              <ValidatedTextField
                getErrors={this.getErrors}
                componentId="AppName"
                label="App Name"
                placeholder="App Name"
                type="number"
                helpText="We recommend keeping your app name under 23 characters."
                onChange={this.valueUpdater('appName')}
                value={this.state.appName}
                name="App Name"
                validateTrigger={['onBlur']}
                validateRules={[
                  {
                    minRange: 2,
                    maxRange: 32760,
                    message: 'Range is between 2 & 32760',
                  },
                  { required: true, message: 'App Description is required' },
                ]}
              />
            </div>
            <ValidatedTextField
              type="text"
              getErrors={this.getErrors}
              multiline
              componentId="appDescription"
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
              componentId="appCity"
              required={true}
              name="Select city"
              label="Select city"
              options={[
                { value: '', label: '' },
                { value: 'xyz', label: 'xyz' },
                { value: 'abc', label: 'abc' },
              ]}
              value={this.state.appCity}
              onChange={this.valueUpdater('appCity')}
              validateTrigger={['onBlur']}
              validateRules={[{ required: true, message: 'City is required.' }]}
            />

            <div>
              <p>
                child<span>child 2</span>
              </p>
            </div>
            <div>
              <FlexBox>
                <ButtonGroup segmented={true}>
                  <Button
                    componentSize="large"
                    disabled={this.isValidate()}
                    primary={true}
                    submit={true}
                  >
                    Save Draft
                  </Button>

                  <Button
                    componentSize="large"
                    onClick={this.onPublish}
                    primary={true}
                  >
                    Publish
                  </Button>
                </ButtonGroup>

                <div style={{ marginLeft: '10px' }}>
                  <Button>Cancel</Button>
                </div>
              </FlexBox>
            </div>

            <div style={{ marginTop: '10px' }}>
              <h5>User Status</h5>

              <Checkbox
                label="Active"
                helpText="Uncheck to disable this users account"
              />
            </div>

            <ValidatedCheckbox
              getErrors={this.getErrors}
              componentId="appActive"
              name="appActive"
              label="Validated Active"
              helpText="Uncheck to disable this users account"
              validateTrigger={['onChange', 'onClick']}
              validateRules={[
                { required: true, message: 'Active is required.' },
              ]}
            />

            <div style={{ marginTop: '10px' }}>
              <h5>Invite Email</h5>

              <Checkbox label="Send an invite email to this user" />
            </div>
            {/* </FormLayout> */}
          </ValidatedForm>

          <Heading>Connected Text Field</Heading>
          <TextField
            label="Connected Text Field"
            type="text"
            placeholder=""
            value={this.state.appTextCounter}
            helpText="Helper Text"
            maxLength={100}
            connectedRight={
              <Select
                label="Weight unit"
                value=""
                labelHidden
                options={['kg', 'lb']}
              />
            }
          />
          <Card>
            <CardHeader> Coming Events </CardHeader>
            <List componentType="divider">
              <Item>
                <span>JUN 1</span>
                <span>Women's Basketball Elite Camp</span>
              </Item>
              <Item>
                <span>JUN 22</span>
                <span>Spring Classes End</span>
              </Item>
              <Item>
                <span>JUN 23</span>
                <span>Summer Classes Begin</span>
              </Item>
              <Item>
                <div>
                  SVSU STEM program inspires computer coding curriculum in
                  Freeland schools
                </div>
                <div>
                  More than 1,000 students in the Freeland Community School
                  District were inspired to learn about computer coding…
                </div>
              </Item>
              <Item>World</Item>
            </List>
            <div>
              <Button> All News </Button>
            </div>
          </Card>

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

          <p>
            {' '}
            Some text with a
            <Tooltip content="This order has shipping labels.">
              <Link>Tooltip 1</Link>
            </Tooltip>{' '}
            in it
          </p>
          <Tooltip content="This order has shipping.">
            <Link>Tooltip 2</Link>
          </Tooltip>

          <FlexBox
            direction="Row"
            align="Stretch"
            justify="SpaceAround"
            wrap="Wrap"
          >
            <div style={{ backgroundColor: 'aqua' }}>Demo 1</div>
            <div style={{ backgroundColor: 'pink' }}>Demo 2</div>
            <div style={{ backgroundColor: 'lime' }}>Demo 3</div>
          </FlexBox>

          <FlexBox
            inline={true}
            direction="Column"
            align="Stretch"
            justify="Center"
          >
            <div style={{ backgroundColor: 'aqua' }}>Demo 1</div>
            <div style={{ backgroundColor: 'pink' }}>Demo 2</div>
            <div style={{ backgroundColor: 'lime' }}>Demo 3</div>
          </FlexBox>

          <Heading>Chip</Heading>
          <div>
            <Chip>Basic Chip</Chip>
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
            <Chip transparent>Transparent Chip</Chip>

              <Chip><Button plain componentSize="slim" icon="filter"/><BodyText element="span" componentSize="large">only children</BodyText></Chip>
              <Chip label="Only label"></Chip>
              <Chip label="Label with remove" onRemove={this.chipRemove} removable={true}></Chip>
              <Chip
              image={{
                url: 'example/src/images/netguru-cartoon-characters3.png',
                alt: 'Your mom',
              }}
              removable={true}
              onRemove={this.chipRemove}
              label="Image label chip"
            ></Chip>
            <Chip
              image={{
                url: 'example/src/images/netguru-cartoon-characters3.png',
                alt: 'Your mom',
              }}
            ></Chip>
            <Chip><Button plain componentSize="slim" icon="filter"/></Chip>
            <Chip label="Label with Icon"  image={{
                url: IconList.bell,
                alt: 'Your mom',
              }}></Chip>
              <Chip label="Label with Icon with remove"  image={{
                url: IconList.bell,
                alt: 'Your mom',
              }} removable={true}
              onRemove={this.chipRemove}></Chip>
              <Chip removable={true}
              onRemove={this.chipRemove}><Button plain componentSize="slim" icon="filter"/><BodyText element="span" componentSize="large">children with remove</BodyText></Chip>
              <Chip label="All Subscribe" image={{
                url: 'example/src/images/netguru-cartoon-characters3.png',
                alt: 'Your mom',
              }} removable={true}
              onRemove={this.chipRemove}><Button plain componentSize="slim" icon="filter"></Button></Chip>

          </div>

          <div>
            <h4>Single source video</h4>
            <Video
              poster={posterUrl}
              src={[
                {
                  src:
                    'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
                  type: VideoType.MP4,
                },
              ]}
              autoplay={false}
              controls={true}
              componentStyle={{ height: 400, width: 400 }}
            />
            <h4>Multi source video</h4>
            <Video
              poster={posterUrl}
              src={multiVideoSource}
              autoplay={false}
              controls={true}
              componentStyle={{ height: 400, width: 400 }}
            />
          </div>
          <h4>Panel Component</h4>
          <Panel heading="BASIC PANEL">
            <div>Lorem ipsum lorem ipsum</div>
          </Panel>
          <Panel heading="BASIC PANEL WITH VIDEO" video={sampleVideoCmp}>
            <div>Lorem ipsum lorem ipsum</div>
          </Panel>
          <Panel heading={<div>Custom Panel</div>}>
            <div>Lorem ipsum lorem ipsum</div>
          </Panel>
          <Panel
            heading={<div>Custom Panel with Video</div>}
            video={sampleVideoCmp}
          >
            <div>Lorem ipsum lorem ipsum</div>
          </Panel>
          <h2>Column Component Demo</h2>
          <div>
            <Column small="1-1">
              <p>Small 1-1!</p>
            </Column>
          </div>
          <p>
            {' '}
            Some text with a
            <Tooltip content="This order has shipping labels.">
              <Link>Tooltip 1</Link>
            </Tooltip>{' '}
            in it
          </p>
          <Tooltip preferredPosition="below" content="This order has shipping.">
            <Link>Tooltip 2</Link>
          </Tooltip>
          <p>
            {' '}
            Some text with a
            <Tooltip content="This order has shipping labels.">
              <Link>Tooltip 1</Link>
            </Tooltip>{' '}
            in it
          </p>
          <Tooltip preferredPosition="below" content="This order has shipping.">
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
        <p>
          {' '}
          Some text with a
          <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip>{' '}
          in it
        </p>
        <Tooltip content="This order has shipping.">
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p>
          {' '}
          Some text with a
          <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip>{' '}
          in it
        </p>
        <Tooltip content="This order has shipping.">
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p>
          {' '}
          Some text with a
          <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip>{' '}
          in it
        </p>
        <Tooltip content="This order has shipping.">
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p>
          {' '}
          Some text with a
          <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip>{' '}
          in it
        </p>
        <Tooltip content="This order has shipping.">
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p>
          {' '}
          Some text with a
          <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip>{' '}
          in it
        </p>
        <Tooltip content="This order has shipping.">
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p>
          {' '}
          Some text with a
          <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip>{' '}
          in it
        </p>
        <Tooltip content="This order has shipping.">
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p>
          {' '}
          Some text with a
          <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip>{' '}
          in it
        </p>
        <Tooltip content="This order has shipping.">
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p>
          {' '}
          Some text with a
          <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip>{' '}
          in it
        </p>
        <Tooltip content="This order has shipping.">
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p>
          {' '}
          Some text with a
          <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip>{' '}
          in it
        </p>
        <Tooltip content="This order has shipping.">
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <p>
          {' '}
          Some text with a
          <Tooltip content="This order has shipping labels.">
            <Link>Tooltip 1</Link>
          </Tooltip>{' '}
          in it
        </p>
        <Tooltip content="This order has shipping.">
          <Link>Tooltip 2</Link>
        </Tooltip>
        <br />
        <Button icon="add" primary>
          Create Role
        </Button>
        <br />
        <Spinner accessibilityLabel="Loading" />
        <Spinner componentColor="reverse" />
        <Spinner componentColor="disabled" />
        <br />
        <Spinner componentSize="small" />
        <Spinner componentSize="small" componentColor="reverse" />
        <Spinner componentSize="small" componentColor="disabled" />
        <br />
        <Loading />
        <br />
        <ButtonGroup segmented>
          <Button primary>Save Draft</Button>
          <Button primary>Publish</Button>
        </ButtonGroup>
        <br />
        <br />
        <Button plain>Plain</Button>&nbsp;
        <Button plain disabled>
          Plain Disabled
        </Button>
        &nbsp;
        <Button>Button</Button>&nbsp;
        <Button disabled>Disabled</Button>&nbsp;
        <br />
        <br />
        <Button primary>Primary</Button>&nbsp;
        <Button primary disabled>
          Primary Disabled
        </Button>
        &nbsp;
        <Button primary outline>
          Primary Outline
        </Button>
        &nbsp;
        <Button outline>Outline</Button>&nbsp;
        <Button outline disabled>
          Outline Disabled
        </Button>
        &nbsp;
        <br />
        <br />
        <Button destructive>Destructive</Button>&nbsp;
        <Button destructive disabled>
          Destructive Disabled
        </Button>
        &nbsp;
        <Button destructive outline>
          Destructive Outline
        </Button>
        &nbsp;
        <Button destructive outline disabled>
          Destructive Outline Disabled
        </Button>
        &nbsp;
        <br />
        <div>ComboBox</div>
        <div style={{ width: '50%' }}>
          <ComboBox
            items={this.getComboBoxItems()}
            label="Select"
            currentValue="item1"
            suffix="user"
            loading={false}
            onSelect={(value: any) => console.log(value)}
            onChangeText={(value: any) => console.log(value)}
          />
        </div>
        <br />
        <div>ComboBox Table</div>
        <div style={{ width: '50%' }}>
          <ComboBox
            items={this.getComboBoxTableItems()}
            label="Select"
            currentValue="item1"
            suffix="user"
            loading={false}
            onSelect={(value: any) => console.log(value)}
            onChangeText={(value: any) => console.log(value)}
            sortEntity={(field, order, sortBy)=> this.handleSortComboBox(field, order, sortBy)}
          />
        </div>
        <div>Multiple checkbox Facets</div>
        <MultipleCheckboxFacets
          label="Facets"
          onMoreClick={(event) => {
            console.log('Facets More clicked', event);
          }}
          onRemove={(value: string) => {
            this.handleFacetsSelection(value);
          }}
          onSelect={(value: string) => {
            this.handleFacetsSelection(value);
          }}
          onSearch={(value) => {
            console.log('Facets More clicked', value);
          }}
          options={this.state.multipleCheckboxFacetsOptions}
          showMore={true}
          showSearch={true}
          searchPlaceholder="Search"
        />
      </div>
    );
  }

  handleFacetsSelection = (value: string) => {
    const { multipleCheckboxFacetsOptions } = this.state;
    const configClone = [...multipleCheckboxFacetsOptions];
    configClone.forEach((cc) => {
      if (cc.value === value) {
        cc.selected = !cc.selected;
      }
    });
    // const selected = configClone.filter((cc) => cc.selected).map((cc) => cc.value);

    this.setState({
      multipleCheckboxFacetsOptions: configClone,
    });
  }

  // valueUpdater(field: any) {
  //   return (value: any) => this.setState({ [field]: value });
  // }

  // handleChange(value1: any) {
  //   return (value: any) => this.setState({ [value1]: value });
  // }

  getComboBoxItems() {
    const data = [
      {
        key: 'name',
        renderer: this.renderItems,
        value: [
          {
            description:
              'This field stores simple text. It cannot be rich text or HTML. Limited to 50 characters',
            name: 'Short Text',
            id: 1048586,
            uri: 'ShortText',
          },
          {
            description:
              'This field stores simple text. It cannot be rich text or HTML. Limited to 512 characters',
            name: 'Simple Text',
            id: 2097162,
            uri: 'SimpleText',
          },
          {
            description:
              'This field stores rich text. It may contain simple… contents. Limited to 1,024 characters in length.',
            name: 'Rich Text',
            id: 3145738,
            uri: 'RichText',
          },
          {
            description:
              'This field stores rich text. It may contain simple…ng this field could adversely impact performance!',
            name: 'Rich Text (Long)',
            id: 4194314,
            uri: 'RichTextLong',
          },
          {
            description: 'This is "True" or "False".',
            name: 'True or False',
            id: 5242890,
            uri: 'TrueFalse',
          },
          {
            description:
              'This field stores a URL or URI. It is either pure …ontain URL label. It contains a Label and URL/URI',
            name: 'Link or URI',
            id: 6291466,
            uri: 'Link',
          },
          {
            description: 'This field stores a valid email address.',
            name: 'Email Address',
            id: 7340042,
            uri: 'Email',
          },
          {
            description: 'This field stores a valid phone number.',
            name: 'Phone Number',
            id: 8388618,
            uri: 'Phone',
          },
          {
            description:
              'This field stores whole numbers. lower limit -9,22…854,775,808 upper limit 9,223,372,036,854,775,807',
            name: 'Whole Number',
            id: 9437194,
            uri: 'Number',
          },
          {
            description:
              'This field represents a decimal value that can acc…te 19.5 places, such as nnnnnnnnnnnnnnnnnnn.ddddd',
            name: 'Number with decimal',
            id: 10485770,
            uri: 'Decimal',
          },
          {
            description:
              'This field represents currency. Both value and Cur…,477.5808 upper limit is 922,337,203,685,477.5807',
            name: 'Money',
            id: 11534346,
            uri: 'Money',
          },
          {
            description:
              'This is a date and time field. Value is stored a U…:00:00.000 upper limit is 9999-12-31,23:59:59:999',
            name: 'Date and Time',
            id: 12582922,
            uri: 'DateTime',
          },
          {
            description:
              'This is a date field. Value is stored a Universal …mit is 0001-01-01 upper limit is 9999-12-31,23:59',
            name: 'Date',
            id: 13631498,
            uri: 'Date',
          },
          {
            description:
              'This is a time field. Value is stored a Universal …limit is 00:00:00.001 upper limit is 23:59:59.999',
            name: 'Time',
            id: 14680074,
            uri: 'Time',
          },
          {
            description:
              'This field represents duration. The smallest incri…ticks upper limit 9,223,372,036,854,775,807 ticks',
            name: 'Duration',
            id: 15728650,
            uri: 'Duration',
          },
          {
            description:
              'Represents a duration of time between two date/tim…Date and Time End Date and Time',
            name: 'Date Time Span',
            id: 16777226,
            uri: 'DateTimeSpan',
          },
          {
            description:
              'Gemotry and Geography data representing a single 0…may contain Z (elevation) and M (measure) values.',
            name: 'Geo Point',
            id: 17825802,
            uri: 'GeoPoint',
          },
          {
            description:
              'Gemotry and Geography data representing a zero or …may contain Z (elevation) and M (measure) values.',
            name: 'Geo Points',
            id: 18874378,
            uri: 'GeoPoints',
          },
          {
            description:
              'Geomtry and Geography data representing a single o… of points and the line segments connecting them.',
            name: 'Geo Line',
            id: 19922954,
            uri: 'GeoLineString',
          },
          {
            description:
              'Geomtry and Geography data representing a zero or … of points and the line segments connecting them.',
            name: 'Geo Lines',
            id: 20971530,
            uri: 'GeoLineStrings',
          },
          {
            description:
              'Geomtry and Geography data representing a single t…or bounding ring and zero or more interior rings.',
            name: 'Geo Polygon',
            id: 22020106,
            uri: 'GeoPolygon',
          },
          {
            description:
              'Geomtry and Geography data representing a zero or …or bounding ring and zero or more interior rings.',
            name: 'Geo Polygons',
            id: 23068682,
            uri: 'GeoPolygons',
          },
          {
            description:
              'Represents a country or entity as specified by ISO 3166 standards.',
            name: 'Country',
            id: 24117258,
            uri: 'Country',
          },
          {
            description:
              'Represents states, provinces, territories, emirate…r countries as specified by ISO 3166-2 standards.',
            name: 'Country Subdivision',
            id: 25165834,
            uri: 'CountrySub',
          },
          {
            description:
              'Name for a person. Contains First Name, Middle Name and Last Name.',
            name: 'Person Name',
            id: 26214410,
            uri: 'PersonName',
          },
          {
            description: 'Physical address, such as mailing or postal address.',
            name: 'Physical Address',
            id: 27262986,
            uri: 'PhysicalAddress',
          },
        ],
      },
    ];

    return data;
  }

  getPopoverPickerItems = () => {
    const pickerdata1 = [{ "id": 1532945, "name": "Bright", "text": "Bright", "key": 1532945, "description": "" }, { "id": 1532948, "name": "Blue", "text": "Blue", "key": 1532948, "description": "" }, { "id": 1531924, "name": "Green", "text": "Green", "key": 1531924, "description": "" }, { "id": 1528852, "name": "Red", "text": "Red", "key": 1528852, "description": "" }, { "id": 1529876, "name": "White", "text": "White", "key": 1529876, "description": "" }, { "id": 1527828, "name": "Yellow", "text": "Yellow", "key": 1527828, "description": "" }]
    // const { comboBoxItems } = this.state;
    const columnConfig: TableColumnConfig[] = [
      {
        label: 'Name',
        key: 'name',
        sort: true,
        sortBy: 'name'
      },
      {
        label: 'Description',
        key: 'description',
        sort: true,
        sortBy: 'description',
      },
    ];

    const data = [
      {
        key: 'name',
        type: 'Tabular',
        isInitial: true,
        column: columnConfig,
        renderer: this.renderItems,
        value: pickerdata1
      },
    ];

    return data;
  }

  getComboBoxTableItems() {
    const { comboBoxItems } = this.state;
    const columnConfig: TableColumnConfig[] = [
      {
        label: 'Name',
        key: 'name',
        sort: true,
        sortBy: 'name'
      },
      {
        label: 'Description',
        key: 'description',
        sort: true,
        sortBy: 'description',
      },
    ];

    const data = [
      {
        key: 'name',
        type: 'Tabular',
        column: columnConfig,
        renderer: this.renderItems,
        value: comboBoxItems
      },
    ];

    return data;
  }

  handleSortComboBox = (field: string, order: string, sortBy: string) => {
    
    console.log("handleSortComboBox", field,order,sortBy);
    

    const { comboBoxItems } = this.state;

    const sortedData = comboBoxItems.sort((item1: any, item2: any) => {
      // Converting strings to uppercase so for comparisions there will be no issue
      const value1 = (item1[field] !== undefined && item1[field] !== null) ? (!sortBy ? item1[field].toUpperCase() : item1[field].toUpperCase()) : '';
      const value2 = (item2[field] !== undefined && item2[field] !== null) ? (!sortBy ? item2[field].toUpperCase() : item2[field].toUpperCase()) : '';

      if (value1 < value2) {
        return -1;
      }
      if (value1 > value2) {
        return 1;
      }

      // if both values are same
      return 0;
    });

    // If desending is required then reverse the data
    if (order === 'desc') {
      sortedData.sort((item1: any, item2: any) => {
        // Converting strings to uppercase so for comparisions there will be no issue
        const value1 = (item1[field] !== undefined && item1[field] !== null) ? (!sortBy ? item1[field].toUpperCase() : item1[field].toUpperCase()) : '';
        const value2 = (item2[field] !== undefined && item2[field] !== null) ? (!sortBy ? item2[field].toUpperCase() : item2[field].toUpperCase()) : '';

        if (value1 > value2) {
          return -1;
        }
        if (value1 < value2) {
          return 1;
        }
        // if both values are same
        return 0;
      });
    }

    // Set the sorted data to the state
    // Setting sorting field & order to the state
    this.setState({ comboBoxItems: sortedData });
    
  }

  setRangeSliderValue = (value: any) => {
    debugger;
    this.setState({ rangeSliderValue:value });
  }

  renderItems(item: any) {
    return (
      <div
        key={item.id}
        style={{ display: 'flex', justifyContent: 'space-around' }}
      >
        <div style={{ flexBasis: '30%' }}>
          <span>{item.name}</span>
        </div>
        <div style={{ flexBasis: '60%' }}>
          <span>{item.description}</span>
        </div>
      </div>
    );
  }

  popovertoggle(index: number) {
    const updatedPopoverActive: any = this.state.popoverActive;
    updatedPopoverActive[index] = !updatedPopoverActive[index];

    this.setState({
      popoverActive: updatedPopoverActive,
    });
  }

  popoverToggleContainer(index: number) {
    const updatedPopoverActiveContainer: any = this.state
      .popoverActiveContainer;
    updatedPopoverActiveContainer[index] = !updatedPopoverActiveContainer[index];

    this.setState({
      popoverActiveContainer: updatedPopoverActiveContainer,
    });
  }

  toggleAccordionOpen(index?: number) {
    this.setState({
      AccordionItemOpen: index,
    });
  }

  toggleAccordionClose(index?: number) {
    this.setState({
      AccordionItemClose: index,
    });
  }
  // valueUpdater(field: any) {
  //   return (value: any) => {
  //     this.setState({ [field]: value });
  //   };
  // }

  valueUpdater = (field: string) => {
    return (value: string) => {
      this.setState({ [field]: value });
    };
  }

  handleChange(value: string) {
    return (value: any) => 'this.setState({ [value]: value })';
  }

  newPopoverUpdate(e: any) {
    this.setState({
      popoverActive: !this.state.popoverActiveState,
      popoverAnchorEl: e
        ? (e.currentTarget as HTMLElement)
        : this.state.popoverAnchorEl,
    });
  }

  popoverUpdate(e: any) {
    this.setState({
      popoverActive: !this.state.popoverActive,
      anchorEl: e ? (e.currentTarget as HTMLElement) : this.state.anchorEl,
    });
  }

  popoverUpdate2 = (e: any) => {
    this.setState({
      popoverActive2: !this.state.popoverActive2,
      anchorEl2: e ? (e.currentTarget as HTMLElement) : this.state.anchorEl2,
    });
  }

  popoverUpdateContainer(e: any) {
    this.setState({
      popoverActiveContainer: !this.state.popoverActiveContainer,
      anchorEl: e.target as HTMLElement,
    });
  }
  onChildChanged(newState: boolean) {
    this.setState({ popoverActiveContainer: newState });
  }
  closed1(val: number) {
    console.log('called:', val);
  }
}

export default App;
