import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { layeredComponent } from '@shopify/react-utilities/components';

import Button from '../Button';
import KeypressListener from '../KeypressListener';

import { Keys } from '../../types';
import { MODAL } from '../ThemeIdentifiers';

import * as baseTheme from './Modal.scss';

export type Width = 'small' | 'medium' | 'large' | string;

export interface Props {
  // Define the open or close state of modal
  active?: boolean;
  // Show or hide close button for modal
  closeButton?: boolean;
  // Can define any extra class for modal to style it if needed
  className?: string;
  // Flag to define if modal should be closed when clicked outside
  closeOnBackgroud?: boolean;
  // Flag to define if modal should get closed on pressing escape key
  closeOnEsc?: boolean;
  // onClose callback function to be called when drawer gets closed
  onClose?(): void;
  // onOpen callback function to be called when drawer gets opened
  onOpen?(): void;
  theme?: any;
  // Callback function for opening or closing modal
  toggle?(): void;
  // Define size of modal: small, medium, large or px value
  width?: Width;
}

const getUniqueID = createUniqueIDFactory('ModalContent');

@layeredComponent({ idPrefix: 'Modal' })
class Modal extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  public id = getUniqueID();

  componentDidMount() {
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  componentWillReceiveProps(newProps: any) {
    const { active } = this.props;
    // Call the callback function if available
    // onOpen: when drawer open
    // onClose: when drawer close
    if (!active && newProps.active && typeof newProps.onOpen !== 'undefined') {
      newProps.onOpen();
    } else if (active && !newProps.active && typeof newProps.onClose !== 'undefined') {
      newProps.onClose();
    }
  }

  getModalContainerClassName() {
    const { theme, width } = this.props;

    return classNames(
      theme.dialog,
      width === 'small' && theme.small,
      width === 'medium' && theme.medium,
      width === 'large' && theme.large
    );
  }

  getModalWrapperClassName() {
    const { active, className, theme } = this.props;

    return classNames(
      theme.overlay,
      active && theme.open,
      className
    );
  }

  render() {
    return null;
  }

  // Render close button if its set true
  renderCloseButton() {
    const { closeButton, theme } = this.props;

    return closeButton ? (<div className={theme.close}><Button plain onClick={this.closeModal.bind(this)} icon="cancel" /></div>) : null;
  }

  // Import keylistener if modal needs to be closed on pressing escape key
  renderKeyListener() {
    return this.props.closeOnEsc ? (<KeypressListener keyCode={Keys.ESCAPE} handler={this.triggerCloseEvent.bind(this)} />) : null;
  }

  renderLayer() {
    const { children, closeOnBackgroud } = this.props;
    const modalWrapperClassName = this.getModalWrapperClassName();
    const modalContainerClass = this.getModalContainerClassName();
    const escapeKeyListener = this.renderKeyListener();
    const closeButton = this.renderCloseButton();

    this.setBodyTagStyle();

    return (
      <div
        id={this.id}
        className={modalWrapperClassName}
        onClick={(closeOnBackgroud) ? this.triggerCloseEvent.bind(this) : undefined}>
        {escapeKeyListener}
        <div className={modalContainerClass}>
          {closeButton}
          {children}
        </div>
      </div>
    );
  }

  setAccessibilityAttributes() {}

  // This just set overflow: hidden style to body tag, so there will be no scrollbar
  setBodyTagStyle() {
    const bodyElement = document.body;
    const { active, theme } = this.props;

    if (bodyElement !== null) {
      bodyElement.className += active ? (theme.page) : '';
    }
  }

  /* 
    Function to be called when closing modal event is triggered
    Here we will check for all 3 possible triggers which can close the modal
    If any of them gets true will fire modal close trigger
  */
  triggerCloseEvent(event: React.SyntheticEvent<HTMLElement> | KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const { closeOnBackgroud } = this.props;

    switch (event.type) {
      case 'keyup':
        this.closeModal();
        break;
      case 'click':
        if (target.id === this.id && closeOnBackgroud) {
          this.closeModal();
        }
        break;
      default:
        break;
    }
  }

  closeModal() {
    this.props.toggle ? this.props.toggle() : undefined;
  }
}

export default themr(MODAL, baseTheme)((Modal)) as ThemedComponentClass<Props, {}>;
