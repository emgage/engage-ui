import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { classNames } from '@shopify/react-utilities/styles';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { layeredComponent } from '@shopify/react-utilities/components';

import Button from '../Button';
import KeypressListener from '../KeypressListener';

import { Keys } from '../../types';
import { MODAL } from '../ThemeIdentifiers';
// import './Modal.css';
import * as baseTheme from './Modal.scss';

export type Width = 'small' | 'medium' | 'large' | 'xlarge';

export interface Props {
  // Define the open or close state of modal
  active?: boolean;
  accessibilityLabel?: string;
  // Store the id of active drawer content
  activeContentId?: string;
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
  componentWidth?: Width;
  printable?: boolean;
}

const getUniqueID = createUniqueIDFactory('ModalContent');

@layeredComponent({ idPrefix: 'Modal' })
class Modal extends React.PureComponent<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  public id = getUniqueID();
  private activatorContainer: HTMLElement | null;

  componentDidMount() {
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  componentWillReceiveProps(newProps: Props) {
    const { active = false } = this.props;
    const { active: newActive = false } = newProps;
    // Call the callback function if available
    // onOpen: when drawer open
    // onClose: when drawer close
    if (!active && newActive && typeof newProps.onOpen !== 'undefined') {
      newProps.onOpen();
    } else if (active && !newActive && typeof newProps.onClose !== 'undefined') {
      newProps.onClose();
    }
  }

  componentWillUnmount() {
    const bodyElement = document.body;
    const { theme } = this.props;
    if (bodyElement !== null) {
      bodyElement.classList.remove(`${theme.page}`);
    }
  }

  closeModal = () => {
    const { printable = false, theme } = this.props;
    if (printable) {
      const bodyElement = document.body;
      bodyElement.classList.remove(`${theme.bodyPrint}`);
    }
    this.props.toggle ? this.props.toggle() : undefined;
  }

  getModalContainerClassName = () => {
    const { theme, componentWidth } = this.props;

    return classNames(
      theme.dialog,
      componentWidth === 'small' && theme.small,
      componentWidth === 'medium' && theme.medium,
      componentWidth === 'large' && theme.large,
      componentWidth === 'xlarge' && theme.xlarge
    );
  }

  getModalWrapperClassName = () => {
    const { active = false, className, theme } = this.props;

    return classNames(
      theme.overlay,
      active && theme.open,
      className
    );
  }

  render() {
    return <div ref={this.setActivator}></div>;
  }
     // Function to get the current active modal content from props.children & set that as active & render that component only
  renderActivechildren() {
    const { activeContentId, children, closeButton = false, toggle } = this.props;

    // Iterate through all the children content component & find active component
    // Match activeContentId with children's id & mark that as active: true
    return React.Children.map(children, (child: React.ReactElement<any>) => {
      const { id } = child.props;

      // Clone active component & return it
      if (activeContentId === id) {
        return React.cloneElement(child, { closeButton, toggle, active: true, });
      }
    });
  }
  print = () => {
    window.print();
  }
  // Render close button if its set true
  renderCloseButton = () => {
    const { closeButton = false, theme, printable = false } = this.props;

    return closeButton ? (
      <div className={theme.close}>
        { printable && <Button onClick={this.print} componentId="printModal" icon="print" plain componentSize="slim" theme={theme} componentStyle={{ marginRight: '.5rem' }} title="Print"></Button>}
        <Button plain onClick={this.closeModal} icon="cancel" theme={theme} title="Close Modal"></Button>
      </div>) : null;
  }

  // Import keylistener if modal needs to be closed on pressing escape key
  renderKeyListener = () => {
    const { active = false, closeOnEsc = false } =  this.props;
    return (closeOnEsc && active) ? (<KeypressListener keyCode={Keys.ESCAPE} handler={this.triggerCloseEvent} />) : null;
  }

  renderLayer = () => {
    const { closeOnBackgroud = false } = this.props;
    const modalWrapperClassName = this.getModalWrapperClassName();
    const modalContainerClass = this.getModalContainerClassName();
    const escapeKeyListener = this.renderKeyListener();
    const closeButton = this.renderCloseButton();
    const activeContent = this.renderActivechildren();

    this.setBodyTagStyle();
    this.setClassToBodyForPrint();

    return (
      <div
        id={this.id}
        className={modalWrapperClassName}
        onClick={(closeOnBackgroud) ? this.triggerCloseEvent : undefined}>
        {escapeKeyListener}
        <div className={modalContainerClass}>
          {closeButton}
          {activeContent}
        </div>
      </div>
    );
  }

  // This just set overflow: hidden style to body tag, so there will be no scrollbar
  setBodyTagStyle = () => {
    const bodyElement = document.body;
    const { active = false, theme } = this.props;

    if (bodyElement !== null) {
      if (active) {
        bodyElement.classList.add(`${theme.page}`);
      } else {
        bodyElement.classList.remove(`${theme.page}`);
      }
    }
  }

  setClassToBodyForPrint = () => {
    const bodyElement = document.body;
    const { active = false, printable = false, theme } = this.props;

    if (bodyElement !== null && active && printable) {
      bodyElement.classList.add(`${theme.bodyPrint}`);
    }
  }

  /* 
    Function to be called when closing modal event is triggered
    Here we will check for all 3 possible triggers which can close the modal
    If any of them gets true will fire modal close trigger
  */
  triggerCloseEvent = (event: React.SyntheticEvent<HTMLElement> | KeyboardEvent) => {
    const target = event.target as HTMLInputElement;
    const { closeOnBackgroud = false } = this.props;

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

  // Get activator node i.e. trigger which opened up drawer
  // This node will be used to set accessibility attributes
  @autobind
  private setActivator(node: HTMLElement | null) {
    if (node == null) {
      this.activatorContainer = null;
      return;
    }

    this.activatorContainer = node.previousSibling as HTMLElement;
  }

  private setAccessibilityAttributes() {
    const { activatorContainer, id } = this;
    if (activatorContainer == null) { return; }
    const { active = false } = this.props;
    const accessibilityNode = activatorContainer;

    accessibilityNode.setAttribute('aria-describedby', id);
    accessibilityNode.setAttribute('aria-expanded', (active || false).toString());
    accessibilityNode.setAttribute('aria-label', this.props.accessibilityLabel ? this.props.accessibilityLabel : '');
  }
}

export default themr(MODAL, baseTheme)((Modal)) as ThemedComponentClass<Props, {}>;
