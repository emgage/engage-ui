import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { MODAL } from '../ThemeIdentifiers';
import Heading from '../Heading';
import Button from '../Button';
import helpers from './helpers';
import * as baseTheme from './Modal.scss';

export enum SizeType {
  Small = 300,
  Medium = 600,
  Large = 900,
}

export type Size = 'Small' | 'Medium' | 'Large' | number;

export interface SizeStyle {
  width: string;
  marginLeft: string;
  left: string;
}

export interface Props {
  close?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  id?: string;
  backdropEnabled?: boolean;
  modalOverflow?: boolean;
  size?: Size;
  theme?: any;
  onClose?(e: React.SyntheticEvent<HTMLElement>): void;
  closeOnBackgroud?(e: React.SyntheticEvent<HTMLElement>): void;
}

const dialog = (props: Props) => {
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
  }

  const cssClassNames = helpers.cleanClasses([
    props.backdropEnabled ? props.theme.dialog : props.theme.backDrop,
  ]);

  const buttonStyle = {
    float: `right`,
  };

  const close = props.close
    ? <Button style={buttonStyle} data-id={props.id ? props.id : `close-${props.id}`} onClick={props.onClose} icon="cancel" />
    : null;

  const classHeader = props.theme.header;

  const header = props.header ? (typeof props.header === 'string'
    ? <div className={classHeader}><Heading>{props.header}</Heading></div>
    : <div className={classHeader}>{props.header}</div>) : null;

  const footer = props.footer ? <div className={props.theme.footer}>{props.footer}</div> : null;

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
      {footer}
    </div>,
  };

  return type['block'];
};

export default themr(MODAL, baseTheme)((dialog)) as ThemedComponentClass<Props, {}>;
