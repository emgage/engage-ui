import * as React from 'react';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { classNames } from '@shopify/react-utilities/styles';

// import { layer } from '../shared';
// import { OverlayDetails } from '../PositionedOverlay';

// import * as styles from './Tooltip.scss';

export interface Props {
  // Id for tooltip.
  componentId: string;
  // Toggle whether the tooltip is visible.
  active: boolean;
  // Display tooltip with a light background.
  light?: boolean;
  // The direction the tooltip tries to display Availabel options: above | below | mostSpace
  preferredPosition?: any;
  preferredAlignment?: any;
  // Set anchor element or keep it null
  anchorEl?: HTMLElement | null;
  // Set direction to be applied. Available options: up | down | left | right.
  direction?:Direction;
  // The children that activate the tooltip.
  children?: React.ReactNode;
  // Activator is used to trigger tooltip component.
  activator: HTMLElement;
  activatorWrapper?: string;
  // callback when tooltip is closed.
  onClose(): void;
  // To add any inline style to Popover
  style? : any;
  // Theme to be injected via css-themr.
  theme?: any;
}

// DEfine type for direction to render popover
export type Direction = 'up' | 'down' | 'left' | 'right' | 'full';

export default class TooltipOverlay extends React.PureComponent<Props, never> {
  private activatorContainer: HTMLElement | null;
  private popoverEle: HTMLElement;
  private popoverOffset = { height: 0, width: 0 };

  render() {
    console.log(this.activatorContainer);
    const markup = this.props.active
      ? this.renderOverlay()
      : null;

    return markup;
  }

    // Get activator node i.e. trigger which opened up popover
  // This node will be used to set accessibility attributes
  @autobind
  private setActivator(node: HTMLElement | null) {
    if (node === null) {
      this.activatorContainer = null;
      return;
    }
    this.activatorContainer = node;
  }

  @autobind
  private renderOverlay() {
    const {
      activatorWrapper: WRAPPERCOMPONENT = 'div',
      active,
      // activator,
      // preferredPosition = 'below',
      // preferredAlignment = 'right',
      direction,
      anchorEl,
      theme,
      children,
      style
    } = this.props;
    debugger;
    const tooltipClassName = classNames(
      direction === 'down' ? theme.popdown
      : direction === 'up' ? theme.popup
      : direction === 'left' ? theme.popleft
      : theme.popright,
      active && theme.active
    );

    const tooltipContainerClassName = classNames(
      theme.tooltipContainer,
      active && theme.active
    );

    const activatorComp = anchorEl;
    let activatorRect: ClientRect | DOMRect;
    let popoverPosition = {};

    if (activatorComp != null) {
      activatorRect = activatorComp.getBoundingClientRect();
      if (direction === 'up') {
        popoverPosition = { top: - this.popoverOffset.height - activatorRect.height };
      } else if (direction === 'left') {
        popoverPosition = { left: - this.popoverOffset.width, top: - activatorRect.height };
      } else if (direction === 'right') {
        popoverPosition = { left: activatorRect.width, top: - activatorRect.height };
      } /*else if (direction === 'down') {
        popoverPosition = !this.state.active ? { left: `${- this.popoverOffset.width / 2 + activatorRect.width / 2}px`, top: 0 } : {};
      }*/
    }

    // const containerClassName = classNames(
    //   styles.tooltip,
    //   positioning === 'above' && styles.positionedAbove
    // );

    return (
      // <PositionedOverlay
      //   active={active}
      //   activator={activator}
      //   preferredPosition={preferredPosition}
      //   preferredAlignment={preferredAlignment}
      //   render={this.renderTooltip.bind(this)}
      // />
      <WRAPPERCOMPONENT ref={this.setActivator}>
      <div className={tooltipClassName}>
        <div
          style={style ? { ...style, ...popoverPosition } : popoverPosition }
          className={tooltipContainerClassName}
          ref={node => this.popoverEle = node as HTMLElement}
        >
        {children}
      </div>
    </div>
      </WRAPPERCOMPONENT>
    );
  }

  // @autobind
  // private renderTooltip(overlayDetails: OverlayDetails) {
  //   const {
  //     left,
  //     measuring,
  //     desiredHeight,
  //     positioning,
  //     activatorRect,
  //   } = overlayDetails;
  //   const { componentId, children, light } = this.props;

  //   const tipStyle = calculateTipPosition(activatorRect.center.x, left);

  //   const containerClassName = classNames(
  //     styles.tooltip,
  //     light && styles.light,
  //     measuring && styles.measuring,
  //     positioning === 'above' && styles.positionedAbove
  //   );

  //   const contentStyles = measuring
  //     ? undefined
  //     : { maxHeight: isNaN(desiredHeight) ? 0 : desiredHeight };
  //   const tipMarkup = !measuring
  //     ? <div style={tipStyle} className={styles.tip} />
  //     : null;

  //   return (
  //     <div className={containerClassName} {...layer.props}>
  //         {tipMarkup}
  //         <div className={styles.wrapper}>
  //         <div
  //           id={componentId}
  //           role="tooltip"
  //           className={styles.content}
  //           style={contentStyles}
  //         >
  //           {children}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

// function calculateTipPosition(activatorRectXAxisCenter: number, left: number) {
//   return { left: activatorRectXAxisCenter - left };
// }
