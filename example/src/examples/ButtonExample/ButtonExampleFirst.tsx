import * as React from 'react';
import { Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class ButtonExampleFirst extends React.Component<IProps> {
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
              1. Basic Button:
              <br/>
              <Button>Basic Button</Button>
              <br/><br/>
              2. Outline Button:
              <br/>
              <Button outline>Outline Button</Button>
              <br/><br/>
              3.Plain Button with url and external prop:
              <br/>
              <Button plain url = "http://www.lipsum.com/" external>Plain Button</Button>
              <br/><br/>
              4. Primary Button:
              <br/>
              <Button primary>Primary Button</Button>
              <br/><br/>
              5. Destructive Button with accessibilityLabel prop:
              <br/>
              <Button destructive accessibilityLabel="No Label">Destructive Button</Button>
              <br/><br/>
              6. Slim Button:
              <br/>
              <Button size="slim">Slim Button</Button>
              <br/><br/>
              7. Large Button with disclosure prop:
              <br/>
              <Button size="large" disclosure={true}>Large Button</Button>
              <br/><br/>
              8. FullWidth Button:
              <br/>
              <Button fullWidth>FullWidth Button</Button>
              <br/><br/>
              9. Disabled Button:
              <br/>
              <Button disabled>Disabled Button</Button>
              <br/><br/>
              10. Button with Submit prop :
              <br/>
              <Button submit={true}>Submit Button</Button>
              <br/><br/>
              11. Button with icon prop :
              <br/>
              <Button icon="calendar"></Button>
              <br/><br/>
            </div>
    );
  }
}

export default ButtonExampleFirst;
