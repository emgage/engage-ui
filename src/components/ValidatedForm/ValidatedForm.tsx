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
  showError: boolean;
}

class ValidatedForm extends React.PureComponent<Props, {}> {
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.showError !== nextProps.showError && nextProps.showError) {
      const { form , onSubmitError } = this.props;
      form.validateFields((error: Error, values: [React.FormEvent<any>]) => {
        if (onSubmitError) {
          onSubmitError(values, error);
        }
      });
    }
  }
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

  // Function to render all the child of form
  // Here we need to find the form elements and then pass "form" prop to those element
  renderChild = (child: React.ReactElement<any>, directChild: boolean = false): any => {
    const { formFields, form } = this.props;
    const { props = {} } = child;
    const { children, componentId } = props;

    // Check if current component id matches the form field id
    // If matches then clone it with the "form" prop
    if (formFields.indexOf(componentId) !== -1) {
      return React.cloneElement(child, { form });
    }

    // If any children is string, it means there are no more elements present as child so clone it directly
    if (typeof children === 'string') {
      // If the current child is a submit button then pass the onSubmit function to onClick prop
      const submitProp = child.props.submit ? { onClick: this.onSubmit } : undefined;
      return React.cloneElement(child, submitProp);
    }

    if (children) {
      // If there are more than one children iterate through it
      if (children.constructor === Array) {
        const childClone = React.Children.map(children, (thisChild: React.ReactElement<any>) => {
          // This could be blank string as well thats why used this condition
          if (thisChild.props && thisChild.props.children === undefined) {
            return React.cloneElement(thisChild);
          }

          return this.renderChild(thisChild);
        });

        // Clone parent element with the child props
        return React.cloneElement(child, { children: childClone });
      }

      return React.cloneElement(child, { children: this.renderChild(children, true) });
    }
  }

  render() {
    return(
      <form id={this.props.formId} onSubmit={this.onSubmit} style={this.props.componentStyle}>
        {this.props.children && React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
          return this.renderChild(child);
        })}
      </form>
    );
  }
}

export default createForm()(ValidatedForm);
