import * as React from 'react';
import { Image } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ImageExampleFirst = () => (
  <div className={styles.example}>
    <Image
      source={'https://www.w3schools.com/css/trolltunga.jpg'}
      alt={'No Image.. Thanks!!'}
    />
</div>
);

export default ImageExampleFirst;
