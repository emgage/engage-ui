import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Width = 'small' | 'medium' | 'large' | string;
export interface Props {
    active?: boolean;
    accessibilityLabel?: string;
    activeContentId?: string;
    closeButton?: boolean;
    className?: string;
    closeOnBackgroud?: boolean;
    closeOnEsc?: boolean;
    onClose?(): void;
    onOpen?(): void;
    theme?: any;
    toggle?(): void;
    componentWidth?: Width;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
