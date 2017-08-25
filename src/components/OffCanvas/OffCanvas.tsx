import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { OFFCANVAS } from '../ThemeIdentifiers';
import * as baseTheme from './OffCanvas.scss';
import { OffCanvasMode } from './OffCanvasProps';
import Button from '../Button';

export interface Props {
  width?: number;
  transitionDuration?: number;
  flip?: boolean;
  overlay?: boolean;
  children?: any;
  style?: any;
  mode?: OffCanvasMode;
  activator?: React.ReactNode;
  theme?: any;
}

export interface State {
  active: boolean;
}

class OffCanvas extends React.PureComponent<Props, State> {
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
      theme,
    } = this.props;

    const offCanvasMode = mode === undefined ? OffCanvasMode.push : mode;

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
      rootElement.className = overlay && this.state.active ? (theme.menuOverlay) : '';
    }

    return (
      <div>
        <div onClick={this.handleClick}>{activator}</div>
        <div style={{ ...currStyle, ...style }} className={theme.menuClass}>
          <Button onClick={this.handleClick}>X</Button>
          {children}
        </div>
      </div>
    );
  }

  private handleClick = () => {
    this.setState({ active: !this.state.active });
  }
}
export default themr(OFFCANVAS, baseTheme)(OffCanvas) as ThemedComponentClass<Props, State>;
