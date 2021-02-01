import * as Autosuggest from 'react-autosuggest';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { IAutoSuggestMethods, IItemList } from './Picker';
export interface IStateProps {
    chipListState: IItemList[];
    suggestions: Autosuggest[];
    inputProps: Autosuggest.InputProps;
    value?: string;
}
export interface Props {
    theme?: any;
    placeholder?: string;
    autoSuggestMethods?: IAutoSuggestMethods;
    stateProps?: IStateProps;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
