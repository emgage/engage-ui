
import * as Autosuggest from 'react-autosuggest';
import * as React from 'react';
import * as style from './Picker.scss';
import Chip from '../Chip';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { TEXT_FIELD } from '../ThemeIdentifiers';
import { IAutoSuggestMethods, IItemList } from './Picker';

import * as baseTheme from './TextField.scss';

export interface IStateProps {
  chipListState: IItemList[];
  suggestions: Autosuggest[];
  inputProps: Autosuggest.InputProps;
  value?: string;
}

export interface Props {
  theme?: any;
  placeholder?: string;
  autoSuggestMethods?: IAutoSuggestMethods;
  stateProps?: IStateProps;
}

class AutoSuggestText extends React.Component<Props, {}> {
  private refHolder: any;
  render() {
    const { theme }: any = this.props;

    return (
      <div className={this.props.stateProps ? this.props.stateProps.chipListState.length ? style.inputOutline : style.inputOutlineInit : null}>
        {this.props.stateProps ? this.props.stateProps.chipListState.map((input: any) => <Chip image={{ url: input.image }} removable={true} onRemove={() => this.props.autoSuggestMethods ? this.props.autoSuggestMethods.chipRemove(input) : null} key={input.key}>{input.text}</Chip>) : null}
        <Autosuggest
          className={style.suggestionsContainer}
          suggestions={this.props.stateProps ? this.props.stateProps.suggestions : null}
          onSuggestionsFetchRequested={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionsFetchRequested : null}
          onSuggestionsClearRequested={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionsClearRequested : null}
          getSuggestionValue={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.getSuggestionValue : null}
          onSuggestionSelected={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionSelected : null}
          renderSuggestion={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSuggestion : null}
          highlightFirstSuggestion={true}
          inputProps={this.props.stateProps ? this.props.stateProps.inputProps : null}
          ref={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.storeInputReference : this.refHolder}
          theme={{
            container: this.props.stateProps ? (this.props.stateProps.chipListState.length ? style.container : style.containerInit) : null,
            suggestion: style.cardItem,
            suggestionsList: style.suggestionsList,
            input: theme.input,
          }}
        />
      </div>
    );
  }
}

export default themr(TEXT_FIELD, baseTheme)(AutoSuggestText) as ThemedComponentClass<Props, {}>;
