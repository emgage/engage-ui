import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Props as SelectProps } from '../Select';
import { ValidationRule } from '../../types';
export interface Props extends SelectProps {
    componentId: string;
    name: string;
    form?: any;
    validateTrigger?: ['onBlur' | 'onChange'];
    validateRules?: [ValidationRule];
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
