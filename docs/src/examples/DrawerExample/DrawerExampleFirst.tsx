import * as React from 'react';
import { Button, ButtonGroup, Drawer, DrawerContent, FormLayout, TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface Props {}

export interface State {
  drawer: boolean;
  drawerContent: any;
}

class DrawerExample extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      drawer: false,
      drawerContent: {
        content1: true,
        content2: false,
      },
    };
  }

  render() {
    return (
      <div className={styles.example}>
        <Button onClick={() => this.setState({ drawer: true })}>Drawer open</Button>
        <Drawer
          active={ this.state.drawer }
          mode="slide"
          width="large"
          overlay
        >
          <DrawerContent
            active={ this.state.drawerContent.content1 }
            mode="slide">
            <FormLayout>
              <TextField
                label="Full name"
              />
              <TextField
                type="email"
                label="Email address"
              />

              <ButtonGroup>
                <Button primary onClick={ () => this.setState({ drawerContent: { ...this.state.drawerContent, content1: false, content2: true } }) }>Next</Button>
                <Button onClick={ () => this.setState({ drawer: false }) }>Close</Button>
              </ButtonGroup>
            </FormLayout>
          </DrawerContent>

          <DrawerContent
            active={ this.state.drawerContent.content2 }
            mode="slide"
            flip>
            <FormLayout>
              <TextField
                label="City"
              />
              <TextField
                label="Country"
              />

              <ButtonGroup>
                <Button icon="chevronLeft" onClick={ () => this.setState({ drawerContent: { ...this.state.drawerContent, content1: true, content2: false } }) }></Button>
                <Button primary>Save</Button>
                <Button onClick={ () => this.setState({ drawer: false }) }>Close</Button>
              </ButtonGroup>
            </FormLayout>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
}

export default DrawerExample;
