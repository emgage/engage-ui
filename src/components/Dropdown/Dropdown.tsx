import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { findFirstFocusableNode } from '@shopify/javascript-utilities/focus';
import { addEventListener, removeEventListener } from '@shopify/javascript-utilities/events';

import DropdownItem from './DropdownItem';
import { classNames } from '@shopify/react-utilities/styles';
import { DROPDOWN } from '../ThemeIdentifiers';
import * as baseTheme from './Dropdown.scss';
import { Keys } from '../../types';
import Button from '../Button';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface DropdownItemProps {
  children?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  header?: boolean;
  onClick?(): void;
}

export interface Props {
  disabled?: boolean;
  children?: string;
  direction?: Direction;
  active: boolean;
  activatorWrapper?: string;
  DropdownItems: DropdownItemProps[];
  onClose?(): void;
  toggle?() : void;
}

export interface State {
  selectedIndex: number
}

const getUniqueID = createUniqueIDFactory('Dropdown');

export class Dropdown extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      selectedIndex: 0 
    };
  }

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

  render() {
    const { 
      activatorWrapper: WRAPPERCOMPONENT = 'div',
      active,
      children,
      DropdownItems,
      toggle,
      direction
    } = this.props;
    
    const {
      selectedIndex
    } = this.state;

    
    const dropdownClassName = classNames (
      typeof direction == 'undefined' || direction === "down" ? baseTheme.dropdown 
        : direction === "up" ? baseTheme.dropup
        : direction === "left" ? baseTheme.dropleft
        : baseTheme.dropright,
      active && baseTheme.active
    );

    const dropdownMenuClassName = classNames (
      baseTheme.dropdownMenu,
      active && baseTheme.active,
    );

    const DropdownItemComponents = DropdownItems.map((item,index) => 
            <DropdownItem 
              key={index}
              active={selectedIndex === index} 
              disabled={item.disabled}
              divider={item.divider}
              header={item.header}
              children={item.children}
            ></DropdownItem>
        );
      
    return (
      <WRAPPERCOMPONENT ref={this.setActivator}>
        <div className={dropdownClassName} key={this.id}>
          <Button onClick={toggle}>{children}</Button>
          <div className={dropdownMenuClassName}>
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
  private setActivator(node: HTMLElement | null) {
    if (node == null) {
      this.activatorContainer = null;
      return;
    }
    this.activatorContainer = node;
  }

  @autobind
  private handleKeyEvent(event: KeyboardEvent) {
    const {
      active,
      toggle
    } = this.props;

    const {
      selectedIndex
    } = this.state;

    if (!active) {
      return;
    }
    
    // Change Items on key up, down and tab
    if (event.keyCode === Keys.UP_ARROW) {
      this.changeItem(selectedIndex, -1);
    } else if (event.keyCode === Keys.DOWN_ARROW || event.keyCode === Keys.TAB) {
          this.changeItem(selectedIndex, 1);
    } else if (event.keyCode === Keys.ESCAPE && typeof toggle !== 'undefined') {
      toggle(); // Close the dropdown on ESC
    }
  }

  @autobind
  private changeItem(selectedIndex: number, direction : number) {
    const DropdownCount = this.props.DropdownItems.length - 1;

    if (direction === 1) {
      if (selectedIndex === DropdownCount) {
        this.changeItemState(0, 1);
      } else {
        this.changeItemState(selectedIndex + 1, 1);
      }
    } else if (direction === -1) {
      if (selectedIndex === 0) {
        this.changeItemState(DropdownCount, -1);
      } else {
        this.changeItemState(selectedIndex - 1, -1);
      }
    }
  }

  @autobind
  private changeItemState(selectedIndex: number, direction : number) {
    const {
      DropdownItems
    } = this.props;

    // if next selected item is disabled or devider find next one
    if (DropdownItems[selectedIndex].disabled || DropdownItems[selectedIndex].divider || DropdownItems[selectedIndex].header) {
      this.changeItem(selectedIndex, direction)
      return
    }

    this.setState({
      selectedIndex: selectedIndex
    });
  }
}

export { Dropdown as UnthemedSelect };
export default themr(DROPDOWN, baseTheme)(Dropdown) as ThemedComponentClass<Props, {}>;