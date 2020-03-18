import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    theme?: any;
    contents?: string;
    currentHeight?: number | null;
    minimumLines?: number;
    onHeightChange?(height: number): void;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
