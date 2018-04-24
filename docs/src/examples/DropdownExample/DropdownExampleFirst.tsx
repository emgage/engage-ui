import * as React from 'react';
import { Dropdown, List } from '../../../../src/components/';
import Item from '../../../../src/components/List/Item';
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
}
  render() {
    return (
      <div className={styles.example}>
        <Dropdown
          active={this.state.activated}
          preventAutofocus
          activatorWrapper="Test"
        >
          <List type="striped">
            <Item>Import</Item>
            <Item>Export </Item>
          </List>
        </Dropdown>
      </div>
    );
  }
}

export default DropdownExampleFirst;
