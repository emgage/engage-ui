import * as React from 'react';
import { classNames } from '@shopify/react-utilities/styles';
import * as baseTheme from './OffCanvas.scss';
import { OffCanvasAnimationType, OffCanvasPosition } from './OffCanvasProps';

export interface State {
    isMenuOpened: false,
}
export interface Props {
    width?: number,
    transitionDuration?: number,
    isMenuOpened?: boolean,
    position?: OffCanvasPosition,
    style?: any,
    animation?: OffCanvasAnimationType,
}

export class OffCanvasMenu extends React.PureComponent<Props, State> {
  state: State = {isMenuOpened: false};
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

    const className = classNames(
      baseTheme.menuClass,
    );

    const left = position === OffCanvasPosition.Left ? (-1 * width) + 'px' : 'auto';
    const tranDuration = animation === OffCanvasAnimationType.None ? 0 : transitionDuration;

    const translateCloseX = position === OffCanvasPosition.Left ? width : (-1 * width);
    const closedStyle = {
      width: width + 'px',
      top: '0px',
      left,
      transform: 'translate(' + translateCloseX + 'px, 0px)',
      transitionDuration: tranDuration + 'ms',
      backfaceVisibility: 'hidden',
    };

    const openStyle = {
      transform: 'translate(0px, 0px)',
    };

    let currStyle = Object.assign({}, closedStyle);
    if (isMenuOpened) {
      currStyle = Object.assign({}, currStyle, openStyle);
    }
    return (
      <div style = {{...currStyle, ...style}} className = {className}>
        {children}
      </div>
    );
  }
}
