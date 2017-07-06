/* eslint-disable react/prop-types */
import * as React from 'react';
import ReactDOM from 'react-dom';

export interface State {
  isScrolling: boolean,
}

const focusableComponentWrapper = (WrappedComponent: any) => {
  return (
    class ComponentWrapper extends React.Component<{}, State> {
      constructor() {
        super();
        this.checkFocus = this.checkFocus.bind(this);
        this.state = { isScrolling: false };
      }

      shouldComponentUpdate(nextProps: any) {
        return WrappedComponent.isSelected(this.props) !== WrappedComponent.isSelected(nextProps);
      }

      componentWillReceiveProps(nextProps: any) {
        const isScrolling = WrappedComponent.isScrolling(nextProps);
        if (isScrolling && !this.state.isScrolling) {
          this.setState({isScrolling});
        }
      }

      componentDidMount() {
        this.checkFocus();
      }

      componentDidUpdate() {
        this.checkFocus();
      }

      checkFocus() {
        if (WrappedComponent.isSelected(this.props) && this.state.isScrolling) {
          this.focus();
          this.setState({isScrolling: false});
        }
      }

      focus() {
        (ReactDOM.findDOMNode(this) as HTMLElement).focus();
      }

      render() {
        return <WrappedComponent {...this.props} {...this.state} />;
      }
    });
};

export default focusableComponentWrapper;
