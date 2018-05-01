import * as React from 'react';
import { Dropdown, DropdownItemProps } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  active: boolean;
}

class DropdownExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  private toggle() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    const items : DropdownItemProps[] = [
      {
        children: "Item 1",
        header: false,
        divider: false,
        disabled: false
      }, {
        children: "Item 2",
        divider: true,
        header: false,
        disabled: true
      }, {
        children: "Item 3",
        disabled: false,
        header: false,
        divider: false
      }, {
        children: "Item 4",
        header: true,
        divider: false,
        disabled: false
      }
    ]

    return (
      <div className={styles.example}>
         <Dropdown
          active={this.state.active}
          DropdownItems={items}
          toggle={this.toggle}
          direction="up"
        >
          Actions
        </Dropdown>
      </div>
    );
  }
}

export default DropdownExampleSecond;
