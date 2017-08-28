import * as React from 'react';
import { ButtonGroup , Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class ButtonGroupExampleFirst extends React.Component<IProps> {
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
                1. Default button group:
                <br/><br/>
                <ButtonGroup>
                  <Button>Button 1</Button>
                  <Button>Button 2</Button>
                </ButtonGroup>
                <br/>
              </div>
    );
  }
}

export default ButtonGroupExampleFirst;
