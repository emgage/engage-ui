import * as React from 'react';
import { layeredComponent } from '@shopify/react-utilities/components';
import autobind from '@shopify/javascript-utilities/autobind';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { focusFirstFocusableNode, findFirstFocusableNode } from '@shopify/javascript-utilities/focus';

import { PreferredPosition } from '../PositionedOverlay';
import PopoverOverlay, { CloseSource } from './PopoverOverlay';

export interface Props {
  children?: React.ReactNode;
  preferredPosition?: PreferredPosition;
  active: boolean;
  activator: React.ReactElement<any>;
  activatorWrapper?: string;
  preventAutofocus?: boolean;
  sectioned?: boolean;
  onClose?(source: CloseSource): void;
}

export interface State {
  activatorFocused: boolean;
}

const getUniqueID = createUniqueIDFactory('Popover');

@layeredComponent({ idPrefix: 'Popover' })
export default class Popover extends React.PureComponent<Props, State> {

  state: State = {
    activatorFocused: false,
  };

  private activatorNode: HTMLElement | null;
  private activatorContainer: HTMLElement | null;
  private id = getUniqueID();

  componentDidMount() {
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  renderLayer() {
    const {
      children,
      onClose,
      activator,
      activatorWrapper,
      ...rest,
    } = this.props;

    if (this.activatorNode == null) {
      return null;
    }

    return (
      <PopoverOverlay
        id={this.id}
        activator={this.activatorNode}
        onClose={this.handleClose}
        {...rest}
      >
        {children}
      </PopoverOverlay>
    );
  }

  render() {
    const { activatorWrapper: WRAPPERCOMPONENT = 'div' } = this.props;

    return (
      <WRAPPERCOMPONENT ref={this.setActivator}>
        {React.Children.only(this.props.activator)}
      </WRAPPERCOMPONENT>
    );
  }

  private setAccessibilityAttributes() {
    const { id, activatorContainer } = this;
    if (activatorContainer == null) { return; }

    const firstFocusable = findFirstFocusableNode(activatorContainer);
    const focusableActivator = firstFocusable || activatorContainer;

    focusableActivator.tabIndex = 0;
    focusableActivator.setAttribute('aria-controls', id);
    focusableActivator.setAttribute('aria-owns', id);
    focusableActivator.setAttribute('aria-haspopup', 'true');
    focusableActivator.setAttribute('aria-expanded', String(this.props.active));
  }

  @autobind
  private handleClose(source: CloseSource) {
    if (!!this.props.onClose) {
      this.props.onClose(source);
    }

    if (this.activatorContainer == null) { return; }
    if (
      source === CloseSource.FocusOut ||
      source === CloseSource.EscapeKeypress
    ) {
      focusFirstFocusableNode(this.activatorContainer, false);
    }
  }

  @autobind
  private setActivator(node: HTMLElement | null) {
    if (node == null) {
      this.activatorNode = null;
      this.activatorContainer = null;
      return;
    }

    this.activatorNode = node.firstElementChild as HTMLElement;
    this.activatorContainer = node;
  }
}
