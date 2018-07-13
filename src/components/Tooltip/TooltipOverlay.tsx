import * as React from 'react';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { classNames } from '@shopify/react-utilities/styles';

import { layer } from '../shared';
import PositionedOverlay, { OverlayDetails, PreferredPosition } from '../PositionedOverlay';

import * as styles from './Tooltip.scss';

export interface Props {
  // Id for tooltip.
  componentId: string;
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
  // callback when tooltip is closed.
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
        active={active}
        activator={activator}
        preferredPosition={preferredPosition}
        render={this.renderTooltip.bind(this)}
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
    const { componentId, children, light } = this.props;

    const tipStyle = calculateTipPosition(activatorRect.center.x, left);

    const containerClassName = classNames(
      styles.tooltip,
      light && styles.light,
      measuring && styles.measuring,
      positioning === 'above' && styles.positionedAbove
    );

    const contentStyles = measuring
      ? undefined
      : { maxHeight: isNaN(desiredHeight) ? 0 : desiredHeight };
    const tipMarkup = !measuring
      ? <div style={tipStyle} className={styles.tip} />
      : null;

    return (
      <div className={containerClassName} {...layer.props}>
          {tipMarkup}
          <div className={styles.wrapper}>
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

function calculateTipPosition(activatorRectXAxisCenter: number, left: number) {
  return { left: activatorRectXAxisCenter - left };
}
