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
export type Width = 'small' | 'medium' | 'large' | string;

export interface Props {
  active?: boolean;
  activator?: React.ReactNode;
  activatorWrapper?: string;
  children?: any;
  flip?: boolean;
  mode?: Mode;
  accessibilityLabel?: string;
  overlay?: boolean;
  theme?: any;
  width?: Width;
  closeButton?: boolean;
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

  public id = getUniqueID();
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
      width = 'medium',
      theme,
    } = this.props;

    const containerClassName = classNames(
      theme.offcanvas,
      overlay && theme.overlay,
      flip && theme.flip,
      width === 'small' && theme.small,
      width === 'medium' && theme.medium,
      width === 'large' && theme.large,
      this.state.active && theme.open
    );

    const barClassName = classNames(
      theme.bar,
      mode === 'slide' && theme.animation,
      mode === 'push' && theme.animation
    );

    const bodyElement = document.body;
    const rootElement = document.getElementById('root');
    if (bodyElement !== null) {
      bodyElement.className = this.state.active ? (theme.container) : '';
      bodyElement.className += overlay && this.state.active ? ' ' + (theme.overlay) : '';
      bodyElement.className += flip && this.state.active ? ' ' + (theme.flip) : '';
      if (width === 'small') {
        bodyElement.className += this.state.active ? ' ' + (theme.small) : '';
      }
      if (width === 'medium') {
        bodyElement.className += this.state.active ? ' ' + (theme.medium) : '';
      }
      if (width === 'large') {
        bodyElement.className += this.state.active ? ' ' + (theme.large) : '';
      }
      if (mode === 'push' || mode === 'reveal') {
        bodyElement.className += this.state.active ? ' ' + (theme.animation) : '';
        if (rootElement !== null) {
          if (flip) {
            rootElement.style.left = width && this.state.active ? `-${width}` : '';
          } else {
            rootElement.style.left = width && this.state.active ? `${width}` : '';
          }
        }
      }
    }

    const bar = [
      <div className={barClassName} style={width ? { width: `${width}` }  : undefined} key={id}>
        <OffCanvasContent
          id={id}
          activator={activatorNode}
          active={active || this.state.active}
          onClose={noop}
          onCancel={this.handleClick}
          closeButton={this.props.closeButton}
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
            <div className={theme.reveal} style={width && this.state.active ? { width: `${width}` }  : undefined}>
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
    accessibilityNode.setAttribute('aria-label', this.props.accessibilityLabel ? this.props.accessibilityLabel : '');
  }
}

export default themr(OFFCANVAS, baseTheme)(OffCanvas) as ThemedComponentClass<Props, State>;
