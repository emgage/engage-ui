import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { IAutoSuggestMethods, IItemList } from './Picker';
export interface IStateProps {
    chipListState: IItemList[];
    suggestions: any[];
    inputProps: any;
    value?: string;
    removable: boolean;
    multiSection?: any;
    reachedMax?: boolean;
    processingIds?: any[];
}
export interface Props {
    theme?: any;
    placeholder?: string;
    autoSuggestMethods?: IAutoSuggestMethods;
    stateProps?: IStateProps;
    handleInputFocus?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
