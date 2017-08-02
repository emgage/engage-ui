import * as React from 'react';
import * as baseTheme from './OffCanvas.scss';
import { OffCanvasAnimationType, OffCanvasPosition } from './OffCanvasProps';
import { Props } from './OffCanvas';

export interface State {
  isMenuOpened: false;
}

export default class OffCanvasBody extends React.PureComponent<Props, State> {
  state: State = { isMenuOpened: false };
  render() {
    const{
      width = 270,
      transitionDuration = 270,
      isMenuOpened = false,
      position = OffCanvasPosition.Right,
      children,
      style,
      animation,
    } = this.props;

    const translateX = position === OffCanvasPosition.Left ? 0 : 0;
    const closedStyle = {
      transitionDuration: transitionDuration + 'ms',
      transform: 'translate(' + translateX + 'px, 0px)',
      backfaceVisibility: 'hidden',
    };

    const translateOpenX = position === OffCanvasPosition.Left ? width : 1 * width;
    const openStyle = {
      transform: 'translate(' + translateOpenX + 'px, 0px)',
    };

    let currStyle = closedStyle;
    if (isMenuOpened) {
      currStyle = { ...currStyle, ...openStyle };
    }
    const finalStyle = animation ===  OffCanvasAnimationType.Reveal ? currStyle : style;

    return (
      <div style={{ ...finalStyle }} className={baseTheme.bodyClass}>
        {children}
      </div>
    );
  }
}
