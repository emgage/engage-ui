import * as React from 'react';
import { createForm } from 'rc-form';

export interface Props {
  form: any;
  style?: React.CSSProperties;
  onSubmit: (values: [any]) => void;
  onSubmitError: (values: [any], error: Error) => void;
}

class ValidatedForm extends React.Component<Props, {}> {
  onSubmit = (event: any) => {
    event.preventDefault();
    const { form, onSubmit, onSubmitError } = this.props;

    form.validateFields((error: Error, values: [any]) => {
      if (!error && onSubmit) {
        onSubmit(values);
      } else if (onSubmitError) {
        onSubmitError(values, error);
      }
    });
  }

  render() {
    return(
      <form onSubmit={this.onSubmit} style={this.props.style}>
        {this.props.children && React.Children.map(this.props.children, (child: any) => {
          return React.cloneElement(child, { form: this.props.form });
        })}
      </form>
    );
  }
}

export default createForm()(ValidatedForm);
