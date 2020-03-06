import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Props as RadioProps } from '../RadioButton';
import { ValidationRule } from '../../types';
export interface Props extends RadioProps {
    componentId: string;
    name?: string;
    form?: any;
    validateTrigger?: ['onBlur' | 'onChange', 'onClick'];
    validateRules?: [ValidationRule];
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
