import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import TextField, { Props as TextFieldProps } from '../TextField';
import { ValidationRule } from '../../types';

import { TEXT_FIELD } from '../ThemeIdentifiers';
import * as baseTheme from '../TextField/TextField.scss';

export interface Props extends TextFieldProps {
  // Id of Validated Textfield.
  componentId: string;
  // Name displayed with TextField.
  name: string;
  // Form in which textfield bind.
  form?: any;
  // Action to trigger validation rules.
  validateTrigger?: ['onBlur' | 'onChange'];
  // Validation rules for textfield. Validation Rule : { required: boolean; message: string; } or { type: string; message: string; }.
  validateRules?: ValidationRule[];
}

class ValidatedTextFieldComponent extends React.PureComponent<Props, {}> {
  private rules: any;

  constructor(props: Props) {
    super(props);

    this.rules = props.validateRules || [];
    this.rules = this.rules.concat([{ validator: this.customValidation }]);
  }

  // Function for custom validation, this will help to add any validation to the textfield
  customValidation = (rule: any, value: any, callback: any) => {
    const { validateRules } = this.props;

    if (value) {
      if (validateRules) {
        validateRules.forEach((item: any) => {
          if (item.minRange || item.maxRange) {
            this.rangeValidation(item, value, callback);
          } else if (item.minLength || item.maxLength) {
            this.lengthValidation(item, value, callback);
          } else {
            callback();
          }
        });
      }
    } else {
      callback();
    }
  }

  // This is validation for range field
  rangeValidation = (validationRule: any, value: any, callback: any) => {
    if (validationRule.minRange !== undefined && value < validationRule.minRange) {
      callback(validationRule.message);
    } else if (validationRule.maxRange !== undefined && value > validationRule.maxRange) {
      callback(validationRule.message);
    }

    callback();
  }

  // This is validation for length field
  lengthValidation = (validationRule: any, value: any, callback: any) => {
    if (validationRule.minLength !== undefined && value.length < validationRule.minLength) {
      callback(validationRule.message);
    } else if (validationRule.maxLength !== undefined && value.length > validationRule.maxLength) {
      callback(validationRule.message);
    }

    callback();
  }

  render() {
    if (!this.props.name) {
      throw new Error('Name property is required on ValidatedTextFieldComponent.');
    }

    const {
      validateTrigger,
      validateRules,
      form,
      onChange,
      onBlur,
      onInput,
      ...otherProps
    } = this.props;

    const initialValue = otherProps.value;

    const { ...otherFieldProps } = form.getFieldProps(this.props.name, {
      initialValue,
      onChange,
      onBlur,
      onInput,
      validateTrigger,
      rules: this.rules,
    });

    return (
        <TextField
            {...otherProps}
            {...otherFieldProps}
            value={initialValue}
            errors={form.getFieldError(this.props.name)}
        />
    );
  }
}

export default themr(TEXT_FIELD, baseTheme)(ValidatedTextFieldComponent) as ThemedComponentClass<Props, {}>;
