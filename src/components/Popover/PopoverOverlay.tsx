import * as React from 'react';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { classNames } from '@shopify/react-utilities/styles';

import { layer } from '../shared';
import PositionedOverlay, { OverlayDetails, PreferredPosition } from '../PositionedOverlay';

import * as styles from './Popover.scss';
import { calculateTipPosition } from '../../utilities';

export interface Props {
  // Id for popover.
  componentId: string;
  // Toggle whether the popover is visible.
  active: boolean;
  // Display popover with a light background.
  light?: boolean;
  // The direction the popover tries to display Availabel options: above | below | mostSpace
  preferredPosition?: PreferredPosition;
  // The children that activate the popover.
  children?: React.ReactNode;
  // Activator is used to trigger popover component.
  activator: HTMLElement;
  // callback when popover is closed.
  onClose(): void;
}

export default class PopoverOverlay extends React.PureComponent<Props, never> {
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
        render={this.renderPopover.bind(this)}
        preloadedPopover={true}
      />
    );
  }

  @autobind
  private renderPopover(overlayDetails: OverlayDetails) {
    const {
      left,
      measuring,
      desiredHeight,
      positioning,
      activatorRect,
    } = overlayDetails;
    const { componentId, children, light, preferredPosition } = this.props;

    const tipStyle = calculateTipPosition(activatorRect.center.x, left, preferredPosition);

    const containerClassName = classNames(
      preferredPosition === 'below' && styles.belowPopover,
      preferredPosition === 'right' && styles.rightPopover,
      preferredPosition === 'above' && styles.abovePopover,
      preferredPosition === 'left' && styles.leftPopover,
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
            role="popover"
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
