import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { noop, createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { findFirstFocusableNode } from '@shopify/javascript-utilities/focus';
import { addEventListener, removeEventListener } from '@shopify/javascript-utilities/events';

import { PreferredAlignment, PreferredPosition } from '../PositionedOverlay';
import { TOOLTIP } from '../ThemeIdentifiers';

import PopoverOverlay from './PopoverOverlay';
import * as baseTheme from './Popover.scss';

export interface Props {
  // This will help to set popover active or inactive when required from parent component
  manualInActive?: boolean;
  addArrow?: boolean;
  // Set anchor element
  anchorEl?: any;
  // The children that activate the popover.
  children?: React.ReactNode;
  closeOnClickInside?: boolean;
  componentClass?: string;
  componentStyle?: any;
  // Unique ID
  componentId?: string;
  onClose?(): void;
  // The direction the popover tries to display Availabel options: above | below | mostSpace
  preferredPosition?: PreferredPosition;
  preferredAlignment?: PreferredAlignment;
  // Theme to be injected via css-themr.
  theme?: any;
  open?: boolean;
}

export interface State {
  active: boolean;
}

const getUniqueID = createUniqueIDFactory('PopoverContent');
class Popover extends React.PureComponent<Props, State> {
  private id = getUniqueID();
  private activatorContainer: HTMLElement | null;

  constructor(props: Props) {
    super(props);

    this.state = {
      active: false
    };
  }

  componentWillMount() {
    addEventListener(document, 'mousedown', this.handleOutsideClick);
    addEventListener(document, 'keyup', this.handleKeyboard);
  }

  componentDidMount() {
    this.setAccessibilityAttributes();
  }

  componentWillUnmount() {
    const { anchorEl } = this.props;
    removeEventListener(document, 'mousedown', () => {});
    removeEventListener(document, 'keyup', () => {});

    if (anchorEl) {
      removeEventListener(anchorEl, 'mousedown', () => {});
    }
  }

  componentWillReceiveProps(newProps: Props) {
    const { anchorEl, manualInActive = false } = newProps;
    const { anchorEl: oldAnchorEle, manualInActive: oldManualActive = false } = this.props;

    if (anchorEl && anchorEl !== oldAnchorEle) {
      this.setState({ active: true });

      addEventListener(anchorEl, 'mousedown', this.handleAnchorClick);
    }

    if (manualInActive && manualInActive !== oldManualActive) {
      this.setState({ active: false }, () => {
        this.handleOnClose();
      });
    }
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  handleAnchorClick = (event: any) => {
    this.setState({ active: !this.state.active }, () => {
      if (!this.state.active) {
        this.handleOnClose();
      }
    });
  }

  handleOutsideClick = (event: any) => {
    const { anchorEl, closeOnClickInside = false } = this.props;

    if (closeOnClickInside && anchorEl && !anchorEl.contains(event.target)) {
      this.setState({ active: false }, () => {
        this.handleOnClose();
      });
      return;
    }

    if ((this.activatorContainer && this.activatorContainer.contains(event.target)) || (anchorEl && anchorEl.contains(event.target))) {
      return;
    }

    this.setState({ active: false }, () => {
      this.handleOnClose();
    });
  }

  handleKeyboard = (event: KeyboardEvent) => {
    if (event.which === 27) {
      this.setState({ active: false }, () => {
        this.handleOnClose();
      });
    }
  }
  handleOnClose = () => {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  }

  render() {
    const { id } = this;
    const { active } = this.state;
    const {
      anchorEl,
      addArrow = true,
      children,
      componentClass = '',
      componentStyle = {},
      componentId = '',
      preferredPosition = 'below',
      preferredAlignment = 'center',
      open = false,
    } = this.props;

    const themeClass = classNames(
      componentClass
    );

    if (!anchorEl) { return null; }

    return (
      <PopoverOverlay
        addArrow={addArrow}
        componentId={ componentId !== '' ? componentId : id}
        preferredPosition={preferredPosition}
        preferredAlignment={preferredAlignment}
        activator={anchorEl}
        active={open ? open : active}
        onClose={noop}
        popoverRef={this.setActivator}
      >
        <div className={themeClass} style={componentStyle}>
          {children}
        </div>
      </PopoverOverlay>
    );
  }

  @autobind
  private setActivator(node: HTMLElement | null) {
    if (node == null) {
      this.activatorContainer = null;
      return;
    }

    this.activatorContainer = node;
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

export default themr(TOOLTIP, baseTheme)(Popover) as ThemedComponentClass<Props, {}>;
