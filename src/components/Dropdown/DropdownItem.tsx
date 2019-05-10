import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import { DROPDOWNITEM } from '../ThemeIdentifiers';
import * as baseTheme from './Dropdown.scss';

export interface Props {
  content?: React.ReactNode;
  // Show or hide the Dropdown.
  active?: boolean;
  // Disable the dropdown
  disabled?: boolean;
  // To differentiate items in dropdown
  divider?: boolean;
  // Header of item to render in dropdown
  header?: boolean;
  // Callback function to be called when dropdown gets clicked
  onClick?(data: any): void;
  closeOnClickOption?: boolean;
  // Return this value in callback function
  returnValue?: any;
  toggleDropdown?(): void;
}

const getUniqueID = createUniqueIDFactory('DropdownItem');

class DropdownItem extends React.Component<Props, never> {
  public id = getUniqueID();

  clickCallback = (event: any) => {
    const { closeOnClickOption, onClick, returnValue, toggleDropdown } = this.props;

    if (onClick) {
      onClick(returnValue ? returnValue : event);
    }

    if (closeOnClickOption && toggleDropdown) {
      toggleDropdown();
    }
  }

  render() {
    const {
      active,
      disabled,
      divider,
      header,
      content,
    } = this.props;

    let className = null;

    if (header) {
      className = baseTheme.dropdownHeader;
      return (
        <div id={this.id} className={className}>{content}</div>
      );
    }
    className = classNames(
      baseTheme.dropdownItem,
      divider && baseTheme.dropdownDivider,
      active && baseTheme.active,
      disabled && baseTheme.disabled
    );

    return (
      <div
        id={this.id}
        className={className}
        onClick={this.clickCallback}
      >
        {content}
      </div>
    );
  }
}

export { DropdownItem as UnthemedSelect };
export default themr(DROPDOWNITEM, baseTheme)(DropdownItem) as ThemedComponentClass<Props, {}>;
