/// <reference path="../../../@types/rc-form.d.ts" />

import * as React from 'react';
import ValidatedTextField from '../ValidatedTextField';
import { createForm } from 'rc-form';

export interface Props {
  form: any,
  onSubmit: (values: [any]) => void,
  onSubmitError: (values: [any], error: Error) => void,
}

class ValidatedForm extends React.Component<Props, {}> {

  onSubmit = () => {
    this.props.form.validateFieldsAndScroll((error: Error, values: [any]) => {
      if (!error) {
        this.props.onSubmit(values);
      } else {
        this.props.onSubmitError(values, error);
      }
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return(
      <form onSubmit={this.onSubmit}>
        {this.props.children && React.Children.map(this.props.children, (child: any) => {
          if (child.type === ValidatedTextField) {
            return React.cloneElement(child, {form: { getFieldProps, getFieldError }});
          } else {
            return child;
          }
        })}
      </form>
    );
  }
}

export default createForm()(ValidatedForm);
