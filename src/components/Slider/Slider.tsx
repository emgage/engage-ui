import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { layeredComponent } from '@shopify/react-utilities/components';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { classNames } from '@shopify/react-utilities/styles';

import { SLIDER } from '../ThemeIdentifiers';

import * as baseTheme from './Slider.scss';

/* Size of slider
  // Collapsed is for side navigation when navigation is hidden
  // Small gives the 270px width of slider
  // Medium gives the 350px width of slider
  // Large gives the 600px width of slider
*/
export type Width = 'collapsed' | 'small' | 'medium' | 'large' | string;

// All prototypes type
export interface Props {
  // Defines the slider open or close state
  active?: boolean;
  accessibilityLabel?: string;
  // Store the id of active slider content
  activeContentId?: string | string[];
  // Show or hide close button (X) to close slider
  closeButton?: boolean;
  // If there are multiple theme for slider then you can pass theme required here
  currentTheme?: string;
  // Open slider in flip direction (i.e. right)
  flip?: boolean;
  // Open slider in slide, push or reveal mode
  // mode?: Mode;
  // onClose callback function to be called when slider gets closed
  onClose?(): void;
  // onOpen callback function to be called when slider gets opened
  onOpen?(): void;
  // Show overlay / backdrop
  overlay?: boolean;
  // Define width of slider
  componentWidth?: Width;
  // Set theme for slider
  theme?: any;
  // Callback function to close or open the slider
  toggleSlider?(): void;
  style?: any;
}

const getUniqueID = createUniqueIDFactory('SliderWrapper');

@layeredComponent({ idPrefix: 'Slider' })
// Main Slider component, its a wrapper for its content
class Slider extends React.PureComponent<Props, never> {
  public id = getUniqueID();
  private activatorContainer: HTMLElement | null;

  componentWillReceiveProps(newProps: Props) {
    // Call the callback function if available
    // onOpen: when slider open
    // onClose: when slider close
    if (!this.props.active && newProps.active && typeof newProps.onOpen !== 'undefined') {
      newProps.onOpen();
    } else if (this.props.active && !newProps.active && typeof newProps.onClose !== 'undefined') {
      newProps.onClose();
    }
  }

  componentDidMount() {
    // Set accessibility attributes for slider
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  // Function to get the slider container class names
  getContainerClassName() {
    const {
      flip,
      active,
      overlay,
      componentWidth = 'medium',
      theme,
    } = this.props;

    return classNames(
      theme.slider,
      overlay && theme.overlay,
      flip && this.props.theme.flip,
      theme[componentWidth],
      active && theme.open
    );
  }

  // Function to get bar class names
  getBarClassName() {
    const {
      currentTheme = '',
      theme,
    } = this.props;

    return classNames(
      theme.bar,
      currentTheme && theme[currentTheme],
      theme.animation
    );
  }

  // Set body styles to render slider properly in root layer
  setBodyStyle() {
    const {
      flip,
      overlay,
      componentWidth = 'medium',
      theme,
    } = this.props;

    const bodyElement = document.body;

    bodyElement.className = '';

    if (bodyElement !== null) {
      bodyElement.className = this.props.active ? (theme.container) : '';
      bodyElement.className += overlay && this.props.active ? ' ' + (theme.overlay) : '';
      bodyElement.className += flip && this.props.active ? ' ' + (theme.flip) : '';
      bodyElement.className += this.props.active ? ' ' + (theme[componentWidth]) : '';
    }
  }

  // Function to get the current active slider content from props.children & set that as active & render that component only
  renderActivechildren() {
    const { activeContentId, children, closeButton, toggleSlider } = this.props;

    // Iterate through all the children content component & find active component
    // Match activeContentId with children's id & mark that as active: true
    return React.Children.map(children, (child: React.ReactElement<any>) => {
      const { componentId } = child.props;
      const cloneElemnt = (typeof activeContentId === 'string' && activeContentId === componentId) || (typeof activeContentId === 'object' && activeContentId.indexOf(componentId) !== componentId);

      // Clone active component & return it
      if (cloneElemnt) {
        return React.cloneElement(child, { closeButton, toggleSlider, active: true, });
      }
    });
  }

  renderLayer() {
    const { active, componentWidth, theme } = this.props;
    const containerClassName = this.getContainerClassName();
    const barClassName = this.getBarClassName();
    const activeContent = this.renderActivechildren();
    const sliderStyle = Object.assign(
      {},
      { width: componentWidth ? { width: `${componentWidth}` } : undefined },
      this.props.style
    );

    const bar = [
      <div className={barClassName} style={sliderStyle} key={this.id}>
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
          bar
        }
      </div>
    );
  }

  // Get activator node i.e. trigger which opened up slider
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

    accessibilityNode.tabIndex = 0;
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

export default themr(SLIDER, baseTheme)(Slider) as ThemedComponentClass<Props, {}>;
