import * as React from 'react';
import { Avatar } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class AvatarExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    return (
      <div className={styles.example}>
        <h3>1. Default avatar:</h3>
        <br/>
        <Avatar
          customer={true}
          name="Farhan"
        />
        <br/>
        <h3>2. Showing avatar with small size and initials:</h3>
        <br/>
        <Avatar
          size="small"
          name="John Doe"
          initials="JD"
          customer={false}
          accessibilityLabel="hello"
        />
        <br/>
        <h3>3. Showing avatar with large size and image:</h3>
        <br/>
        <Avatar
          size="large"
          name="Jhon Doe"
          initials="JD"
          customer
          source="http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg"
          accessibilityLabel="hello"
        />
      </div>
    );
  }
}

export default AvatarExample;
