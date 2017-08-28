import * as React from 'react';
import { List, Item } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class ListExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
    };
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>1. List display with bullet:</h3>
        <br/>
          <List type="bullet">
            <Item>Yellow shirt</Item>
            <Item>Red shirt</Item>
            <Item>Green shirt</Item>
          </List>
        <br/>
        <h3>2. List display with number:</h3>
        <br/>
          <List type="number">
            <Item>Yellow shirt</Item>
            <Item>Red shirt</Item>
            <Item>Green shirt</Item>
          </List>
      </div>
    );
  }
}

export default ListExample;
