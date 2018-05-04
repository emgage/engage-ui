import * as React from 'react';
import { Dropdown, DropdownItemProps, Button } from '../../../../src/components';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  activated: boolean;
}

class DropdownExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activated: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  
  private toggle() {
    this.setState({
      activated: !this.state.activated
    });
  }

  render() {
    const items : DropdownItemProps[] = [
      {
        content: "Item 1",
        disabled: true,
      }, {
        content: "Item 2",
        divider: true,
        disabled: true,
      }, {
        content: "Item 3",
      }, {
        content: "Item 4",
        header: true,
      },
    ]

    return (
      <div className={styles.example}>
         <Dropdown
          active={this.state.activated}
          dropdownItems={items}
          toggle={this.toggle}
          trigger={<Button>Dropdown1</Button>}
        />
      </div>
    );
  }
}

export default DropdownExampleFirst;
