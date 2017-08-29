import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { PICKER } from '../ThemeIdentifiers';
import { DisplayMoreInfo } from './PickerEnum';
import * as Autosuggest from 'react-autosuggest';
import * as baseTheme from './Picker.scss';

export interface State {
  people: string;
  searchItems: IPickerInfo[];
  selectedItems: IPickerInfo[];
  moreInfo: boolean;
  value?: any;
  suggestions?: any;
}
export interface IPickerInfo {
  id?: number;
  name: string;
  description: string;
  imageUrl?: string;
  url?: any;
}
export interface IPickerSource<T> {
  performFilter(filterString: string): Promise<T[]>;
}
export type Type = 'hide' | 'mark';
export interface Props {
  required?: boolean;
  selectedResultsBehavior?: Type;
  filterPlaceHolder?: string;
  maxSelectedItems?: number;
  minSelectedItems?: number;
  millisecondsToWaitBeforeSearch?: number;
  chipComponent: React.ReactNode;
  searchResultComponent: React.ReactNode;
  moreInfoComponent?: React.ReactNode;
  source: IPickerSource<IPickerInfo>;
  moreInfoComponentShowOn?: DisplayMoreInfo;
  style?: React.CSSProperties;
  theme?: any;
  searchBehavior?(): void;
  onSelect?(item: any): void;
  onRemove?(item: any): void;
  onMoreInfo?(): void;
}

const languages = [
  {
    name: 'C',
    year: 1972,
  },
  {
    name: 'Elm',
    year: 2012,
  },
];

const getSuggestions = (value: any) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue,
  );
};
const getSuggestionValue = (suggestion:any) => suggestion.name;

const renderSuggestion = (suggestion:any) => (
  <div>
    {suggestion.name}
  </div>
);

class Picker extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      people: '',
      searchItems: [],
      selectedItems: [],
      moreInfo: false,
      value: '',
      suggestions: [],
    };
  }
  onChange = (event:any, newValue:any) => {
    this.setState({
      value: newValue,
    });
  }
  onSuggestionsFetchRequested = (value:any) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  }
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }
  render() {
    console.log('Autosuggest:', Autosuggest);
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      placeholder: 'Type a programming language',
      onChange: this.onChange,
    };

    return (
            <div>
                <div>
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={inputProps}
                    />
                </div>
            </div>
    );
  }
}

export { Picker as UnthemedPicker };
export default themr(PICKER, baseTheme)(Picker) as ThemedComponentClass<Props, State>;

