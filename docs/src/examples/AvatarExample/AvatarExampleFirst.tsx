import * as React from 'react';
import { Avatar } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const AvatarExample = () => (
  <div className={styles.example}>
    <Avatar
      componentSize="medium"
      customer={false}
    />
  </div>
);

export default AvatarExample;
