import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { DRAWER } from '../ThemeIdentifiers';

import * as baseTheme from './Drawer.scss';

/* Type for mode of drawer
  // Slide helps to make the drawer slide from left or right, over the content
  // With push, the menu is stuck to the left (or right) side of the canvas. The canvas and the menu move.
  // With reveal the menu is sitting behind the canvas. When the canvas moves it reveals the menu. The menu never moves.
*/
export type Mode = 'slide' | 'push' | 'reveal';


// All prototypes type
export interface Props {
  active?: boolean;
  flip?: boolean;
  id?: string;
  mode?: Mode;
  theme?: any;
}

// Drawer Content component, in here wrap all other required components or DOM for the Drawer
class DrawerContent extends React.Component<Props, never> {
  getContainerClassName() {
    const {
      flip,
      active,
      theme,
    } = this.props;

    return classNames(
      theme.drawer,
      flip && this.props.theme.flip,
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

  render() {
    const containerClassName = this.getContainerClassName();
    const barClassName = this.getBarClassName();
    const { children, active } = this.props;

    return (
      <div className={containerClassName}>
        <div className={barClassName}>
          {
            active ?
            children :
            ''
          }
        </div>
      </div>
    );
  }
}

export default themr(DRAWER, baseTheme)(DrawerContent) as ThemedComponentClass<Props, {}>;
