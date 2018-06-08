import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import RadioButton, { Props as RadioButtonProps } from '../RadioButton';
import { ValidationRule } from '../../types';

import { RADIO_BUTTON } from '../ThemeIdentifiers';
import * as baseTheme from '../RadioButton/RadioButton.scss';

// All prototypes type
export interface Props extends RadioButtonProps {
  // Set id of Radio
  id: string;
  // Set name of Radio
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

// ValidatedRadioFieldComponent, in here wrap all other required components or DOM for the ValidatedRadioFieldComponent
class ValidatedRadioFieldComponent extends React.PureComponent<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    if (!this.props.name) {
      throw new Error('Name property is required on ValidatedRadioFieldComponent.');
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
        <RadioButton
            {...otherProps}
            {...otherFieldProps}
            value={initialValue}
            errors={form.getFieldError(this.props.name)}
        />
    );
  }
}

export default themr(RADIO_BUTTON, baseTheme)(ValidatedRadioFieldComponent) as ThemedComponentClass<Props, {}>;
