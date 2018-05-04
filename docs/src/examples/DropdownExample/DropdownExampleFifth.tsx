import * as React from 'react';
import { Dropdown, DropdownItemProps, Button } from '../../../../src/components';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  active: boolean;
}

class DropdownExampleFifth extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: true,
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
        content: 'Item 1',
      }, {
        content: 'Item 2',
        divider: true,
      }, {
        content: 'Item 3',
      }, {
        content: 'Item 4',
        header: true,
      },
    ];

    return (
      <div className={styles.example}>
         <Dropdown
          active={this.state.active}
          dropdownItems={items}
          toggle={this.toggle}
          direction="down"
          disabled
          trigger={<Button>Dropdown5</Button>}
        />
      </div>
    );
  }
}

export default DropdownExampleFifth;
