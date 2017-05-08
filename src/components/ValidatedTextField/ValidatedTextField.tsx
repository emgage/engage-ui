import * as React from 'react';
import TextField, { Props as TextFieldProps } from '../TextField';
import { ValidationRule } from '../../types';

export interface Props extends TextFieldProps {
    id: string,
    name: string,
    form?: any,
    validateTrigger?: ['onBlur' | 'onChange'],
    validateRules?: [ValidationRule],
    validator?(rule: object, value: any, callback: (error?: Error) => void): void,
}

export default class ValidatedTextFieldComponent extends React.PureComponent<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    if (!this.props.name) {
        throw new Error('Name property is required on ValidatedTextFieldComponent.');
    }

    const {
        form,
        validateTrigger,
        validator,
        validateRules,
        ...rest,
    } = this.props;
    const initialValue = rest.value;

    return (
        <div>
            <TextField
                {...rest}
                {...form.getFieldProps(this.props.name, {
                    validateTrigger,
                    rules: validateRules,
                    initialValue,
                })}
                errors={form.getFieldError(this.props.name)}
            />
        </div>
    );
  }
}
