import * as React from 'react';
import { Labelled  } from '../../../../src/components/';
import { Action } from '../../../../src/types';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}
const action: Action = {
  content: 'Click Here',
  onAction: () => { alert('Clicked'); },
};

class LabelledExampleFirst extends React.Component<IProps> {
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
            1. Basic Labelled:
            <Labelled id="Id" label="Click Here" action ={action} >
            </Labelled>
        </div>
    );
  }
}

export default LabelledExampleFirst;
