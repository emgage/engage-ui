import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { layeredComponent } from '@shopify/react-utilities/components';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { classNames } from '@shopify/react-utilities/styles';

import { DRAWER } from '../ThemeIdentifiers';

import * as baseTheme from './Drawer.scss';

/* Type for mode of drawer
  // Slide helps to make the drawer slide from left or right, over the content
  // With push, the menu is stuck to the left (or right) side of the canvas. The canvas and the menu move.
  // With reveal the menu is sitting behind the canvas. When the canvas moves it reveals the menu. The menu never moves.
*/
export type Mode = 'slide' | 'push' | 'reveal';
/* Size of drawer
  // Small gives the 270px width of drawer
  // Medium gives the 350px width of drawer
  // Large gives the 600px width of drawer
*/
export type Width = 'small' | 'medium' | 'large' | string;

// All prototypes type
export interface Props {
  active?: boolean;
  children?: any;
  flip?: boolean;
  mode?: Mode;
  overlay?: boolean;
  width?: Width;
  theme?: any;
}

const getUniqueID = createUniqueIDFactory('DrawerWrapper');

@layeredComponent({ idPrefix: 'Drawer' })
// Main Drawer component, its a wrapper for its content
class Drawer extends React.Component<Props, never> {
  public id = getUniqueID();

  getContainerClassName() {
    const {
      flip,
      active,
      overlay,
      width = 'medium',
      theme,
    } = this.props;

    return classNames(
      theme.drawer,
      overlay && theme.overlay,
      flip && this.props.theme.flip,
      width === 'small' && theme.small,
      width === 'medium' && theme.medium,
      width === 'large' && theme.large,
      active && theme.open
    );
  }

  getBarClassName() {
    const {
      mode,
      theme,
    } = this.props;

    return classNames(
      theme.bar,
      mode === 'slide' && theme.animation,
      mode === 'push' && theme.animation
    );
  }

  setBodyStyle() {
    const {
      flip,
      mode,
      overlay,
      width = 'medium',
      theme,
    } = this.props;

    const bodyElement = document.body;
    const rootElement = document.getElementById('root');

    if (bodyElement !== null) {
      bodyElement.className = this.props.active ? (theme.container) : '';
      bodyElement.className += overlay && this.props.active ? ' ' + (theme.overlay) : '';
      bodyElement.className += flip && this.props.active ? ' ' + (theme.flip) : '';
      if (width === 'small') {
        bodyElement.className += this.props.active ? ' ' + (theme.small) : '';
      }
      if (width === 'medium') {
        bodyElement.className += this.props.active ? ' ' + (theme.medium) : '';
      }
      if (width === 'large') {
        bodyElement.className += this.props.active ? ' ' + (theme.large) : '';
      }
      if (mode === 'push' || mode === 'reveal') {
        bodyElement.className += this.props.active ? ' ' + (theme.animation) : '';
        if (rootElement !== null) {
          if (flip) {
            rootElement.style.left = width && this.props.active ? `-${width}` : '';
          } else {
            rootElement.style.left = width && this.props.active ? `${width}` : '';
          }
        }
      }
    }
  }

  renderLayer() {
    const containerClassName = this.getContainerClassName();
    const barClassName = this.getBarClassName();

    this.setBodyStyle();

    return (
      <div className={containerClassName}>
        <div className={barClassName} style={this.props.width ? { width: `${this.props.width}` }  : undefined} key={this.id}>
          {
            this.props.active ?
            this.props.children :
            ''
          }
        </div>
      </div>
    );
  }

  render() {
    // const { children, active } = this.props;

    return (
      <div></div>
    );
  }
}

export default themr(DRAWER, baseTheme)(Drawer) as ThemedComponentClass<Props, {}>;
