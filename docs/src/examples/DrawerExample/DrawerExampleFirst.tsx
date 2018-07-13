import * as React from 'react';
import { Button, ButtonGroup, Drawer, DrawerContent, FormLayout, TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface Props {}

export interface State {
  drawer: boolean;
  activeDrawerId: string;
}

class DrawerExample extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      drawer: false,
      activeDrawerId: 'content1',
    };
  }

  render() {
    return (
      <div className={styles.example}>
        <Button onClick={() => this.setState({ drawer: true })}>Drawer open</Button>
        <Drawer
          active={ this.state.drawer }
          activeContentId={this.state.activeDrawerId}
          mode="slide"
          componentWidth="large"
          overlay
        >
          <DrawerContent
            componentId="content1"
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
                <Button primary onClick={ () => this.setState({ activeDrawerId: 'content2' }) }>Next</Button>
                <Button onClick={ () => this.setState({ drawer: false }) }>Close</Button>
              </ButtonGroup>
            </FormLayout>
          </DrawerContent>

          <DrawerContent
            componentId="content2"
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
                <Button onClick={ () => this.setState({ activeDrawerId: 'content1' }) }>Back</Button>
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
