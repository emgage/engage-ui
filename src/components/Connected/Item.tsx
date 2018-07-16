import * as React from 'react';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { classNames } from '@shopify/react-utilities/styles';
import * as styles from './Connected.scss';

export enum Position {
  Left,
  Primary,
  Right,
}

export interface Props {
  // To set position/direction of item to render inside component.
  position: Position;
  // Display given text or render any node inside Item.
  children?: React.ReactNode;
}

export interface State {
  focused: boolean;
}

export default class Item extends React.PureComponent<Props, State> {
  state: State = { focused: false };

  render() {
    const { focused } = this.state;
    const { children, position } = this.props;
    const className = classNames(
      styles.item,
      focused && styles['item-focused'],
      position === Position.Primary ? styles['item-primary'] : styles['item-connection']
    );

    return (
      <div
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        className={className}
      >
        {children}
      </div>
    );
  }

  @autobind
  private handleBlur() {
    this.setState({ focused: false });
  }

  @autobind
  private handleFocus() {
    this.setState({ focused: true });
  }
}
