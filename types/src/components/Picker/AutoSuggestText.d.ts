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
    justClickedOnSuggestionsContainer?: boolean;
}
export interface Props {
    theme?: any;
    placeholder?: string;
    autoSuggestMethods?: IAutoSuggestMethods;
    stateProps?: IStateProps;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
