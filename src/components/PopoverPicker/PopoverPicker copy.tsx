import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { POPOVERPICKER } from '../ThemeIdentifiers';
import * as baseTheme from './PopoverPicker.scss';
import Chip from '../Chip';
import { classNames } from '@shopify/react-utilities/styles';
import Icon, { IconList } from '../Icon';
import TextField from '../TextField';
import Popover from '../Popover';
import { Table } from '../Table';

export interface IStateProps {
  chipListState: any[];
  suggestions: any[];
  inputProps: any;
  value?: string;
  listType?: any;
}

export interface State {
  value: string;
  input: HTMLElement[];
  suggestions: any[];
  chipListState: any[];
  focusArr: HTMLElement[];
  itemsList: any[];
  focused: number;
  number: number;
  isFocused: boolean;
  hasValue: boolean;

  initialItems: any;
  anchorEl?: HTMLElement;
  popoverWidth: string;
  isEmpty: boolean;
  serverSort?: any;
}


const escapeRegexCharacters = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export interface Props {
  // Additional hint text to display.
  helpText?: React.ReactNode;
  // Label for the input.
  label?: string;
  // Visually hide the label.
  labelHidden?: boolean;
  // Display loading indicator
  loading?: boolean;
  // Disable Picker
  disabled?: boolean;
  maxSelectedItems?: number;
  minSelectedItems?: number;
  noOptionsMessage?: string;
  source: any[];
  style?: React.CSSProperties;
  theme?: any;
  onSelect?(item: any): void;
  onChangeText?(valaue: string): void;
  sortEntity?(field: string, order: string, sortBy: string): void;
  onRemove?(item: any): void;
  onMoreInfo?(): void;
  suffix?: string;
  // defaultSelectedItems for picker
  defaultSelectedItems?: any[];
  listType?: any;
}

class PopoverPicker extends React.PureComponent<Props, State> {
  private getUniqueID = createUniqueIDFactory('PopoverPicker');
  private id = this.getUniqueID();
  private wrapperRef: HTMLDivElement;
  constructor(props: Props) {
    super(props);
    const { source } = props;

    this.state = {
      input: [],
      suggestions: [],
      chipListState: props.defaultSelectedItems || [],
      focusArr: [],
      itemsList: this.props.source,
      isFocused: false,
      hasValue: Boolean(props.defaultSelectedItems && props.defaultSelectedItems.length),
      focused: 0,
      number: 0,

      initialItems: source,
      popoverWidth: '',
      value: '',
      isEmpty: false,
      serverSort: {
        field: '',
        order: '',
        callback: this.sortEntity
      },
    };
  }

  sortEntity = (field: string, order: string, sortBy: string) => {
    
    this.setState({
      serverSort: {
        ...this.state.serverSort,
        field,
        order,
      }
    });

    if (this.props.sortEntity) {
      this.props.sortEntity(field, order, sortBy);
    }
  };
  
  componentDidMount() {
    // document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    // document.removeEventListener('click', this.handleClickOutside);
  }

  componentWillReceiveProps(newProps: any) {
    if (JSON.stringify(newProps.source) !== JSON.stringify(this.props.source)) {
      this.setState({ itemsList: newProps.source });
      
    }

    if (JSON.stringify(newProps.defaultSelectedItems) !== JSON.stringify(this.props.defaultSelectedItems)) {
      const { defaultSelectedItems = [] } = newProps;
      if (newProps.source.length && defaultSelectedItems.length) {
        defaultSelectedItems.forEach((chip: any) => {
          const currentText = newProps.source.find((source: any) => source.id === (chip.id || chip.key) || source.key === (chip.id || chip.key));
          if (currentText) {
            chip.text = currentText.name;
          }
        });
      }
      this.setState({ chipListState: defaultSelectedItems, hasValue: Boolean(defaultSelectedItems && defaultSelectedItems.length)});
    }
    
  }

  handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ value: '' });
      this.onSuggestionsClearRequested();
    }
  }

  setWrapperRef = (node: any) => {
    if (node && !this.state.popoverWidth) {
      this.setState({ popoverWidth: node.offsetWidth });
      this.wrapperRef = node;
    }
  }

  setWrapperTableRef = (node: any) => {
    if (node) {
      this.wrapperRef = node;
    }
  }

  addRenderer = (items: any, cloneItems: any) => {
    if (items.renderer) {
      cloneItems['renderer'] = items.renderer;
    }
    return cloneItems;
  }

  onChange = (value: string, event: React.FormEvent<HTMLElement>) => {
    let newItems = this.state.initialItems;

    const { listType = {} } = this.props;
    if (value && value !== '') {
      let cloneItems = this.state.initialItems;
      cloneItems = this.addRenderer(this.state.itemsList, cloneItems);

      const itemValues = cloneItems;
      const key = listType.key;
      let data;
      data = itemValues.filter((itv: any) => {
        const smallVal = value.toLowerCase();
        const flag = key ? ((itv[key].toLowerCase()).includes(smallVal)) : (itv.toLowerCase()).includes(smallVal);
        return flag;
      });
      cloneItems = data;
      newItems = cloneItems;
    }

    if (this.onSuggestionsFetchRequested) {
      this.onSuggestionsFetchRequested(value);
    }
    if (this.onSuggestionsClearRequested) {
      if (value === "") {
        this.onSuggestionsClearRequested();
      }
    }
    if (this.props.onChangeText) {
      this.props.onChangeText(value);
    }
    this.setState({
      anchorEl: event.target as HTMLElement,
      value: value,
      itemsList: newItems
    });
  }

  handleClick = (data: string | any) => {
    const value = typeof data === 'string' ? JSON.parse(data) : data;
    if (this.onSuggestionSelected) {
      this.onSuggestionSelected(value);
    }
    if (this.onSuggestionsClearRequested) {
      this.onSuggestionsClearRequested();
    }
    this.setState({ value: '' });
  }

  chipRemove = (item: any) => {
    const number = typeof item === 'number' ? item : this.state.chipListState.indexOf(item);
    const existingChipList = this.state.chipListState;
    const addedItem = this.state.chipListState.slice(number, number + 1);
    const addedItemObj = Object.assign({}, addedItem[0], { tabIndex: -1 });
    const chipListState = existingChipList.slice(0, number).concat(existingChipList.slice(number + 1));
    const itemsList = [addedItemObj, ...this.state.itemsList];
    const focusArr = this.state.focusArr.slice(0, number).concat(this.state.focusArr.slice(number + 1));
    if (chipListState.length) chipListState[0].tabIndex = 0;
    let focused = 0;
    if (number === chipListState.length) focused = number - 1;
    else if (number === chipListState.length && number > 0) focused = number;
    else focused = 0;
    this.setState({
      itemsList,
      chipListState,
      focusArr,
      number,
      focused,
      hasValue: chipListState.length ? true : false
    });

    if (this.props.onRemove) {
      this.props.onRemove(item);
    }
  }

  onKeyDown = (e: KeyboardEvent) => {
    if ((e.keyCode === 8) && this.state.chipListState.length && !this.state.value.length) {
      const chipListState = this.state.chipListState.slice(0, this.state.chipListState.length - 1);
      const selectedChip = this.state.chipListState.slice(this.state.chipListState.length - 1)[0];
      const itemsList = this.state.itemsList.concat(selectedChip);
      this.setState({
        chipListState,
        itemsList,
      });
      if (this.props.onRemove) {
        this.props.onRemove(selectedChip);
      }
    }
  }

  onSuggestionsClearRequested = () => this.setState({ suggestions: [] });
  
  getSuggestions = (value: string) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp(escapedValue, 'i');
    let chipListState = this.state.chipListState.map(chip => chip.name);
    return this.state.itemsList.filter((item: any) => regex.test(item.name ? item.name : '') && !chipListState.includes(item.name));
  }

  onSuggestionsFetchRequested = (value: any) => {
    if (value) {
      this.setState({
        suggestions: this.getSuggestions(value),
      });
    }
  }

  onSuggestionSelected = (suggestion: any) => {
    let suggestionData = suggestion;
    suggestionData.text = suggestionData.name;
    this.updateList(suggestionData);
    const chipListState = this.state.chipListState.concat(suggestionData);
    const item = Object.assign({}, chipListState[0], { tabIndex: 0 });
    chipListState[0] = item;
    this.setState({
      chipListState,
      value: '',
      hasValue: true,
    });

    if (this.props.onSelect) {
      this.props.onSelect(suggestionData);
    }
  }

  updateList = (input: any) => {
    console.log("input", input);
    
    const langIndex = this.state.itemsList.indexOf(input);
    const itemsListLength = this.state.itemsList;
    const newLangState = itemsListLength.slice(0, langIndex).concat(itemsListLength.slice(langIndex + 1, itemsListLength.length));
    this.setState({
      itemsList: newLangState,
    });
  }

  render() {
    
    const {
      anchorEl,
      popoverWidth,
      serverSort,
      value,
      suggestions,
      chipListState,
      hasValue,
      isFocused,
    } = this.state;

    const {
      label,
      disabled,
      loading,
      helpText,
      labelHidden = false,
      theme,
      noOptionsMessage = '',
      listType = {}
    } = this.props;

    const classNameChip = classNames(
      theme.containerWrapper,
      chipListState.length ? null : theme.empty
    );

    let suffixIcon: React.ReactNode = null;
    if (this.props.suffix) {
      const { suffix } = this.props;
      suffixIcon = <Icon componentColor="inkLightest" source= {suffix as keyof typeof IconList} />;
    }

    let open: boolean = ((suggestions && suggestions.length !== 0) && ( this.state.value.length !== 0) )|| false;

    const isEmptyResult: boolean = this.state.value.length !== 0 && suggestions.length === 0 || false;

    return (
      <div id={this.id}>
        <div className={classNameChip}>
          {chipListState.length !== 0 ? chipListState.map((input: any) => <Chip icon={input.icon} onIconClick={input.onIconClick} theme={theme} image={{ url: input.image }} removable={!disabled} onRemove={() => this.chipRemove(input)} key={input.key}>{input.text}</Chip>) : null}
          <div key={this.id} className={theme.tabulerSuggestContainer} ref={node => this.setWrapperRef(node)} >
            <TextField
              type="text"
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              value={value}
              theme={theme}
              loading={loading}
              disabled={disabled}
              autoComplete={false}
              helpText={helpText}
              label={label ? label : ''}
              labelHidden={labelHidden}
              suffix={suffixIcon}
              hasValue={hasValue}
              isFocused={isFocused}
              backdropHidden={true}
            />

              {open && <Popover
                addArrow={false}
                componentStyle={{ maxHeight: window.outerHeight < 768 ? 500 : 800, overflow: 'auto', width: popoverWidth }}
                anchorEl={anchorEl}
                open={open}
                theme={theme}
                preferredAlignment="left"
              >
                <div  data-isparent={true} data-key={listType.key ? listType.key : false} className={theme.itemContainer}>
                  <Table
                    sorting="all"
                    data={suggestions || []}
                    column={listType && listType.columnConfig || []}
                    onRowClick={this.handleRowClick}
                    rowCallbackValue="id"
                    serverSort={serverSort}
                    // ref={node => this.setWrapperTableRef(node)}
                  />
                </div>
              </Popover>}

              {
                isEmptyResult &&
                  <Popover
                    addArrow={false}
                    anchorEl={anchorEl}
                    open={isEmptyResult}
                    theme={theme}
                    preferredAlignment="left"
                  >
                    <div className={theme.NoOptionMessage}>{noOptionsMessage}</div>
                  </Popover>
              }
          </div>
          {/* <TabulerSuggest
            items={tabularData}
            autoSuggestMethods={autoSuggestMethods}  
            disabled={disabled}
            helpText={helpText}
            label={label ? label : ''}
            labelHidden={labelHidden}
            loading={loading}
            onChange={searchBehavior}
            theme={theme}
            suffix={suffixIcon}
            hasValue={hasValue}
            isFocused={isFocused}
            noOptionsMessage={noOptionsMessage}
          /> */}
        </div>
      </div>
    );
  }
  
  private handleRowClick = (data: any) => {
    const dataId: number = data;
    const { itemsList } = this.state;
    const findIndex = itemsList.findIndex((i: any) => i.id === dataId);

    if (findIndex !== -1 && this.handleClick) {
      this.handleClick(itemsList[findIndex]);
    }
  }
}

export { PopoverPicker as UnthemedPopoverPicker };
export default themr(POPOVERPICKER, baseTheme)(PopoverPicker) as ThemedComponentClass<Props, State>;
