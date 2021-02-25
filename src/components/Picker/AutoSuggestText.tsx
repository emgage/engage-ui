
import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { PICKER } from '../ThemeIdentifiers';
import Chip from '../Chip';
// import * as style from './Picker.scss';

import { IAutoSuggestMethods, IItemList } from './Picker';
import * as baseTheme from './Picker.scss';

export interface IStateProps {
  chipListState: IItemList[];
  suggestions: Autosuggest[];
  inputProps: any;
  value?: string;
  removable: boolean;
  multiSection?: any;
}

export interface Props {
  theme?: any;
  placeholder?: string;
  autoSuggestMethods?: IAutoSuggestMethods;
  stateProps?: IStateProps;
}

class AutoSuggestText extends React.PureComponent<Props, {}> {
  private refHolder: any;
  render() {
    const { theme }: any = this.props;

    const className = classNames(
      theme.containerWrapper,
      this.props.stateProps ? this.props.stateProps.chipListState.length ? null : theme.empty : null
    );

    return (
      <div className={className}>
        {this.props.stateProps ? this.props.stateProps.chipListState.map((input: any) => <Chip icon={input.icon} onIconClick={input.onIconClick} theme={theme} image={{ url: input.image }} removable={this.props.stateProps && this.props.stateProps.removable} onRemove={() => this.props.autoSuggestMethods ? this.props.autoSuggestMethods.chipRemove(input) : null} key={input.key}>{input.text}</Chip>) : null}

        {
          this.props.autoSuggestMethods && this.props.autoSuggestMethods.isShouldRenderSuggestions ?
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
              ref={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.storeInputReference : this.refHolder}
              renderSuggestionsContainer={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSuggestionsContainer : (() => {}) as any}
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
              ref={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.storeInputReference : this.refHolder}
              renderSuggestionsContainer={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSuggestionsContainer : (() => {}) as any}
            />
          }
      </div>
    );
  }
}

export default themr(PICKER, baseTheme)(AutoSuggestText) as ThemedComponentClass<Props, {}>;
