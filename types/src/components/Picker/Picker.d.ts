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
    inputProps: Autosuggest.InputProps;
    value?: string;
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
    onSuggestionsFetchRequested({ value }: Autosuggest.SuggestionsFetchRequest): void;
    onSuggestionSelected(event: React.FormEvent<Element>, { suggestion }: Autosuggest.SuggestionSelectedEventData<Autosuggest>): void;
    chipRemove(item: IItemList | number): void;
    renderSuggestion(suggestion: IItemList, { isHighlighted, query }: IRenderSuggestionProp): JSX.Element;
    storeInputReference(autosuggest: Autosuggest): void;
    updateList(input: HTMLElement): void;
    storeFocus(e: HTMLElement): void;
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
    source: IPickerInfo[];
    moreInfoComponentShowOn?: DisplayMoreInfo;
    style?: React.CSSProperties;
    theme?: any;
    searchBehavior?(): void;
    onSelect?(item: any): void;
    onRemove?(item: any): void;
    onMoreInfo?(): void;
    suffix?: string;
    defaultSelectedItems?: IItemList[];
}
declare class Picker extends React.PureComponent<Props, State> {
    constructor(props: Props);
    componentWillReceiveProps(newProps: Props): void;
    render(): JSX.Element;
    private handleChange;
    private handleRemove;
    private handleSelect;
    private handleMoreInfo;
}
export { Picker as UnthemedPicker };
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
