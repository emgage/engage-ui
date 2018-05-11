import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import Checkbox, { Props as CheckboxProps } from '../Checkbox';
import { ValidationRule } from '../../types';

import { CHECKBOX } from '../ThemeIdentifiers';
import * as baseTheme from '../Checkbox/Checkbox.scss';


export interface Props extends CheckboxProps {
  id: string;
  name: string;
  form?: any;
  validateTrigger?: ['onBlur' | 'onChange'];
  validateRules?: [ValidationRule];
  validator?(rule: object, value: any, callback: (error?: Error) => void): void;
}

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
    const initialValue = otherProps.value;
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
