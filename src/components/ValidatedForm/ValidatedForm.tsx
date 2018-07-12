import * as React from 'react';
import { createForm } from 'rc-form';

export interface Props {
  form: {
    // Field properties of form.
    getFieldProps: any,
    // Field error of form.
    getFieldError: any,
    // Validate fields and scroll of form.
    validateFieldsAndScroll: any,
    validateFields(error?: any, values?: [React.FormEvent<any>]): any;
  };
  // To apply styling externally
  componentStyle?: React.CSSProperties;
  // Function to handle on submit of validated form.
  onSubmit: (values: [React.FormEvent<any>]) => void;
  // Function to handle errors on submit of validated form.
  onSubmitError: (values: [React.FormEvent<any>], error: Error) => void;
}

class ValidatedForm extends React.Component<Props, {}> {
  onSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();
    const { form, onSubmit, onSubmitError } = this.props;

    form.validateFields((error: Error, values: [React.FormEvent<any>]) => {
      if (!error && onSubmit) {
        onSubmit(values);
      } else if (onSubmitError) {
        onSubmitError(values, error);
      }
    });
  }

  render() {
    return(
      <form onSubmit={this.onSubmit} style={this.props.componentStyle}>
        {this.props.children && React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
          return React.cloneElement(child, { form: this.props.form });
        })}
      </form>
    );
  }
}

export default createForm()(ValidatedForm);
