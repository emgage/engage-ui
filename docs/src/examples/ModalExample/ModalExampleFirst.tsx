import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';


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
        <Button onClick={this.toggleModal}>Medium button</Button>
          <Modal
            active={this.state.modalOpen}
            toggle={this.toggleModal}
            onOpen={this.onModalOpen}
            onClose={this.onModalClose}
            customWidth="medium"
            closeOnBackgroud
            closeOnEsc
            closeButton>
            <ModalHeader>Modal title</ModalHeader>
            <ModalBody modalOverflow>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae ex pellentesque, pretium lorem vel, tempor ipsum. Phasellus suscipit lacus in velit malesuada, at bibendum mi gravida. Sed cursus nisi sem, non pellentesque ligula euismod eget. Sed quis fringilla nibh, at vestibulum turpis. Donec sed sagittis sapien. Nam quis ex quis nulla porta molestie. Vestibulum eu lorem porta, facilisis orci a, tempor quam. Suspendisse et sollicitudin nulla. Aenean consectetur imperdiet leo nec condimentum. Aliquam scelerisque magna ut tortor accumsan condimentum.

              Nulla quis ante sit amet leo lobortis rhoncus. Cras mollis quis leo nec tincidunt. Aliquam blandit est vitae leo ultrices, ut egestas sapien pharetra. Suspendisse nec aliquet orci. Suspendisse rutrum odio sed neque scelerisque, ut consectetur erat tincidunt. Duis ultrices metus eget ante posuere eleifend. Ut luctus felis neque, sit amet efficitur neque maximus id. Aliquam porta, tellus ut pellentesque facilisis, odio neque maximus erat, venenatis semper nisi metus id augue. Cras vel sem eu elit blandit laoreet id vitae tortor. Morbi sit amet mi rutrum, sagittis enim lacinia, dictum turpis.
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.toggleModal}>Close</Button>
            </ModalFooter>
          </Modal>
      </div>
    );
  }
}

export default ModalExample;
