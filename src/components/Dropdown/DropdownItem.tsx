import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import { DROPDOWNITEM } from '../ThemeIdentifiers';
import * as baseTheme from './Dropdown.scss';

export interface Props {
  children?: React.ReactNode;
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
      children,
      onClick
    } = this.props;

    let className = null;
    
    if (divider) {
      className = baseTheme.dropdownDivider;
    } else if(header) {
      className = baseTheme.dropdownDivider;
    } else {
      className = classNames(
        divider && baseTheme.dropdownDivider,
        baseTheme.dropdownItem,
        active && baseTheme.active,
        disabled && baseTheme.disabled
      );
    }

    return (
      <a id={this.id} className={className} onClick={onClick}>{children}</a>
    );
  }
}

export { DropdownItem as UnthemedSelect };
export { Props as DropdownItemProps };
export default themr(DROPDOWNITEM, baseTheme)(DropdownItem) as ThemedComponentClass<Props, {}>;