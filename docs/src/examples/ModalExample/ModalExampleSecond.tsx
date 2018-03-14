import * as React from 'react';
import { Modal } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';


const ModalExample = () => (
  <div className={styles.example}>
    {/* <Modal
      activator={<Button>Click Here</Button>}
      closeOnBackgroud
      closeOnEsc
      overlay
      id="222"
      width="medium"
    >
      {childBody}
    </Modal> */}

    <Modal></Modal>
  </div>
);

export default ModalExample;
