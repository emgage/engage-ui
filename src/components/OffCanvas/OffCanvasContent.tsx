import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { autobind } from '@shopify/javascript-utilities/decorators';

import { Keys } from '../../types';
import { layer } from '../shared';
import KeypressListener from '../KeypressListener';
import { OFFCANVAS } from '../ThemeIdentifiers';
import Button from '../Button';

import * as baseTheme from './OffCanvas.scss';

export interface Props {
  id: string;
  active: boolean;
  activator: HTMLElement;
  children?: React.ReactNode;
  theme?: any;
  closeButton?: boolean;
  onClose(): void;
  onCancel(): void;
}

class OffCanvasContent extends React.PureComponent<Props, never> {
  render() {
    const markup = this.props.active
      ? this.renderOffCanvas()
      : null;

    return markup;
  }

  @autobind
  private renderOffCanvas() {
    const {
      id,
      children,
      theme,
    } = this.props;

    return (
      <div
        id={id}
        role="offcanvas"
        className={theme.content}
        {...layer.props}
      >
        <KeypressListener keyCode={Keys.ESCAPE} handler={this.handleEscape} />
        {this.props.closeButton ? <span className={theme.close}><Button onClick={this.props.onCancel} icon="cancel" plain /></span> : null }
        {children}
      </div>
    );
  }

  @autobind
  private handleEscape() {
    this.props.onCancel();
  }

}

export default themr(OFFCANVAS, baseTheme)(OffCanvasContent) as ThemedComponentClass<Props, {}>;
