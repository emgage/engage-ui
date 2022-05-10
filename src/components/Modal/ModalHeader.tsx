import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import Heading from '../Heading';

import { MODAL } from '../ThemeIdentifiers';

import * as baseTheme from './Modal.scss';

export interface Props {
  active?: boolean;
  theme?: any;
  noBottomPadding?: boolean;
}

class ModalHeader extends React.PureComponent<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { children, theme, noBottomPadding } = this.props;

    return (
      <div className={`${theme.header} ${noBottomPadding ? theme.headerNoBottomPadding : ''}`}>
        <Heading theme={theme}>{children}</Heading>
      </div>
    );
  }
}

export default themr(MODAL, baseTheme)((ModalHeader)) as ThemedComponentClass<Props, {}>;
