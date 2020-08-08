import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { MODAL } from '../ThemeIdentifiers';

import * as baseTheme from './Modal.scss';

export interface Props {
  active?: boolean;
  modalOverflow?: boolean;
  theme?: any;
}

class ModalBody extends React.PureComponent<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  getBodyClassName() {
    const { modalOverflow = false, theme } = this.props;

    return classNames(
      theme.body,
      modalOverflow && theme.autoHeight
    );
  }

  render() {
    const bodyClassNames = this.getBodyClassName();

    return (
      <div className={bodyClassNames}>
        {this.props.children}
      </div>
    );
  }
}

export default themr(MODAL, baseTheme)((ModalBody)) as ThemedComponentClass<Props, {}>;
