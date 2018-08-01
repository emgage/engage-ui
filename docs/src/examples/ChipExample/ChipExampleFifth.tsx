import * as React from 'react';
import { Chip } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const imgForChip = {
  url:'http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg',
  alt:'Image',
};

const ChipExample = () => (
  <div className={styles.example}>
    <Chip
      transparent
      clickable
      removable
      onClick={() => { alert('You clicked on Chip'); }}
      onRemove={() => { alert('You clicked on remove button of Chip.'); }}
      image={imgForChip}
    >
      Trevor Hansen
    </Chip>
  </div>
);

export default ChipExample;
