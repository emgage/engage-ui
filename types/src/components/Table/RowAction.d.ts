import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
interface ExpressionFunction {
    (data: any, config: any): boolean;
}
declare type expressionType = string | ExpressionFunction;
interface RenderProps {
    expression: expressionType;
    key?: string;
}
export interface Props {
    data?: any;
    render?: RenderProps;
    actionConfig: any;
    theme?: any;
    rowActionLeft?: boolean;
    actionInProgress?: boolean;
    isRowLoading?: boolean;
}
export interface State {
    active: boolean;
    anchorEl?: HTMLElement;
}
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
