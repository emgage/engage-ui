import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface IProps {
    page: any;
    active?: boolean;
    last?: boolean;
    locale: any;
    className?: string;
    showTitle: boolean;
    rootPrefixCls: string;
    onClick(value: number): void;
    onKeyPress(event: any, callback: any, value: number): void;
    itemRender(param1: number, param2: string, param3: any): any;
    theme?: any;
    plain?: boolean;
    componentStyle?: any;
}
declare const _default: ThemedComponentClass<IProps, {}>;
export default _default;
