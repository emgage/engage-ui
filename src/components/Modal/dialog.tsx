import * as React from 'react';
import Helpers from './helpers';
import Base from './base';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { MODAL } from '../ThemeIdentifiers';
import * as baseTheme from './Modal.scss';


export interface Props {
  children: any,
  close?: boolean,
  footer?: React.ReactNode,
  header: string | React.ReactNode,
  id?: string,
  onClose: any,
  closeOnBackgroud?: any,
  modalOverflow?: boolean,
  size: any
  closeOnEsc?: boolean,
  theme?: any,
}
export interface State { }

const Dialog = (props: Props, State: State) => {
  // CSS classes

  const cssClassNames = Helpers.cleanClasses([
    props.theme.dialog,
    typeof props.size === 'string' ? baseTheme[`dialog-${props.size}`] : null
  ]);
  const closeCSSClasses = Helpers.cleanClasses([
    props.theme.close
  ]);



  const close = props.onClose ? <a href='#'
    className={closeCSSClasses}
    data-id={props.id ? props.id : `close-${props.id}`}
    onClick={props.onClose}
  /> : null; 

  const clsheader = props.theme.header;
  const clsfooter = props.theme.footer;

  const footer: any = (children: any, right: any) => props.footer
                                                    ? <div className={clsfooter}> {children} </div>
                                                    : null;
  
  const header = typeof props.header === 'string' ? <div className={clsheader}><h2>{props.header}</h2></div>
     : <div className={clsheader}>{props.header}</div>;



  const PropSize: any = typeof props.size === 'string' ? null : { width: `${props.size}px` } ;
  
  const type = {
    block: <div className={cssClassNames} style={PropSize} data-id={`dialog-${props.id}`} >
      {close}
      {header}
      {props.children}
      {footer(props.footer)}
    </div>
  };

  return type['block'];
};

export default themr(MODAL, baseTheme)(Base(Dialog)) as ThemedComponentClass<Props, State>;
