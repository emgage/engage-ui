import * as Autosuggest from 'react-autosuggest';
import * as React from 'react';
import Card from './Card';
import * as style from './Picker.scss';
import Chip from '../Chip';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { TEXT_FIELD } from '../ThemeIdentifiers';

import * as baseTheme from './TextField.scss';

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
  itemsList?: object[];
  theme?: any;
  placeholder?: string;
  autoSuggestMethods: any;
  stateProps: any;
}

class AutoSuggestText extends React.Component<Props, {}> {

  render() {
    const { theme }:any = this.props;
    console.log('stateprops', this.props);


    return (
      <div className={this.props.stateProps.chipListState.length ? style.inputOutline : style.inputOutlineInit}>
        { this.props.stateProps.chipListState.map((input: any) => <Chip image={{ url: input.image }} removable={true} onRemove={() => this.props.autoSuggestMethods.chipRemove(input)} key={input.key} markedForDelete={input.markedForDelete}>{input.text}</Chip>) }
        <Autosuggest
          className={style.suggestionsContainer}
          suggestions={this.props.stateProps.suggestions}
          onSuggestionsFetchRequested={this.props.autoSuggestMethods.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.props.autoSuggestMethods.onSuggestionsClearRequested()}
          getSuggestionValue={this.props.autoSuggestMethods.getSuggestionValue()}
          onSuggestionSelected={this.props.autoSuggestMethods.onSuggestionSelected()}
          renderSuggestion={renderSuggestion}
          highlightFirstSuggestion={true}
          inputProps={this.props.stateProps.inputProps}
          ref={this.props.autoSuggestMethods.storeInputReference()}
          theme={{
            container: this.props.stateProps.chipListState.length ? style.container : style.containerInit,
            suggestions: style.cardItem,
            suggestionsList: style.suggestionsList,
            input: theme.input,
          }}
        />
      </div>
    );
  }
}

export default themr(TEXT_FIELD, baseTheme)(AutoSuggestText) as ThemedComponentClass<Props, {}>;
