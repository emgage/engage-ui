import * as React from 'react';
import { Connected, TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class ConnectedExample extends React.Component<IProps, IState> {
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
        <h3>1. Component align to left</h3>
        <br/>
        <Connected
          left = {
            <TextField label="TextField Left" value="Some value" />
          }>
        </Connected>
        <br/>
        <h3>2. Component align to right</h3>
        <br/>
        <Connected
          right = {
            <TextField label="TextField Right" value="Some value" />
          }>
        </Connected>
        <br/>
        <h3>3. Component align to left and right together</h3>
        <br/>
        <Connected
          left= {
            <TextField label="TextField Left" value="Some value" />
          }
          right= {
            <TextField label="TextField Right" value="Some value" />
          }>
        </Connected>
      </div>
    );
  }
}

export default ConnectedExample;
