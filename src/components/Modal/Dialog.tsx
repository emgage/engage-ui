import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { MODAL } from '../ThemeIdentifiers';
import Heading from '../Heading';
import Button from '../Button';

import * as baseTheme from './Modal.scss';

export type Width = 'small' | 'medium' | 'large' | string;

export interface Props {
  children?: React.ReactNode;
  close?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  id?: string;
  modalOverflow?: boolean;
  overlay?: boolean; // is there a use case for not displaying the overlay?
  width?: Width;
  theme?: any;
  onClose?(e: React.SyntheticEvent<HTMLElement>): void;
  closeOnBackgroud?(e: React.SyntheticEvent<HTMLElement>): void;
}

class Dialog extends React.PureComponent<Props, never> {

  render() {

    const {
      children,
      close,
      footer,
      header,
      id,
      onClose,
      theme,
      width = 'medium',
    } = this.props;

    const dialogClassNames = classNames(
      theme.dialog,
      width === 'small' && theme.small,
      width === 'medium' && theme.medium,
      width === 'large' && theme.large
    );

    const modalclose = close
      ? <div className={theme.close}><Button plain data-id={id ? id : `close-${id}`} onClick={onClose} icon="cancel" /></div>
      : null;

    const classHeader = theme.header;

    const modalheader = header ? (typeof header === 'string'
      ? <div className={classHeader}><Heading>{header}</Heading></div>
      : <div className={classHeader}>{header}</div>) : null;

    const modalfooter = footer ? <div className={theme.footer}>{footer}</div> : null;

    return (
      <div className={dialogClassNames} style={width ? { width: `${width}` }  : undefined} data-id={`dialog-${id}`} >
        {modalclose}
        {modalheader}
        {children}
        {modalfooter}
      </div>
    );
  }
}

export default themr(MODAL, baseTheme)((Dialog)) as ThemedComponentClass<Props, {}>;
