import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import DropdownItem, { Props as DropdownItemProps } from './DropdownItem';
import Popover, { Props as PopoverProps } from '../Popover';
import { DROPDOWN } from '../ThemeIdentifiers';
import * as baseTheme from './Dropdown.scss';

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
  // Call toggle method on click 
  toggle?(): void;
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
      active: false
    };
  }

  render() {
    const {
      dropdownItems,
      active,
      direction,
      disabled,
      anchorEl,
      closeOnClickOutside
    } = this.props;

    const {
      selectedIndex
    } = this.state;

    // Display the drop down items
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
    // Use Popover component as wrapper component for drop down items
    return (
      <Popover active={active} direction={direction} disabled={disabled} anchorEl={anchorEl} closeOnClickOutside={closeOnClickOutside}>
        {DropdownItemComponents}
      </Popover>
    );
  }
}

export { Dropdown as UnthemedDropdown };
export default themr(DROPDOWN, baseTheme)(Dropdown) as ThemedComponentClass<Props, {}>;
