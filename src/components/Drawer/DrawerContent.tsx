import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { Mode } from './Drawer';

import { DRAWER } from '../ThemeIdentifiers';

import Button from '../Button';

import * as baseTheme from './Drawer.scss';

// All prototypes type
export interface Props {
  active?: boolean;
  // Show or hide close button (X) to close drawer
  closeButton?: boolean;
  flip?: boolean;
  customId?: string;
  mode?: Mode;
  theme?: any;
  // Callback function to close or open the drawer
  toggleDrawer?(): void;
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
      theme.drawerContent,
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
      theme.drawerContent,
      theme.bar,
      mode === 'slide' && theme.animation,
      mode === 'push' && theme.animation
    );
  }

  render() {
    const containerClassName = this.getContainerClassName();
    const barClassName = this.getBarClassName();
    const { active, children, closeButton, theme, toggleDrawer } = this.props;

    return (
      <div className={containerClassName}>
        <div className={barClassName}>
        {
            closeButton ?
            <span className={theme.close}>
              <Button onClick={toggleDrawer} icon="cancel" plain />
            </span> :
            null
          }

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
