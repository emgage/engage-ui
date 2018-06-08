import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import Checkbox, { Props as CheckboxProps } from '../Checkbox';
import { ValidationRule } from '../../types';

import { CHECKBOX } from '../ThemeIdentifiers';
import * as baseTheme from '../Checkbox/Checkbox.scss';

// All prototypes type
export interface Props extends CheckboxProps {
  // Set id of checkbox
  id: string;
  // Set name of checkbox
  name: string;
  // Set form
  form?: any;
  // Set when to validate onBlur event or Onchange event
  validateTrigger?: ['onBlur' | 'onChange'];
  // Set validation rules
  validateRules?: [ValidationRule];
  // Set validator
  validator?(rule: object, value: any, callback: (error?: Error) => void): void;
}

// ValidatedCheckboxFieldComponent, in here wrap all other required components or DOM for the ValidatedCheckboxFieldComponent
class ValidatedCheckboxFieldComponent extends React.PureComponent<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    if (!this.props.name) {
      throw new Error('Name property is required on ValidatedCheckboxFieldComponent.');
    }

    const {
        validateTrigger,
        validator,
        validateRules,
        form,
        onChange,
        onBlur,
        ...otherProps
    } = this.props;
    // Set initial value
    const initialValue = otherProps.value;
    // Get props from form
    const { ...otherFieldProps } = form.getFieldProps(this.props.name, {
      initialValue,
      onChange,
      onBlur,
      validateTrigger,
      rules: validateRules,
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

export default themr(CHECKBOX, baseTheme)(ValidatedCheckboxFieldComponent) as ThemedComponentClass<Props, {}>;
