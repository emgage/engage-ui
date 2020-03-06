import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Scope = 'col' | 'row';
export interface Props {
    accessibilityId?: string;
    accessibilityScope?: Scope;
    className?: string;
    clickHandler?(field: string, sortBy: string): void;
    colSpan?: number;
    componentStyle?: any;
    order?: string;
    rowSpan?: number;
    sort?: string;
    sortBy?: string;
    serverSort?(field: string, sortBy: string): void;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
