import * as React from 'react';
import { Modal, Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const childBody =
<span>
  <p>
    Test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
    ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    mollit anim id est laborum.Test Lorem ipsum dolor sit amet, consectetur elit,
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
    ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    mollit anim id est laborum.
  </p>
</span>;

const ModalExample = () => (
  <div className={styles.example}>
    <Modal
      activator={<Button>Click Here-2</Button>}
      closeOnBackgroud
      closeOnEsc
      backdropEnabled
      id="222"
      size="Medium"
    >
      Hello, Medium Modal without header and footer...2<br/>
      closeOnBackgroud<br/>
      closeOnEsc<br/>
      backdropEnabled<br/>
      id="222"<br/>
      size="Medium"
      {childBody}
    </Modal>
  </div>
);

export default ModalExample;
