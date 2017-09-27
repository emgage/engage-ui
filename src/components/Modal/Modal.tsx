import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { Keys } from '../../types';
import { MODAL } from '../ThemeIdentifiers';
import KeypressListener from '../KeypressListener';
import helpers from './helpers';
import Dialog from './Dialog';
import * as baseTheme from './Modal.scss';

const bodyStyle = (pading: string, overflow: string): void => {
  const body = document.getElementsByTagName('body');
  body[0].style.paddingRight = pading;
  body[0].style.overflow = overflow;
};

const getModalElement = (id: string) => {
  return {
    modal: helpers.getElement(`modal-${id}`),
    dialog: helpers.getElement(`dialog-${id}`),
  };
};

export type Size = 'Small' | 'Medium' | 'Large' | number;

export interface IAnimate {
  in(modal?: Element, dialog?: Element): void;
  out(modal?: Element, dialog?: Element): void;
}

export interface ITrigger {
  body: string;
  animate: IAnimate;
}

export interface Props {
  className?: string;
  classes?: string;
  close?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  activator: React.ReactNode;
  id?: string;
  show: boolean;
  trigger: ITrigger;
  closeOnEsc?: boolean;
  closeOnBackgroud?: boolean;
  modalOverflow?: boolean;
  backdropEnabled?: boolean;
  size?: Size;
  theme?: any;
}

class Modal extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  handleCloseClick = (event: React.SyntheticEvent<HTMLElement> | KeyboardEvent): void => {

    event.preventDefault();
    const props = this.props;
    const { modal, dialog } = getModalElement(props.id as string);

    props.trigger.animate.out(modal as Element, dialog as Element);
    setTimeout(() => bodyStyle('', ''), 200);
  }

  handleToggleClick = (e: React.SyntheticEvent<HTMLElement>): void => {

    const props = this.props;
    const { modal, dialog } = getModalElement(props.id as string);

    if (!this.props.show) {
      bodyStyle('16px', 'hidden');
      props.trigger.animate.in(modal as Element, dialog as Element);
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

    const props = this.props;

    const cssClassNames = helpers.cleanClasses([
      props.theme.overflow,
      props.backdropEnabled ? props.theme.modal : null,
      props.classes,
      props.className,
    ]);

    const ignoreProps = [
      'blank',
      'className',
      'classes',
      'close',
      'footer',
      'header',
      'activator',
      'id',
      'show',
      'trigger',
      'closeOnBackgroud',
      'modalOverflow',
      'backdropEnabled',
      'closeOnEsc',
      'size',
      'theme',
    ];

    const closeonEscProp = this.props.closeOnEsc ? (<KeypressListener keyCode={Keys.ESCAPE} handler={this.handleCloseClick} />) : null;
    const cleanProps = helpers.cleanProps(ignoreProps)({
      ...props,
      ok: null,
      show: null,
      trigger: null,
      close: null,
      closeOnBackgroud: null,
      modalOverflow: null,
      closeOnEsc: null,
      backdropEnabled: null,
      header: null,
    });

    return (
      <div>
        <span onClick={this.handleToggleClick}>{this.props.activator}</span>
        {closeonEscProp}
        <div {...cleanProps}
          className={cssClassNames}
          data-id={`modal-${props.id}`}
          onClick={(this.props.close || this.props.closeOnBackgroud || this.props.closeOnEsc) ? this.handleToggleClick : null}
        >
          <Dialog
            footer={props.footer}
            header={props.header}
            id={props.id}
            onClose={this.handleCloseClick}
            closeOnBackgroud={props.closeOnBackgroud ? this.handleToggleClick : undefined}
            backdropEnabled={props.backdropEnabled}
            size={props.size}
          >
            <div className={props.theme.autoHeight}>  {props.children}</div>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default themr(MODAL, baseTheme)((Modal)) as ThemedComponentClass<Props, {}>;
