import * as React from 'react';
import { themr } from '@friendsofreactjs/react-css-themr';
import Dropdown, { DropdownItemProps } from '../Dropdown';
import { Props as ChipStates } from '../Chip';
import { CLICKABLECHIP } from '../ThemeIdentifiers';
import * as baseTheme from './ClickableChip.scss';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

export interface State {
  active: boolean;
  anchorEl?: HTMLElement | null;
}

export interface Props {
  // Chip component is used as property.
  chip: React.ReactElement<ChipStates>;
  // To display the styling.
  componentStyle?: React.CSSProperties;
  // Theme to be injected via css-themr
  theme?: any;
  // Function used for clicking the chip.
  onClick?(): void;
}

const getUniqueID = createUniqueIDFactory('DropdownItem');

class ClickableChip extends React.PureComponent<Props, State> {
  public id = getUniqueID();

  constructor(props: Props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  onClose = () => { };

  render() {
    const chip = this.props.chip;

    const Items: DropdownItemProps[] = [{
      content: this.props.children
    }];

    return (
      <div>
        <div onClick={this.handleClick} id={this.id}>
          {chip}
        </div>
        <Dropdown anchorEl={this.state.anchorEl} active={this.state.active} onClose={this.onClose} toggle={this.handleClick} dropdownItems={Items} ></Dropdown>
      </div>
    );
  }

  private handleClick = () => {
    this.setState({
      active: !this.state.active,
      anchorEl: document.getElementById(this.id)
    });
  }
}

export default themr(CLICKABLECHIP, baseTheme)(ClickableChip);
