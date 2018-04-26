import * as React from 'react';
// import { Dropdown,List,Item } from '../../../../src/components/';
// import Pane from '../../../../src/components/Dropdown/Pane';
// import Section from '../../../../src/components/Dropdown/Section';
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
  }
  render() {
    return (
      <div className={styles.example}>
        {/* <Dropdown
          active={this.state.active}
          >
          <Pane fixed>
            <Section>
              <p>Available sales channels</p>
            </Section>
          </Pane>
          <Pane>
            <List type="striped">
              <Item>Online store</Item>
              <Item>Facebook</Item>
              <Item>Shopify POS</Item>
            </List>
          </Pane>
        </Dropdown> */}
      </div>
    );
  }
}

export default DropdownExampleSecond;
