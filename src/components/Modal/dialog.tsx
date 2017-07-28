import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { MODAL } from '../ThemeIdentifiers';
import Helpers from './helpers';
import * as baseTheme from './Modal.scss';

export enum SizeType {
  Small = 300,
  Medium = 600,
  Large = 900,
}

export type Size = 'Small' | 'Medium' | 'Large' | number;

export interface SizeStyle {
  width: string,
  marginLeft: string,
  left: string,
}

export interface Props {
  close?: boolean,
  children?: React.ReactNode,
  footer?: React.ReactNode,
  header?: React.ReactNode,
  id?: string,
  backdropEnabled?: boolean,
  size?: Size,
  theme?: any,
  onClose?(e: any): void,
  closeOnBackgroud?(e: any): void,
}

const Dialog = (props: Props) => {

  let dialogWidthSize;

  switch (props.size) {
    case 'Small':
      dialogWidthSize = SizeType.Small;
      break;

    case 'Medium':
      dialogWidthSize = SizeType.Medium;
      break;

    case 'Large':
      dialogWidthSize = SizeType.Large;
      break;

    default:
      dialogWidthSize = props.size as number;
      break;
  };

  const cssClassNames = Helpers.cleanClasses([
    props.backdropEnabled ? props.theme.dialog : props.theme.backDrop,
  ]);
  const closeCSSClasses = Helpers.cleanClasses([
    props.theme.close,
  ]);

  const close = props.onClose
    ? <a href="#" className={closeCSSClasses} data-id={props.id ? props.id : `close-${props.id}`} onClick={props.onClose} />
    : null;

  const classHeader = props.theme.header;

  const header = typeof props.header === 'string'
    ? <div className={classHeader}><h2>{props.header}</h2></div>
    : <div className={classHeader}>{props.header}</div>;

  const propSize: SizeStyle = {
    width: `${dialogWidthSize}px`,
    marginLeft: `-${dialogWidthSize as number / 2}px`,
    left: '50%',
  };

  const type = {
    block: <div className={cssClassNames} style={propSize} data-id={`dialog-${props.id}`} >
      {close}
      {header}
      {props.children}
      <div className={props.theme.footer}>{props.footer}</div>
    </div>,
  };

  return type['block'];
};

export default themr(MODAL, baseTheme)((Dialog)) as ThemedComponentClass<Props, {}>;
