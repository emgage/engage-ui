import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import DropdownItem, { Props as DropdownItemProps } from './DropdownItem';
import Popover from '../Popover';
import { PreferredPosition } from '../PositionedOverlay';

import { DROPDOWN } from '../ThemeIdentifiers';
import * as baseTheme from './Dropdown.scss';
import { PreferredAlignment } from '../PositionedOverlay/math';

// All prototypes type
export interface Props {
  // Set disabled
  disabled?: boolean;
  // Set direction to be applied. Available options: up | down | left | right.
  preferredPosition?: PreferredPosition;
  // Set anchor element 
  anchorEl?: any;
  // Set to true if you want to close dropdown when click anywhere in body
  closeOnClickOutside?: any;
  // Prop to close the dropdown when click on its option
  closeOnClickOption?: boolean;
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
  // Unique ID
  componentId?: string;
  theme?: any;
}

export interface State {
  selectedIndex: number;
  active: boolean;
  manualInActive: boolean;
}

export class Dropdown extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // Set initial state
      selectedIndex: 0,
      active: false,
      manualInActive: false
    };
  }

  // Callback function which will be called when dropdown gets closed when clicked outside
  setDropdownState = () => {
    if (this.props.toggle) {
      this.props.toggle();
    }
  }

  // Function to toggle dropdown from component itself
  innerToggleDropdown = () => {
    this.setState({ active: false, manualInActive: true });
  }

  // Callback function
  render() {
    const {
      dropdownItems,
      preferredPosition,
      preferredAlignment,
      anchorEl,
      closeOnClickOption = true,
      returnValue,
      componentId = '',
      theme,
    } = this.props;

    // Display the drop down items
    const DropdownItemComponents = dropdownItems.map((item, index) =>
      <DropdownItem
        key={index}
        componentId={item.componentId}
        disabled={item.disabled}
        divider={item.divider}
        header={item.header}
        content={item.content}
        onClick={item.onClick}
        closeOnClickOption={closeOnClickOption}
        returnValue={returnValue}
        toggleDropdown={this.innerToggleDropdown}
        theme={theme}
      />
    );

    // Use Popover component as wrapper component for drop down items
    return (
      <Popover
        manualInActive={this.state.manualInActive}
        preferredPosition={preferredPosition}
        anchorEl={anchorEl}
        closeOnClickInside={false}
        onClose={() => this.setState({ manualInActive: false })}
        theme={theme}
        preferredAlignment={preferredAlignment}
        componentId={componentId}
      >
        {DropdownItemComponents}
      </Popover>
    );
  }
}

export { Dropdown as UnthemedDropdown };
export default themr(DROPDOWN, baseTheme)(Dropdown) as ThemedComponentClass<Props, {}>;
