import * as React from 'react';
import { Dropdown, Select, TextField, FormLayout } from '../../../../src/components/';
import Group from '../../../../src/components/FormLayout/Group';
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
        <Dropdown
            active={this.state.active}
            sectioned
            preferredPosition="above"
            onClose={() => { alert('Popover is Closed'); this.setState({ active: false }); }
        }>
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
        </Dropdown>
      </div>
    );
  }
}

export default DropdownExampleSecond;
