import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import Select, { Props as SelectProps } from '../Select';
import { ValidationRule } from '../../types';

import { SELECT } from '../ThemeIdentifiers';
import * as baseTheme from '../Select/Select.scss';

export interface Props extends SelectProps {
  // Id of Validated Selectfield.
  componentId: string;
  // Name displayed with Selectfield.
  name: string;
  // Form in which Selectfield bind.
  form?: any;
  // Action to trigger validation rules.
  validateTrigger?: ['onBlur' | 'onChange'];
  // Validation rules for Selectfield. Validation Rule : { required: boolean; message: string; } or { type: string; message: string; }.
  validateRules?: [ValidationRule];
}

class ValidatedSelectFieldComponent extends React.PureComponent<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    if (!this.props.name) {
      throw new Error('Name property is required on ValidatedSelectFieldComponent.');
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
      rules: validateRules,
    });

    return (
        <Select
            {...otherProps}
            {...otherFieldProps}
            value={initialValue}
            errors={form.getFieldError(this.props.name)}
        />
    );
  }
}

export default themr(SELECT, baseTheme)(ValidatedSelectFieldComponent) as ThemedComponentClass<Props, {}>;
