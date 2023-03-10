import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface IStateProps {
    chipListState: IItemList[];
    suggestions: any[];
    inputProps: any;
    value?: string;
    removable: boolean;
    multiSection?: any;
    reachedMax?: boolean;
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
    helpText?: React.ReactNode;
    additionalText?: React.ReactNode;
    label?: string;
    labelHidden?: boolean;
    loading?: boolean;
    backdropHidden?: boolean;
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
    searchBehavior?(value: string, method?: string): void;
    onSelect?(item: any): void;
    onRemove?(item: any): void;
    onMoreInfo?(): void;
    renderPickerHeader?(section: any): React.ReactElement<any>;
    renderPickerItem?(suggestion: any, isHighlighted?: string, query?: string): React.ReactElement<any>;
    columns?: any[];
    suffix?: string;
    defaultSelectedItems?: IItemList[];
    componentId?: string;
    shouldRenderSuggestions?: boolean;
    noOptionsMessage?: string;
    readOnly?: boolean;
    errors?: [string] | null;
    placeholder?: string;
    shouldFilterSuggestions?: boolean;
    markIfRequired?: boolean;
}
declare class Picker extends React.PureComponent<Props, State> {
    wrapperRef: HTMLDivElement;
    constructor(props: Props);
    setWrapperRef: (node: any) => void;
    componentWillReceiveProps(newProps: Props): void;
    getSuggestionsItems: (source: any, columns?: any) => any;
    renderSuggestionsContainer: ({ containerProps, children }: any) => JSX.Element;
    getSectionSuggestions: (section: any) => any;
    renderSectionTitle: (section: any) => any;
    shouldRenderSuggestions: () => boolean;
    storeInputReference: (input: any) => void;
    getFilteredSuggestions: (list?: IItemList[], selectedList?: IItemList[], valString?: any) => IItemList[];
    render(): JSX.Element;
}
export { Picker as UnthemedPicker };
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
