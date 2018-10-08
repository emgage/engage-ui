import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { SLIDER } from '../ThemeIdentifiers';

import Button from '../Button';

import * as baseTheme from './Slider.scss';

// All prototypes type
export interface Props {
  active?: boolean;
  // Show or hide close button (X) to close slider
  closeButton?: boolean;
  flip?: boolean;
  componentId?: string;
  theme?: any;
  style?: any;
  // Callback function to close or open the slider
  toggleSlider?(): void;
}

// Slider Content component, in here wrap all other required components or DOM for the Slider
class SliderContent extends React.Component<Props, never> {
  getContainerClassName() {
    const {
      flip,
      active,
      theme,
    } = this.props;

    return classNames(
      theme.sliderContent,
      theme.slider,
      flip && this.props.theme.flip,
      active && theme.open
    );
  }

  getBarClassName() {
    const {
      theme,
    } = this.props;

    return classNames(
      theme.sliderContent,
      theme.bar,
      theme.animation
    );
  }

  render() {
    const { active, children, closeButton, theme, toggleSlider } = this.props;
    const sliderComponentStyle = Object.assign(
      {},
      {},
      this.props.style
    );
    return (
      <div style={sliderComponentStyle}>
        {
          closeButton ?
          <span className={theme.close}>
            <Button onClick={toggleSlider} icon="cancel" plain />
          </span> :
          null
        }
        {
          active ?
          children :
          ''
        }
      </div>
    );
  }
}

export default themr(SLIDER, baseTheme)(SliderContent) as ThemedComponentClass<Props, {}>;
