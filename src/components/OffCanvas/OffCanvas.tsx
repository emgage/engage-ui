import * as React from 'react';
import * as baseTheme from './OffCanvas.scss';
import { OffCanvasAnimationType, OffCanvasPosition } from './OffCanvasProps';

export interface Props {
  width?: number;
  transitionDuration?: number;  
  isMenuOpened?: boolean;
  position?: OffCanvasPosition;
  children?: any;
  style?: any;
  animation?: OffCanvasAnimationType;
  rootElementId?: string;
}

export interface State {
  isMenuOpened: false;
}

export default class OffCanvas extends React.PureComponent<Props, State> {
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
      rootElementId,
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
    };

    const translateOpenX = animation ===  OffCanvasAnimationType.Push ? (-1 * width) : 0;
    const openStyle = {
      transform: 'translate(' + translateOpenX + 'px, 0px)',
    };

    let currStyle = closedStyle;
    if (isMenuOpened) {
      currStyle = { ...currStyle, ...openStyle };
    }

    if (rootElementId !== undefined) {
      const rootElement = document.getElementById(rootElementId);
      if (rootElement !== null) {
        rootElement.style.setProperty('transition-duration', '' + transitionDuration + 'ms');        
        rootElement.style.setProperty('transform', animation ===  OffCanvasAnimationType.Push ? isMenuOpened ? 'translate(' + width + 'px, 0px)' : 'translate(0px, 0px)' : 'translate(0px, 0px)');
      }
    }
    
    return (
      <div style={{ ...currStyle, ...style }} className={baseTheme.menuClass}>
        {children}
      </div>
    );
  }
}
