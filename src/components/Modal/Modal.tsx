import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { Keys } from '../../types';
import { MODAL } from '../ThemeIdentifiers';
import KeypressListener from '../KeypressListener';
import Dialog from './Dialog';

import * as baseTheme from './Modal.scss';

export type Width = 'small' | 'medium' | 'large' | string;

export interface Props {
  active?: boolean;
  activator: React.ReactNode;
  children?: any;
  className?: string;
  close?: boolean;
  closeOnBackgroud?: boolean;
  closeOnEsc?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  id?: string;
  modalOverflow?: boolean;
  overlay?: boolean;
  width?: Width;
  theme?: any;
}

interface State {
  active: boolean;
}

class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  handleCloseClick = (event: React.SyntheticEvent<HTMLElement> | KeyboardEvent): void => {
    event.preventDefault();
    this.setState({ active: false });
  }

  handleToggleClick = (e: React.SyntheticEvent<HTMLElement>): void => {
    if (!this.state.active) {
      this.setState({ active: true });
    } else {
      const target = e.target as HTMLInputElement;
      const id = (target ? target.dataset.id : undefined);
      if (typeof id !== 'undefined') {
        const prefix = id.substr(0, id.indexOf('-'));
        if (prefix === 'modal' && this.props.closeOnBackgroud) {
          this.handleCloseClick(e);
        }
      }
    }
  }

  render() {

    const {
      activator,
      children,
      className,
      close,
      closeOnBackgroud,
      closeOnEsc,
      footer,
      header,
      id,
      modalOverflow,
      overlay = true,
      width,
      theme,
    } = this.props;

    const modalClassNames = classNames(
      overlay && theme.overlay,
      this.state.active && theme.open,
      className
    );

    const bodyClassNames = classNames(
      theme.body,
      modalOverflow && theme.autoHeight
    );

    const bodyElement = document.body;
    if (bodyElement !== null) {
      bodyElement.className = this.state.active ? (theme.page) : '';
    }

    const closeonEscProp = closeOnEsc ? (<KeypressListener keyCode={Keys.ESCAPE} handler={this.handleCloseClick} />) : null;

    return (
      <div>
        <span onClick={this.handleToggleClick}>{activator}</span>
        {closeonEscProp}
        <div
          // style={this.state.active ? { display: 'block' } : { display: 'none' }}
          className={modalClassNames}
          data-id={`modal-${id}`}
          onClick={(close || closeOnBackgroud || closeOnEsc) ? this.handleToggleClick : undefined }
        >
          <Dialog
            close={close}
            closeOnBackgroud={closeOnBackgroud ? this.handleToggleClick : undefined}
            footer={footer}
            header={header}
            id={id}
            modalOverflow={modalOverflow}
            onClose={this.handleCloseClick}
            overlay={overlay}
            width={width}
          >
            <div className={bodyClassNames}>
              {children}
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default themr(MODAL, baseTheme)((Modal)) as ThemedComponentClass<Props, {}>;
