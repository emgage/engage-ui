import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Status } from '../Banner/Banner';
export interface Props {
    bannerTitle: string;
    bannerType: Status;
    bannerIcon?: string;
    disabled?: boolean;
    dropdownItems: any;
    rowItem?: any;
    loading?: boolean;
    onChange?(rowItem: any, selectedValue: number): void;
    onFocus?(rowItem: any): void;
    selectPlaceholder: string;
    selectedValue?: string;
}
export interface State {
    selectedValue?: string;
}
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
