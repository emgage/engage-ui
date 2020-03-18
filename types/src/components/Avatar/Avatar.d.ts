import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Size = 'small' | 'medium' | 'large';
export interface Props {
    componentSize?: Size;
    componentName?: string;
    initials?: string;
    customer?: boolean;
    source?: string;
    accessibilityLabel?: string;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
