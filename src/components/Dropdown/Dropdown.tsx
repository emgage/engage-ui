import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { layeredComponent } from '@shopify/react-utilities/components';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { focusFirstFocusableNode, findFirstFocusableNode } from '@shopify/javascript-utilities/focus';
import { addEventListener, removeEventListener } from '@shopify/javascript-utilities/events';

import { PreferredPosition } from '../PositionedOverlay';
import DropdownOverlay, { CloseSource } from './DropdownOverlay';
import DropdownItem, { DropdownItemProps } from './DropdownItem';
import { classNames } from '@shopify/react-utilities/styles';
import { DROPDOWN } from '../ThemeIdentifiers';
import * as baseTheme from './Dropdown.scss';
import { Keys } from '../../types';

export interface Props {
  disabled?: boolean;
  children?: React.ReactNode;
  preferredPosition?: PreferredPosition;
  active: boolean;
  content?: string;
  activatorWrapper?: string;
  DropdownItems: DropdownItemProps[];
  onClose?(source: CloseSource): void;
  toggle?() : void;
}

export interface State {
  selectedIndex: number
}

const getUniqueID = createUniqueIDFactory('Dropdown');

@layeredComponent({ idPrefix: 'Dropdown' })
export class Dropdown extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      selectedIndex: 0 
    };
  }

  private activatorNode: HTMLElement | null;
  private activatorContainer: HTMLElement | null;

  private id = getUniqueID();

  componentWillReceiveProps(newProps: any) {
    const { active } = this.props;

    if (active && !newProps.active && typeof newProps.onClose !== 'undefined') {
      newProps.onClose();
    }
  }

  componentDidMount() {
    this.setAccessibilityAttributes();
    addEventListener(document, 'keyup', this.handleKeyEvent);
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  componentWillUnmount() {
    removeEventListener(document, 'keyup', this.handleKeyEvent);
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
      DropdownItems,
      toggle
    } = this.props;
    
    const {
      selectedIndex
    } = this.state;

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
              active= {selectedIndex === index ? true : false} 
              disabled={item.disabled}
              divider={item.divider}
              children={item.children}
            ></DropdownItem>
        );

    console.log(this.activatorNode)
    return (
      <WRAPPERCOMPONENT ref={this.setActivator}>
        <div className={className} key={this.id}>
          <a onClick={toggle}>{children}</a>
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
      this.activatorNode = null;
      this.activatorContainer = null;
      return;
    }
    this.activatorNode = node.firstElementChild as HTMLElement;
    this.activatorContainer = node;
  }

  @autobind
  private handleKeyEvent(event: KeyboardEvent) {
    const {
      active,
      toggle
    } = this.props;

    if (!active) {
      return;
    }
    
    // Change Items on key up, down and tab
    if (event.keyCode === Keys.UP_ARROW) {
      this.changeItem(-1);
    } else if (event.keyCode === Keys.DOWN_ARROW || event.keyCode === Keys.TAB) {
          this.changeItem(1);
    } else if (event.keyCode === Keys.ESCAPE && typeof toggle !== 'undefined') {
      toggle(); // Close the dropdown on ESC
    }
  }

  @autobind
  private changeItem(direction : number) {
    const itemCount = this.props.DropdownItems.length - 1;

    const {
      selectedIndex
    } = this.state;

    if (direction === 1) {
      if (selectedIndex === itemCount) {
        this.setState({
          selectedIndex: 0
        });
      } else {
        this.setState({
          selectedIndex: selectedIndex + 1
        });
      }
    } else if (direction === -1) {
      if (selectedIndex === 0) {
        this.setState({
          selectedIndex: itemCount
        });
      } else {
        this.setState({
          selectedIndex: selectedIndex - 1
        });
      }
    }
  }
}

export { Dropdown as UnthemedSelect };
export default themr(DROPDOWN, baseTheme)(Dropdown) as ThemedComponentClass<Props, {}>;