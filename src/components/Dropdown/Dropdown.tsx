import * as React from 'react';
import { layeredComponent } from '@shopify/react-utilities/components';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { focusFirstFocusableNode, findFirstFocusableNode } from '@shopify/javascript-utilities/focus';

import { PreferredPosition } from '../PositionedOverlay';
import DropdownOverlay, { CloseSource } from './DropdownOverlay';

export interface Props {
  children?: React.ReactNode;
  preferredPosition?: PreferredPosition;
  active: boolean;
  content?: string;
  activatorWrapper?: string;
  onClose?(source: CloseSource): void;
}

export interface State {
}

const getUniqueID = createUniqueIDFactory('Dropdown');

@layeredComponent({ idPrefix: 'Dropdown' })
export default class Dropdown extends React.PureComponent<Props, State> {

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
      content,
      children,
      onClose,
      activatorWrapper,
      ...rest
    } = this.props;

    const { activatorContainer } = this;

    if (activatorContainer == null) {
      return null;
    }

    return (
      <DropdownOverlay
        id={this.id}
        onClose={this.handleClose}
        content={content}
        ActivatorContainer={activatorContainer as HTMLElement}
        {...rest}
      >
        {children}
      </DropdownOverlay>
    );
  }

  render() {
    const { activatorWrapper: WRAPPERCOMPONENT = 'div' } = this.props;

    return (
      <WRAPPERCOMPONENT ref={this.setActivator}>
        {React.Children.only(this.props.children)}
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
      this.activatorContainer = null;
      return;
    }

    this.activatorContainer = node;
  }
}
