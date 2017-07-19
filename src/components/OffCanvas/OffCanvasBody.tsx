import * as React from 'react';
import * as baseTheme from './OffCanvas.scss';
import {classNames} from '@shopify/react-utilities/styles';

export interface State{
    isMenuOpened:false
}
export interface Props{
    width?:number,
    transitionDuration?:number,
    isMenuOpened?:boolean,
    position?:any,    
    children?:React.ReactNode,    
    style?:any,
    animation?:string
}

export class OffCanvasBody extends React.PureComponent<Props,State>
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
      animation,      
    } = this.props;

    const className = classNames(
      baseTheme.bodyClass  
    );    
    
    let translateX = position === 'left' ? 0 : 0;
    let closedStyle = {      
      transitionDuration: transitionDuration + 'ms',
      transform: 'translate(' + translateX + 'px, 0px)',
      backfaceVisibility: 'hidden'
    };
    
    let translateOpenX = position === 'left' ? width : 1 * width;
    let openStyle = {
      transform: 'translate(' + translateOpenX + 'px, 0px)'
    };
        
    let currStyle = Object.assign({}, closedStyle);
    if (isMenuOpened) {
      currStyle = Object.assign({}, currStyle, openStyle);
    }    
    var finalStyle;
    if(animation == 'Reveal')
      finalStyle = currStyle;      
    else
      finalStyle = style;

    return (    
      <div style = {{...finalStyle}} className = {className}>        
        {children}
      </div>
    );
  }
}