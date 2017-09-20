import * as Autosuggest from 'react-autosuggest';
import * as React from 'react';
import Card from './Card';
import * as style from './Picker.scss';
import Chip from '../Chip';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { TEXT_FIELD } from '../ThemeIdentifiers';

import * as baseTheme from '../Textfield/TextField.scss';

function escapeRegexCharacters(str:any) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderSuggestion(suggestion:any, { isHighlighted, query }:any) {
  const index = suggestion.name.toLowerCase().indexOf(query.toLowerCase());
  const nameBefore = suggestion.name.slice(0, index);
  const queryData = suggestion.name.slice(index, index + query.length);
  const nameAfter = suggestion.name.slice(index + query.length);

  if (isHighlighted) return <Card isHighlighted={true} image={suggestion.image} nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} email={suggestion.email}/>;
  else return (
    <Card image={suggestion.image} nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} email={suggestion.email}/>
  );
}

export interface Props {
  itemsList: { key: any, image?: string, email?: string, grey?: boolean, name?: any, markedForDelete?: boolean }[];
  theme?: any;
}
export interface State {
  value: string;
  input: any;
  suggestions: object[];
  chipListState: { key: any, image?: string, text: string, email?: string, grey?: boolean, markedForDelete?:boolean }[];
  itemsList: { key: any, image?: string, email?: string, grey?: boolean, name?: any, markedForDelete?: boolean }[];
}
class AutoSuggestText extends React.Component<Props, State> {
  constructor(props:any) {
    super(props);
    this.state = {
      value: '',
      input: {},
      suggestions: [],
      chipListState: [],
      itemsList: props.itemsList,
    };
  }
  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  }
  getSuggestions = (value:any) => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp(escapedValue, 'i');

    return this.state.itemsList.filter(language => regex.test(language.name));
  }

  getSuggestionValue = (suggestion:any) => {
    return suggestion.name;
  }
  onChange = (event:object, { newValue, method }:any) => {
    this.setState({
      value: newValue,
    });
  }

  onKeyDown = (e:any) => {
    if ((e.keyCode === 8) && this.state.chipListState.length && !this.state.value.length) {
      const yellowed = this.state.chipListState.slice(this.state.chipListState.length - 1);
      if (yellowed[0]['markedForDelete']) {
        const chipListState = this.state.chipListState.slice(0, this.state.chipListState.length - 1);
        const language = this.state.chipListState.slice(this.state.chipListState.length - 1)[0];
        delete language['text'];
        language['markedForDelete'] = false;
        const itemsList = this.state.itemsList.concat(language);
        this.setState({
          chipListState,
          itemsList,
        });
      } else {
        yellowed[0]['markedForDelete'] = true;

        this.setState({
          chipListState: this.state.chipListState,
        });
      }
    } else if (this.state.chipListState.length && !this.state.value.length && !(e.keyCode === 38) && !(e.keyCode === 40)) {
      if (this.state.chipListState[this.state.chipListState.length - 1]['markedForDelete']) {
        this.state.chipListState[this.state.chipListState.length - 1]['markedForDelete'] = false;
        this.setState({ chipListState: this.state.chipListState });
      }
    }
  }

  // handler = (e:any) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   console.log('stop!')
  // }

  onSuggestionsFetchRequested = ({ value }:any) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
    console.log('onSuggestionsFetchRequested')
    // document.addEventListener('click',this.handler,true);
  }

  updateList = (input: any) => {
    const langIndex = this.state.itemsList.indexOf(input);
    const itemsListLength = this.state.itemsList;
    const newLangState = itemsListLength.slice(0, langIndex).concat(itemsListLength.slice(langIndex + 1, itemsListLength.length));
    this.setState({ itemsList: newLangState });
  }

  onSuggestionSelected = (event:any, { suggestion }: any) => {
    suggestion.text = suggestion.name;

    this.updateList(suggestion);
    const chipListState = this.state.chipListState.concat(suggestion);
    this.setState({
      chipListState,
      value: '',
    });
  }

  chipRemove = (input:any) => {
    input['markedForDelete'] = false;
    const index = this.state.chipListState.indexOf(input);
    const chipLength = this.state.chipListState;
    const newChipState = chipLength.slice(0, index).concat(chipLength.slice(index + 1, chipLength.length));
    this.setState({ chipListState: newChipState });
    const itemsListList = this.state.itemsList.concat(input);
    this.setState({ itemsList: itemsListList });
    this.state.input.focus();
  }

  storeInputReference = (autosuggest:any) => {
    if (autosuggest !== null) {
      this.setState({ input: autosuggest.input });
    }
  }

  render() {
    const { value, suggestions, chipListState }:any = this.state;
    const { theme }:any = this.props;
    const inputProps = {
      value,
      placeholder: '',
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
    };

    return (
      <div className={style.inputOutline}>
        { chipListState.map((input: any) => <Chip image={{ url: input.image }} removable={true} onRemove={() => this.chipRemove(input)} key={input.key} markedForDelete={input.markedForDelete}>{input.text}</Chip>) }
        <Autosuggest
          className={style.suggestionsContainer}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          onSuggestionSelected={this.onSuggestionSelected}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
          ref={this.storeInputReference}
          theme={{
            container: style.container,
            suggestions: style.cardItem,
            suggestionsList: style.suggestionsList,
            input: theme.input,
          }}
        />
      </div>
    );
  }
}

export default themr(TEXT_FIELD, baseTheme)(AutoSuggestText) as ThemedComponentClass<Props, State>;
