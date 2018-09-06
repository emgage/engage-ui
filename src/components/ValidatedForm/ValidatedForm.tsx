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
  // Pass unique reference to the farm
  formId?: string;
  // To apply styling externally
  componentStyle?: React.CSSProperties;
  formFields: string[];
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

  renderChild = (child: React.ReactElement<any>, directChild: boolean = false): any => {
    // console.log('I am here:', child);
    // return React.cloneElement(child, { form: this.props.form });
    const { formFields, form } = this.props;
    const { props = {} } = child;
    const { children, componentId } = props;

    if (formFields.indexOf(componentId) !== -1) {
      return React.cloneElement(child, { form });
    }

    if (directChild || typeof children === 'string') {
      const submitProp = child.props.submit ? { onClick: this.onSubmit } : undefined;
      return React.cloneElement(child, submitProp);
    }

    if (children) {
      if (children.constructor === Array) {
        return React.Children.map(children, (thisChild: React.ReactElement<any>) => {
          return this.renderChild(thisChild);
        });
      }

      return this.renderChild(children, true);
    }
  }

  render() {
    return(
      <form id={this.props.formId} onSubmit={this.onSubmit} style={this.props.componentStyle}>
        {this.props.children && React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
          // console.log(this.renderChild(child));
          return this.renderChild(child);
          // return React.cloneElement(child, { form: this.props.form });
        })}
      </form>
    );
  }
}

export default createForm()(ValidatedForm);
