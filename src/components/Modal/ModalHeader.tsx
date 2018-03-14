import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import Heading from '../Heading';

import { MODAL } from '../ThemeIdentifiers';

import * as baseTheme from './Modal.scss';

export type Width = 'small' | 'medium' | 'large' | string;

export interface Props {
  active?: boolean;
  theme?: any;
}

class ModalHeader extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.theme.header}>
        <Heading>{this.props.children}</Heading>
      </div>
    );
  }
}

export default themr(MODAL, baseTheme)((ModalHeader)) as ThemedComponentClass<Props, {}>;
