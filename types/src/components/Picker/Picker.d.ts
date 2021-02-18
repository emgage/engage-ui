import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { DisplayMoreInfo } from './PickerEnum';
import * as Autosuggest from 'react-autosuggest';
export interface IPickerInfo {
    id?: number;
    key?: number;
    image?: string;
    name: string;
    description: string;
    email?: string;
    icon?: string;
}
export interface IStateProps {
    chipListState: IItemList[];
    suggestions: Autosuggest[];
    inputProps: any;
    value?: string;
    removable?: boolean;
}
export interface IItemList {
    key?: number;
    image?: string;
    name?: string;
    email?: string;
    tabIndex?: number;
    alt?: string;
    icon?: string;
    text?: string;
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
}
export declare type Type = 'hide' | 'mark';
export interface State {
    people: string;
    searchItems: IPickerInfo[];
    selectedItems: IPickerInfo[];
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
    selectedResultsBehavior?: Type;
    filterPlaceHolder?: string;
    helpText?: React.ReactNode;
    label?: string;
    labelHidden?: boolean;
    loading?: boolean;
    disabled?: boolean;
    maxSelectedItems?: number;
    minSelectedItems?: number;
    chipComponent?: React.ReactNode;
    searchResultComponent?: React.ReactNode;
    moreInfoComponent?: React.ReactNode;
    autoSuggest?: boolean;
    source: any[];
    moreInfoComponentShowOn?: DisplayMoreInfo;
    style?: React.CSSProperties;
    theme?: any;
    onFocus?(event: React.FormEvent<HTMLElement>): void;
    searchBehavior?(value: string): void;
    onSelect?(item: any): void;
    onRemove?(item: any): void;
    onMoreInfo?(): void;
    suffix?: string;
    defaultSelectedItems?: IItemList[];
    componentId?: string;
    shouldRenderSuggestions?: boolean;
    noOptionsMessage?: string;
    readOnly?: boolean;
}
declare class Picker extends React.PureComponent<Props, State> {
    wrapperRef: HTMLDivElement;
    constructor(props: Props);
    setWrapperRef: (node: any) => void;
    componentWillReceiveProps(newProps: Props): void;
    renderSuggestionsContainer: ({ containerProps, children }: any) => JSX.Element;
    shouldRenderSuggestions: () => boolean;
    render(): JSX.Element;
    private handleChange;
    private handleRemove;
}
export { Picker as UnthemedPicker };
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
