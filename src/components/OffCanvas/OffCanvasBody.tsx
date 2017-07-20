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

export class OffCanvasBody extends React.PureComponent<Props, State> {
  state: State = {isMenuOpened: false};
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

    const className = classNames(
      baseTheme.bodyClass,
    );

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

    let currStyle = Object.assign({}, closedStyle);
    if (isMenuOpened) {
      currStyle = Object.assign({}, currStyle, openStyle);
    }
    const finalStyle = animation ===  OffCanvasAnimationType.Reveal ? currStyle : style;

    return (
      <div style = {{...finalStyle}} className = {className}>        
        {children}
      </div>
    );
  }
}
