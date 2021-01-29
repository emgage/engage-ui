
import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { PICKER } from '../ThemeIdentifiers';
import Chip from '../Chip';
import { IAutoSuggestMethods } from './Picker';
import * as baseTheme from './Picker.scss';
import TabulerSuggest from './TabulerSuggest';

export interface IStateProps {
  chipListState: any[];
  suggestions: Autosuggest[];
  inputProps: Autosuggest.InputProps;
  value?: string;
  listType?: any;
}

export interface Props {
  theme?: any;
  placeholder?: string;
  autoSuggestMethods?: IAutoSuggestMethods;
  stateProps?: IStateProps;
  disabled?: boolean;
}

class AutoSuggestText extends React.PureComponent<Props, {}> {
  private refHolder: any;
  render() {
    const { theme, disabled }: any = this.props;

    const className = classNames(
      theme.containerWrapper,
      this.props.stateProps ? this.props.stateProps.chipListState.length ? null : theme.empty : null
    );

    let tabularData : any = '';
    
    if (this.props.stateProps && this.props.stateProps.listType && this.props.stateProps.listType.type) {
      tabularData = 
        {
          key: this.props.stateProps && this.props.stateProps.listType && this.props.stateProps.listType.key || '' ,
          type: this.props.stateProps && this.props.stateProps.listType && this.props.stateProps.listType.type || '',
          column: this.props.stateProps && this.props.stateProps.listType && this.props.stateProps.listType.columnConfig || [],
          value: this.props.stateProps ? this.props.stateProps.suggestions : []
        }
      ; 
      
    }


    return (
      <div className={className}>
        {this.props.stateProps ? this.props.stateProps.chipListState.map((input: any) => <Chip icon={input.icon} onIconClick={input.onIconClick} theme={theme} image={{ url: input.image }} removable={!disabled} onRemove={() => this.props.autoSuggestMethods ? this.props.autoSuggestMethods.chipRemove(input) : null} key={input.key}>{input.text}</Chip>) : null}

        {
          this.props.stateProps && this.props.stateProps.listType && this.props.stateProps.listType.type === "Tabuler" ? 
          <TabulerSuggest
            items={tabularData}
            autoSuggestMethods={this.props.autoSuggestMethods}  
            disabled={disabled}
          />
        :
        <Autosuggest
          className={theme.suggestionsContainer}
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
            ...theme,
            container: theme.container,
            suggestion: theme.suggestionItem,
            suggestionsList: theme.suggestionsList,

            input: theme.input,
          }}
        />
        }
      </div>
    );
  }
}

export default themr(PICKER, baseTheme)(AutoSuggestText) as ThemedComponentClass<Props, {}>;
