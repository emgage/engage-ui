import * as React from 'react';
import { Popover, Button, List } from '../../../../src/components/';
import Item from '../../../../src/components/List/Item';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  active: boolean;
}

class PopoverExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: false,
    };
    this.valueUpdater = this.valueUpdater.bind(this);
  }

  valueUpdater(activeState: any) {
    this.setState({ active: (!activeState) });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>1.Popover with ActionList:</h3>
        <Popover
          active={this.state.active} preventAutofocus activatorWrapper="Test"
          activator={<Button onClick={() => this.valueUpdater(this.state.active)}>More actions</Button>}>
          <List>
            <Item>Import</Item>
            <Item>Export </Item>
          </List>
        </Popover>
      </div>
    );
  }
}

export default PopoverExampleFirst;
