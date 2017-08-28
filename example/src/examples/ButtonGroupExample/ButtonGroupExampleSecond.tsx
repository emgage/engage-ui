import * as React from 'react';
import { ButtonGroup , Button } from '../../../../src/components/';

import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class ButtonGroupExampleSecond extends React.Component<IProps> {
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
        2. Button group with segmented prop:
            <br/><br/>
            <ButtonGroup segmented>
              <Button>Button 1</Button>
              <Button>Button 2</Button>
            </ButtonGroup>
            <br/>
      </div>
    );
  }
}

export default ButtonGroupExampleSecond;
