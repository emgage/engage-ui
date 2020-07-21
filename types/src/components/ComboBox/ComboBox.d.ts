import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Mode = 'collapsible' | 'multiple';
export declare type ItemType = 'Accordian';
export interface ComboBoxItemProps {
    type?: ItemType;
    key?: string;
    value: any;
    renderer?(value: any, type?: string): React.ReactElement<any>;
}
export interface Props {
    currentValue?: string;
    items: ComboBoxItemProps[];
    label: string;
    style?: any;
    onSelect?(item: any): void;
    theme?: any;
}
interface State {
    open: boolean;
    items: ComboBoxItemProps[];
    initialItems: ComboBoxItemProps[];
    anchorEl?: HTMLElement;
    selectedValue: string;
    popoverWidth: string;
}
declare class ComboBox extends React.PureComponent<Props, State> {
    private getUniqueID;
    private id;
    private wrapperRef;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
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
