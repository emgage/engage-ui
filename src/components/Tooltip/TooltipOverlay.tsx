import * as React from 'react';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { classNames } from '@shopify/react-utilities/styles';

import { layer } from '../shared';
import PositionedOverlay, { OverlayDetails, PreferredPosition } from '../PositionedOverlay';

import * as styles from './Tooltip.scss';
import { calculateTipPosition } from '../../utilities';

export interface Props {
  // Id for tooltip.
  componentId: string;
  leftSpace?: number;
  // Toggle whether the tooltip is visible.
  active: boolean;
  // Display tooltip with a light background.
  light?: boolean;
  // The direction the tooltip tries to display Availabel options: above | below | mostSpace
  preferredPosition?: PreferredPosition;
  // The children that activate the tooltip.
  children?: React.ReactNode;
  // Activator is used to trigger tooltip component.
  activator: HTMLElement;
  hideTip?:boolean
  // callback when tooltip is closed.
  bgColor?: any;
  componentClass?: string;
  onClose(): void;
}

export default class TooltipOverlay extends React.PureComponent<Props, never> {
  render() {
    const markup = this.props.active
      ? this.renderOverlay()
      : null;

    return markup;
  }

  @autobind
  private renderOverlay() {
    const {
      active,
      activator,
      preferredPosition = 'below',
    } = this.props;

    return (
      <PositionedOverlay
        leftSpace={this.props.leftSpace}
        active={active}
        activator={activator}
        preferredPosition={preferredPosition}
        render={this.renderTooltip.bind(this)}
        preloadedPopover={true}
        tooltipOverlay={true}
      />
    );
  }

  @autobind
  private renderTooltip(overlayDetails: OverlayDetails) {
    const {
      left,
      measuring,
      desiredHeight,
      positioning,
      activatorRect,
    } = overlayDetails;
    const { componentId, children, light = false, preferredPosition ,componentClass} = this.props;

    const tipStyle = calculateTipPosition(activatorRect.center.x, left, preferredPosition, 'center', false);

    const containerClassName = classNames(
      preferredPosition === 'below' && styles.belowTooltip,
      preferredPosition === 'right' && styles.rightTooltip,
      preferredPosition === 'above' && styles.aboveTooltip,
      preferredPosition === 'left' && styles.leftTooltip,
      light && styles.light,
      measuring && styles.measuring,
      positioning === 'above' && styles.positionedAbove,
      componentClass,
    );

    const contentStyles = measuring
      ? undefined
      : { maxHeight: isNaN(desiredHeight) ? 0 : 'auto' };
    const tipMarkup = !measuring
      ? <div style={{...tipStyle, display: this.props.hideTip ? "none": "inline", backgroundColor:this.props.bgColor}} className={styles.tip} />
      : null;

    return (
      <div className={containerClassName} {...layer.props}>
          {tipMarkup}
          <div style={{ backgroundColor:this.props.bgColor}} className={styles.wrapper}>
          <div
            id={componentId}
            role="tooltip"
            className={styles.content}
            style={contentStyles}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}
