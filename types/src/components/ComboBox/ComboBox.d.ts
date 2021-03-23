import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Mode = 'collapsible' | 'multiple';
export declare type ItemType = 'Accordian' | 'Tabular';
export interface ComboBoxItemProps {
    type?: any;
    key?: string;
    value: any;
    column?: any;
    renderer?(value: any, type?: string): React.ReactElement<any>;
}
export interface ServerSort {
    field: string;
    order: string;
    callback?(field: string, order: string, sortBy: string): void;
}
export interface Props {
    currentValue?: string;
    items: ComboBoxItemProps[];
    label: string;
    style?: any;
    suffix?: any;
    loading?: boolean;
    onSelect?(item: any): void;
    onChangeText?(value: string): void;
    sortEntity?(field: string, order: string, sortBy: string): void;
    theme?: any;
}
interface State {
    open: boolean;
    items: ComboBoxItemProps[];
    initialItems: ComboBoxItemProps[];
    anchorEl?: HTMLElement;
    selectedValue: string;
    popoverWidth: string;
    isEmpty: boolean;
    serverSort: ServerSort;
}
declare class ComboBox extends React.PureComponent<Props, State> {
    private getUniqueID;
    private id;
    private wrapperRef;
    constructor(props: Props);
    sortEntity: (field: string, order: string, sortBy: string) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: any): void;
    handleClickOutside: (event: any) => void;
    setWrapperRef: (node: any) => void;
    addRenderer: (items: any, cloneItems: any) => any;
    onChange: (value: string, event: React.FormEvent<HTMLElement>) => void;
    onArrowClick: (event: React.FormEvent<HTMLElement>) => void;
    handleClick: (value: string | any, key: any) => void;
    render(): JSX.Element;
}
export { ComboBox as UnthemedComboBox };
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
