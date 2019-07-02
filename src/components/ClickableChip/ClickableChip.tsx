import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import Dropdown, { DropdownItemProps } from '../Dropdown';
import { Props as ChipStates } from '../Chip';
import { CLICKABLECHIP } from '../ThemeIdentifiers';
import * as baseTheme from './ClickableChip.scss';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

export interface State {
  active: boolean;
  anchorEl?: HTMLElement;
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
    const { chip, theme } = this.props;

    const Items: DropdownItemProps[] = [{
      content: this.props.children
    }];

    return (
      <div>
        <div onClick={this.handleClick} id={this.id}>
          {chip}
        </div>
        <Dropdown anchorEl={this.state.anchorEl} onClose={this.onClose} toggle={this.handleClick} dropdownItems={Items} theme={theme}></Dropdown>
      </div>
    );
  }

  private handleClick = () => {
    const thisEle = document.getElementById(this.id);

    this.setState({ active: !this.state.active });

    if (thisEle) {
      this.setState({ anchorEl: thisEle });
    }
  }
}

export default themr(CLICKABLECHIP, baseTheme)(ClickableChip) as ThemedComponentClass<Props, State>;
