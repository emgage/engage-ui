import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { Keys } from '../../types';
import { MODAL } from '../ThemeIdentifiers';
import KeypressListener from '../KeypressListener';
import Helpers from './helpers';
import Base from './base';
import Dialog from './dialog';
import Trigger from './trigger';
import * as baseTheme from './Modal.scss';

const bodyStyle = (pading: any, overflow: any) => {
  const body = document.getElementsByTagName('body');
  body[0].style.paddingRight = pading;
  body[0].style.overflow = overflow;
};

const getModalElement = (id: any) => {
  return {
    modal: Helpers.getElement(`modal-${id}`),
    dialog: Helpers.getElement(`dialog-${id}`),
  };
};


export interface Props {

  children: any,
  className?: string,
  classes?: any,
  close?: boolean,
  dialog?: object,
  footer?: React.ReactNode,
  header?: string | React.ReactNode,
  id?: string,
  show: boolean,
  trigger: any,
  closeOnEsc?: boolean,
  closeOnBackgroud?: boolean,
  modalOverflow?: boolean,
  backdropEnabled?: boolean,
  size?: any,
  theme?: any,
}
export interface State { }

class Modal extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);

  }


  handleCloseClick(e: any) {
    e.preventDefault();

    const props = this.props;
    const { modal, dialog } = getModalElement(props.id);

    props.trigger.animate.out(modal, dialog);
    setTimeout(() => bodyStyle('', ''), 200);
  }

  handleToggleClick(e: any) {

    const props = this.props;
    const { modal, dialog } = getModalElement(props.id);

    const show = () => {
      bodyStyle('16px', 'hidden');
      props.trigger.animate.in(modal, dialog);

    };

    const hide = () => {
      const id = (e.target.dataset ? e.target.dataset.id : undefined);

      if (typeof id !== 'undefined') {
        const prefix = id.substr(0, id.indexOf('-'));

        if (prefix === 'modal' && this.props.closeOnBackgroud) {
          this.handleCloseClick(e);
        }
      }
    };

    !this.props.show ? show() : hide();
  }


  render() {

    const props = this.props;

    const cssClassNames = Helpers.cleanClasses([
      props.theme.overflow,
      props.backdropEnabled ? props.theme.modal : null,
      props.classes,
      props.className,
    ]);

    const ignoreProps = [
      'blank',
      'children',
      'className',
      'classes',
      'close',
      'footer',
      'header',
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

    const CloseonEscProp = this.props.closeOnEsc ? (<KeypressListener keyCode={Keys.ESCAPE} handler={this.handleCloseClick} />) : null;

    const cleanProps = Helpers.cleanProps(ignoreProps)({
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

    const cssClassForOverflow = props.modalOverflow
      ? Helpers.cleanClasses([props.theme.overflow, props.theme.autoHeight])
      : null;

    // Return Component
    return <div>

      <Trigger {...props.trigger} id={`trigger-${props.id}`} onClick={this.handleToggleClick} />
      {CloseonEscProp}
      <div {...cleanProps}
        className={cssClassNames}
        data-id={`modal-${props.id}`}
        onClick={(this.props.close || this.props.closeOnBackgroud || this.props.closeOnEsc) ? this.handleToggleClick : null}

      >

        <Dialog
          {...props.dialog}
          footer={props.footer}
          header={props.header}
          id={props.id}
          onClose={props.close ? this.handleCloseClick : null}
          closeOnBackgroud={props.closeOnBackgroud ? this.handleToggleClick : null}
          modalOverflow={props.modalOverflow}
          backdropEnabled={props.backdropEnabled}
          size={props.size}
        >
          <div className={cssClassForOverflow}>  {props.children}</div>
        </Dialog>

      </div>

    </div>;

  }
}

export default themr(MODAL, baseTheme)(Base(Modal)) as ThemedComponentClass<Props, State>;
