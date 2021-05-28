import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { ColumnConfig, FilterConfig, NestedChild, SortState, ServerSort } from './interface';
export declare type RowSelection = 'checkbox' | 'radio';
export declare type SortOrder = 'asc' | 'desc';
export interface Props {
    actionInProgress?: boolean;
    bordered?: boolean;
    callChildCallback?: boolean;
    column: ColumnConfig[];
    columnFirstChildWidth?: string;
    componentStyle?: any;
    componentClass?: string;
    componentId?: string;
    checkedRowsId?: number[];
    data?: any;
    defaultCheckedDataId?: any;
    defaultSortField?: string;
    defaultSortOrder?: string;
    expandingRowId?: number[];
    filterData?: FilterConfig;
    hideExpandedIcon?: boolean;
    hideHeader?: boolean;
    hideRow?: any;
    hideSelectAll?: boolean;
    highlight?: boolean;
    isChildParentConfigSame?: boolean;
    multipleCallBackValue?: any[];
    nestedChildCallback?(id: number | string, toggleStatus: boolean): void;
    nestedChildData?: NestedChild[];
    onRowClick?(value: any): void;
    parentCallback?(parentId: number | string, otherParam?: any): void;
    parentRowId?: number | string;
    parentSelectedRow?: boolean;
    responsive?: boolean;
    renderHeaderCheckbox?: boolean;
    rowActionLeft?: boolean;
    rowCallbackValue?: string;
    rowAction?: any;
    rowExpandOnLoad?: boolean;
    selectRow?: RowSelection;
    selectCallbackValue?: string;
    selectRowCallback?(rows: number[] | string[]): void;
    serverSort?: ServerSort;
    singleSelectRowCallback?(row: number | string | any, checked: boolean, rows: number[] | string[], rowData: any): void;
    disableAllRowCallback?(checked: boolean): void;
    sorting?: boolean | string;
    striped?: boolean;
    theme?: any;
    disableAllRow?: boolean;
}
export interface State {
    data: any;
    disableAllRow: boolean | undefined;
    expandedRow: any;
    intermediateRow: any;
    sort: SortState;
    selectedRows: number[];
    searchKey: string;
    callChildCallback: boolean;
    nestedChildData?: NestedChild[];
}
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
