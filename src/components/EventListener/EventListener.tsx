import * as React from 'react';
import { addEventListener, removeEventListener } from '@shopify/javascript-utilities/events';

export interface Props {
  // A particular event that occured.
  event: string;
  // Event that occured is captured or not.
  capture?: boolean;
  // Is a passive event
  passive?: boolean;
  // Handler for handling particular event.
  handler(event: Event): void;
}

// see https://github.com/oliviertassinari/react-event-listener/
export default class EventListener extends React.PureComponent<Props, never> {
  componentDidMount() {
    this.attachListener();
  }

  componentWillUpdate() {
    this.detachListener();
  }

  componentDidUpdate() {
    this.attachListener();
  }

  componentWillUnmount() {
    this.detachListener();
  }

  // tslint:disable-next-line prefer-function-over-method
  render() {
    return null;
  }

  private attachListener() {
    const { event, handler, capture = false, passive = false } = this.props;
    addEventListener(window, event, handler, { capture, passive });
  }

  private detachListener() {
    const { event, handler, capture = false } = this.props;
    removeEventListener(window, event, handler, capture);
  }
}
