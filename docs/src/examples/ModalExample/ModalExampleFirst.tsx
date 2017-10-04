import * as React from 'react';
import * as velocity from 'velocity-animate';
import { Modal, Button } from '../../../../src/components/';
import { ITrigger, IAnimate } from '../../../../src/components/Modal/Modal';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  showModalState: boolean;
}

class ModalExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showModalState: false,
    };
  }

  animate: IAnimate = {
    in: (modal, dialog) => this.animateIn(modal, dialog),
    out: (modal, dialog) => this.animateOut(modal, dialog),
  };

  trigger: ITrigger = {
    body: 'Open',
    animate: this.animate,
  };

  animateIn(modal?: Element, dialog?: Element): void {
    this.setState({ showModalState: true });
    velocity(modal, { opacity: 1 }, { display: 'block' }, 300);
    velocity(dialog, { translateY: 1, opacity: 1 }, { display: 'block' }, 200);
  }

  animateOut(modal?: Element, dialog?: Element): void {
    this.setState({ showModalState: false });
    velocity(modal, { opacity: 0 }, { display: 'none' }, 300);
    velocity(dialog, { translateY: -100, opacity: 0 }, { display: 'none' }, 200);
  }

  render() {

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

    return (
      <div className={styles.example}>
        <h3>1. Large modal with all property:</h3>
        <br/>
          <Modal
            activator={<Button>Click Here-1</Button>}
            header="This is modal header-1"
            close
            closeOnBackgroud
            closeOnEsc
            modalOverflow
            backdropEnabled
            footer={<Button> OK </Button>}
            id="111"
            size="Large"
            show={this.state.showModalState}
            trigger={this.trigger}
          >
            header="This is modal header"<br/>
            close<br/>
            closeOnBackgroud<br/>
            closeOnEsc<br/>
            modalOverflow<br/>
            backdropEnabled<br/>
            id="111"<br/>
            size="Large"<br/>
            {childBody}
          </Modal>
        <br/>
        <h3>2. Small modal without header and footer</h3>
        <br/>
          <Modal
            activator={<Button>Click Here-2</Button>}
            closeOnBackgroud
            closeOnEsc
            backdropEnabled
            id="222"
            size="Small"
            show={this.state.showModalState}
            trigger={this.trigger}
          >
            Hello, Small Modal without header and footer...2<br/>
            closeOnBackgroud<br/>
            closeOnEsc<br/>
            backdropEnabled<br/>
            id="222"<br/>
            size="Small"
          </Modal>
        <h3>3. Medium modal which close using only close property:</h3>
        <br/>
          <Modal
            activator={<Button>Click Here-3</Button>}
            header="This is my header-3"
            close
            modalOverflow
            backdropEnabled
            footer="This is modal footer"
            id="333"
            size="Medium"
            show={this.state.showModalState}
            trigger={this.trigger}
            >
              Medium modal which close using only close property<br/>
              header="This is modal header"<br/>
              close<br/>
              modalOverflow<br/>
              backdropEnabled<br/>
              footer="This is modal footer"<br/>
              id="333"<br/>
              size="Medium"
          </Modal>
      </div>
    );
  }
}

export default ModalExample;
