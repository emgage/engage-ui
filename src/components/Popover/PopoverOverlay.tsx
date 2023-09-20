import * as React from 'react';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { classNames } from '@shopify/react-utilities/styles';

import { layer } from '../shared';
import PositionedOverlay, { OverlayDetails, PreferredAlignment, PreferredPosition } from '../PositionedOverlay';

import * as styles from './Popover.scss';
import { calculateTipPosition } from '../../utilities';

export interface Props {
  addArrow: boolean;
  // Id for popover.
  componentId: string;
  // Toggle whether the popover is visible.
  active: boolean;
  // The direction the popover tries to display Availabel options: above | below | mostSpace
  preferredPosition?: PreferredPosition;
  // The children that activate the popover.
  children?: React.ReactNode;
  // Activator is used to trigger popover component.
  activator: HTMLElement;
  popoverRef(node: HTMLElement | null): any;
  isPopover?: any;
  // callback when popover is closed.
  onClose(): void;
  tipPosition?: number;
  preferredAlignment?: PreferredAlignment;

}
// export interface State {
//   stateRef?: any;
// }
export default class PopoverOverlay extends React.PureComponent<Props, never> {
  // overlayRef: React.RefObject<any>;
  // constructor(props: Props) {
  //   super(props);
  //   this.overlayRef = React.createRef();

  //   this.state = {
  //     stateRef: {}
  //   };
  // }
  // componentDidMount () {
  //   this.setState({
  //     stateRef: this.overlayRef.current.offsetWidth
  //   })
  // }

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
      preferredAlignment = 'center'
    } = this.props;

    return (
      <PositionedOverlay
      isPopover={this.props.isPopover}
        active={active}
        activator={activator}
        preferredPosition={preferredPosition}
        preferredAlignment={preferredAlignment}
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
      positioning,
      activatorRect,
      anchorPosition
    } = overlayDetails;
    const { addArrow, componentId, children, preferredPosition, preferredAlignment,tipPosition } = this.props;
    console.log('render popover-------------------------->',this.props)
    // console.log({anchorPosition})
    // console.log({activatorRect})
    // console.log({left})
    // console.log({anchorPosition})
    // console.log({measuring})
    const tipStyle = calculateTipPosition(anchorPosition + 8, left, preferredPosition === 'below' ? window.outerHeight - activatorRect.top < 250 ? 'above' : preferredPosition : preferredPosition, preferredAlignment,this.props.isPopover );

    const containerClassName = classNames(
      (preferredPosition === 'below' || preferredPosition === 'mostSpace') && styles.belowPopover,
      preferredPosition === 'right' && styles.rightPopover,
      preferredPosition === 'above' && styles.abovePopover,
      preferredPosition === 'left' && styles.leftPopover,
      measuring && styles.measuring,
      positioning === 'above' && styles.positionedAbove
    );
      const tipStyleCustom = {
        ...tipStyle,
        marginLeft: tipPosition? tipPosition : tipStyle?.marginLeft,
        marginTop: tipStyle?. marginTop
      }
    const tipMarkup = !measuring
      ? <div style={tipStyleCustom} className={styles.tip} />
      : null;

    return (
      <div className={containerClassName} {...layer.props} ref={this.props.popoverRef}>
          {addArrow ? tipMarkup : null}
          <div className={styles.wrapper}>
          <div
            // ref={this.overlayRef as any}
            id={componentId}
            role="popover"
            className={styles.content}
            style={{width: preferredAlignment === 'center' ? activatorRect.width : "auto"}}

          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}
