import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { layeredComponent } from '@shopify/react-utilities/components';
import { autobind } from '@shopify/javascript-utilities/decorators';
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
  // Collapsed is for side navigation when navigation is hidden
  // Small gives the 270px width of drawer
  // Medium gives the 350px width of drawer
  // Large gives the 600px width of drawer
*/
const stringLitArray = <L extends string>(arr: L[]) => arr;
const widthType = stringLitArray(['collapsed', 'small', 'medium', 'large']);

export type Width = (typeof widthType)[number];

// All prototypes type
export interface Props {
  // Defines the drawer open or close state
  active?: boolean;
  accessibilityLabel?: string;
  // Store the id of active drawer content
  activeContentId?: string | string[];
  // Show or hide close button (X) to close drawer
  closeButton?: boolean;
  // This will help to show the label to side of the drawer when there is a stacking of drawers
  componentLabel?: string;
  // If there are multiple theme for drawer then you can pass theme required here
  currentTheme?: string;
  // This helps to define specifc theme from the parent component
  themeClass?: string;
  // Open drawer in flip direction (i.e. right)
  flip?: boolean;
  // Open drawer in slide, push or reveal mode
  mode?: Mode;
  // onClose callback function to be called when drawer gets closed
  onClose?(): void;
  // onOpen callback function to be called when drawer gets opened
  onOpen?(): void;
  // Show overlay / backdrop
  overlay?: boolean;
  // Define width of drawer
  componentWidth?: Width | string;
  // Set theme for drawer
  theme?: any;
  // Callback function to close or open the drawer
  toggleDrawer?(): void;
  componentStyle?: any;
  componentClass?: string;
}

const getUniqueID = createUniqueIDFactory('DrawerWrapper');

@layeredComponent({ idPrefix: 'Drawer' })
// Main Drawer component, its a wrapper for its content
class Drawer extends React.PureComponent<Props, never> {
  public id = getUniqueID();
  private activatorContainer: HTMLElement | null;

  componentWillReceiveProps(newProps: Props) {
    // Call the callback function if available
    // onOpen: when drawer open
    // onClose: when drawer close
    if (!this.props.active && newProps.active && typeof newProps.onOpen !== 'undefined') {
      newProps.onOpen();
    } else if (this.props.active && !newProps.active && typeof newProps.onClose !== 'undefined') {
      newProps.onClose();
    }
  }

  componentDidMount() {
    // Set accessibility attributes for drawer
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  // Function to check if the component width is pre-defined or the custom pixel value
  isWidthPreDefine = (width: any): width is Width => {
    return widthType.includes(width);
  }

  // Function to get the drawer container class names
  getContainerClassName() {
    const {
      flip,
      active,
      overlay,
      componentWidth = 'medium',
      componentClass,
      theme,
    } = this.props;

    return classNames(
      theme.drawer,
      componentClass,
      overlay && theme.overlay,
      flip && this.props.theme.flip,
      this.isWidthPreDefine(componentWidth) && theme[componentWidth],
      !this.isWidthPreDefine(componentWidth) && theme.customWidth,
      active && theme.open
    );
  }

  // Function to get bar class names
  getBarClassName() {
    const {
      componentLabel,
      currentTheme = '',
      themeClass = '',
      mode,
      theme,
    } = this.props;

    return classNames(
      theme.bar,
      themeClass,
      componentLabel && theme.overflowDisable,
      currentTheme && theme[currentTheme],
      mode === 'slide' && theme.animation,
      mode === 'push' && theme.animation
    );
  }

  // Set body styles to render drawer properly in root layer
  setBodyStyle() {
    const {
      flip,
      mode,
      overlay,
      componentWidth = 'medium',
      theme,
    } = this.props;

    const bodyElement = document.body;
    const rootElement = document.getElementById('root');

    bodyElement.className = '';

    if (bodyElement !== null) {
      bodyElement.className = this.props.active ? (theme.container) : '';
      bodyElement.className += overlay && this.props.active ? ' ' + (theme.overlay) : '';
      bodyElement.className += flip && this.props.active ? ' ' + (theme.flip) : '';
      bodyElement.className += this.props.active ? ' ' + (theme[componentWidth]) : '';

      if (mode === 'push' || mode === 'reveal') {
        bodyElement.className += this.props.active ? ' ' + (theme.animation) : '';
        if (rootElement !== null) {
          if (flip) {
            rootElement.style.left = componentWidth && this.props.active ? `-${componentWidth}` : '';
          } else {
            rootElement.style.left = componentWidth && this.props.active ? `${componentWidth}` : '';
          }
        }
      }
    }
  }

  // Function to get the current active drawer content from props.children & set that as active & render that component only
  renderActivechildren() {
    const { activeContentId, children, closeButton, toggleDrawer } = this.props;

    // Iterate through all the children content component & find active component
    // Match activeContentId with children's id & mark that as active: true
    return React.Children.map(children, (child: React.ReactElement<any>) => {
      if (child.props && child.props.componentId) {
        const { componentId } = child.props;
        const cloneElemnt = (typeof activeContentId === 'string' && activeContentId === componentId) || (typeof activeContentId === 'object' && activeContentId.indexOf(componentId) !== componentId);

        // Clone active component & return it
        if (cloneElemnt) {
          return React.cloneElement(child, { closeButton, toggleDrawer, active: true, });
        }
      }

      return React.cloneElement(child);
    });
  }

  renderLayer() {
    const { active, mode, componentLabel, componentWidth, theme,  } = this.props;
    const containerClassName = this.getContainerClassName();
    const barClassName = this.getBarClassName();

    if (active && (mode === 'push' || mode === 'reveal')) {
      this.setBodyStyle();
    }

    const activeContent = this.renderActivechildren();
    const dStyle = Object.assign(
      {},
      { width: componentWidth && !this.isWidthPreDefine(componentWidth) ? `${componentWidth}` : undefined },
      this.props.componentStyle
    );

    const bar = [
      <div className={barClassName} style={dStyle} key={this.id}>
        {
          componentLabel ?
            <div className={theme.drawerLabel}>
              <span className={theme.drawerLabelText}>{componentLabel}</span>
            </div>
            :
            null
        }
        {
          active ?
          <div className={theme.label} aria-live={'assertive'} >
            {activeContent}
          </div>
           :
          null
        }
      </div>,
    ];

    return (
      <div className={containerClassName}>
        {
          mode === 'reveal'
            ?
            <div className={theme.reveal} style={componentWidth && active ? { width: `${componentWidth}` }  : undefined}>
              {bar}
            </div>
            :
            bar
        }
      </div>
    );
  }

  // Get activator node i.e. trigger which opened up drawer
  // This node will be used to set accessibility attributes
  @autobind
  private setActivator(node: HTMLElement | null) {
    if (node == null) {
      this.activatorContainer = null;
      return;
    }

    this.activatorContainer = node.previousSibling as HTMLElement;
  }

  private setAccessibilityAttributes() {
    const { activatorContainer, id } = this;
    if (activatorContainer == null) { return; }

    const accessibilityNode = activatorContainer;

    accessibilityNode.setAttribute('aria-describedby', id);
    accessibilityNode.setAttribute('aria-expanded', (this.props.active || false).toString());
    accessibilityNode.setAttribute('aria-label', this.props.accessibilityLabel ? this.props.accessibilityLabel : '');
  }

  render() {
    return (
      <div ref={this.setActivator}></div>
    );
  }
}

export default themr(DRAWER, baseTheme)(Drawer) as ThemedComponentClass<Props, {}>;
