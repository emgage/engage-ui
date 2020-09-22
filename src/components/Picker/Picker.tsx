import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { PICKER } from '../ThemeIdentifiers';
import TextField from '../TextField';
import Icon, { IconList } from '../Icon';
import { DisplayMoreInfo } from './PickerEnum';
import * as Autosuggest from 'react-autosuggest';
import * as baseTheme from './Picker.scss';
// TODO: Why are we using this custom card and not the Card component?
import Card from './Card';

export interface IPickerInfo {
  id?: number;
  key?: number;
  image?: string;
  name: string;
  description: string;
  email?: string;
  icon?: string;
}

export interface IStateProps {
  chipListState: IItemList[];
  suggestions: Autosuggest[];
  inputProps: Autosuggest.InputProps;
  value?: string;
}

export interface IItemList {
  key?: number;
  image?: string;
  name?: string;
  email?: string;
  tabIndex?: number;
  alt?: string;
  icon?: string;
  text?: string;
}

export interface IRenderSuggestionProp {
  isHighlighted: string;
  query: string;
}

export interface IAutoSuggestMethods {
  onSuggestionsClearRequested(item: object): void;
  getSuggestions(value: string): any[];
  getSuggestionValue(suggestion: object): void;
  onBlur(event: React.FormEvent<any>): void;
  onChange(event: React.FormEvent<any>, { newValue, method }: Autosuggest.ChangeEvent): void;
  onFocus(event: React.FormEvent<any>): void;
  onKeyDown(e: React.FormEvent<Element> | KeyboardEvent): void;
  onSuggestionsFetchRequested({ value }: Autosuggest.SuggestionsFetchRequest): void;
  onSuggestionSelected(event: React.FormEvent<Element>, { suggestion }: Autosuggest.SuggestionSelectedEventData<Autosuggest>): void;
  chipRemove(item: IItemList | number): void;
  renderSuggestion(suggestion: IItemList, { isHighlighted, query }: IRenderSuggestionProp): JSX.Element;
  storeInputReference(autosuggest: Autosuggest): void;
  updateList(input: HTMLElement): void;
  storeFocus(e: HTMLElement): void;
}

export type Type = 'hide' | 'mark';

export interface State {
  people: string;
  searchItems: IPickerInfo[];
  selectedItems: IPickerInfo[];
  moreInfo: boolean;
  value: string;
  input: HTMLElement[];
  suggestions: Autosuggest[];
  chipListState: IItemList[];
  focusArr: HTMLElement[];
  itemsList: IItemList[];
  focused: number;
  number: number;
  isFocused: boolean;
  hasValue: boolean;
}

export interface Props {
  selectedResultsBehavior?: Type;
  // Hint text to display.
  filterPlaceHolder?: string;
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
  chipComponent?: React.ReactNode;
  searchResultComponent?: React.ReactNode;
  moreInfoComponent?: React.ReactNode;
  autoSuggest?: boolean;
  source: IPickerInfo[];
  moreInfoComponentShowOn?: DisplayMoreInfo;
  style?: React.CSSProperties;
  theme?: any;
  searchBehavior?(): void;
  onSelect?(item: any): void;
  onRemove?(item: any): void;
  onMoreInfo?(): void;
  suffix?: string;
  // defaultSelectedItems for picker
  defaultSelectedItems?: IItemList[];
  // Unique ID
  componentId?: string;
}

class Picker extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      people: '',
      searchItems: [],
      selectedItems: [],
      moreInfo: false,
      value: '',
      input: [],
      suggestions: [],
      chipListState: props.defaultSelectedItems || [],
      focusArr: [],
      itemsList: this.props.source,
      isFocused: false,
      hasValue: false,
      focused: 0,
      number: 0,
    };
  }

  componentWillReceiveProps(newProps: Props) {
    if (JSON.stringify(newProps.source) !== JSON.stringify(this.props.source)) {
      const { chipListState } = this.state;
      if (newProps.source.length && chipListState.length) {
        chipListState.forEach((chip: any) => {
          const currentText = newProps.source.find((source: IPickerInfo) => source.id === (chip.id || chip.key) || source.key === (chip.id || chip.key));
          if (currentText) {
            chip.text = currentText.name;
          }
        });
      }

      this.setState({ chipListState, itemsList: newProps.source });
    }
  }
  render() {

    function escapeRegexCharacters(str: string) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const autoSuggestMethods: IAutoSuggestMethods = {
      onSuggestionsClearRequested: () => this.setState({ suggestions: [] }),

      getSuggestions: (value: string) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        if (escapedValue === '') {
          return [];
        }
        const regex = new RegExp(escapedValue, 'i');
        return this.state.itemsList.filter((language: IItemList) => regex.test(language.name ? language.name : ''));
      },

      getSuggestionValue: (suggestion: IItemList) => {
        return suggestion.name;
      },

      onChange: (event: React.FormEvent<any>, { newValue, method }: Autosuggest.ChangeEvent) => {
        this.setState({
          value: newValue,
        });
      },

      onKeyDown: (e: KeyboardEvent, focusArr?: any, chipListState?: IItemList[]) => {
        if ((e.keyCode === 8) && this.state.chipListState.length && !this.state.value.length) {
          const chipListState = this.state.chipListState.slice(0, this.state.chipListState.length - 1);
          const selectedChip = this.state.chipListState.slice(this.state.chipListState.length - 1)[0];
          const itemsList = this.state.itemsList.concat(selectedChip);
          this.setState({
            chipListState,
            itemsList,
          });
        }
      },

      onFocus: (event: React.FormEvent<any>) => {
        this.setState({ isFocused: true });
      },

      onBlur: (event: React.FormEvent<any>) => {
        this.setState({ isFocused: false,
          value: '' });
      },

      onSuggestionsFetchRequested: ({ value }: Autosuggest.SuggestionsFetchRequest) => {
        if (value) {
          this.setState({
            suggestions: autoSuggestMethods.getSuggestions(value),
          });
        }
      },

      updateList: (input: HTMLElement) => {
        const langIndex = this.state.itemsList.indexOf(input);
        const itemsListLength = this.state.itemsList;
        const newLangState = itemsListLength.slice(0, langIndex).concat(itemsListLength.slice(langIndex + 1, itemsListLength.length));
        this.setState({
          itemsList: newLangState,
        });
      },

      onSuggestionSelected: (event: React.FormEvent<Element>, { suggestion }: Autosuggest.SuggestionSelectedEventData<any>) => {
        suggestion.text = suggestion.name;
        autoSuggestMethods.updateList(suggestion);
        const chipListState = this.state.chipListState.concat(suggestion);
        const item = Object.assign({}, chipListState[0], { tabIndex: 0 });
        chipListState[0] = item;
        this.setState({
          chipListState,
          value: '',
          hasValue: true,
        });

        if (this.props.onSelect) {
          this.props.onSelect(suggestion);
        }
      },

      chipRemove: (item: any) => {
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
      },

      storeInputReference: (autosuggest: Autosuggest) => {
        if (autosuggest !== null) {
          if (this.state.input !== autosuggest.props.inputProps.value) {
            this.setState({ input: autosuggest.props.inputProps.value });
          }
        }
      },

      storeFocus: (e: HTMLElement) => {
        if (!this.state.focusArr.includes(e) && e !== null) {
          const focusArr = this.state.focusArr.length ? this.state.focusArr.concat([e]) : [e];
          this.setState({ focusArr });
        }
      },

      renderSuggestion: (suggestion: IItemList, { isHighlighted, query }: IRenderSuggestionProp) => {
        const index = (suggestion.name ? suggestion.name.toLowerCase().indexOf(query.toLowerCase()) : 0);
        const nameBefore = (suggestion.name ? suggestion.name.slice(0, index) : '');
        const queryData = (suggestion.name ? suggestion.name.slice(index, index + query.length) : '');
        const nameAfter = (suggestion.name ? suggestion.name.slice(index + query.length) : '');

        if (isHighlighted) {
          return <Card isHighlighted={true} image={suggestion.image} nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} email={suggestion.email} alt={suggestion.alt} />;
        }

        return (
          <Card image={suggestion.image} nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} email={suggestion.email} alt={suggestion.alt} />
        );
      },
    };

    const {
        autoSuggest = false,
        helpText,
        label,
        labelHidden = false,
        loading = false,
        disabled = false,
        selectedResultsBehavior,
        moreInfoComponent,
        chipComponent,
        searchResultComponent,
        searchBehavior = this.handleChange,
        moreInfoComponentShowOn = DisplayMoreInfo.onClick,
        onSelect = this.handleSelect,
        onRemove = this.handleRemove,
        onMoreInfo = this.handleMoreInfo,
        componentId = '',
        theme,
    } = this.props;
    const { isFocused, hasValue, value, suggestions, chipListState, selectedItems } = this.state;
    const inputProps: Autosuggest.InputProps = {
      value,
      onChange: autoSuggestMethods.onChange,
      onKeyDown: autoSuggestMethods.onKeyDown,
      onFocus: autoSuggestMethods.onFocus,
      onBlur: autoSuggestMethods.onBlur,
    };
    const stateProps: IStateProps = { value, suggestions, chipListState, inputProps };

    let className = '';
    if (selectedResultsBehavior === 'hide') {
      className = theme.pickerResultHide;
    } else {
      className = theme.pickerResultShow;
    }

    let suffixIcon: React.ReactNode = null;
    if (this.props.suffix) {
      const { suffix } = this.props;
      suffixIcon = <Icon componentColor="inkLightest" source= {suffix as keyof typeof IconList} />;
    }

    return (
      <div id={componentId}>
        <div>
          <div className={className}>
            {
              selectedItems.map((i) => {
                return React.createElement(chipComponent as React.ComponentClass<{ clickable: boolean, removable: boolean, onRemove(item: React.FormEvent<HTMLElement>): void }>, { onRemove, key: i.id, clickable: false, removable: true }, [i.name]);
              })
            }
          </div>
          <TextField
            autoSuggest={autoSuggest && !disabled}
            autoSuggestMethods={autoSuggestMethods}
            helpText={helpText}
            itemSelected={!!chipListState.length}
            label={label ? label : ''}
            labelHidden={labelHidden}
            loading={loading}
            value={this.state.people}
            onChange={searchBehavior}
            stateProps={stateProps}
            theme={theme}
            suffix={suffixIcon}
            isFocused={isFocused}
            hasValue={hasValue}
            disabled={disabled}
          />
        </div>
        <div>
          {
            this.state.searchItems.map((i) => {
              return React.createElement(searchResultComponent as React.ComponentClass<{ clickable: boolean, moreInfoComponent: React.ReactNode, moreInfoComponentShowOn: DisplayMoreInfo, onClick(item: React.FormEvent<HTMLFormElement>): void, handleMoreInfo(): void }>, { moreInfoComponent, moreInfoComponentShowOn, key: i.id, clickable: true, onClick: onSelect, handleMoreInfo: onMoreInfo }, [i.name]);
            })
          }
        </div>
      </div>
    );
  }

  private handleChange = (value: string) => {
    this.setState({ ['people']: value });
    this.setState({ ['searchItems']: value ? this.props.source.filter(x => x.name.startsWith(value)) : [] });
  }

  private handleRemove = (event: React.SyntheticEvent<any>) => {
    const item = this.state.selectedItems.find(x => x.name === event.currentTarget.previousElementSibling.innerText);
    const items = this.state.selectedItems;
    if (this.props.minSelectedItems !== undefined && this.props.minSelectedItems === items.length) {
      return;
    }
    if (item !== undefined) {
      const index: number = items.indexOf(item);
      if (index !== -1) {
        items.splice(index, 1);
      }
    }
    this.setState({ ['selectedItems']: items });
    return;
  }

  private handleSelect = (event: React.FormEvent<HTMLFormElement>) => {
    const item = this.state.searchItems.find(x => x.name === event.currentTarget.text);
    const items = this.state.selectedItems;
    if (this.props.maxSelectedItems !== undefined && this.props.maxSelectedItems === items.length) {
      return;
    }
    if (item !== undefined) {
      if (!items.some(x => x.name === item.name)) {
        items.push(item);
      }
    }
    this.setState({ ['selectedItems']: items });
    this.setState({ ['searchItems']: [] });
    return;
  }

  private handleMoreInfo = () => {
    this.setState({ ['moreInfo']: !this.state.moreInfo });
    return;
  }
}

export { Picker as UnthemedPicker };
export default themr(PICKER, baseTheme)(Picker) as ThemedComponentClass<Props, State>;
