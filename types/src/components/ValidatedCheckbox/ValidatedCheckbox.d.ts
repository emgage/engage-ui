import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Props as CheckboxProps } from '../Checkbox';
import { ValidationRule } from '../../types';
export interface Props extends CheckboxProps {
    componentId: string;
    name?: string;
    form?: any;
    validateTrigger?: ['onBlur' | 'onChange', 'onClick'];
    validateRules?: [ValidationRule];
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
