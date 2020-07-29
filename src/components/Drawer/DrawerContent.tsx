import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { DrawerContext, Mode } from './Drawer';

import { DRAWER } from '../ThemeIdentifiers';

import Button from '../Button';

import * as baseTheme from './Drawer.scss';

// All prototypes type
export interface Props {
  active?: boolean;
  // Show or hide close button (X) to close drawer
  closeButton?: boolean;
  flip?: boolean;
  componentId?: string;
  mode?: Mode;
  theme?: any;
  style?: any;
  fixedCloseButton?: boolean;
  // Callback function to close or open the drawer
  toggleDrawer?(): void;

  children?: any;
}

// Drawer Content component, in here wrap all other required components or DOM for the Drawer
class DrawerContent extends React.PureComponent<Props> {

  getContainerClassName() {
    const {
      flip = false,
      active = false,
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
    const { componentId, children, theme } = this.props;
    const dcStyle = Object.assign(
      {},
      {  },
      this.props.style
    );
    return (
      <DrawerContext.Consumer>
        {({ activeContentId, closeButton, fixedCloseButton, toggleDrawer }: any) =>
          <div style={dcStyle}>
            {closeButton
              ? (
                <span className={fixedCloseButton ? theme.fixedClose : theme.close}>
                  <Button onClick={toggleDrawer} icon="cancel" plain theme={theme}/>
                </span>
              )
              : null
            }
            {activeContentId === componentId ? children : ''}
          </div>
        }
      </DrawerContext.Consumer>
    );
  }
}

export default themr(DRAWER, baseTheme)(DrawerContent) as ThemedComponentClass<Props, {}>;
