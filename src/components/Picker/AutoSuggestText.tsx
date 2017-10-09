
import * as Autosuggest from 'react-autosuggest';
import * as React from 'react';
import * as style from './Picker.scss';
import Chip from '../Chip';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { TEXT_FIELD } from '../ThemeIdentifiers';
import * as baseTheme from './TextField.scss';
export interface Props {
  theme?: any;
  placeholder?: string;
  autoSuggestMethods: any;
  stateProps: any;
}

class AutoSuggestText extends React.Component<Props, {}> {
  render() {
    const { theme }:any = this.props;

    console.log('this.props.stateProps.chipListState', this.props.stateProps.chipListState);


    return (
      <div className={this.props.stateProps.chipListState.length ? style.inputOutline : style.inputOutlineInit} aria-live="polite" id="ariaMessage">
         { this.props.stateProps.chipListState.map((input: any) => <Chip image={{ url: input.image }} removable={true} onRemove={() => this.props.autoSuggestMethods.chipRemove(input)} key={input.key} markedForDelete={input.markedForDelete} tabIndex={input.tabIndex}>{input.text}</Chip>) }
         <div aria-live="polite" id="ariaMessage">
         </div>
        <Autosuggest
          className={style.suggestionsContainer}
          suggestions={this.props.stateProps.suggestions}
          onSuggestionsFetchRequested={this.props.autoSuggestMethods.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.props.autoSuggestMethods.onSuggestionsClearRequested}
          getSuggestionValue={this.props.autoSuggestMethods.getSuggestionValue}
          onSuggestionSelected={this.props.autoSuggestMethods.onSuggestionSelected}
          renderSuggestion={this.props.autoSuggestMethods.renderSuggestion}
          highlightFirstSuggestion={true}
          inputProps={this.props.stateProps.inputProps}
          ref={this.props.autoSuggestMethods.storeInputReference}
          theme={{
            container: this.props.stateProps.chipListState.length ? style.container : style.containerInit,
            suggestion: style.cardItem,
            suggestionsList: style.suggestionsList,
            suggestionsContainer: style.suggestionsContainer,
            input: theme.input,
          }}
        />
      </div>
    );
  }
}

export default themr(TEXT_FIELD, baseTheme)(AutoSuggestText) as ThemedComponentClass<Props, {}>;
