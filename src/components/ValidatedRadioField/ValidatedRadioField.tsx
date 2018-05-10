import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import RadioButton, { Props as RadioButtonProps } from '../RadioButton';
import { ValidationRule } from '../../types';

import { RADIO_BUTTON } from '../ThemeIdentifiers';
import * as baseTheme from '../RadioButton/RadioButton.scss';

export interface Props extends RadioButtonProps {
  id: string;
  name: string;
  form?: any;
  validateTrigger?: ['onBlur' | 'onChange'];
  validateRules?: [ValidationRule];
  validator?(rule: object, value: any, callback: (error?: Error) => void): void;
}

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
    const initialValue = otherProps.value;
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
