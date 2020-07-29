import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { layeredComponent } from '@shopify/react-utilities/components';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { noop, createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { findFirstFocusableNode } from '@shopify/javascript-utilities/focus';

import { PreferredPosition } from '../PositionedOverlay';
import { TOOLTIP } from '../ThemeIdentifiers';

import TooltipOverlay from './TooltipOverlay';
import * as baseTheme from './Tooltip.scss';

export interface Props {
  // The children that activate the tooltip.
  children?: React.ReactNode;
  // The content to display within the tooltip.
  content: string;
  // Toggle whether the tooltip is visible.
  active?: boolean;
  // Display tooltip with a light background.
  light?: boolean;
  // The direction the tooltip tries to display Availabel options: above | below | mostSpace
  preferredPosition?: PreferredPosition;
  // The element type to wrap the activator in.
  activatorWrapper?: string;
  // Theme to be injected via css-themr.
  theme?: any;
}

export interface State {
  active: boolean;
}

const getUniqueID = createUniqueIDFactory('TooltipContent');

@layeredComponent({ idPrefix: 'Tooltip' })
class Tooltip extends React.PureComponent<Props, State> {
  state: State = {
    active: false,
  };
  private id = getUniqueID();
  private activatorNode: HTMLElement | null;
  private activatorContainer: HTMLElement | null;

  componentDidMount() {
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  renderLayer() {
    const { id, activatorNode } = this;
    if (activatorNode == null) { return null; }

    const {
      preferredPosition = 'below',
      active = false,
      light = false,
      content,
      theme,
    } = this.props;

    return (
      <TooltipOverlay
        componentId={id}
        preferredPosition={preferredPosition}
        activator={activatorNode}
        active={active || this.state.active}
        onClose={noop}
        light={light}
      >
         <div className={theme.label}>
          {content}
         </div>
      </TooltipOverlay>
    );
  }

  render() {
    const { activatorWrapper: WRAPPERCOMPONENT = 'span' }: any = this.props;

    return (
      <WRAPPERCOMPONENT
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={this.setActivator}
      >
        {this.props.children}
      </WRAPPERCOMPONENT>
    );
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

  @autobind
  private handleFocus() {
    this.setState({ active: true });
  }

  @autobind
  private handleBlur() {
    this.setState({ active: false });
  }

  @autobind
  private handleMouseEnter() {
    this.setState({ active: true });
  }

  @autobind
  private handleMouseLeave() {
    this.setState({ active: false });
  }

  private setAccessibilityAttributes() {
    const { activatorContainer, id } = this;
    if (activatorContainer == null) { return; }

    const firstFocusable = findFirstFocusableNode(activatorContainer);
    const accessibilityNode = firstFocusable || activatorContainer;

    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute('aria-describedby', id);
  }
}

export default themr(TOOLTIP, baseTheme)(Tooltip) as ThemedComponentClass<Props, {}>;
