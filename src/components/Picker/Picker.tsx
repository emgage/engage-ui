import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { PICKER } from '../ThemeIdentifiers';
import TextField from './TextField';
import { DisplayMoreInfo } from './PickerEnum';
import * as Autosuggest from 'react-autosuggest';
import * as baseTheme from './Picker.scss';

export interface IPickerInfo {
  id?: number;
  name: string;
  description: string;
  imageUrl?: string;
  url?: string;
}

export interface IStateProps {
  chipListState: object[];
  suggestions: Autosuggest;
  inputProps: Autosuggest.InputProps;
  value?: string;
}

export interface IAutoSuggestMethods {
  onSuggestionsClearRequested(item: object): void;
  getSuggestions(value: string): void;
  getSuggestionValue(suggestion: object): void;
  onChange(event: Event, { newValue, method }: Autosuggest.ChangeEvent): void;
  onfocus(e: Event): void;
  onFocusOut(e: Event): void;
  onInputFocus(e: Event): void;
  storeFocus(e: Event): void;
  onKeyDown(e: React.FormEvent<Element>): void;
  onClick(e: React.FormEvent<Element>): void;
  onSuggestionsFetchRequested({ value }: Autosuggest.SuggestionsFetchRequest): void;
  onSuggestionSelected(event: React.FormEvent<Element>, { suggestion }: Autosuggest.SuggestionSelectedEventData<Element>): void;
  chipRemove(item: number | string): void;
  renderSuggestion(suggestion: object, { value, valueBeforeUpDown }: Autosuggest.InputValues): JSX.Element;
  storeInputReference(autosuggest: Autosuggest): void;
}

export type Type = 'hide' | 'mark';

export interface State {
  people: string;
  searchItems: IPickerInfo[];
  selectedItems: IPickerInfo[];
  moreInfo: boolean;
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
  autoSuggest?: boolean;
  autoSuggestMethods?: IAutoSuggestMethods;
  stateProps?: IStateProps;
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
    };
  }
  render() {
    const {
      autoSuggestMethods,
      autoSuggest,
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
            autoSuggest={autoSuggest}
            autoSuggestMethods={autoSuggestMethods}
            label="People"
            value={this.state.people}
            placeholder={filterPlaceHolder}
            onChange={searchBehavior}
            stateProps={this.props.stateProps}
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
