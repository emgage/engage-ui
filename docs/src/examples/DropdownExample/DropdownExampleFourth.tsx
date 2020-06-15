import * as React from 'react';
import { Dropdown, DropdownItemProps, Button } from '../../../../src/components';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  active: boolean;
  anchorEl?: HTMLElement;
}

class DropdownExampleFourth extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  private toggle(e : React.FormEvent<HTMLElement>) {
    this.setState({
      active: !this.state.active,
      anchorEl: e.target as HTMLElement
    });
  }

  render() {
    const items : DropdownItemProps[] = [
      {
        content: 'Item 1',
        disabled: true,
        active: false,
        divider: false,
        header: false,
        closeOnClickOption: false,
      }, {
        content: 'Item 2',
        divider: true,
        disabled: true,
        active: false,
        header: false,
        closeOnClickOption: false,
      }, {
        content: 'Item 3',
        disabled: true,
        active: false,
        divider: false,
        header: false,
        closeOnClickOption: false,
      }, {
        content: 'Item 4',
        header: true,
        disabled: true,
        active: false,
        divider: false,
        closeOnClickOption: false,
      }
    ];

    return (
      <div className={styles.example}>
        <Button
          onClick={e => this.toggle(e)}
          disabled={false}
          disclosure={false}
          destructive={false}
          external={false}
          fullWidth={false}
          outline={false}
          submit={false}
          plain={false}
          primary={false}
        >
          Dropdown4
        </Button>
        <Dropdown
          dropdownItems={items}
          anchorEl={this.state.anchorEl}
          preferredPosition="right"
          disabled={false}
          closeOnClickOption={false}
        />
      </div>
    );
  }
}

export default DropdownExampleFourth;
