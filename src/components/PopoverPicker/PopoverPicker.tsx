import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { POPOVERPICKER } from '../ThemeIdentifiers';
import * as Autosuggest from 'react-autosuggest';
import * as baseTheme from './PopoverPicker.scss';
import Card from '../Picker/Card';
import Chip from '../Chip';
import { classNames } from '@shopify/react-utilities/styles';
import TabulerSuggest from './TabulerSuggest';
import Icon, { IconList } from '../Icon';

export interface IStateProps {
  chipListState: any[];
  suggestions: Autosuggest[];
  inputProps: Autosuggest.InputProps;
  value?: string;
  listType?: any;
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
  onSuggestionSelected(event: any, { suggestion }: Autosuggest.SuggestionSelectedEventData<Autosuggest>): void;
  chipRemove(item: any | number): void;
  renderSuggestion(suggestion: any, { isHighlighted, query }: IRenderSuggestionProp): JSX.Element;
  storeInputReference(autosuggest: Autosuggest): void;
  updateList(input: HTMLElement): void;
  storeFocus(e: HTMLElement): void;
  onChangeText?(valaue: string): void;
  sortEntity?(field: string, order: string, sortBy: string): void;
}

export type Type = 'hide' | 'mark';

export interface State {
  people: string;
  searchItems: any[];
  selectedItems: any[];
  moreInfo: boolean;
  value: string;
  input: HTMLElement[];
  suggestions: Autosuggest[];
  chipListState: any[];
  focusArr: HTMLElement[];
  itemsList: any[];
  focused: number;
  number: number;
  isFocused: boolean;
  hasValue: boolean;
}

export interface Props {
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
  noOptionsMessage?: string;
  source: any[];
  style?: React.CSSProperties;
  theme?: any;
  searchBehavior?(): void;
  onSelect?(item: any): void;
  onChangeText?(valaue: string): void;
  sortEntity?(field: string, order: string, sortBy: string): void;
  onRemove?(item: any): void;
  onMoreInfo?(): void;
  suffix?: string;
  // defaultSelectedItems for picker
  defaultSelectedItems?: any[];
  // Unique ID
  componentId?: string;
  listType?: any;
}

class PopoverPicker extends React.PureComponent<Props, State> {
  private getUniqueID = createUniqueIDFactory('PopoverPicker');
  private id = this.getUniqueID();
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
      hasValue: Boolean(props.defaultSelectedItems && props.defaultSelectedItems.length),
      focused: 0,
      number: 0,
    };
  }

  componentWillReceiveProps(newProps: Props) {
    if (JSON.stringify(newProps.source) !== JSON.stringify(this.props.source)) {
      this.setState({ itemsList: newProps.source });
    }
  }
  render() {

    function escapeRegexCharacters(str: string) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const autoSuggestMethods: IAutoSuggestMethods = {
      onSuggestionsClearRequested: () => this.setState({ suggestions: [] }),

      onChangeText: (value: string) => {
        if (this.props.onChangeText) {
          this.props.onChangeText(value);
        }
      },

      sortEntity: (field: string, order: string, sortBy: string) => {
        if (this.props.sortEntity) {
          this.props.sortEntity(field, order, sortBy);
        }
      },

      getSuggestions: (value: string) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        if (escapedValue === '') {
          return [];
        }
        const regex = new RegExp(escapedValue, 'i');
        return this.state.itemsList.filter((language: any) => regex.test(language.name ? language.name : ''));
      },

      getSuggestionValue: (suggestion: any) => {
        return suggestion.name;
      },

      onChange: (event: React.FormEvent<any>, { newValue, method }: Autosuggest.ChangeEvent) => {
        this.setState({
          value: newValue,
        });
      },

      onKeyDown: (e: KeyboardEvent, focusArr?: any, chipListState?: any[]) => {
        if ((e.keyCode === 8) && this.state.chipListState.length && !this.state.value.length) {

          const number = this.state.chipListState.length;
          const chipListState = this.state.chipListState.slice(0, this.state.chipListState.length - 1);
          const selectedChip = this.state.chipListState.slice(this.state.chipListState.length - 1)[0];
          const itemsList = this.state.itemsList.concat(selectedChip);
          const focusArr = this.state.focusArr.slice(0, number).concat(this.state.focusArr.slice(number + 1));
          
          let focused = 0;
          if (number === chipListState.length) focused = number - 1;
          else if (number === chipListState.length && number > 0) focused = number;
          else focused = 0;

          this.setState({
            chipListState,
            itemsList,
            focusArr,
            number,
            focused,
            hasValue: chipListState.length ? true : false
          });
          if (this.props.onRemove) {
            this.props.onRemove(selectedChip);
          }
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

      onSuggestionSelected: (event: any, { suggestion = null }: Autosuggest.SuggestionSelectedEventData<any>) => {
        let suggestionData = suggestion || event;
        suggestionData.text = suggestionData.name;
        autoSuggestMethods.updateList(suggestionData);
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

      renderSuggestion: (suggestion: any, { isHighlighted, query }: IRenderSuggestionProp) => {
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
        helpText,
        label,
        labelHidden = false,
        loading = false,
        disabled = false,
        searchBehavior = this.handleChange,
        theme,
        listType = {},
        noOptionsMessage = ''
    } = this.props;
    const { isFocused, hasValue, value, suggestions, chipListState } = this.state;

    const inputProps: Autosuggest.InputProps & { disabled: boolean } = {
      value,
      onChange: autoSuggestMethods.onChange,
      onKeyDown: autoSuggestMethods.onKeyDown,
      onFocus: autoSuggestMethods.onFocus,
      onBlur: autoSuggestMethods.onBlur,
      disabled: disabled || (!!this.props.maxSelectedItems && this.props.maxSelectedItems <= chipListState.length),
    };

    const stateProps: IStateProps = { value, suggestions, chipListState, inputProps };

    let suffixIcon: React.ReactNode = null;
    if (this.props.suffix) {
      const { suffix } = this.props;
      suffixIcon = <Icon componentColor="inkLightest" source= {suffix as keyof typeof IconList} />;
    }

    const classNameChip = classNames(
      theme.containerWrapper,
      stateProps ? stateProps.chipListState.length ? null : theme.empty : null
    );

    const { itemsList } = this.state;

    let tabularData = 
      {
        key: listType && listType.key || '' ,
        type: listType && listType.type || '',
        column: listType && listType.columnConfig || [],
        value: itemsList || [],
        suggestions
      }
    ; 

    return (
      <div id={this.id}>
        <div className={classNameChip}>
          {stateProps ? stateProps.chipListState.map((input: any) => <Chip icon={input.icon} onIconClick={input.onIconClick} theme={theme} image={{ url: input.image }} removable={!disabled} onRemove={() => autoSuggestMethods ? autoSuggestMethods.chipRemove(input) : null} key={input.key}>{input.text}</Chip>) : null}
          <TabulerSuggest
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
          />
        </div>
      </div>
    );
  }

  private handleChange = (value: string) => {
    this.setState({ ['people']: value });
    this.setState({ ['searchItems']: value ? this.props.source.filter(x => x.name.startsWith(value)) : [] });
  }
}

export { PopoverPicker as UnthemedPopoverPicker };
export default themr(POPOVERPICKER, baseTheme)(PopoverPicker) as ThemedComponentClass<Props, State>;
