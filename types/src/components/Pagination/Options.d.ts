import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
interface IProps {
    disabled: boolean;
    changeSize?(value: number): void;
    quickGo?(callback: any): void;
    selectComponentClass: any;
    current: number;
    pageSizeOptions: string[];
    pageSize: number;
    buildOptionText?(value: number | string): void;
    locale: any;
    rootPrefixCls: string;
    selectPrefixCls: string;
    goButton: any;
    theme?: any;
}
interface IState {
    goInputText: any;
    current?: any;
}
declare const _default: ThemedComponentClass<IProps, IState>;
export default _default;
