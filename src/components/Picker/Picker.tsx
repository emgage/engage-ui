import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { PICKER } from '../ThemeIdentifiers';
import TextField from '../TextField';
import Icon, { IconList } from '../Icon';
import * as baseTheme from './Picker.scss';
// import * as style from './Picker.scss';
// TODO: Why are we using this custom card and not the Card component?
import Popover from '../Popover';
import FlexBox from '../FlexBox';
import { cloneDeep, get } from 'lodash';
import BodyText from '../BodyText';

let resultsBehaviorOpen: boolean = false;

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

export interface IItemList {
  name: string;
  tabIndex?: number;
  image?: string;
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
  onChange(event: React.FormEvent<any>, { newValue, method }: any): void;
  onFocus(event: React.FormEvent<any>): void;
  onKeyDown(e: React.FormEvent<Element> | KeyboardEvent): void;
  onSuggestionsFetchRequested({ value }: any): void;
  onSuggestionSelected(event: React.FormEvent<Element>, { suggestion }: any): void;
  chipRemove(item: IItemList | number): void;
  renderSuggestion(suggestion: IItemList, { isHighlighted, query }: IRenderSuggestionProp): JSX.Element;
  getInputReference(): HTMLElement | undefined;
  updateList(input: HTMLElement): void;
  storeFocus(e: HTMLElement): void;
  shouldRenderSuggestions?(): void;
  renderSuggestionsContainer?({ containerProps, children, query }: any): void;
  renderSectionTitle?(section: any): void;
  getSectionSuggestions?(section: any): void;
}

export interface State {
  moreInfo: boolean;
  value: string;
  input?: HTMLElement;
  suggestions: any[];
  chipListState: IItemList[];
  focusArr: HTMLElement[];
  itemsList: IItemList[];
  focused: number;
  number: number;
  isFocused: boolean;
  hasValue: boolean;
  anchorEl?: HTMLElement;
  popoverWidth: string;
}

export interface Props {
  // Additional hint text to display.
  helpText?: React.ReactNode;
  // Additional text to display below helpertext.
  additionalText?: React.ReactNode;
  // Label for the input.
  label?: string;
  // Visually hide the label.
  labelHidden?: boolean;
  // Display loading indicator
  loading?: boolean;
  // Visually hide the border.
  backdropHidden?: boolean;
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
  searchBehavior?(value: string, method?:string): void;
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
  // Error to display beneath the label.
  errors?: [string] | null;
  placeholder?: string;
  shouldFilterSuggestions?: boolean;
  markIfRequired?: boolean
  processingIds?: any[];
}

const DefaultCard = (props: any) => {
  const { isHighlighted = false } = props;
  const cardBackground = (isHighlighted) ? baseTheme.cardItem + ' ' + baseTheme.highlighted : baseTheme.cardItem;
  return (
    <div>
      <div className={cardBackground}>
      <FlexBox align="Center">
        {
          props.image ? (typeof props.image === 'object' ?
            <span className={baseTheme.subscriberIcon}>
              <Icon source={props.image} theme={baseTheme} />
            </span>
            : <span><img className={baseTheme.avatarImage} src={props.image} alt={props.alt} aria-hidden={!props.nameAfter || !props.nameBefore} /></span>
          ) : null
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
      suggestions: [],
      chipListState: props.defaultSelectedItems || [],
      focusArr: [],
      itemsList: this.props.source,
      isFocused: false,
      hasValue: Boolean(props.defaultSelectedItems && props.defaultSelectedItems.length),
      focused: 0,
      number: 0,
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
      this.setState((prevState) => {
        const { chipListState } = prevState;
        const clonedChipListState = cloneDeep(chipListState);
        if (newProps.source.length && clonedChipListState.length) {
          clonedChipListState.forEach((chip: any) => {
            const currentText = newProps.source.find((source: any) => source.id === (chip.id || chip.key) || source.key === (chip.id || chip.key));
            if (currentText) {
              chip.text = currentText.name;
            }
          });
        }
        return {
          ...prevState,
          chipListState: clonedChipListState,
          suggestions: this.getSuggestionsItems(newProps.source, newProps.columns || []),
          itemsList: newProps.source
        };
      });
    }
    if (JSON.stringify(newProps.defaultSelectedItems) !== JSON.stringify(this.props.defaultSelectedItems)) {
      const hasValue: boolean = Boolean(newProps.defaultSelectedItems && newProps.defaultSelectedItems.length);
      this.setState({ hasValue, chipListState: newProps.defaultSelectedItems || [] });
    }
  }

  getSuggestionsItems = (source: any, columns: any = []) => {
    if (columns && columns.length !== 0) {
      return [{ title: columns, items: source }];
    }
    return source;
  }

  renderSuggestionsContainer = ({ containerProps, children }: any) => {
    const { moreInfoComponent, theme } = this.props;
    const { isFocused } = this.state;
    let className = '';
    if (moreInfoComponent && isFocused) {
      className = theme.pickerResultShow;
    } else {
      className = theme.pickerResultHide;
    }

    return (
      <div {...containerProps} className={theme.PopoverButtonWrap}>
        {children}
        <div className={className}>
          {moreInfoComponent}
        </div>
      </div>
    );
  }

  getSectionSuggestions = (section: any) => {
    return section && section.items || [];
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

  storeInputReference = (input: any) => {
    if (this.state.input !== input) {
      this.setState({ input });
    }
  }

  getFilteredSuggestions = (list= this.state.itemsList, selectedList= this.state.chipListState, valString?:any) => {
    const newSuggestions = list.filter((it: any) => {
      let isValid = false;
      selectedList.forEach((cls: any) => {
        isValid = isValid || it.id === cls.id || it.name === valString;
      });
      return !isValid;
    });
    return newSuggestions;
  }

  render() {

    const { columns = [], processingIds = [] } = this.props;

    function escapeRegexCharacters(str: string) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const autoSuggestMethods: IAutoSuggestMethods = {
      onSuggestionsClearRequested: () => this.setState({ suggestions: [], value: '' }),

      getSuggestions: (value: string) => {
        const escapedValue = escapeRegexCharacters(value.trim().replace(/ +(?= )/g, ''));
        const regex = new RegExp(escapedValue, 'i');
        if (columns.length !== 0) {
          return [{ title: columns, items: this.state.itemsList.filter((language: IItemList) => regex.test(language.name ? language.name : '')) }];
        }

        return this.state.itemsList.filter((language: IItemList) => regex.test(language.name ? language.name : ''));

      },

      getSuggestionValue: (suggestion: IItemList) => {
        return suggestion.name;
      },

      onChange: (event: React.FormEvent<any>, { newValue, method }: any) => {
        if (method === 'type') {
          this.setState({ value: newValue });
          if (this.props.searchBehavior) {
            this.props.searchBehavior(newValue, method);
          }
        }
      },

      onKeyDown: (e: KeyboardEvent, focusArr?: any, chipListState?: IItemList[]) => {
        if ((e.keyCode === 8) && this.state.chipListState.length && !this.state.value.length && processingIds.length === 0) {
          const chipListState = this.state.chipListState.slice(0, this.state.chipListState.length - 1);
          const selectedChip = this.state.chipListState.slice(this.state.chipListState.length - 1)[0];
          const itemsList = [selectedChip, ...this.state.itemsList];
          const newSuggestions = this.getFilteredSuggestions(itemsList, chipListState);
          this.setState({
            chipListState,
            itemsList,
            hasValue: chipListState.length ? true : false,
            suggestions: newSuggestions,
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
        this.setState({ isFocused: false, value: '' }, () => {
          if (this.props.searchBehavior) {
            this.props.searchBehavior('', 'focus_out');
          }
        });
      },

      onSuggestionsFetchRequested: ({ value, reason }: any) => {
        const { shouldFilterSuggestions = true } = this.props;
        if (reason === 'suggestion-selected') {
          return;
        }
        const suggestions =  shouldFilterSuggestions ? autoSuggestMethods.getSuggestions(value) : this.getSuggestionsItems(this.props.source, this.props.columns || []);
        this.setState({ suggestions });
      },

      updateList: (input: HTMLElement) => {
        const langIndex = this.state.itemsList.indexOf(input as any);
        const itemsListLength = this.state.itemsList;
        const newLangState = itemsListLength.slice(0, langIndex).concat(itemsListLength.slice(langIndex + 1, itemsListLength.length));
        this.setState({
          itemsList: newLangState,
        });
      },

      onSuggestionSelected: (event: React.FormEvent<Element>, { suggestion }: any) => {
        if(!suggestion.notSelectable && !processingIds.includes(suggestion.id)){
          suggestion.text = suggestion.name;
          autoSuggestMethods.updateList(suggestion);
          this.setState((prevState) => {
            const chipListState = [...prevState.chipListState, suggestion];
            const item = Object.assign({}, chipListState[0], { tabIndex: 0 });
            chipListState[0] = item;
  
            return {
              ...prevState,
              chipListState,
              value: '',
              hasValue: true,
            };
          },            () => {
            if (this.props.onSelect) {
              this.props.onSelect(suggestion);
            }
          });
        } else {
          if (this.props.onSelect) {
            this.props.onSelect(suggestion);
          }
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
          hasValue: chipListState.length ? true : false,
          isFocused: false,
        });

        if (this.props.onRemove) {
          this.props.onRemove(item);
        }
      },

      getInputReference: () => {
        return this.state.input;
      },

      storeFocus: (e: HTMLElement) => {
        if (!this.state.focusArr.includes(e) && e !== null) {
          const focusArr = this.state.focusArr.length ? this.state.focusArr.concat([e]) : [e];
          this.setState({ focusArr });
        }
      },

      renderSuggestion: (suggestion: IItemList, { isHighlighted, query }: IRenderSuggestionProp) => {
        // eslint-disable-next-line no-param-reassign
        query.trim().replace(/ +(?= )/g, '');

        // render custom option 
        if ((suggestion as any).customRender) {
          return (suggestion as any).customRender(suggestion, {
            isHighlighted,
            query,
            source: this.props.source,
          });
        }
        if (this.props.renderPickerItem) {
          return this.props.renderPickerItem(suggestion, isHighlighted, query);
        }
        {
          const index = (suggestion.name ? suggestion.name.toLowerCase().indexOf(query.toLowerCase()) : 0);
          let nameBefore = suggestion.name || '';
          let queryData = '';
          let nameAfter = '';
          if (index !== -1) {
            nameBefore = (suggestion.name ? suggestion.name.slice(0, index) : '');
            queryData = (suggestion.name ? suggestion.name.slice(index, index + query.length) : '');
            nameAfter = (suggestion.name ? suggestion.name.slice(index + query.length) : '');
          }
          const imgSrc = get(suggestion, 'image', null);

          if (isHighlighted) {
            return <DefaultCard isHighlighted={true}  nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} image = {imgSrc} />;
          }
          return (
            <DefaultCard nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} image = {imgSrc} />
          );
        }
      },
    };

    const {
        autoSuggest = false,
        helpText,
        additionalText,
        label,
        labelHidden = false,
        loading = false,
        backdropHidden= false,
        disabled = false,
        readOnly = false,
        moreInfoComponent,
        componentId = '',
        theme,
        shouldRenderSuggestions,
        noOptionsMessage,
        errors,
        placeholder,
        markIfRequired,
    } = this.props;
    const { isFocused, hasValue, value, suggestions, chipListState, anchorEl, popoverWidth } = this.state;
    const inputProps: any & { disabled: boolean } = {
      placeholder,
      value,
      ref: this.storeInputReference,
      onChange: autoSuggestMethods.onChange,
      onKeyDown: autoSuggestMethods.onKeyDown,
      onFocus: autoSuggestMethods.onFocus,
      onBlur: autoSuggestMethods.onBlur,
      disabled: readOnly || disabled || (!!this.props.maxSelectedItems && this.props.maxSelectedItems > 0 && this.props.maxSelectedItems <= chipListState.length),
    };
    const stateProps: IStateProps = {
      value,
      suggestions,
      chipListState,
      inputProps,
      removable: readOnly ? false : true,
      multiSection: columns.length !== 0 ? true : false,
      reachedMax: (!!this.props.maxSelectedItems && this.props.maxSelectedItems > 0 && this.props.maxSelectedItems <= chipListState.length),
      processingIds: this.props.processingIds,
    };

    let suffixIcon: React.ReactNode = null;
    if (this.props.suffix) {
      const { suffix } = this.props;
      suffixIcon = <Icon componentColor="inkLightest" source= {suffix as keyof typeof IconList} />;
    }

    // list popup -> used for Focus
    if (shouldRenderSuggestions) {
      autoSuggestMethods.shouldRenderSuggestions = () => {
        return !inputProps.disabled;
      };
    }

    resultsBehaviorOpen = suggestions.length !== 0;

    if (moreInfoComponent && resultsBehaviorOpen) {
      autoSuggestMethods.renderSuggestionsContainer = this.renderSuggestionsContainer;
    }

    let suggestionList = get(stateProps, 'suggestions', []);
    if (columns.length !== 0) {
      autoSuggestMethods.renderSectionTitle = this.renderSectionTitle;
      autoSuggestMethods.getSectionSuggestions = this.getSectionSuggestions;
      suggestionList = get(suggestionList, '0.items', []);
    }

    let isDataAvailable = suggestionList.length > 0;
    if (!shouldRenderSuggestions) {
      isDataAvailable = isDataAvailable || this.state.value === '';
    }
    const pickerWithHeader = columns.length !== 0 ? theme.pickerWithHeader : '';
    return (
      <div id={componentId} className={pickerWithHeader}>
        <div ref={node => this.setWrapperRef(node)} className={theme.PickerWrap}>
          <TextField
            errors={errors}
            type="text"
            autoSuggest={autoSuggest}
            autoSuggestMethods={autoSuggestMethods}
            backdropHidden={backdropHidden}
            helpText={helpText}
            itemSelected={!!chipListState.length}
            labelHidden={labelHidden}
            loading={loading || processingIds.length > 0}
            value={value}
            onChange={(autoSuggestMethods.onChange) as any}
            stateProps={stateProps}
            theme={theme}
            suffix={suffixIcon}
            isFocused={!inputProps.disabled && isFocused}
            hasValue={hasValue}
            disabled={disabled}
            readOnly={readOnly}
            label={label || ''}
            markIfRequired={markIfRequired}
          />
        </div>
        {
          additionalText ? <BodyText componentSize="small" componentColor="darker">{additionalText}</BodyText> : null
        }
        {
          !isDataAvailable  && noOptionsMessage && !inputProps.disabled && isFocused && !loading &&
            <Popover
              addArrow={false}
              componentStyle={{ maxHeight: window.outerHeight < 768 ? 500 : 800, overflow: 'auto', maxWidth: popoverWidth, width: '49.2rem', padding: '1.3rem', marginTop: '-.4rem' }}
              anchorEl={anchorEl}
              open={true}
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
