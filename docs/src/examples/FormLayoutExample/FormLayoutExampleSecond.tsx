import * as React from 'react';
import { FormLayout , TextField } from '../../../../src/components/';
import Group from '../../../../src/components/FormLayout/Group';

import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  txtValue: string;
  txtValue1: string;
}

class FormLayoutExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      txtValue: '',
      txtValue1: '',
    };
  }
  render() {
    return (
            <div className={styles.example}>
                <h3>
                2. FormLayout with Field Group:
                </h3>
                <br/>
                <FormLayout>
                  <Group>
                    <TextField type="number" label="Minimum order" />
                    <TextField type="number" label="Maximum order" />
                  </Group>
                </FormLayout>
                <br/>
                <h3>
                3.Condensed Field Group:
                </h3>
                <br/>
                <FormLayout>
                  <Group condensed>
                    <TextField label="Length" />
                    <TextField label="Width" />
                    <TextField label="Height" />
                    <TextField label="Unit" />
                  </Group>
                </FormLayout>
            </div>
    );
  }
}

export default FormLayoutExampleSecond;
