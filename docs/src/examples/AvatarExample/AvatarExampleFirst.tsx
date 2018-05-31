import * as React from 'react';
import { Avatar } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const AvatarExample = () => (
  <div className={styles.example}>
    <Avatar
      customSize="medium"
    />
  </div>
);

export default AvatarExample;
