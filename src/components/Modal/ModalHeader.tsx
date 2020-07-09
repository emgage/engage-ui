import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import Heading from '../Heading';

import { MODAL } from '../ThemeIdentifiers';

import * as baseTheme from './Modal.scss';

export interface Props {
  active?: boolean;
  theme?: any;
}

class ModalHeader extends React.PureComponent<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { children, theme } = this.props;

    return (
      <div className={theme.header}>
        <Heading theme={theme}>{children}</Heading>
      </div>
    );
  }
}

export default themr(MODAL, baseTheme)((ModalHeader)) as ThemedComponentClass<Props, {}>;
