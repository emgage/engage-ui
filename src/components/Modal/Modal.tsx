import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { layeredComponent } from '@shopify/react-utilities/components';

import { MODAL } from '../ThemeIdentifiers';

import * as baseTheme from './Modal.scss';

export type Width = 'small' | 'medium' | 'large' | string;

export interface Props {
  active?: boolean;
  className?: string;
  close?: boolean;
  closeOnBackgroud?: boolean;
  closeOnEsc?: boolean;
  modalOverflow?: boolean;
  theme?: any;
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

  setBodyTagStyle() {
    const bodyElement = document.body;
    const { active, theme } = this.props;

    if (bodyElement !== null) {
      bodyElement.className = active ? (theme.page) : '';
    }
  }

  renderLayer() {
    const modalWrapperClassName = this.getModalWrapperClassName();
    const modalContainerClass = this.getModalContainerClassName();

    this.setBodyTagStyle();

    return (
      <div className={modalWrapperClassName}>
        <div className={modalContainerClass}>
          {this.props.children}
        </div>
      </div>
    );
  }

  render() {
    return null;
  }
  setAccessibilityAttributes() {}
}

export default themr(MODAL, baseTheme)((Modal)) as ThemedComponentClass<Props, {}>;
