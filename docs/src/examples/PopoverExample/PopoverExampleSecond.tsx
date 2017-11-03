import * as React from 'react';
import { Popover,Button,List,Item } from '../../../../src/components/';
import Pane from '../../../../src/components/Popover/Pane';
import Section from '../../../../src/components/Popover/Section';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  active: boolean;
}

class PopoverExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: false,
    };
  }
  render() {
    return (
      <div className={styles.example}>
        <Popover
          active={this.state.active}
          activator={
            <Button onClick={() => this.setState({ active: (!this.state.active) })}>
              Sales channels
            </Button>
          }>
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
        </Popover>
      </div>
    );
  }
}

export default PopoverExampleSecond;
