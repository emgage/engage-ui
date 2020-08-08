import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { addEventListener, removeEventListener } from '@shopify/javascript-utilities/events';
import { closest } from '@shopify/javascript-utilities/dom';
import { classNames } from '@shopify/react-utilities/styles';

import { scrollable } from '../shared';
import { SCROLLABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Scrollable.scss';

export interface Props extends React.HTMLProps<HTMLDivElement> {
  // Content to display in scrollable area.
  children?: React.ReactNode;
  // Scroll content vertically.
  vertical?: boolean;
  // Scroll content horizontally.
  horizontal?: boolean;
  // Add a shadow when content is scrollable.
  shadow?: boolean;
  // Theme to be injected via css-themr.
  theme?: any;
}

export interface State {
  topShadow: boolean;
  bottomShadow: boolean;
}

class Scrollable extends React.PureComponent<Props, State> {

  state: State = {
    topShadow: false,
    bottomShadow: false,
  };

  private scrollArea: HTMLElement;

  componentDidMount() {
    const { shadow = false } = this.props;
    if (this.scrollArea == null || !shadow) { return; }
    addEventListener(this.scrollArea, 'scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    const { shadow = false } = this.props;
    if (this.scrollArea == null || !shadow) { return; }
    removeEventListener(this.scrollArea, 'scroll', this.handleScroll);
  }

  render() {
    const { topShadow, bottomShadow } = this.state;
    const {
      children,
      className,
      horizontal = false,
      vertical = true,
      shadow = false,
      theme,
      ...rest
    } = this.props;

    const finalClassName = classNames(
      className,
      theme.scrollable,
      vertical && theme.vertical,
      horizontal && theme.horizontal,
      topShadow && theme.hasTopShadow,
      bottomShadow && theme.hasBottomShadow
    );

    return (
      <div
        className={finalClassName}
        {...scrollable.props}
        {...rest}
        ref={(input) => { this.setScrollArea(input as HTMLElement); }}
      >
        {children}
      </div>
    );
  }

  @autobind
  private setScrollArea(scrollArea: HTMLElement) {
    this.scrollArea = scrollArea;
  }

  @autobind
  private handleScroll() {
    const { scrollArea } = this;
    const { shadow = false } = this.props;
    if (scrollArea == null || !shadow) { return; }

    const { scrollTop, clientHeight, scrollHeight } = scrollArea;
    const shouldBottomShadow = !(scrollTop + clientHeight >= scrollHeight);
    const shouldTopShadow = scrollTop > 0;

    this.setState({
      topShadow: shouldTopShadow,
      bottomShadow: shouldBottomShadow,
    });
  }
}

function forNode(node: HTMLElement) {
  return (closest(node, scrollable.selector) as HTMLElement | null) || document.body;
}

export default themr(SCROLLABLE, baseTheme)(Scrollable) as ThemedComponentClass<Props, State>;
export { forNode };
