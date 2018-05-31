import * as React from 'react';
import { Avatar } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const AvatarExample = () => (
  <div className={styles.example}>
    <Avatar
      customSize="large"
      customName="Jhon Doe"
      initials="JD"
      customer
      source="http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg"
      accessibilityLabel="hello"
    />
  </div>
);

export default AvatarExample;
