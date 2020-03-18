import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Spacing = 'extraTight' | 'tight' | 'loose' | 'extraLoose' | 'none';
export declare type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';
export declare type Distribution = 'equalSpacing' | 'leading' | 'trailing' | 'center' | 'fill' | 'fillEvenly';
export interface Props {
    children?: any;
    vertical?: boolean;
    spacing?: Spacing;
    alignment?: Alignment;
    distribution?: Distribution;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
