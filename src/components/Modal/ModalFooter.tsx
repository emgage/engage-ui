import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { MODAL } from '../ThemeIdentifiers';

import * as baseTheme from './Modal.scss';

export interface Props {
  active?: boolean;
  theme?: any;
}

class ModalFooter extends React.PureComponent<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.theme.footer}>
        {this.props.children}
      </div>
    );
  }
}

export default themr(MODAL, baseTheme)((ModalFooter)) as ThemedComponentClass<Props, {}>;
