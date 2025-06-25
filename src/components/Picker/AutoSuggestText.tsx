
import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { isEqual } from 'lodash';
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
  processingIds?: any[];
}

export interface Props {
  theme?: any;
  placeholder?: string;
  autoSuggestMethods?: IAutoSuggestMethods;
  stateProps?: IStateProps;
  handleInputFocus?: any;
}

interface State {
  visibleCount: number;
  showAll: boolean;
}

class AutoSuggestText extends React.PureComponent<Props, State> {

  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      visibleCount: this.props?.stateProps?.chipListState.length || 0,
      showAll: false,
    };
  }

  componentDidUpdate(prevProps: Props) {
    const chipList = this.props?.stateProps?.chipListState;
    const prevChipList = prevProps?.stateProps?.chipListState;
    if (!isEqual(chipList, prevChipList) && !this.state.showAll) {
      this.updateVisibleItems();
    }
  }

  componentDidMount() {
    this.updateVisibleItems();
  }

  updateVisibleItems = () => {
    if (this.state.showAll) return; // show all when expanded

    const container = this.containerRef.current;
    if (!container) return;
    const children = Array.from(container.children);
    const chipList: any = this.props?.stateProps?.chipListState;
    const containerWidth = container.offsetWidth;
    let usedWidth = 0;
    let count = 0;

    for (let i = 0; i < chipList.length; i++) {
      const chip = children[i] as HTMLElement;
      if (!chip) break;

      const chipWidth = chip.offsetWidth + 6; // margin
      const remaining = chipList.length - i - 1;
      const moreChipWidth = remaining > 0 ? 70 : 0; // approx width of "+X" chip

      if (usedWidth + chipWidth + moreChipWidth > containerWidth) break;

      usedWidth += chipWidth;
      count++;
    }

    this.setState({ visibleCount: count });
  };

  getFilteredSuggestions = (list= this.props?.stateProps?.suggestions || [], selectedList= this.props?.stateProps?.chipListState || []) => {
    const newSuggestions = list.filter((it: any) => {
      let isValid = false;
      selectedList.forEach((cls: any) => {
        isValid = isValid || it === cls;
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
    const chipList = this.props?.stateProps?.chipListState || [];
    const { visibleCount, showAll } = this.state;

    const visibleItems = chipList.slice(0, visibleCount);
    const hiddenCount = chipList.length - visibleCount;

    const isActive = this.props?.autoSuggestMethods?.getInputReference() === document.activeElement;
    const shouldRenderSuggestions = this.props?.autoSuggestMethods?.shouldRenderSuggestions || (() => { return false; }) as any;
    const processingIds:any = this.props?.stateProps?.processingIds || [];
    return (
      <div onClick={this.props.handleInputFocus} className={className}>
        <div 
          ref={this.containerRef}
          style={{ width: '100%', marginTop: '1.1rem', }}>
          {(showAll ? chipList : visibleItems).map((input: any) =>
            <Chip
              icon={input.icon}
              label={input.name}
              theme={theme}
              image={{ url: input.image }}
              removable={!processingIds.includes(input.id) && this.props.stateProps && this.props.stateProps.removable}
              onRemove={() => this.props.autoSuggestMethods ? this.props.autoSuggestMethods.chipRemove(input) : null}
              key={input.key}>
              {input.icon && <Button plain componentSize="slim" icon={input.icon} onClick={input.onIconClick}></Button>}
            </Chip>)
          }
          {hiddenCount > 0 &&
            (
              <Chip
                label={`${showAll ? 'hide' : hiddenCount}`}
                theme={theme}
                clickable
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState(prevState => {
                    return {
                      ...prevState,
                      showAll: !prevState.showAll
                    }
                  });
                }}
              >
              </Chip>
            )
          }
        </div>

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
