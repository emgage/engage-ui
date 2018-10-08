import * as React from 'react';
import { Button, ButtonGroup, Slider, SliderContent, FormLayout, TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface Props {}

export interface State {
  slider: boolean;
  activeSliderId: string;
}

class SliderExample extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      slider: false,
      activeSliderId: 'content1',
    };
  }

  render() {
    return (
      <div className={styles.example}>
        <Button onClick={() => this.setState({ slider: true })}>Slider open</Button>
        <Slider
          active={ this.state.slider }
          activeContentId={this.state.activeSliderId}
          componentWidth="large"
          overlay
        >
          <SliderContent
            componentId="content1"
          >
            <FormLayout>
              <TextField
                label="Full name"
              />
              <TextField
                type="email"
                label="Email address"
              />

              <ButtonGroup>
                <Button primary onClick={ () => this.setState({ activeSliderId: 'content2' }) }>Next</Button>
                <Button onClick={ () => this.setState({ slider: false }) }>Close</Button>
              </ButtonGroup>
            </FormLayout>
          </SliderContent>

          <SliderContent
            componentId="content2"
            flip>
            <FormLayout>
              <TextField
                label="City"
              />
              <TextField
                label="Country"
              />

              <ButtonGroup>
                <Button onClick={ () => this.setState({ activeSliderId: 'content1' }) }>Back</Button>
                <Button primary>Save</Button>
                <Button onClick={ () => this.setState({ slider: false }) }>Close</Button>
              </ButtonGroup>
            </FormLayout>
          </SliderContent>
        </Slider>
      </div>
    );
  }
}

export default SliderExample;
