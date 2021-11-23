
import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { PICKER } from '../ThemeIdentifiers';
import Chip from '../Chip';
import { IAutoSuggestMethods, IItemList } from './Picker';
import * as baseTheme from './Picker.scss';
import Autosuggest from '../Autosuggest';
import Button from '../Button';

export interface IStateProps {
  chipListState: IItemList[];
  suggestions: any[];
  inputProps: any;
  value?: string;
  removable: boolean;
  multiSection?: any;
  reachedMax?: boolean;
}

export interface Props {
  theme?: any;
  placeholder?: string;
  autoSuggestMethods?: IAutoSuggestMethods;
  stateProps?: IStateProps;
}

class AutoSuggestText extends React.PureComponent<Props, {}> {

  getFilteredSuggestions = (list= this.props?.stateProps?.suggestions || [], selectedList=this.props?.stateProps?.chipListState || []) => {
    const newSuggestions = list.filter((it: any) => {
      let isValid = false;
      selectedList.forEach((cls: any) => {
        isValid = isValid || it.key === cls.key;
      });
      return !isValid;
    });
    return newSuggestions;
  }

  render() {
    const { theme, stateProps }: any = this.props;

    const className = classNames(
      theme.containerWrapper,
      this.props.stateProps ? this.props.stateProps.chipListState.length ? null : theme.empty : null
    );
    const isActive = this.props?.autoSuggestMethods?.getInputReference() === document.activeElement;
    const shouldRenderSuggestions = this.props?.autoSuggestMethods?.shouldRenderSuggestions || (() => { return false; }) as any;

    return (
      <div className={className}>
        {this.props.stateProps ? this.props.stateProps.chipListState.map((input: any) =>
          <Chip
            icon={input.icon}
            label={input.name}
            theme={theme}
            image={{ url: input.image }}
            removable={this.props.stateProps && this.props.stateProps.removable}
            onRemove={() => this.props.autoSuggestMethods ? this.props.autoSuggestMethods.chipRemove(input) : null} key={input.key}>
              {input.icon && <Button plain componentSize="slim" icon={input.icon} onClick={input.onIconClick}></Button>}
            </Chip>) : null
        }

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
              suggestions={this.getFilteredSuggestions()}
              onSuggestionsFetchRequested={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionsFetchRequested : () => {}}
              onSuggestionsClearRequested={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionsClearRequested : (() => {}) as any}
              getSuggestionValue={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.getSuggestionValue : (() => {}) as any}
              // shouldRenderSuggestions use for open list on Focus Event
              shouldRenderSuggestions={shouldRenderSuggestions}
              renderSuggestion={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSuggestion : (() => {}) as any}
              inputProps={this.props.stateProps ? this.props.stateProps.inputProps : null}
              renderSuggestionsContainer={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSuggestionsContainer : (() => {}) as any}
              shouldKeepSuggestionsOnSelect={isActive ? shouldRenderSuggestions : () => { }}
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
              suggestions={this.getFilteredSuggestions()}
              onSuggestionsFetchRequested={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionsFetchRequested : () => {}}
              onSuggestionsClearRequested={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onSuggestionsClearRequested : (() => {}) as any}
              getSuggestionValue={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.getSuggestionValue : (() => {}) as any}
              renderSuggestion={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSuggestion : (() => {}) as any}
              inputProps={this.props.stateProps ? this.props.stateProps.inputProps : null}
              renderSuggestionsContainer={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.renderSuggestionsContainer : (() => {}) as any}
            />
            : null
          }
      </div>
    );
  }
}

export default themr(PICKER, baseTheme)(AutoSuggestText) as ThemedComponentClass<Props, {}>;
