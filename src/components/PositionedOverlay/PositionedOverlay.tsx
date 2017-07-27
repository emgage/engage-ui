import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import autobind from '@shopify/javascript-utilities/autobind';
import { addEventListener, removeEventListener } from '@shopify/javascript-utilities/events';
import { getRectForNode, Rect } from '@shopify/javascript-utilities/geometry';
import { closest } from '@shopify/javascript-utilities/dom';

import { forNode as ScrollableForNode } from '../Scrollable';
import { layer } from '../shared';
import { POSITIONED_OVERLAY } from '../ThemeIdentifiers';

import {
  PreferredPosition,
  calculateVerticalPosition,
  calculateHorizontalPosition,
  rectIsOutsideOfRect,
} from './math';

import * as baseTheme from './PositionedOverlay.scss';

export { PreferredPosition };
export type Positioning = 'above' | 'below';

export interface OverlayDetails {
  left: number;
  desiredHeight: number;
  positioning: Positioning;
  measuring: boolean;
  activatorRect: Rect;
}

export interface Props {
  active: boolean;
  activator: HTMLElement;
  preferredPosition?: PreferredPosition;
  theme?: any;
  render(overlayDetails: OverlayDetails): React.ReactNode;
  onScrollOut?(): void;
}

export interface State {
  measuring: boolean;
  activatorRect: Rect;
  left: number;
  top: number;
  height: number;
  positioning: Positioning;
  zIndex: number;
  outsideScrollableContainer: boolean;
}

class PositionedOverlay extends React.PureComponent<Props, State> {
  state: State = {
    measuring: true,
    activatorRect: getRectForNode(this.props.activator),
    left: 0,
    top: 0,
    height: 0,
    positioning: 'below',
    zIndex: -1,
    outsideScrollableContainer: false,
  };

  private overlay: HTMLElement;
  private scrollableContainer: HTMLElement;

  componentDidMount() {
    this.scrollableContainer = ScrollableForNode(this.props.activator);
    addEventListener(this.scrollableContainer, 'scroll', this.handleMeasurement);
    addEventListener(window, 'resize', this.handleMeasurement);
    this.handleMeasurement();
  }

  componentDidUpdate() {
    const { outsideScrollableContainer, top } = this.state;
    const { onScrollOut, active } = this.props;

    if (active && onScrollOut != null && top !== 0 && outsideScrollableContainer) {
      onScrollOut();
    }
  }

  componentWillUnmount() {
    removeEventListener(this.scrollableContainer, 'scroll', this.handleMeasurement);
    removeEventListener(window, 'resize', this.handleMeasurement);
  }

  render() {
    const { left, top, zIndex } = this.state;
    const { render, theme } = this.props;

    return (
      <div
        className={theme.positionedOverlay}
        style={{ top, left, zIndex }}
        ref={(input) => { this.setOverlay(input as HTMLElement); }} 
      >
        {render(this.overlayDetails())}
      </div>
    );
  }

  @autobind
  private overlayDetails(): OverlayDetails {
    const { measuring, left, positioning, height, activatorRect } = this.state;

    return {
      measuring,
      left,
      positioning,
      activatorRect,
      desiredHeight: height,
    };
  }

  @autobind
  private setOverlay(node: HTMLElement) {
    this.overlay = node;
  }

  @autobind
  private handleMeasurement() {
    this.setState({
      left: 0,
      top: 0,
      height: 0,
      positioning: 'below',
      measuring: true,
    },            () => {
      const {
        activator,
        preferredPosition = 'below',
        onScrollOut,
      } = this.props;

      const activatorRect = getRectForNode(activator);
      const overlayRect = getRectForNode(this.overlay);
      const scrollableContainerRect = getRectForNode(this.scrollableContainer);
      const overlayMargins = this.overlay.firstElementChild
        ? getMarginsForNode(this.overlay.firstElementChild as HTMLElement)
        : { activator: 0, container: 0, horizontal: 0 };
      const containerRect = getRectForNode(window);
      const zIndex = getZIndexForLayerFromNode(activator) + 1;
      const verticalPosition = calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition);
      const horizontalPosition = calculateHorizontalPosition(activatorRect, overlayRect, containerRect);

      this.setState({
        zIndex,
        measuring: false,
        activatorRect: getRectForNode(activator),
        left: horizontalPosition,
        top: verticalPosition.top,
        height: verticalPosition.height,
        positioning: verticalPosition.positioning as Positioning,
        outsideScrollableContainer: onScrollOut != null && rectIsOutsideOfRect(activatorRect, scrollableContainerRect),
      });
    });
  }
}

function getMarginsForNode(node: HTMLElement) {
  const styles = window.getComputedStyle(node);
  return {
    activator: parseFloat(styles.marginTop || ''),
    container: parseFloat(styles.marginBottom || ''),
    horizontal: parseFloat(styles.marginLeft || ''),
  };
}

function getZIndexForLayerFromNode(node: HTMLElement) {
  const layerNode = closest(node, layer.selector) || document.body;
  const zIndex = parseInt(window.getComputedStyle(layerNode).zIndex || '0', 10);
  return isNaN(zIndex) ? 0 : zIndex;
}

export default themr(POSITIONED_OVERLAY, baseTheme)(PositionedOverlay) as ThemedComponentClass<Props, State>;
