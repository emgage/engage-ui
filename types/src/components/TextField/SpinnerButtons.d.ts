import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    theme?: any;
    onChange(delta: number): any;
    onClick?(): void;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
