import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import Dropdown, { DropdownItemProps } from '../Dropdown/Dropdown';
import { Props as ChipStates } from '../Chip';
import { CLICKABLECHIP } from '../ThemeIdentifiers';
import * as baseTheme from './ClickableChip.scss';

export interface State {
  active: boolean;
}
export interface Props {
  chip: React.ReactElement<ChipStates>;
  style?: React.CSSProperties;
  theme?: any;
  onClick?(): void;
}

class ClickableChip extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      active: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  onClose = () => { };

  render() {
    const chip = this.props.chip.props.children;

    let Items: DropdownItemProps[] = [{
      children: this.props.children
    }]

    return (
      <Dropdown active={this.state.active} onClose={this.onClose} toggle={this.handleClick} DropdownItems={Items} >
        {chip}
      </Dropdown>
    );
  }

  private handleClick = () => {
    this.setState({ ['active']: !this.state.active });
  }
}

export default themr(CLICKABLECHIP, baseTheme)(ClickableChip) as ThemedComponentClass<Props, State>;
