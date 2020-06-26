import * as React from 'react';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { addEventListener, removeEventListener } from '@shopify/javascript-utilities/events';
import { Keys } from '../../types';

export interface Props {
  // Code of keyboard key which triggered event.
  keyCode: Keys;
  // Handler for handling particular event fired through keyboard.
  handler(event: KeyboardEvent): void;
}

export default class KeypressListener extends React.PureComponent<Props, never> {
  componentDidMount() {
    addEventListener(document, 'keyup', this.handleKeyEvent);
  }

  componentWillUnmount() {
    removeEventListener(document, 'keyup', this.handleKeyEvent);
  }

  // tslint:disable-next-line prefer-function-over-method
  render() {
    return null;
  }

  @autobind
  private handleKeyEvent(event: KeyboardEvent) {
    const { keyCode, handler } = this.props;

    if (event.keyCode === keyCode) {
      handler(event);
    }
  }
}
