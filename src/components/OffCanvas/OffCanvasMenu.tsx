import * as React from 'react';
import * as baseTheme from './OffCanvas.scss';
import {classNames} from '@shopify/react-utilities/styles';

export interface State{
    isMenuOpened: false
}
export interface Props{
    width?: number,
    transitionDuration?: number,
    isMenuOpened?: boolean,
    position?: any,    
    children?: React.ReactNode,    
    style?: any,
    animation?: string
}

export class OffCanvasMenu extends React.PureComponent<Props,State>
{
  state: State = { isMenuOpened:false };
  render(){
    const{
      width = 270,
      transitionDuration = 270,
      isMenuOpened = false,
      position = 'right',
      children,      
      style,
      animation
    } = this.props;

    const className = classNames(
      baseTheme.menuClass
    );
    
    let left = position === 'left' ? (-1 * width) + 'px' : 'auto'; 
        
    var tranDuration = transitionDuration;      
    if(animation == 'None')
      tranDuration = 0;
    
    let translateCloseX = position === 'left' ? width : (-1 * width);
    let closedStyle = {
      width: width + 'px',
      position: 'fixed',
      top: '0px',
      left: left,      
      transform: 'translate(' + translateCloseX + 'px, 0px)',
      transitionDuration: tranDuration + 'ms',
      backfaceVisibility: 'hidden'        
    };

    let openStyle = {
      transform: 'translate(0px, 0px)'    
    };

    let currStyle = Object.assign({}, closedStyle);
    if (isMenuOpened)
      currStyle = Object.assign({}, currStyle, openStyle);
      
    return (
      <div style = {{...currStyle, ...style}} className = {className}>
        {children}
      </div>
    );    
  }
}