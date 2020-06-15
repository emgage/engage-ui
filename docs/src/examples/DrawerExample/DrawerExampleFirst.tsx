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
        <Button
          onClick={() => this.setState({ drawer: true })}
          disabled={false}
          disclosure={false}
          destructive={false}
          external={false}
          fullWidth={false}
          outline={false}
          primary={false}
          submit={false}
          plain={false}
        >
          Drawer open
        </Button>
        <Drawer
          active={ this.state.drawer }
          activeContentId={this.state.activeDrawerId}
          mode="slide"
          componentWidth="large"
          overlay
          closeButton={false}
          fixedCloseButton={false}
          flip={false}
          master={false}
        >
          <DrawerContent
            componentId="content1"
            mode="slide"
            active={false}
            flip={false}
            fixedCloseButton={false}
            closeButton={false}
          >
            <FormLayout>
              <TextField
                label="Full name"
                alphanumeric={false}
                autoComplete={false}
                autoFocus={false}
                autoSuggest={false}
                backdropHidden={false}
                capital={false}
                disabled={false}
                enableTextCounter={false}
                hasValue={false}
                isFocused={false}
                itemSelected={false}
                labelHidden={false}
                loading={false}
                readOnly={false}
                required={false}
                resizable={false}
                showNumberIcon={false}
                spellCheck={false}
              />
              <TextField
                type="email"
                label="Email address"
                alphanumeric={false}
                autoComplete={false}
                autoFocus={false}
                autoSuggest={false}
                backdropHidden={false}
                capital={false}
                disabled={false}
                enableTextCounter={false}
                hasValue={false}
                isFocused={false}
                itemSelected={false}
                labelHidden={false}
                loading={false}
                readOnly={false}
                required={false}
                resizable={false}
                showNumberIcon={false}
                spellCheck={false}
              />

              <ButtonGroup segmented={false}>
                <Button
                  primary
                  onClick={ () => this.setState({ activeDrawerId: 'content2' }) }
                  disabled={false}
                  disclosure={false}
                  destructive={false}
                  external={false}
                  fullWidth={false}
                  outline={false}
                  submit={false}
                  plain={false}
                >
                  Next
                </Button>
                <Button
                  onClick={ () => this.setState({ drawer: false }) }
                  disabled={false}
                  disclosure={false}
                  destructive={false}
                  external={false}
                  fullWidth={false}
                  outline={false}
                  primary={false}
                  submit={false}
                  plain={false}
                >
                  Close
                </Button>
              </ButtonGroup>
            </FormLayout>
          </DrawerContent>

          <DrawerContent
            componentId="content2"
            mode="slide"
            flip
            active={false}
            fixedCloseButton={false}
            closeButton={false}
          >
            <FormLayout>
              <TextField
                label="City"
                alphanumeric={false}
                autoComplete={false}
                autoFocus={false}
                autoSuggest={false}
                backdropHidden={false}
                capital={false}
                disabled={false}
                enableTextCounter={false}
                hasValue={false}
                isFocused={false}
                itemSelected={false}
                labelHidden={false}
                loading={false}
                readOnly={false}
                required={false}
                resizable={false}
                showNumberIcon={false}
                spellCheck={false}
              />
              <TextField
                label="Country"
                alphanumeric={false}
                autoComplete={false}
                autoFocus={false}
                autoSuggest={false}
                backdropHidden={false}
                capital={false}
                disabled={false}
                enableTextCounter={false}
                hasValue={false}
                isFocused={false}
                itemSelected={false}
                labelHidden={false}
                loading={false}
                readOnly={false}
                required={false}
                resizable={false}
                showNumberIcon={false}
                spellCheck={false}
              />

              <ButtonGroup segmented={false}>
                <Button
                  onClick={ () => this.setState({ activeDrawerId: 'content1' }) }
                  disabled={false}
                  disclosure={false}
                  destructive={false}
                  external={false}
                  fullWidth={false}
                  outline={false}
                  primary={false}
                  submit={false}
                  plain={false}
                >
                  Back
                </Button>
                <Button
                  primary
                  disabled={false}
                  disclosure={false}
                  destructive={false}
                  external={false}
                  fullWidth={false}
                  outline={false}
                  submit={false}
                  plain={false}
                >
                  Save
                </Button>
                <Button
                  onClick={ () => this.setState({ drawer: false }) }
                  disabled={false}
                  disclosure={false}
                  destructive={false}
                  external={false}
                  fullWidth={false}
                  outline={false}
                  primary={false}
                  submit={false}
                  plain={false}
                >
                  Close
                </Button>
              </ButtonGroup>
            </FormLayout>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
}

export default DrawerExample;
