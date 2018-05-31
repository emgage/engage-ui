import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { MODAL } from '../ThemeIdentifiers';

import * as baseTheme from './Modal.scss';

export interface Props {
  active?: boolean;
  customId?: string;
  theme?: any;
}

class ModalContent extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { active, children } = this.props;

    return (
      <div>
        {
          active ? children : null
        }
      </div>
    );
  }
}

export default themr(MODAL, baseTheme)((ModalContent)) as ThemedComponentClass<Props, {}>;
