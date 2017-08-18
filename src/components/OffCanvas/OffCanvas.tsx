import * as React from 'react';
import * as baseTheme from './OffCanvas.scss';
import { OffCanvasMode } from './OffCanvasProps';

export interface Props {
  width?: number;
  transitionDuration?: number;    
  flip?: boolean;
  overlay?: boolean;
  children?: any;
  style?: any;
  mode?: OffCanvasMode; 
  activator?: React.ReactNode;
}

export interface State {
  active: boolean;
}

export default class OffCanvas extends React.PureComponent<Props, State> {
  state: State = { active: false };
  render() {
    const {
      width = 270,
      transitionDuration = 270,            
      flip,
      overlay,
      children,
      style,
      mode,
      activator,
    } = this.props;

    let offCanvasMode = mode;    
    offCanvasMode = mode === undefined ? OffCanvasMode.push : mode;

    const leftClose = flip ? 'auto' : (-1 * width) + 'px';
    const rightClose = flip ? (-1 * width) + 'px' : 'auto';
    const tranDuration = offCanvasMode === OffCanvasMode.none || offCanvasMode === OffCanvasMode.reveal ? '' : transitionDuration;
    
    const closedStyle = {
      left: leftClose,
      right: rightClose,
      top: '0px',
      width: width + 'px',
      transitionDuration: tranDuration + 'ms',
    };
        
    const openStyle = {
      left: flip ? 'auto' : '0px',
      right: flip ? '0px' : 'auto',    
    };

    let currStyle = closedStyle;
    if (this.state.active) {
      currStyle = { ...currStyle, ...openStyle };
    }

    const rootElement = document.body;
    if (rootElement !== null) {            
      if (offCanvasMode ===  OffCanvasMode.push || offCanvasMode ===  OffCanvasMode.reveal) {    
        rootElement.style.setProperty('transition-duration', '' + transitionDuration + 'ms');
        rootElement.style.setProperty('margin-left', this.state.active ? flip ? '' + (-1 * width) + 'px' : '' + width + 'px' : '0px');
      }
      rootElement.className = overlay && this.state.active ? (baseTheme.menuOverlay) : '';      
    }
    
    return (
      <div>
        <div onClick={this.handleClick}>
          {activator}
        </div>
        <div style={{ ...currStyle, ...style }} className={baseTheme.menuClass}>
          <div onClick={this.handleClick} className={baseTheme.menuClose}>X</div>
          {children}
        </div>
      </div>
    );
  } 
  private handleClick = () => {
    this.setState({ active: !this.state.active });
  } 
}
