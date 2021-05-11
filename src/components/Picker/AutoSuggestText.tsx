
import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { PICKER } from '../ThemeIdentifiers';
import Chip from '../Chip';
import { IAutoSuggestMethods, IItemList } from './Picker';
import * as baseTheme from './Picker.scss';
import Autosuggest from '../Autosuggest';
export interface IStateProps {
  chipListState: IItemList[];
  suggestions: any[];
  inputProps: any;
  value?: string;
  removable: boolean;
  multiSection?: any;
  reachedMax?: boolean;
  justClickedOnSuggestionsContainer?: boolean;
}

export interface Props {
  theme?: any;
  placeholder?: string;
  autoSuggestMethods?: IAutoSuggestMethods;
  stateProps?: IStateProps;
}

class AutoSuggestText extends React.PureComponent<Props, {}> {
  render() {
    const { theme, stateProps }: any = this.props;

    const className = classNames(
      theme.containerWrapper,
      this.props.stateProps ? this.props.stateProps.chipListState.length ? null : theme.empty : null
    );

    return (
      <div className={className}>
        {this.props.stateProps ? this.props.stateProps.chipListState.map((input: any) => <Chip icon={input.icon} onIconClick={input.onIconClick} theme={theme} image={{ url: input.image }} removable={this.props.stateProps && this.props.stateProps.removable} onRemove={() => this.props.autoSuggestMethods ? this.props.autoSuggestMethods.chipRemove(input) : null} key={input.key}>{input.text}</Chip>) : null}

        {
          !stateProps.reachedMax ?
           this.props.autoSuggestMethods && this.props.autoSuggestMethods.shouldRenderSuggestions ?
            <Autosuggest
              theme={{
                ...theme,
                container: theme.container,
                suggestion: theme.suggestionItem,
                suggestionsList: theme.suggestionsList,
                input: theme.input,
                suggestionsContainer: theme.suggestionsContainer
              }}
              multiSection={this.props.stateProps && this.props.stateProps.multiSection ? this.props.stateProps.multiSection : false}
              renderSectionTitle={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSectionTitle : (() => { }) as any}
              getSectionSuggestions={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.getSectionSuggestions : (() => { }) as any}
              onSuggestionSelected={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionSelected : () => {} }
              suggestions={this.props.stateProps ? this.props.stateProps.suggestions : []}
              onSuggestionsFetchRequested={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionsFetchRequested : () => {}}
              onSuggestionsClearRequested={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionsClearRequested : (() => {}) as any}
              getSuggestionValue={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.getSuggestionValue : (() => {}) as any}
              // shouldRenderSuggestions use for open list on Focus Event
              shouldRenderSuggestions={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.shouldRenderSuggestions : (() => { }) as any}
              renderSuggestion={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSuggestion : (() => {}) as any}
              inputProps={this.props.stateProps ? this.props.stateProps.inputProps : null}
              renderSuggestionsContainer={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSuggestionsContainer : (() => {}) as any}
              justClickedOnSuggestionsContainer={this.props.stateProps && this.props.stateProps.justClickedOnSuggestionsContainer ? this.props.stateProps.justClickedOnSuggestionsContainer : false}
            />
            :
            <Autosuggest
              theme={{
                ...theme,
                container: theme.container,
                suggestion: theme.suggestionItem,
                suggestionsList: theme.suggestionsList,
                input: theme.input,
                suggestionsContainer: theme.suggestionsContainer
              }}
              multiSection={this.props.stateProps && this.props.stateProps.multiSection ? this.props.stateProps.multiSection : false}
              renderSectionTitle={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSectionTitle : (() => { }) as any}
              getSectionSuggestions={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.getSectionSuggestions : (() => { }) as any}
              onSuggestionSelected={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionSelected : () => {} }
              suggestions={this.props.stateProps ? this.props.stateProps.suggestions : []}
              onSuggestionsFetchRequested={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionsFetchRequested : () => {}}
              onSuggestionsClearRequested={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionsClearRequested : (() => {}) as any}
              getSuggestionValue={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.getSuggestionValue : (() => {}) as any}
              renderSuggestion={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSuggestion : (() => {}) as any}
              inputProps={this.props.stateProps ? this.props.stateProps.inputProps : null}
              renderSuggestionsContainer={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSuggestionsContainer : (() => {}) as any}
              justClickedOnSuggestionsContainer={this.props.stateProps && this.props.stateProps.justClickedOnSuggestionsContainer ? this.props.stateProps.justClickedOnSuggestionsContainer : false}
            />
            : null
          }
      </div>
    );
  }
}

export default themr(PICKER, baseTheme)(AutoSuggestText) as ThemedComponentClass<Props, {}>;
