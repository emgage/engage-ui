import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { PICKER } from '../ThemeIdentifiers';
import TextField from '../TextField';
import Icon, { IconList } from '../Icon';
import * as Autosuggest from 'react-autosuggest';
import * as baseTheme from './Picker.scss';
// TODO: Why are we using this custom card and not the Card component?
import Popover from '../Popover';
import FlexBox from '../FlexBox';

let resultsBehaviorOpen: boolean = false;

export interface IStateProps {
  chipListState: IItemList[];
  suggestions: Autosuggest[];
  inputProps: any;
  value?: string;
  removable: boolean;
  multiSection?: any;
}

export interface IItemList {
  name: string;
  tabIndex?: number;
}

export interface IRenderSuggestionProp {
  isHighlighted: string;
  query: string;
}

export interface IAutoSuggestMethods {
  onSuggestionsClearRequested(item: object): void;
  getSuggestions(value: string): any[];
  getSuggestionValue(suggestion: object): void;
  onBlur(event: React.FormEvent<any>): void;
  onChange(event: React.FormEvent<any>, { newValue, method }: Autosuggest.ChangeEvent): void;
  onFocus(event: React.FormEvent<any>): void;
  onKeyDown(e: React.FormEvent<Element> | KeyboardEvent): void;
  onSuggestionsFetchRequested({ value }: any): void;
  onSuggestionSelected(event: React.FormEvent<Element>, { suggestion }: Autosuggest.SuggestionSelectedEventData<Autosuggest>): void;
  chipRemove(item: IItemList | number): void;
  renderSuggestion(suggestion: IItemList, { isHighlighted, query }: IRenderSuggestionProp): JSX.Element;
  storeInputReference(autosuggest: Autosuggest): void;
  updateList(input: HTMLElement): void;
  storeFocus(e: HTMLElement): void;
  shouldRenderSuggestions?(): void;
  renderSuggestionsContainer?({ containerProps, children, query }: any): void;
  renderSectionTitle?(section: any): void;
  getSectionSuggestions?(section: any): void;
  isShouldRenderSuggestions?: boolean;
}

export interface State {
  moreInfo: boolean;
  value: string;
  input: HTMLElement[];
  suggestions: Autosuggest[];
  chipListState: IItemList[];
  focusArr: HTMLElement[];
  itemsList: IItemList[];
  focused: number;
  number: number;
  isFocused: boolean;
  hasValue: boolean;
  noSuggestions: boolean;
  anchorEl?: HTMLElement;
  popoverWidth: string;
}

export interface Props {
  // Additional hint text to display.
  helpText?: React.ReactNode;
  // Label for the input.
  label?: string;
  // Visually hide the label.
  labelHidden?: boolean;
  // Display loading indicator
  loading?: boolean;
  // Disable Picker
  disabled?: boolean;
  maxSelectedItems?: number;
  minSelectedItems?: number;
  chipComponent?: React.ReactNode;
  moreInfoComponent?: React.ReactNode;
  autoSuggest?: boolean;
  source: any[];
  style?: React.CSSProperties;
  theme?: any;
  onFocus?(event: React.FormEvent<HTMLElement>): void;
  searchBehavior?(value: string): void;
  onSelect?(item: any): void;
  onRemove?(item: any): void;
  onMoreInfo?(): void;
  renderPickerHeader?(section: any): React.ReactElement<any>;
  renderPickerItem?(suggestion: any, isHighlighted?: string, query?: string): React.ReactElement<any>;
  columns?: any[];
  suffix?: string;
  // defaultSelectedItems for picker
  defaultSelectedItems?: IItemList[];
  // Unique ID
  componentId?: string;
  shouldRenderSuggestions?: boolean;
  noOptionsMessage?: string;
  readOnly?: boolean;
}

const DefaultCard = (props: any) => {
  const { isHighlighted = false } = props;
  const cardBackground = (isHighlighted) ? baseTheme.cardItem + ' ' + baseTheme.highlighted : baseTheme.cardItem;
  return (
    <div>
      <div className={cardBackground}>
      <FlexBox align="Center">
        {
          props.image ?
            <span><img className={baseTheme.avatarImage} src={props.image} alt={props.alt} aria-hidden={!props.nameAfter || !props.nameBefore} /></span>
            : null
        }
        <span className={baseTheme.nameStyle}>
          <span>{props.nameBefore}</span>
          <span className={baseTheme.hinting}>{props.bold}</span>
          <span>{props.nameAfter}</span>
        </span>
        <span className={baseTheme.emailStyle} aria-hidden>{props.email}</span>
        </FlexBox>
      </div>
    </div>
  );
};

class Picker extends React.PureComponent<Props, State> {
  public wrapperRef: HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      popoverWidth: '',
      moreInfo: false,
      value: '',
      input: [],
      suggestions: [],
      chipListState: props.defaultSelectedItems || [],
      focusArr: [],
      itemsList: this.props.source,
      isFocused: false,
      hasValue: Boolean(props.defaultSelectedItems && props.defaultSelectedItems.length),
      focused: 0,
      number: 0,
      noSuggestions: false
    };
  }

  setWrapperRef = (node: any) => {
    if (node && !this.state.popoverWidth) {
      this.setState({ popoverWidth: node.offsetWidth });
      this.wrapperRef = node;
    }
  }

  componentWillReceiveProps(newProps: Props) {
    if (JSON.stringify(newProps.source) !== JSON.stringify(this.props.source)) {
      const { chipListState } = this.state;
      if (newProps.source.length && chipListState.length) {
        chipListState.forEach((chip: any) => {
          const currentText = newProps.source.find((source: any) => source.id === (chip.id || chip.key) || source.key === (chip.id || chip.key));
          if (currentText) {
            chip.text = currentText.name;
          }
        });
      }
      this.setState({ chipListState, suggestions: newProps.source || [], itemsList: newProps.source });
    }
    if (JSON.stringify(newProps.defaultSelectedItems) !== JSON.stringify(this.props.defaultSelectedItems)) {
      const hasValue: boolean = Boolean(newProps.defaultSelectedItems && newProps.defaultSelectedItems.length);
      this.setState({ hasValue, chipListState: newProps.defaultSelectedItems || [] });
    }

    if (newProps.noOptionsMessage !== '') {
      this.setState({ noSuggestions: true });
    }
  }

  renderSuggestionsContainer = ({ containerProps, children }: any) => {
    const { moreInfoComponent, theme } = this.props;
    let className = '';
    if (!resultsBehaviorOpen) {
      className = theme.pickerResultHide;
    } else {
      className = theme.pickerResultShow;
    }

    return (
      <div {...containerProps} className={theme.PopoverButtonWrap}>
        {children}
        {
          <div className={className}>
            {moreInfoComponent}
          </div>
        }
      </div>
    );
  }

  getSectionSuggestions = (section: any) => {
    return section.items;
  }

  renderSectionTitle = (section: any) => {
    if (this.props.renderPickerHeader) {
      return this.props.renderPickerHeader(section.title);
    }

    return section.title.map((s: any) => <strong>{s.label}</strong>);

  }

  shouldRenderSuggestions = () => {
    return true;
  }

  render() {

    const { columns = [] } = this.props;

    function escapeRegexCharacters(str: string) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const autoSuggestMethods: IAutoSuggestMethods = {
      onSuggestionsClearRequested: () => this.setState({ suggestions: [] }),

      getSuggestions: (value: string) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        const regex = new RegExp(escapedValue, 'i');
        if (columns.length !== 0) {
          return [{ title: columns, items: this.state.itemsList.filter((language: IItemList) => regex.test(language.name ? language.name : '')) }];
        }

        return this.state.itemsList.filter((language: IItemList) => regex.test(language.name ? language.name : ''));

      },

      getSuggestionValue: (suggestion: IItemList) => {
        return suggestion.name;
      },

      onChange: (event: React.FormEvent<any>, { newValue, method }: Autosuggest.ChangeEvent) => {
        this.setState({
          value: newValue,
        });
        if (this.props.searchBehavior) {
          this.props.searchBehavior(newValue);
        }
      },

      onKeyDown: (e: KeyboardEvent, focusArr?: any, chipListState?: IItemList[]) => {
        if ((e.keyCode === 8) && this.state.chipListState.length && !this.state.value.length) {
          const chipListState = this.state.chipListState.slice(0, this.state.chipListState.length - 1);
          const selectedChip = this.state.chipListState.slice(this.state.chipListState.length - 1)[0];
          const itemsList = this.state.itemsList.concat(selectedChip);
          this.setState({
            chipListState,
            itemsList,
          });
          if (this.props.onRemove) {
            this.props.onRemove(selectedChip);
          }
        }
      },

      onFocus: (event: React.FormEvent<any>) => {
        this.setState({
          anchorEl: event.target as HTMLElement,
          isFocused: true
        });
        if (this.props.onFocus) {
          this.props.onFocus(event);
        }
      },

      onBlur: (event: React.FormEvent<any>) => {
        this.setState({ isFocused: false, noSuggestions: false, value: '' });
      },

      onSuggestionsFetchRequested: ({ value }: any) => {
        const suggestions = autoSuggestMethods.getSuggestions(value);
        const isInputBlank = value.trim() === '';
        const noSuggestions = !isInputBlank && suggestions.length === 0;

        this.setState({
          suggestions,
          noSuggestions
        });
      },

      updateList: (input: HTMLElement) => {
        const langIndex = this.state.itemsList.indexOf(input as any);
        const itemsListLength = this.state.itemsList;
        const newLangState = itemsListLength.slice(0, langIndex).concat(itemsListLength.slice(langIndex + 1, itemsListLength.length));
        this.setState({
          itemsList: newLangState,
        });
      },

      onSuggestionSelected: (event: React.FormEvent<Element>, { suggestion }: Autosuggest.SuggestionSelectedEventData<any>) => {
        suggestion.text = suggestion.name;
        autoSuggestMethods.updateList(suggestion);
        const chipListState = this.state.chipListState.concat(suggestion);
        const item = Object.assign({}, chipListState[0], { tabIndex: 0 });
        chipListState[0] = item;
        this.setState({
          chipListState,
          value: '',
          hasValue: true,
        });

        if (this.props.onSelect) {
          this.props.onSelect(suggestion);
        }
      },

      chipRemove: (item: any) => {
        const number = typeof item === 'number' ? item : this.state.chipListState.indexOf(item);
        const existingChipList = this.state.chipListState;
        const addedItem = this.state.chipListState.slice(number, number + 1);
        const addedItemObj = Object.assign({}, addedItem[0], { tabIndex: -1 });
        const chipListState = existingChipList.slice(0, number).concat(existingChipList.slice(number + 1));
        const itemsList = [addedItemObj, ...this.state.itemsList];
        const focusArr = this.state.focusArr.slice(0, number).concat(this.state.focusArr.slice(number + 1));
        if (chipListState.length) chipListState[0].tabIndex = 0;
        let focused = 0;
        if (number === chipListState.length) focused = number - 1;
        else if (number === chipListState.length && number > 0) focused = number;
        else focused = 0;
        this.setState({
          itemsList,
          chipListState,
          focusArr,
          number,
          focused,
          hasValue: chipListState.length ? true : false
        });

        if (this.props.onRemove) {
          this.props.onRemove(item);
        }
      },

      storeInputReference: (autosuggest: any) => {
        if (autosuggest !== null) {
          if (this.state.input !== autosuggest.props.inputProps.value) {
            this.setState({ input: autosuggest.props.inputProps.value });
          }
        }
      },

      storeFocus: (e: HTMLElement) => {
        if (!this.state.focusArr.includes(e) && e !== null) {
          const focusArr = this.state.focusArr.length ? this.state.focusArr.concat([e]) : [e];
          this.setState({ focusArr });
        }
      },

      renderSuggestion: (suggestion: IItemList, { isHighlighted, query }: IRenderSuggestionProp) => {

        if (this.props.renderPickerItem) {
          return this.props.renderPickerItem(suggestion, isHighlighted, query);
        }
        {
          const index = (suggestion.name ? suggestion.name.toLowerCase().indexOf(query.toLowerCase()) : 0);
          const nameBefore = (suggestion.name ? suggestion.name.slice(0, index) : '');
          const queryData = (suggestion.name ? suggestion.name.slice(index, index + query.length) : '');
          const nameAfter = (suggestion.name ? suggestion.name.slice(index + query.length) : '');

          if (isHighlighted) {
            return <DefaultCard isHighlighted={true}  nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} />;
          }
          return (
            <DefaultCard nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} />
          );
        }
      },
    };

    const {
        autoSuggest = false,
        helpText,
        label,
        labelHidden = false,
        loading = false,
        disabled = false,
        readOnly = false,
        moreInfoComponent,
        componentId = '',
        theme,
        shouldRenderSuggestions,
        noOptionsMessage
    } = this.props;
    const { isFocused, hasValue, value, suggestions, chipListState, noSuggestions, anchorEl, popoverWidth } = this.state;
    const inputProps: any & { disabled: boolean } = {
      value,
      onChange: autoSuggestMethods.onChange,
      onKeyDown: autoSuggestMethods.onKeyDown,
      onFocus: autoSuggestMethods.onFocus,
      onBlur: autoSuggestMethods.onBlur,
      disabled: readOnly || disabled || (!!this.props.maxSelectedItems && this.props.maxSelectedItems <= chipListState.length),
    };
    const stateProps: IStateProps = { value, suggestions, chipListState, inputProps, removable: readOnly ? false : true, multiSection: columns.length !== 0 ? true : false };

    let suffixIcon: React.ReactNode = null;
    if (this.props.suffix) {
      const { suffix } = this.props;
      suffixIcon = <Icon componentColor="inkLightest" source= {suffix as keyof typeof IconList} />;
    }

    // list popup -> used for Focus
    if (shouldRenderSuggestions) {
      autoSuggestMethods.shouldRenderSuggestions = this.shouldRenderSuggestions;
    }

    if (moreInfoComponent) {
      autoSuggestMethods.renderSuggestionsContainer = this.renderSuggestionsContainer;
    }

    if (columns.length !== 0) {
      autoSuggestMethods.renderSectionTitle = this.renderSectionTitle;
      autoSuggestMethods.getSectionSuggestions = this.getSectionSuggestions;
    }

    resultsBehaviorOpen = stateProps.suggestions.length !== 0;

    return (
      <div id={componentId}>
        <div ref={node => this.setWrapperRef(node)}>
          <TextField
            type="text"
            autoSuggest={autoSuggest}
            autoSuggestMethods={autoSuggestMethods}
            helpText={helpText}
            itemSelected={!!chipListState.length}
            label={label ? label : ''}
            labelHidden={labelHidden}
            loading={loading}
            value={value}
            onChange={(autoSuggestMethods.onChange) as any}
            stateProps={stateProps}
            theme={theme}
            suffix={suffixIcon}
            isFocused={isFocused}
            hasValue={hasValue}
            disabled={disabled}
            readOnly={readOnly}
          />
        </div>
        {
          noSuggestions && noOptionsMessage !== '' &&
            <Popover
              addArrow={false}
              componentStyle={{ maxHeight: window.outerHeight < 768 ? 500 : 800, overflow: 'auto', maxWidth: popoverWidth, width: '49.2rem', padding: '1.3rem', marginTop: '-.4rem' }}
              anchorEl={anchorEl}
              open={noSuggestions}
              theme={theme}
              preferredAlignment="left"
            >
              {noOptionsMessage}
            </Popover>
        }
      </div>
    );
  }
}

export { Picker as UnthemedPicker };
export default themr(PICKER, baseTheme)(Picker) as ThemedComponentClass<Props, State>;
