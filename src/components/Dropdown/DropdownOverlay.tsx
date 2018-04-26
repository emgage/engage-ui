import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { Transition } from 'react-transition-group';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { write } from '@shopify/javascript-utilities/fastdom';
import { findFirstFocusableNode } from '@shopify/javascript-utilities/focus';
import { classNames } from '@shopify/react-utilities/styles';
import { isElementOfType, /* wrapWithComponent */ } from '@shopify/react-utilities/components';
import { Item } from '../List';

import { Keys } from '../../types';
import { overlay } from '../shared';
import KeypressListener from '../KeypressListener';
import PositionedOverlay, { OverlayDetails, PreferredPosition } from '../PositionedOverlay';
import { DROPDOWN } from '../ThemeIdentifiers';

import Pane, { Props as PaneProps } from './Pane';
import * as baseTheme from './Dropdown.scss';

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

export enum CloseSource {
  Click,
  EscapeKeypress,
  FocusOut,
  ScrollOut,
}

export interface Props {
  id: string;
  active: boolean;
  preventAutofocus?: boolean;
  sectioned?: boolean;
  preferredPosition?: PreferredPosition;
  ActivatorContainer?: HTMLElement;
  children?: React.ReactNode;
  content?: string,
  theme?: any;
  onClose(source: CloseSource): void;
}

class DropdownOverlay extends React.PureComponent<Props, never> {
  private contentNode: HTMLElement | null;

  componentDidUpdate({ active: wasActive }: Props) {
    const { active, preventAutofocus } = this.props;
    if (!active || preventAutofocus || !active || active === wasActive) { return; }
    if (this.contentNode == null) { return; }

    write(() => {
      if (this.contentNode == null) { return; }
      const focusableChild = findFirstFocusableNode(this.contentNode);
      (focusableChild || this.contentNode).focus();
    });
  }

  render() {
    const { active } = this.props;
    return (
      <Transition in={active} timeout={500} mountOnEnter unmountOnExit>
        {this.renderOverlay}
      </Transition>
    );
  }

  @autobind
  private renderOverlay(transitionStatus: TransitionStatus) {
    const {
      active,
      ActivatorContainer,
      preferredPosition = 'below',
    } = this.props;

    return (
      <PositionedOverlay
        active={active}
        activator={ActivatorContainer as HTMLElement}
        preferredPosition={preferredPosition}
        render={this.renderPopover.bind(this, transitionStatus)}
        onScrollOut={this.handleScrollOut}
      />
    );
  }

  @autobind
  private renderPopover(transitionStatus: TransitionStatus, overlayDetails: OverlayDetails) {
    const {
      measuring,
      left,
      desiredHeight,
      positioning,
      activatorRect,
    } = overlayDetails;

    const {
      id,
      content,
      sectioned,
      theme,
    } = this.props;

    const className = classNames(
      theme.dropdown,
      transitionStatus && animationVariations(transitionStatus, theme),
      positioning === 'above' && theme.positionedAbove,
      measuring && theme.measuring
    );

    const tipMarkup = !measuring
      ? (
        <div
          style={{ left: activatorRect.center.x - left }}
          className={theme.tip}
        />
      )
      : null;

    const contentStyles = measuring
      ? undefined
      : { height: desiredHeight };

    const htmlContent = (
      <div
        id={id}
        tabIndex={-1}
        className={theme.content}
        style={contentStyles}
        ref={this.setContentNode}
      >
        {renderPopoverContent(content, { sectioned })}
      </div>
    );

    return (
      <div className={className} {...overlay.props}>
        <KeypressListener keyCode={Keys.ESCAPE} handler={this.handleEscape} />
        {tipMarkup}
        <div className={theme.focusTracker} tabIndex={0} onFocus={this.handleFocusFirstItem} />
        <div className={theme.wrapper}>
          {htmlContent}
        </div>
        <div className={theme.focusTracker} tabIndex={0} onFocus={this.handleFocusLastItem} />
      </div>
    );
  }

  @autobind
  private setContentNode(node: HTMLElement | null) {
    this.contentNode = node;
  }

  @autobind
  private handleScrollOut() {
    this.props.onClose(CloseSource.ScrollOut);
  }

  @autobind
  private handleEscape() {
    this.props.onClose(CloseSource.EscapeKeypress);
  }

  @autobind
  private handleFocusFirstItem() {
    this.props.onClose(CloseSource.FocusOut);
  }

  @autobind
  private handleFocusLastItem() {
    this.props.onClose(CloseSource.FocusOut);
  }
}

function renderPopoverContent(children: React.ReactNode, props?: Partial<PaneProps>) {
  const childrenArray = React.Children.toArray(children);
  if (isElementOfType(childrenArray[0], Pane)) { return childrenArray; }
  return <Item key="sdgsdg">Item1</Item> //wrapWithComponent(childrenArray, Pane, props);
}

function animationVariations(status: TransitionStatus, theme: any) {
  switch (status) {
    case 'exiting':
      return theme.leaving;
    default:
      return null;
  }
}

export default themr(DROPDOWN, baseTheme)(DropdownOverlay) as ThemedComponentClass<Props, {}>;
