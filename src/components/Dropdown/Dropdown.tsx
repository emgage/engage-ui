import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { layeredComponent } from '@shopify/react-utilities/components';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { focusFirstFocusableNode, findFirstFocusableNode } from '@shopify/javascript-utilities/focus';

import { PreferredPosition } from '../PositionedOverlay';
import DropdownOverlay, { CloseSource } from './DropdownOverlay';
import DropdownItem, { DropdownItemProps } from './DropdownItem';
import { classNames } from '@shopify/react-utilities/styles';
import { DROPDOWN } from '../ThemeIdentifiers';
import * as baseTheme from './Dropdown.scss';

export interface Props {
  disabled?: boolean;
  children?: React.ReactNode;
  preferredPosition?: PreferredPosition;
  active: boolean;
  content?: string;
  activatorWrapper?: string;
  DropdownItems: DropdownItemProps[];
  onClose?(source: CloseSource): void;
}

export interface State {
}

const getUniqueID = createUniqueIDFactory('Dropdown');

@layeredComponent({ idPrefix: 'Dropdown' })
export class Dropdown extends React.PureComponent<Props, State> {

  private activatorContainer: HTMLElement | null;
  private id = getUniqueID();

  componentDidMount() {
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  renderLayer() {
    const {
      content,
      children,
      onClose,
      activatorWrapper,
      ...rest
    } = this.props;

    const { activatorContainer } = this;

    if (activatorContainer == null) {
      return null;
    }

    return (
      <DropdownOverlay
        id={this.id}
        onClose={this.handleClose}
        content={content}
        ActivatorContainer={activatorContainer as HTMLElement}
        {...rest}
      >
        {children}
      </DropdownOverlay>
    );
  }

  render() {
    const { 
      activatorWrapper: WRAPPERCOMPONENT = 'div',
      active,
      children,
      DropdownItems
    } = this.props;

    const className = classNames (
      baseTheme.dropdown,
      active && baseTheme.active
    );

    const className1 = classNames (
      baseTheme.dropdownMenu,
      active && baseTheme.active,
    );

    const DropdownItemComponents = DropdownItems.map((item,index) => 
            <DropdownItem 
              key={index}
              active={item.active}
              disabled={item.disabled}
              divider={item.divider}
              children={item.children}
            ></DropdownItem>
        );

    return (
      <WRAPPERCOMPONENT ref={this.setActivator}>
        <div className={className} key={this.id}>
          <label>{children}</label>
          <div className={className1}>
            {DropdownItemComponents}
          </div>
        </div>
      </WRAPPERCOMPONENT>
    );
  }

  private setAccessibilityAttributes() {
    const { id, activatorContainer } = this;
    if (activatorContainer == null) { return; }

    const firstFocusable = findFirstFocusableNode(activatorContainer);
    const focusableActivator = firstFocusable || activatorContainer;

    focusableActivator.tabIndex = 0;
    focusableActivator.setAttribute('aria-controls', id);
    focusableActivator.setAttribute('aria-owns', id);
    focusableActivator.setAttribute('aria-haspopup', 'true');
    focusableActivator.setAttribute('aria-expanded', String(this.props.active));
  }

  @autobind
  private handleClose(source: CloseSource) {
    if (!!this.props.onClose) {
      this.props.onClose(source);
    }

    if (this.activatorContainer == null) { return; }
    if (
      source === CloseSource.FocusOut ||
      source === CloseSource.EscapeKeypress
    ) {
      focusFirstFocusableNode(this.activatorContainer, false);
    }
  }

  @autobind
  private setActivator(node: HTMLElement | null) {
    if (node == null) {
      this.activatorContainer = null;
      return;
    }

    this.activatorContainer = node;
  }
}

export { Dropdown as UnthemedSelect };
export default themr(DROPDOWN, baseTheme)(Dropdown) as ThemedComponentClass<Props, {}>;