import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { ItemType } from './ComboBox';
export interface ComboItemProps {
    type?: ItemType;
    key?: string;
    value: any;
    renderer?(value: any, type?: string): React.ReactElement<any>;
}
export interface AccordianItem {
    header: React.ReactElement<any>;
    children: React.ReactElement<any>;
}
export interface Props {
    item: ComboItemProps;
    clickHandler?(value: string | null | boolean, key?: string): void;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, never>;
export default _default;
