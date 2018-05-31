import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import Select, { Props as SelectProps } from '../Select';
import { ValidationRule } from '../../types';

import { TEXT_FIELD } from '../ThemeIdentifiers';
import * as baseTheme from '../TextField/TextField.scss';

export interface Props extends SelectProps {
  // Id of Validated Selectfield.
  customId: string;
  // Name displayed with Selectfield.
  customName: string;
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
    if (!this.props.customName) {
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
    const initialValue = otherProps.customValue;
    const { ...otherFieldProps } = form.getFieldProps(this.props.customName, {
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
            errors={form.getFieldError(this.props.customName)}
        />
    );
  }
}

export default themr(TEXT_FIELD, baseTheme)(ValidatedSelectFieldComponent) as ThemedComponentClass<Props, {}>;
