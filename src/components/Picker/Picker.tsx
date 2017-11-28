import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { PICKER } from '../ThemeIdentifiers';
import TextField from './TextField';
import { DisplayMoreInfo } from './PickerEnum';
import * as Autosuggest from 'react-autosuggest';
import * as baseTheme from './Picker.scss';
import Card from './Card';

export interface IPickerInfo {
  id?: number;
  name: string;
  description: string;
  imageUrl?: string;
  url?: string;
}

export interface IStateProps {
  chipListState: IItemList[];
  suggestions: Autosuggest[];
  inputProps: Autosuggest.InputProps;
  value?: string;
}

export interface IItemList {
  key: number;
  image?: string;
  name: string;
  email: string;
  tabIndex?: number;
  alt?: string;
}

export interface IAutoSuggestMethods {
  onSuggestionsClearRequested(item: object): void;
  getSuggestions(value: string): any;
  getSuggestionValue(suggestion: object): void;
  onChange(event: Event, { newValue, method }: Autosuggest.ChangeEvent): void;
  onfocus(e: Event): void;
  onFocusOut(e: Event): void;
  onInputFocus(e: Event): void;
  storeFocus(e: Event): void;
  onKeyDown(e: React.FormEvent<Element>): void;
  onClick(e: React.FormEvent<Element>): void;
  onSuggestionsFetchRequested({ value }: Autosuggest.SuggestionsFetchRequest): void;
  onSuggestionSelected(event: React.FormEvent<Element>, { suggestion }: Autosuggest.SuggestionSelectedEventData<any>): void;
  chipRemove(item: IItemList | number): void;
  renderSuggestion(suggestion: IItemList, { value, valueBeforeUpDown }: Autosuggest.InputValues): JSX.Element;
  storeInputReference(autosuggest: Autosuggest): void;
  updateList(input: React.FormEvent<Element>): void;
}

export type Type = 'hide' | 'mark';

export interface State {
  people: string;
  searchItems: IPickerInfo[];
  selectedItems: IPickerInfo[];
  moreInfo: boolean;
  value: string;
  input: any;
  suggestions: Autosuggest[];
  chipListState: IItemList[];
  focusArr: any;
  itemsList: IItemList[];
  focused: number;
}

export interface Props {
  selectedResultsBehavior?: Type;
  filterPlaceHolder?: string;
  maxSelectedItems?: number;
  minSelectedItems?: number;
  chipComponent?: React.ReactNode;
  searchResultComponent?: React.ReactNode;
  moreInfoComponent?: React.ReactNode;
  source: IPickerInfo[];
  moreInfoComponentShowOn?: DisplayMoreInfo;
  style?: React.CSSProperties;
  theme?: any;
  searchBehavior?(): void;
  onSelect?(item: React.FormEvent<HTMLElement>): void;
  onRemove?(item: React.FormEvent<HTMLElement>): void;
  onMoreInfo?(): void;
}

class Picker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      people: '',
      searchItems: [],
      selectedItems: [],
      moreInfo: false,
      value: '',
      input: () => { },
      suggestions: [],
      chipListState: [],
      focusArr: [],
      itemsList:
      [
        { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', email: 'test@gmail.com' },
        { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
        { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', email: 'jane@gmail.com' },
        { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', email: 'yahoogmail@gmail.com' },
        { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
        { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'slkjgmail@gmail.com' },
      ],
      focused: -1,

    };
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
        return this.state.itemsList.filter((language: IItemList) => regex.test(language.name));
      },
      getSuggestionValue: (suggestion: IItemList) => {
        return suggestion.name;
      },
      onChange: (event: Event, { newValue, method }: Autosuggest.ChangeEvent) => {
        this.setState({
          value: newValue,
        });
      },
      onfocus: (e: Event) => {
        const chipListState = this.state.chipListState.slice();
        const item = Object.assign({}, chipListState[0], { tabIndex: -1 });
        chipListState[0] = item;
        if (this.state.focused === -1) this.setState({ chipListState });
        this.setState({ focused: 0 });
      },
      onFocusOut: (e: Event) => {
        const chipListState = this.state.chipListState.slice();
        const item = Object.assign({}, chipListState[0], { tabIndex: 0 });
        chipListState[0] = item;
        if (this.state.focused === 0) this.setState({ chipListState });
        this.setState({ focused: -1 });
      },
      onInputFocus: (e: Event) => {
        const chipListState = this.state.chipListState.slice();
        if (chipListState.length && this.state.focused !== -1) {
          const item = Object.assign({}, chipListState[0], { tabIndex: 0 });
          chipListState[0] = item;
          this.setState({ chipListState });
        }
        this.setState({ focused: -1 });
      },
      storeFocus: (e: Event) => {
        if (!this.state.focusArr.includes(e) && e !== null) {
          const focusArr = this.state.focusArr.length ? this.state.focusArr.concat([e]) : [e];
          this.setState({ focusArr });
        }
      },
      onKeyDown: (e: any, focusArr?: any, chipListState?: any) => {
        if (e.keyCode === 37) {
          const focused = this.state.focused === 0 ? this.state.chipListState.length - 1 : this.state.focused - 1;
          this.state.focusArr[focused].focus();
          this.setState({ focused });
        } else if (e.keyCode === 39) {
          const focused = this.state.focused === this.state.chipListState.length - 1 ? 0 : this.state.focused + 1;
          this.state.focusArr[focused].focus();
          this.setState({ focused });
        } else if (e.keyCode === 8) {
          autoSuggestMethods.chipRemove(this.state.focused);
        } else if (typeof e.chipRemove === 'number') {
          let focused;
          const number = e.chipRemove;
          if (number === chipListState.length) focused = number - 1;
          else if (number > 0) focused = number;
          else focused = 0;
          if (focusArr.length) focusArr[focused].focus();
          else this.state.input.focus();
          this.setState({ focused });
        }
      },
      onClick: (e: React.FormEvent<Element>) => {
        console.log('clicked!');
      },
      onSuggestionsFetchRequested: ({ value }: Autosuggest.SuggestionsFetchRequest) => {
        this.setState({
          suggestions: autoSuggestMethods.getSuggestions(value),
        });
      },
      updateList: (input: any) => {
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
        });
      },

      chipRemove: (item: IItemList) => {
        const number = typeof item === 'number' ? item : this.state.chipListState.indexOf(item);
        const existingChipList = this.state.chipListState;
        const addedItem = this.state.chipListState.slice(number, number + 1);
        const addedItemObj = Object.assign({}, addedItem[0], { tabIndex: -1 });
        const chipListState = existingChipList.slice(0, number).concat(existingChipList.slice(number + 1));
        const itemsList = this.state.itemsList.concat([addedItemObj]);
        const focusArr = this.state.focusArr.slice(0, number).concat(this.state.focusArr.slice(number + 1));
        if (chipListState.length) chipListState[0].tabIndex = 0;
        let focused;
        if (number === chipListState.length) focused = number - 1;
        else if (number === chipListState.length && number > 0) focused = number;
        else focused = 0;
        this.setState({
          itemsList,
          chipListState,
          focusArr,
        });
        // , autoSuggestMethods.onKeyDown({ chipRemove: number }, focusArr, chipListState))

      },
      renderSuggestion: (suggestion: IItemList, { isHighlighted, query }: any) => {
        const index = suggestion.name.toLowerCase().indexOf(query.toLowerCase());
        const nameBefore = suggestion.name.slice(0, index);
        const queryData = suggestion.name.slice(index, index + query.length);
        const nameAfter = suggestion.name.slice(index + query.length);

        if (isHighlighted) return <Card isHighlighted={true} image={suggestion.image} nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} email={suggestion.email} alt={suggestion.alt} />;
        else return (
          <Card image={suggestion.image} nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} email={suggestion.email} alt={suggestion.alt} />
        );
      },
      storeInputReference: (autosuggest: Autosuggest) => {

        if (autosuggest !== null) {
          if (this.state.input !== autosuggest.props.input) {
            this.setState({ input: autosuggest.props.input });
          }
        }
      },
    };
    const { value, suggestions, chipListState } = this.state;
    const inputProps = {
      value,
      onChange: autoSuggestMethods.onChange,
      onFocus: autoSuggestMethods.onInputFocus,
      'aria-label': 'Picker input',
    };
    const stateProps: any = { value, suggestions, chipListState, inputProps };

    const {
      filterPlaceHolder,
      selectedResultsBehavior,
      moreInfoComponent,
      chipComponent,
      searchResultComponent,
      searchBehavior = this.handleChange,
      moreInfoComponentShowOn = DisplayMoreInfo.onClick,
      onSelect = this.handleSelect,
      onRemove = this.handleRemove,
      onMoreInfo = this.handleMoreInfo,
      theme,
    } = this.props;
    let className = '';
    if (selectedResultsBehavior === 'hide') {
      className = theme.pickerResultHide;
    } else {
      className = theme.pickerResultShow;
    }
    return (
      <div>
        <div>
          <div className={className}>
            {
              this.state.selectedItems.map((i) => {
                return React.createElement(chipComponent as React.ComponentClass<{ clickable: boolean, removable: boolean, onRemove(item: React.FormEvent<HTMLElement>): void }>, { onRemove, key: i.id, clickable: false, removable: true }, [i.name]);
              })
            }
          </div>
          <TextField
            autoSuggest={true}
            autoSuggestMethods={autoSuggestMethods}
            label="People"
            value={this.state.people}
            placeholder={filterPlaceHolder}
            onChange={searchBehavior}
            stateProps={stateProps}
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
