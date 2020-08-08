import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    callbackValue?: any;
    onClick?(id: number | string): void;
    callBackSelectedRows?(id: number): void;
    selectRow?: any;
    componentStyle?: any;
    componentClass?: string;
    isRowLoading?: boolean;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
