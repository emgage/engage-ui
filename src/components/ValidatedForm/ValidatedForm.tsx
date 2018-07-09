import * as React from 'react';
import { createForm } from 'rc-form';

export interface Props {
  form: {
    getFieldProps: any,
    getFieldError: any,
    validateFieldsAndScroll: any,
    validateFields(error?: any, values?: [any]): any;
  };
  formId?: string;
  style?: React.CSSProperties;
  onSubmit: (values: [any]) => void;
  onSubmitError: (values: [any], error: Error) => void;
}

class ValidatedForm extends React.Component<Props, {}> {
  onSubmit = (event: any) => {
    event.preventDefault();
    const { form, onSubmit, onSubmitError } = this.props;

    console.log('I am submitted');
    form.validateFields((error: Error, values: [any]) => {
      console.log('Error:', error);
      if (!error && onSubmit) {
        onSubmit(values);
      } else if (onSubmitError) {
        onSubmitError(values, error);
      }
    });
  }

  render() {
    return(
      <form id={this.props.formId} onSubmit={this.onSubmit} style={this.props.style}>
        {this.props.children && React.Children.map(this.props.children, (child: any) => {
          return React.cloneElement(child, { form: this.props.form });
        })}
      </form>
    );
  }
}

export default createForm()(ValidatedForm);
