import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import DropdownItem, { Props as DropdownItemProps } from './DropdownItem';
import Popover, { Props as PopoverProps } from '../Popover';
import { DROPDOWN } from '../ThemeIdentifiers';
import * as baseTheme from './Dropdown.scss';
import { PreferredAlignment } from '../PositionedOverlay/math';

// All prototypes type
export interface Props {
  // Set disabled
  disabled?: PopoverProps['disabled'];
  // Set direction to be applied. Available options: up | down | left | right.
  direction?: PopoverProps['direction'];
  // Set active to true for dropdown to display, else false
  active: PopoverProps['active'];
  // Set anchor element 
  anchorEl?: PopoverProps['anchorEl'];
  // Set to true if you want to close dropdown when click anywhere in body
  closeOnClickOutside?: PopoverProps['closeOnClickOutside'];
  // Set items to be displayed in dropdown wrapper
  dropdownItems: DropdownItemProps[];
  // Value to be return when clicked on item, this could be anythig string number or component or  any other value
  returnValue?: any;
  // to set popOver alignment as left right or center
  preferredAlignment?: PreferredAlignment;
  // Call toggle method on click 
  toggle?(event?: any): void;
  // Call close method on click 
  onClose?(): void;
  // Call toggle method on click 
  onOpen?(): void;
}

export interface State {
  selectedIndex: number;
  active: boolean;
}

export class Dropdown extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // Set initial state
      selectedIndex: 0,
      active: props.active,
    };
  }

  componentWillReceiveProps(newProps: Props) {
    const { active: newActive } = newProps;
    const { active } = this.props;

    if (newActive !== active) {
      this.setState({ active: newActive });
    }
  }

  // Callback function which will be called when dropdown gets closed when clicked outside
  setDropdownState = (dropdownState: boolean) => {
    if (this.props.toggle) {
      this.props.toggle();
    }
  }

  render() {
    const {
      dropdownItems,
      direction,
      disabled,
      anchorEl,
      closeOnClickOutside,
      returnValue,
      preferredAlignment
    } = this.props;

    const {
      active,
      selectedIndex
    } = this.state;
    // Display the drop down items
    const DropdownItemComponents = dropdownItems.map((item, index) =>
      <DropdownItem
        key={index}
        active={selectedIndex === index}
        disabled={item.disabled}
        divider={item.divider}
        header={item.header}
        content={item.content}
        onClick={item.onClick}
        returnValue={returnValue}
      />
    );
    // Use Popover component as wrapper component for drop down items
    return (
      <Popover
        active={active}
        direction={direction}
        disabled={disabled}
        anchorEl={anchorEl}
        closeOnClickOutside={closeOnClickOutside}
        callbackParent={this.setDropdownState}
        preferredAlignment={preferredAlignment}
      >
        {DropdownItemComponents}
      </Popover>
    );
  }
}

export { Dropdown as UnthemedDropdown };
export default themr(DROPDOWN, baseTheme)(Dropdown) as ThemedComponentClass<Props, {}>;
