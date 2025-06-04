import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';
import TextField from '../../../../src/components/TextField/index';

class ModalExample extends React.Component {
  state = {
    modalOpen: false,
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  onModalOpen = () => {
    console.log('Modal open');
  }

  onModalClose = () => {
    console.log('Modal close');
  }

  render() {
    return (
      <div className={styles.example}>
        <Button onClick={this.toggleModal}>Permanently Delete Program</Button>
        <Modal
          active={this.state.modalOpen}
          toggle={this.toggleModal}
          onOpen={this.onModalOpen}
          onClose={this.onModalClose}
          componentWidth="medium"
          closeOnBackgroud
          closeOnEsc
          closeButton>
          <ModalHeader>Permanently Delete Program</ModalHeader>
          <ModalBody modalOverflow>
            <div style={{textAlign:'center'}}>
              By deleting the Program Name program you will permanently lose all information for this program, including their data
            <br />
            Type DELETE to confirm
            <TextField type="text" name="test" />
            </div>
          </ModalBody>
          <ModalFooter >
            <ButtonGroup componentStyle={{ justifyContent: "flex-end" }}>

              <Button onClick={this.toggleModal}>Close</Button>
              <Button primary onClick={this.toggleModal}>Confirm</Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
