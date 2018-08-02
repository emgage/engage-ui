import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
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
  // Return this value in callback function
  returnValue?: any;
}

const getUniqueID = createUniqueIDFactory('DropdownItem');

class DropdownItem extends React.Component<Props, never> {

  public id = getUniqueID();

  clickCallback = (event: any) => {
    const { onClick, returnValue } = this.props;

    if (onClick) {
      onClick(returnValue ? returnValue : event);
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

    if (divider) {
      className = baseTheme.dropdownDivider;
      return (
        <div id={this.id} className={className}></div>
      );
    // tslint:disable-next-line:no-else-after-return
    } else if (header) {
      className = baseTheme.dropdownHeader;
      return (
        <div id={this.id} className={className}>{content}</div>
      );
    } else {
      className = classNames(
        baseTheme.dropdownItem,
        active && baseTheme.active,
        disabled && baseTheme.disabled
      );
    }

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
