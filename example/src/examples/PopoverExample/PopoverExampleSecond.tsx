import * as React from 'react';
import { Popover,Button,List,Item,Select,TextField,FormLayout } from '../../../../src/components/';
import Group from '../../../../src/components/FormLayout/Group';
import Pane from '../../../../src/components/Popover/Pane';
import Section from '../../../../src/components/Popover/Section';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  activeState1: boolean;
  activeState2: boolean;
}

class PopoverExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      activeState1: false,
      activeState2: false,
    };
  }

  valueUpdater1(activeState: any) {
    this.setState({ activeState1: (!activeState) });
  }
  valueUpdater2(activeState: any) {
    this.setState({ activeState2: (!activeState) });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>2.Popover with Content and Actions:</h3>
        <Popover active={this.state.activeState1} activator=
          {
          <Button onClick={() => this.valueUpdater1(this.state.activeState1)}>Sales channels</Button>
          }>
          <Pane fixed>
            <Section>
              <p>Available sales channels</p>
            </Section>
          </Pane>
          <Pane>
            <List>
              <Item>Online store</Item>
              <Item>Facebook</Item>
              <Item>Shopify POS</Item>
            </List>
          </Pane>
        </Popover>

        <h3>3.Popover with Form Components:</h3>
        <h3>While Popover is Open and Clicking anywhere on Screen or pressing Esc
          from keyboard it open pop-up using onClose function.</h3>
        <Popover
          active={this.state.activeState2}
          activator={
              <Button onClick={ () => {this.valueUpdater2(this.state.activeState2);}}>
                  April 20–21, 2017
              </Button>}
          sectioned
          preferredPosition="above"
          onClose={() => {alert('Popover is Closed');this.valueUpdater2(this.state.activeState2);}}>
          <FormLayout>
            <Select
              label="Date range"
              options={['Custom']}
            />
            <Group condensed>
              <TextField
                label="Starting"
                value="2017-04-20"
              />
              <TextField
                label="Ending"
                value="2017-04-21"
              />
            </Group>
          </FormLayout>
        </Popover>
      </div>
    );
  }
}

export default PopoverExampleSecond;
