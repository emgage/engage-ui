import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import TextField, { Props as TextFieldProps } from '../TextField';
import { ValidationRule } from '../../types';

import { TEXT_FIELD } from '../ThemeIdentifiers';
import * as baseTheme from '../TextField/TextField.scss';

export interface Props extends TextFieldProps {
  // Id of Validated Textfield.
  customId: string;
  // Name displayed with TextField.
  customName: string;
  // Form in which textfield bind.
  form?: any;
  // Action to trigger validation rules.
  validateTrigger?: ['onBlur' | 'onChange'];
  // Validation rules for textfield. Validation Rule : { required: boolean; message: string; } or { type: string; message: string; }.
  validateRules?: [ValidationRule];
}

class ValidatedTextFieldComponent extends React.PureComponent<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    if (!this.props.customName) {
      throw new Error('Name property is required on ValidatedTextFieldComponent.');
    }

    const {
        validateTrigger,
        validateRules,
        form,
        onChange,
        onBlur,
        ...otherProps
    } = this.props;
    const initialValue = otherProps.customValue;
    const { ...otherFieldProps } = form.getFieldProps(this.props.customName, {
      initialValue,
      onChange,
      onBlur,
      validateTrigger,
      rules: validateRules,
    });

    return (
        <TextField
            {...otherProps}
            {...otherFieldProps}
            value={initialValue}
            errors={form.getFieldError(this.props.customName)}
        />
    );
  }
}

export default themr(TEXT_FIELD, baseTheme)(ValidatedTextFieldComponent) as ThemedComponentClass<Props, {}>;
