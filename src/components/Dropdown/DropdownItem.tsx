import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import { DROPDOWNITEM } from '../ThemeIdentifiers';
import * as baseTheme from './Dropdown.scss';

export interface Props {
  content?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  divider?: boolean;
  header?: boolean;
  onClick?(): void;
}

const getUniqueID = createUniqueIDFactory('DropdownItem');

class DropdownItem extends React.Component<Props, never> {

  public id = getUniqueID();

  render() {
    const {
      active,
      disabled,
      divider,
      header,
      content,
      onClick
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
        tabIndex={active ? 0 : -1}
        id={this.id}
        className={className}
        onClick={onClick}
      >
        {content}
      </div>
    );
  }
}

export { DropdownItem as UnthemedSelect };
export default themr(DROPDOWNITEM, baseTheme)(DropdownItem) as ThemedComponentClass<Props, {}>;
