import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { findFirstFocusableNode } from '@shopify/javascript-utilities/focus';
import { addEventListener, removeEventListener } from '@shopify/javascript-utilities/events';

import DropdownItem, { Props as DropdownItemProps } from './DropdownItem';
import { classNames } from '@shopify/react-utilities/styles';
import { DROPDOWN } from '../ThemeIdentifiers';
import * as baseTheme from './Dropdown.scss';
import { Keys } from '../../types';
import { findDOMNode } from 'react-dom';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Props {
  disabled?: boolean;
  direction?: Direction;
  active: boolean;
  activatorWrapper?: string;
  dropdownItems: DropdownItemProps[];
  closeOnClickOutside?: boolean;
  anchorEl?: HTMLElement | null;
  onClose?(): void;
  toggle?() : void;
}

export interface State {
  selectedIndex: number;
}

export class Dropdown extends React.PureComponent<Props, State> {
  private getUniqueID = createUniqueIDFactory('Dropdown');
  private activatorContainer: HTMLElement | null;
  private id = this.getUniqueID();
  private dropdownEle: any = null;
  private dropdownOffset: any = { height: 0, width: 0 };

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  componentWillReceiveProps(newProps: any) {
    const { active } = this.props;

    if (active && !newProps.active && newProps.onClose) {
      newProps.onClose();
    }
  }

  componentDidMount() {
    this.setAccessibilityAttributes();
    const element = findDOMNode(this);
    // const dropdownCopy = this.dropdownEle.cloneNode(true);
    this.dropdownEle.style.display = 'block';
    // this.dropdownPostion
    this.dropdownOffset.height = this.dropdownEle.offsetHeight;
    this.dropdownOffset.width = this.dropdownEle.offsetWidth;
    this.dropdownEle.style.display = '';

    if (element !== null) {
      addEventListener(element, 'keyup', this.handleKeyEvent);
    }

    if (this.props.closeOnClickOutside) {
      addEventListener(document, 'click', this.handleMouseEvent);
    }
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  componentWillUnmount() {
    const element = findDOMNode(this);
    if (element != null) {
      removeEventListener(element, 'keyup', this.handleKeyEvent);
    }

    if (this.props.closeOnClickOutside) {
      removeEventListener(document, 'click', this.handleMouseEvent);
    }
  }

  render() {
    const {
      activatorWrapper: WRAPPERCOMPONENT = 'div',
      active,
      dropdownItems,
      direction = 'down',
      disabled,
      anchorEl
    } = this.props;

    const {
      selectedIndex
    } = this.state;

    const dropdownClassName = classNames (
      direction === 'down' ? baseTheme.dropdown
      : direction === 'up' ? baseTheme.dropup
      : direction === 'left' ? baseTheme.dropleft
      : baseTheme.dropright,
      !disabled && active && baseTheme.active
    );

    const dropdownMenuClassName = classNames (
      baseTheme.dropdownMenu,
      !disabled && active && baseTheme.active
    );

    const activatorComp = anchorEl;
    let activatorRect: ClientRect | DOMRect;
    let dropdownPostion: any = {};
    // let leftCord : number = 0;
    // const dropdownPosition: any = {};
    if (activatorComp != null) {
      activatorRect = activatorComp.getBoundingClientRect();
      if (direction === 'up') {
        dropdownPostion = { top: - this.dropdownOffset.height - activatorRect.height };
      } else if (direction === 'left') {
        dropdownPostion = { left: - this.dropdownOffset.width, top: - activatorRect.height };
      } else if (direction === 'right') {
        dropdownPostion = { left: activatorRect.width, top: - activatorRect.height };
      }
    }

    const DropdownItemComponents = dropdownItems.map((item,index) =>
      <DropdownItem
        key={index}
        active={selectedIndex === index}
        disabled={item.disabled}
        divider={item.divider}
        header={item.header}
        content={item.content}
        onClick={item.onClick}
      />
    );

    return (
      <WRAPPERCOMPONENT ref={this.setActivator}>
        <div className={dropdownClassName} key={this.id}>
          <div
            style={dropdownPostion}
            className={dropdownMenuClassName}
            ref={node => this.dropdownEle = node}
          >
            {/* <div className={baseTheme.box} /> */}
            {DropdownItemComponents}
          </div>
        </div>
      </WRAPPERCOMPONENT>
    );
  }

  private setAccessibilityAttributes() {
    const { id, activatorContainer } = this;
    if (activatorContainer === null) { return; }

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
    if (node === null) {
      this.activatorContainer = null;
      return;
    }
    this.activatorContainer = node;
  }

  @autobind
  private handleKeyEvent(event: KeyboardEvent) {
    event.preventDefault();

    const {
      active,
      toggle,
      disabled
    } = this.props;

    const {
      selectedIndex
    } = this.state;

    if (!active && !disabled) {
      return;
    }

    // Change Items on key up, down and tab
    if (event.keyCode === Keys.UP_ARROW) {
      this.changeItem(selectedIndex, -1);
    } else if (event.keyCode === Keys.DOWN_ARROW || event.keyCode === Keys.TAB) {
      this.changeItem(selectedIndex, 1);
    } else if (event.keyCode === Keys.ESCAPE && toggle) {
      toggle(); // Close the dropdown on ESC
    }
  }

  @autobind
  private changeItem(selectedIndex: number, direction : number) {
    const DropdownCount = this.props.dropdownItems.length - 1;

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
  private changeItemState(oldSelectedIndex: number, direction : number) {
    const {
      dropdownItems
    } = this.props;

    // if next selected item is disabled or devider find next one
    if (dropdownItems[oldSelectedIndex].disabled || dropdownItems[oldSelectedIndex].divider || dropdownItems[oldSelectedIndex].header) {
      this.changeItem(oldSelectedIndex, direction);
      return;
    }

    this.setState({
      selectedIndex: oldSelectedIndex
    });
  }

  @autobind
  private handleMouseEvent(event: MouseEvent) {
    event.preventDefault();

    const {
      active,
      toggle,
      disabled
    } = this.props;

    const element = findDOMNode(this);

    if (!active && !disabled) {
      return;
    }

    if (element !== null && event.target != null && element !== event.target && toggle) {
      /* 
        checkClild is use to check current componet's child 
        or child's child and so is not the target
      */
      if (!this.checkClild(element, event.target)) {
        toggle(); // Close the click out side
      }
    }
  }

  @autobind
  private checkClild(element : Element | Text, target : EventTarget): boolean {
    let isCurrent = false;
    if (element !== null) {
      element.childNodes.forEach((item) => {
        if (target === item) {
          isCurrent = true;
        } else if (!isCurrent) {
          isCurrent = this.checkClild(item as Element, target);
        }
      });
    }
    return isCurrent;
  }
}

export { Dropdown as UnthemedDropdown };
export default themr(DROPDOWN, baseTheme)(Dropdown) as ThemedComponentClass<Props, {}>;
