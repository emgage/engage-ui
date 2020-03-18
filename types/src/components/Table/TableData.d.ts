import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    accessibilityHeaders?: string;
    callbackValue?: any;
    colSpan?: number;
    dataKey?: string;
    rowSpan?: number;
    componentStyle?: any;
    componentClass?: string;
    dataLabel?: string;
    onClick?(id: number | string): void;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
