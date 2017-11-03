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
      activator={<Button>Click Here-3</Button>}
      header="This is my header-3"
      close
      modalOverflow
      backdropEnabled
      footer="This is modal footer"
      id="333"
      size="Small"
    >
      Small modal which close using only close property<br/>
      header="This is modal header"<br/>
      close<br/>
      modalOverflow<br/>
      backdropEnabled<br/>
      footer="This is modal footer"<br/>
      id="333"<br/>
      size="Small"
      {childBody}
    </Modal>
  </div>
);

export default ModalExample;
