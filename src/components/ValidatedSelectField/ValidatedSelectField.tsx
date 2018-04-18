import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import Select, { Props as SelectProps } from '../Select';
import { ValidationRule } from '../../types';

import { TEXT_FIELD } from '../ThemeIdentifiers';
import * as baseTheme from '../TextField/TextField.scss';

export interface Props extends SelectProps {
  id: string;
  name: string;
  form?: any;
  validateTrigger?: ['onBlur' | 'onChange'];
  validateRules?: [ValidationRule];
  validator?(rule: object, value: any, callback: (error?: Error) => void): void;
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

    console.log(otherFieldProps);
    console.dir(form.getFieldError);
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

export default themr(TEXT_FIELD, baseTheme)(ValidatedSelectFieldComponent) as ThemedComponentClass<Props, {}>;
