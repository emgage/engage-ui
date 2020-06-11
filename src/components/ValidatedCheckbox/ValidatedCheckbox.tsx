import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import Checkbox, { Props as CheckboxProps } from '../Checkbox';
import { ValidationRule } from '../../types';

import { CHECKBOX } from '../ThemeIdentifiers';
import * as baseTheme from '../Checkbox/Checkbox.scss';

export interface Props extends CheckboxProps {
  // Id of Validated Textfield.
  componentId: string;
  // Name displayed with Checkbox.
  name?: string;
  // Form in which textfield bind.
  form?: any;
  // Action to trigger validation rules.
  validateTrigger?: ['onBlur' | 'onChange', 'onClick'];
  // Validation rules for textfield. Validation Rule : { required: boolean; message: string; } or { type: string; message: string; }.
  validateRules?: [ValidationRule];
}

class ValidatedCheckboxComponent extends React.PureComponent<Props, {}> {
  private rules: any;
  constructor(props: Props) {
    super(props);

    this.rules = props.validateRules;
    this.rules = this.rules.concat([{ validator: this.isChecked }]);
  }

  isChecked = (rule: any, value: any, callback: any) => {
    const { validateRules = [] } = this.props;

    // Check if checkbox is checked, if not then send throw the error
    if (value) {
      callback();
    } else if (value !== undefined) {
      callback(validateRules[0]!.message);
    } else {
      callback();
    }
  }

  render() {
    if (!this.props.name) {
      throw new Error('Name property is required on ValidatedCheckboxComponent.');
    }

    const {
      validateTrigger,
      validateRules,
      form,
      onChange,
      onBlur,
      ...otherProps
    } = this.props;

    const initialValue = otherProps.value;
    const { ...otherFieldProps } = form.getFieldProps(this.props.name, {
      initialValue,
      onChange,
      onBlur,
      validateTrigger,
      rules: this.rules,
    });

    return (
      <Checkbox
      {...otherProps}
      {...otherFieldProps}
      value={initialValue}
      errors={form.getFieldError(this.props.name)}
      />
    );
  }
}

export default themr(CHECKBOX, baseTheme)(ValidatedCheckboxComponent) as ThemedComponentClass<Props, {}>;
