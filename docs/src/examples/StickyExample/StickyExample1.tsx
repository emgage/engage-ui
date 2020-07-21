import * as React from 'react';
import { Sticky } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const StickyExample1 = () => (
  <div className={styles.example}>
    <br />
    <br />
    <Sticky position="bottom" footerType="inline">
        Batman is a <br/>
        fictional<br/>
        superhero<br/>
        who appears<br/>
        in American<br/>
        comic books<br/>
        published by<br/>
        DC Comics.<br/>
        The character<br/>
        was created by<br/>
        artist Bob Kane<br/>
        and writer Bill<br/>
        Finger, and first<br/>
        appeared in Detective<br/>
        Comics #27.
    </Sticky>
  </div>
);

export default StickyExample1;
