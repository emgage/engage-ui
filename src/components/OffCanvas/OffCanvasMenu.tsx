import * as React from 'react';
import * as baseTheme from './OffCanvas.scss';
import { OffCanvasAnimationType, OffCanvasPosition } from './OffCanvasProps';
import { Props } from './OffCanvas';

export interface State {
  isMenuOpened: false;
}

export default class OffCanvasMenu extends React.PureComponent<Props, State> {
  state: State = { isMenuOpened: false };
  render() {
    const {
      width = 270,
      transitionDuration = 270,
      isMenuOpened = false,
      position = OffCanvasPosition.Right,
      children,
      style,
      animation,
    } = this.props;

    const left = position === OffCanvasPosition.Left ? (-1 * width) + 'px' : 'auto';
    const tranDuration = animation === OffCanvasAnimationType.None ? 0 : transitionDuration;

    const translateCloseX = position === OffCanvasPosition.Left ? width : (-1 * width);
    const closedStyle = {
      left,
      width: width + 'px',
      top: '0px',
      transform: 'translate(' + translateCloseX + 'px, 0px)',
      transitionDuration: tranDuration + 'ms',
      backfaceVisibility: 'hidden',
    };

    const openStyle = {
      transform: 'translate(0px, 0px)',
    };

    let currStyle = closedStyle;
    if (isMenuOpened) {
      currStyle = { ...currStyle, ...openStyle };
    }
    return (
      <div style={{ ...currStyle, ...style }} className={baseTheme.menuClass}>
        {children}
      </div>
    );
  }
}
