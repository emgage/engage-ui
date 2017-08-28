import * as React from 'react';
import { FormLayout , TextField } from '../../../../src/components/';

import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  txtValue: string;
  txtValue1: string;
}

class FormLayoutExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      txtValue: '',
      txtValue1: '',
    };
  }

  valueUpdater(fieldname: any) {
    return (value: any) => this.setState({ [fieldname]: value });
  }

  render() {
    return (
            <div className={styles.example}>
                <h3>
                1. Default FormLayout:
                </h3>
                <br/>
                <FormLayout>
                  <TextField
                    label="Store name"
                    value={this.state.txtValue}
                    onChange={this.valueUpdater('txtValue')}
                  />
                  <TextField
                    type="email"
                    label="Account email"
                    value={this.state.txtValue1}
                    onChange={this.valueUpdater('txtValue1')}
                  />
                </FormLayout>
            </div>
    );
  }
}

export default FormLayoutExampleFirst;
