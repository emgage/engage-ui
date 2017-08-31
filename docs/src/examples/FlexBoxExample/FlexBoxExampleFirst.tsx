import * as React from 'react';
import { FlexBox } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';
import { FlexAlign, FlexDirection, FlexJustify } from '../../../../src/components/FlexBox/FlexProps';

export interface IProps{
}

export interface IState {
}

class FlexBoxExampleFirst extends React.Component<IProps> {
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
                1. Basic FlexBox:
                <FlexBox direction={FlexDirection.Column} align={FlexAlign.Stretch} justify={FlexJustify.Center}>
                        <div>Demo 1</div>
                        <div>Demo 2</div>
                        <div>Demo 3</div>
                </FlexBox>
                <br/>
                2. Inline FlexBox:
                    <FlexBox inline={true} direction={FlexDirection.Column} align={FlexAlign.Stretch} justify={FlexJustify.Center}>
                        <div>Demo 1</div>
                        <div>Demo 2</div>
                        <div>Demo 3</div>
                    </FlexBox>
                </div>
    );
  }
}
export default FlexBoxExampleFirst;
