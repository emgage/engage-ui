import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { layeredComponent } from '@shopify/react-utilities/components';
import autobind from '@shopify/javascript-utilities/autobind';
import { classNames } from '@shopify/react-utilities/styles';
import { noop, createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { findFirstFocusableNode } from '@shopify/javascript-utilities/focus';

import { OFFCANVAS } from '../ThemeIdentifiers';

import OffCanvasContent from './OffCanvasContent';
import * as baseTheme from './OffCanvas.scss';

export type Mode = 'slide' | 'push' | 'reveal';

export interface Props {
  active?: boolean;
  activator?: React.ReactNode;
  activatorWrapper?: string;
  children?: any;
  flip?: boolean;
  mode?: Mode;
  overlay?: boolean;
  theme?: any;
}

export interface State {
  active: boolean;
}

const getUniqueID = createUniqueIDFactory('OffCanvasContent');

@layeredComponent({ idPrefix: 'OffCanvas' })
class OffCanvas extends React.PureComponent<Props, State> {
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

  handleClick = () => {
    this.setState({ active: !this.state.active });
  }

  renderLayer() {
    const { id, activatorNode } = this;
    if (activatorNode == null) { return null; }

    const {
      active,
      children,
      flip,
      mode,
      overlay,
      theme,
    } = this.props;

    const containerClassName = classNames(
      theme.offcanvas,
      overlay && theme.overlay,
      flip && theme.flip,
      this.state.active && theme.open
    );

    const barClassName = classNames(
      theme.bar,
      mode === 'slide' && theme.animation,
      mode === 'push' && theme.animation
    );

    const rootElement = document.body;
    if (rootElement !== null) {
      rootElement.className = this.state.active ? (theme.container) : '';
      rootElement.className += overlay && this.state.active ? ' ' + (theme.overlay) : '';
      rootElement.className += flip && this.state.active ? ' ' + (theme.flip) : '';
      if (mode ===  'push' || mode ===  'reveal') {
        rootElement.className += this.state.active ? ' ' + (theme.animation) : '';
      }
    }

    const bar = [
      <div className={barClassName}>
        <OffCanvasContent
          id={id}
          activator={activatorNode}
          active={active || this.state.active}
          onClose={noop}
          onClick={this.handleClick}
        >
          <div className={theme.label} aria-live={'assertive'} >
            {children}
          </div>
        </OffCanvasContent>
      </div>,
    ];

    return (
      <div className={containerClassName}>
        {
          mode === 'reveal'
          ?
          <div className={theme.reveal}>
            {bar}
          </div>
          :
          bar
        }
      </div>
    );
  }


  render() {
    const { activatorWrapper: WRAPPERCOMPONENT = 'span' } = this.props;

    return (
      <WRAPPERCOMPONENT
        onClick={this.handleClick}
        ref={this.setActivator}
      >
        {this.props.activator}
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

  private setAccessibilityAttributes() {
    const { activatorContainer, id } = this;
    if (activatorContainer == null) { return; }

    const firstFocusable = findFirstFocusableNode(activatorContainer);
    const accessibilityNode = firstFocusable || activatorContainer;

    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute('aria-describedby', id);
    accessibilityNode.setAttribute('aria-expanded', this.state.active.toString());
    accessibilityNode.setAttribute('aria-haspopup', 'true');
  }
}

export default themr(OFFCANVAS, baseTheme)(OffCanvas) as ThemedComponentClass<Props, State>;
