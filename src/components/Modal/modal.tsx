import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { Keys } from '../../types';
import { MODAL } from '../ThemeIdentifiers';
import KeypressListener from '../KeypressListener';
import Helpers from './helpers';
import Dialog from './dialog';
import * as baseTheme from './Modal.scss';

const bodyStyle = (pading: string, overflow: string): void => {
  const body = document.getElementsByTagName('body');
  body[0].style.paddingRight = pading;
  body[0].style.overflow = overflow;
};

const getModalElement = (id: string) => {
  return {
    modal: Helpers.getElement(`modal-${id}`),
    dialog: Helpers.getElement(`dialog-${id}`),
  };
};

export type Size = 'Small' | 'Medium' | 'Large' | number;

export interface Ianimate {
  in: Function,
  out: Function,
}

export interface Itrigger {
  body: string,
  animate: Ianimate,
}

export interface Props {
  className?: string,
  classes?: string,
  close?: boolean,
  footer?: React.ReactNode,
  header?: string | React.ReactNode,
  activator: React.ReactElement<any>,
  id?: string,
  show: boolean,
  trigger: Itrigger,
  closeOnEsc?: boolean,
  closeOnBackgroud?: boolean,
  modalOverflow?: boolean,
  backdropEnabled?: boolean,
  size?: Size,
  theme?: any,
}

class Modal extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);

  }

  handleCloseClick(e: any): void {
    e.preventDefault();

    const props = this.props;
    const { modal, dialog } = getModalElement(props.id as string);

    props.trigger.animate.out(modal, dialog);
    setTimeout(() => bodyStyle('', ''), 200);
  }

  handleToggleClick(e: any): void {

    const props = this.props;
    const { modal, dialog } = getModalElement(props.id as string);

    const show = (): void => {
      bodyStyle('16px', 'hidden');
      props.trigger.animate.in(modal, dialog);

    };

    const hide = (): void => {
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

    return <div>
      <span onClick={this.handleToggleClick}>{this.props.activator}</span> 
      {CloseonEscProp}
      <div {...cleanProps}
        className={cssClassNames}
        data-id={`modal-${props.id}`}
        onClick={(this.props.close || this.props.closeOnBackgroud || this.props.closeOnEsc) ? this.handleToggleClick : null}
      >
      <Dialog
          footer={props.footer}
          header={props.header}
          id={props.id}
          onClose={props.close ? this.handleCloseClick : undefined}
          closeOnBackgroud={props.closeOnBackgroud ? this.handleToggleClick : undefined}
          backdropEnabled={props.backdropEnabled}
          size={props.size}
      >
          <div className={cssClassForOverflow}>  {props.children}</div>
      </Dialog>

      </div>

    </div>;

  }
}

export default themr(MODAL, baseTheme)((Modal)) as ThemedComponentClass<Props, {}>;
