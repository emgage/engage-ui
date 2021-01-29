import * as Autosuggest from 'react-autosuggest';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { IAutoSuggestMethods } from './Picker';
export interface IStateProps {
    chipListState: any[];
    suggestions: Autosuggest[];
    inputProps: Autosuggest.InputProps;
    value?: string;
    listType?: any;
}
export interface Props {
    theme?: any;
    placeholder?: string;
    autoSuggestMethods?: IAutoSuggestMethods;
    stateProps?: IStateProps;
    disabled?: boolean;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
