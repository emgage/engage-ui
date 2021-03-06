import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
interface IProps {
    disabled?: boolean;
    prefixCls?: string;
    className?: string;
    current: number;
    defaultCurrent?: number;
    total: number;
    pageSize: number;
    defaultPageSize?: number;
    onChange?(page: number, pageSize: number): void;
    hideOnSinglePage?: boolean;
    showSizeChanger?: boolean;
    showLessItems?: boolean;
    onShowSizeChange?(current: any, size: any): void;
    selectComponentClass?(): void;
    selectPrefixCls?: string;
    showPrevNextJumpers?: boolean;
    showQuickJumper?: any;
    showTitle?: boolean;
    pageSizeOptions?: any;
    showTotal?(param1: any, param2: any): any;
    locale?: any;
    style?: any;
    itemRender?(param1: any, param2: any, param3: any): any;
    prevIcon?: any;
    nextIcon?: any;
    jumpPrevIcon?: any;
    jumpNextIcon?: any;
    simple?: any;
    theme?: any;
    lazyLoading?: any;
    pageSizeList?: number[];
    fixedSize?: boolean;
    simplePagination?: boolean;
    showJumpToPage?: boolean;
}
interface IState {
    current: number;
    currentInputValue: number;
    pageSize: number;
    pageSizeList: number[];
    initialPageSize: number;
}
export declare const DefaultProps: {
    disabled: boolean;
    defaultCurrent: number;
    current: number;
    total: number;
    pageSize: number;
    defaultPageSize: number;
    onChange: typeof noop;
    onShowSizeChange: typeof noop;
    className: string;
    selectPrefixCls: string;
    prefixCls: string;
    selectComponentClass: typeof noop;
    hideOnSinglePage: boolean;
    showPrevNextJumpers: boolean;
    showQuickJumper: {
        goButton: boolean;
    };
    showSizeChanger: boolean;
    showLessItems: boolean;
    showTitle: boolean;
    locale: {
        items_per_page: string;
        jump_to: string;
        jump_to_confirm: string;
        page: string;
        prev_page: string;
        next_page: string;
        prev_5: string;
        next_5: string;
        prev_3: string;
        next_3: string;
    };
    style: {};
    itemRender: typeof defaultItemRender;
    pageSizeOptions: never[];
    showTotal: typeof noop;
    pageSizeList: never[];
    simple: boolean;
    lazyLoading: boolean;
    fixedSize: boolean;
    simplePagination: boolean;
    showJumpToPage: boolean;
};
declare function noop(): void;
declare function defaultItemRender(page: any, type: any, element: any): any;
declare const _default: ThemedComponentClass<IProps, IState>;
export default _default;
