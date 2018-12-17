import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { findFirstFocusableNode } from '@shopify/javascript-utilities/focus';
import { addEventListener, removeEventListener } from '@shopify/javascript-utilities/events';
import { classNames } from '@shopify/react-utilities/styles';
import { closest } from '@shopify/javascript-utilities/dom';
import { layer } from '../shared';
import { POPOVER } from '../ThemeIdentifiers';
import * as baseTheme from './Popover.scss';
import { Keys } from '../../types';
import { findDOMNode } from 'react-dom';
import { getRectForNode } from '@shopify/javascript-utilities/geometry';
import { forNode as ScrollableForNode } from '../Scrollable';
import {
  calculateVerticalPosition,
  calculateHorizontalPosition,
} from '../PositionedOverlay/math';

// DEfine type for direction to render popover
export type Direction = 'up' | 'down' | 'left' | 'right' | 'full';

// All prototypes type
export interface Props {
  // Set children to display Popover with header and content elements
  children?:React.ReactNode;
  // Set disabled
  disabled?:boolean;
  // Set direction to be applied. Available options: up | down | left | right.
  direction?:Direction;
  // Set active to true for popover to display, else false
  active: boolean;
  // Set wrapper element
  activatorWrapper?: string;
  // Set to true if you want to close popover when click anywhere in body
  closeOnClickOutside?: boolean;
  // Set anchor element or keep it null
  anchorEl?: HTMLElement | null;
  // To add any inline style to Popover
  style? : any;
  // Call close method on click 
  onClose?(): void;
  // Call open method on click 
  onOpen?(): void;
  // Call toggle method on click 
  toggle?(): void;
  // Call callbackParent method on outside area click 
  callbackParent?(status:boolean) :void;
}

export interface State {
  active: boolean;
}
// Popover component, in here wrap all other required components or DOM for the Popover
class Popover extends React.PureComponent<Props, State> {
  private getUniqueID = createUniqueIDFactory('Popover');
  private activatorContainer: HTMLElement | null;
  private id = this.getUniqueID();
  private popoverEle: HTMLElement;
  private popoverOffset = { height: 0, width: 0 };

  static defaultProps = {
    closeOnClickOutside: true,
  };

  private scrollableContainer: HTMLElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      // As per props value set the popover to be active
      active: this.props.active,
    };
  }

  componentWillReceiveProps(newProps: Props) {
    const { active: newActive } = newProps;
    const { active } = this.props;

    if (newActive !== active) {
      this.setState({ active: newActive });
    }

    if (active && !newProps.active && newProps.onClose) {
      newProps.onClose();
    } else if (!active && newProps.active && newProps.onOpen) {
      newProps.onOpen();
    }
  }

  componentDidMount() {
    // Set accessibility attributes for Popover
    this.setAccessibilityAttributes();
    const element = findDOMNode(this);
    this.popoverEle.style.display = 'block';
    this.popoverOffset.height = this.popoverEle.offsetHeight;
    this.popoverOffset.width = this.popoverEle.offsetWidth;
    this.popoverEle.style.display = '';
    

    if (element !== null) {
      addEventListener(element, 'keyup', this.handleKeyEvent);
    }

    if (this.props.closeOnClickOutside) {
      addEventListener(document, 'click', this.handleMouseEvent);
    }
  }

  componentDidUpdate() {
     // Set accessibility attributes for Popover
    this.setAccessibilityAttributes();
  }

  componentWillUnmount() {
    // Find domnode and remove event listeners attached to it
    const element = findDOMNode(this);
    if (element != null) {
      removeEventListener(element, 'keyup', this.handleKeyEvent);
    }

    if (this.props.closeOnClickOutside) {
      removeEventListener(document, 'click', this.handleMouseEvent);
    }
    removeEventListener(this.scrollableContainer, 'scroll', this.handleMeasurement);
    removeEventListener(window, 'resize', this.handleMeasurement);
  }

  render() {
    const {
      activatorWrapper: WRAPPERCOMPONENT = 'div',
      children,
      direction = 'down',
      anchorEl,
      disabled,
      style,
    } = this.props;

    const { active } = this.state;

    const popoverClassName = classNames(
      direction === 'down' ? baseTheme.popdown
      : direction === 'up' ? baseTheme.popup
      : direction === 'left' ? baseTheme.popleft
      : baseTheme.popright,
      !disabled && active && baseTheme.active
    );

    const popoverContainerClassName = classNames(
      baseTheme.popoverContainer,
      !disabled && active && baseTheme.active
    );

    const activatorComp = anchorEl;
    let activatorRect: ClientRect | DOMRect;
    let popoverPosition: any = {};

    if (activatorComp != null) {
      if (this.props.anchorEl) {
        this.scrollableContainer = ScrollableForNode(this.props.anchorEl);
        addEventListener(this.scrollableContainer, 'scroll', this.handleMeasurement);
        addEventListener(window, 'resize', this.handleMeasurement);
        activatorRect = activatorComp.getBoundingClientRect();
        popoverPosition = this.handleMeasurement();
        if (direction === 'up') {
          popoverPosition = { left: activatorRect.left - popoverPosition.left, top: - activatorRect.top + (activatorRect.height) };
        } else if (direction === 'left') {
          popoverPosition = { left: - this.popoverOffset.width, top: - activatorRect.height };
        } else if (direction === 'right') {
          popoverPosition = { left: activatorRect.width, top: - activatorRect.height };
        } else if (direction === 'down') {
          popoverPosition = { left: activatorRect.left - popoverPosition.left, top: popoverPosition.top - activatorRect.top - (activatorRect.height / 2)}
        }
      }
    }

    return (
        <WRAPPERCOMPONENT ref={this.setActivator}>
          <div className={popoverClassName} key={this.id}>
            <div
              style={style ? { ...style, ...popoverPosition } : popoverPosition }
              className={popoverContainerClassName}
              ref={node => this.popoverEle = node as HTMLElement}
            >
            {children}
          </div>
        </div>
      </WRAPPERCOMPONENT>
    );
  }

  // set accessibility attributes
  private setAccessibilityAttributes() {
    const { id, activatorContainer } = this;
    if (activatorContainer === null) { return; }

    const firstFocusable = findFirstFocusableNode(activatorContainer);
    const focusableActivator = firstFocusable || activatorContainer;

    focusableActivator.tabIndex = 0;
    focusableActivator.setAttribute('aria-controls', id);
    focusableActivator.setAttribute('aria-owns', id);
    focusableActivator.setAttribute('aria-haspopup', 'true');
    focusableActivator.setAttribute('aria-expanded', String(this.props.active));
  }

  // Get activator node i.e. trigger which opened up popover
  // This node will be used to set accessibility attributes
  @autobind
  private setActivator(node: HTMLElement | null) {
    if (node === null) {
      this.activatorContainer = null;
      return;
    }
    this.activatorContainer = node;
  }

  // Key event handler to see if escape is pressed
  @autobind
  private handleKeyEvent(event: KeyboardEvent) {
    event.preventDefault();

    const {
      closeOnClickOutside,
      callbackParent,
    } = this.props;

    const { active } = this.state;

    if (!active) {
      return;
    }
    // Close the popdown on ESC
    if (event.keyCode === Keys.ESCAPE && closeOnClickOutside) {
      const newState = !this.state.active;
      // Update the state
      this.setState({ active: newState });
      const callParent = callbackParent;
      if (callParent) {
        callParent(newState);
      }
    }
  }

  // Mouse event handler to track the click event
  @autobind
  private handleMouseEvent(event: MouseEvent) {
    event.preventDefault();

    const {
      anchorEl,
      closeOnClickOutside,
      callbackParent,
    } = this.props;

    const { active } = this.state;
    const element = findDOMNode(this);

    if (!active) {
      return;
    }

    // Close the popdown on outside area click
    if (element !== null && event.target != null && element !== event.target && closeOnClickOutside) {
      const domNode = document.body;
      const targetNode = event.target;
      if ((!domNode || !domNode.contains(targetNode as Node))) {
        this.setState({ active : true });
      } else if (event.target !== anchorEl && !element.contains(event.target as Node)) {
        const newState = !this.state.active;
        // update the state
        this.setState({ active: !this.state.active });
        const callParent = callbackParent;
        if (callParent) {
          callParent(newState);
        }
      }
    }
  }

  @autobind
  private handleMeasurement() {
    const {
      direction = 'down',
      anchorEl,
    } = this.props;

    const activatorRect = getRectForNode(anchorEl);
    const overlayRect = getRectForNode(this.popoverEle);
    const scrollableContainerRect = getRectForNode(this.scrollableContainer);
    const overlayMargins = this.popoverEle.firstElementChild
      ? getMarginsForNode(this.popoverEle.firstElementChild as HTMLElement)
      : { activator: 0, container: 0, horizontal: 0 };
    const containerRect = getRectForNode(window);
    const zIndex = anchorEl ? getZIndexForLayerFromNode(anchorEl) + 1 : 1;
    const verticalPosition = calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, direction === "down" ? "below" : "above");
    const horizontalPosition = calculateHorizontalPosition(activatorRect, overlayRect, containerRect);

    return {top: verticalPosition.top, left: horizontalPosition, zIndex: zIndex};
  }
}

function getMarginsForNode(node: HTMLElement) {
  const styles = window.getComputedStyle(node);
  return {
    activator: parseFloat(styles.marginTop || ''),
    container: parseFloat(styles.marginBottom || ''),
    horizontal: parseFloat(styles.marginLeft || ''),
  };
}

function getZIndexForLayerFromNode(node: HTMLElement) {
  const layerNode = closest(node, layer.selector) || document.body;
  const zIndex = parseInt(window.getComputedStyle(layerNode).zIndex || '0', 10);
  return isNaN(zIndex) ? 0 : zIndex;
}

export default themr(POPOVER, baseTheme)(Popover) as ThemedComponentClass<Props, {}>;
