import * as React from 'react';
import { DisplayText } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class DisplayTextExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>4. DisplayText with small size:</h3>
        <br/>
        <DisplayText
          size="small"
        >
          Small DisplayText
        </DisplayText>
        <br/>
        <h3>5. DisplayText with medium size:</h3>
        <br/>
        <DisplayText
          size="medium"
        >
          Medium DisplayText
        </DisplayText>
        <br/>
        <h3>6. DisplayText with large size:</h3>
        <br/>
        <DisplayText
          size="large"
        >
          Large DisplayText
        </DisplayText>
        <br/>
        <h3>7. DisplayText with extraLarge size:</h3>
        <br/>
        <DisplayText
          size="extraLarge"
        >
          ExtraLarge DisplayText
        </DisplayText>
      </div>
    );
  }
}

export default DisplayTextExample;
