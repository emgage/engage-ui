import * as React from 'react';
import uikit from './uikit';
import Dialog from './dialog';
import Trigger from './trigger';
import KeypressListener from '../KeypressListener';
import { Keys } from '../../types';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { MODAL } from '../ThemeIdentifiers';
import * as baseTheme from './Modal.scss';

const bodyStyle = (pading: any, overflow: any) => {
  const body = document.getElementsByTagName('body');
  body[0].style.paddingRight = pading;
  body[0].style.overflow = overflow;
};

const getModalElement = (kitid: any) => {
  return {
    modal: uikit.helpers.getElement(`modal-${kitid}`),
    dialog: uikit.helpers.getElement(`dialog-${kitid}`)
  };
};


export interface Props {

  children: any,
  className?: string,
  classes?: any,
  close?: boolean,
  dialog?: object,
  footer?: any,
  header?: any,
  kitid?: string,
  show: boolean,
  trigger: any,
  closeOnEsc?: boolean,
  closeOnBackgroud?: boolean,
  modalOverflow?: boolean,
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
    e && e.preventDefault();

    const props = this.props;
    const { modal, dialog } = getModalElement(props.kitid);

    props.trigger.animate.out(modal, dialog);
    setTimeout(() => bodyStyle('', ''), 200);
  }

  handleToggleClick(e: any) {
    const props = this.props;
    const { modal, dialog } = getModalElement(props.kitid);

    const show = () => {
      bodyStyle('16px', 'hidden');
      props.trigger.animate.in(modal, dialog);
    };

    const hide = () => {
      const kitid = (e.target.dataset ? e.target.dataset.kitid : undefined);


      if (typeof kitid !== 'undefined') {
        const prefix = kitid.substr(0, kitid.indexOf('-'));

        if (prefix === 'modal' && this.props.closeOnBackgroud) {
          this.handleCloseClick(e);
        }
      }
    };
 
    !this.props.show ? show() : hide();
  }


  render() {

    const props = this.props;

    const cssClassNames = uikit.helpers.cleanClasses([
      props.theme.overflow,
      props.theme.modal,
      props.classes,
      props.className
    ]);

    const ignoreProps = [
      'blank',
      'children',
      'className',
      'classes',
      'close',
      'footer',
      'header',
      'kitid',
      'show',
      'trigger',
      'closeOnBackgroud',
      'modalOverflow',
      'closeOnEsc',
      'size',
      'theme'

    ];

    const CloseonEscProp = this.props.closeOnEsc ? (<KeypressListener keyCode={Keys.ESCAPE} handler={this.handleCloseClick} />) : null;  //either(<KeypressListener keyCode={Keys.ESCAPE} handler={this.handleCloseClick} />, null)(this.props.closeOnEsc);

    const cleanProps = uikit.helpers.cleanProps(ignoreProps)({
      ...props,
      ok: null,
      show: null,
      trigger: null,
      close: null,
      closeOnBackgroud: null,
      modalOverflow: null,
      closeOnEsc: null
    });

    const cssClassForOverflow = props.modalOverflow
      ? uikit.helpers.cleanClasses([props.theme.overflow, props.theme.autoHeight])
      : null;

    // Return Component
    return <div>

      <Trigger {...props.trigger} kitid={`trigger-${props.kitid}`} onClick={this.handleToggleClick} />
      {CloseonEscProp}
      <div {...cleanProps}
        className={cssClassNames}
        data-kitid={`modal-${props.kitid}`}
        onClick={(this.props.close || this.props.closeOnBackgroud || this.props.closeOnEsc ) ? this.handleToggleClick: null}

      >

        <Dialog
          {...props.dialog}
          footer={props.footer}
          header={props.header}
          kitid={props.kitid}
          onClose={props.close ? this.handleCloseClick : null}
          closeOnBackgroud={props.closeOnBackgroud ? this.handleToggleClick : null}
          modalOverflow={props.modalOverflow}
          size={props.size}
        >
          <div className={cssClassForOverflow}>  {props.children}</div>
        </Dialog>

      </div>

    </div>;

  }
}

export default themr(MODAL, baseTheme)(uikit.base(Modal)) as ThemedComponentClass<Props, State>;
