import React from 'react';
import { Modal, ModalContent, ModalHeader } from '../../base/modal';
import { Button } from '../../base/buttons';

export class AddMVTPopup extends React.Component {
    modal_ref = React.createRef();

    constructor(props) {
        super(props);
        this.state = {};
    }

    show() {
        this.modal_ref.current.show();
    }

    dismiss() {
        this.modal_ref.current.dismiss();
    }

    showLoader() {
        this.modal_ref.current.showLoader();
    }

    dismissLoader() {
        this.modal_ref.current.dismissLoader();
    }

    save() {
        this.showLoader();
        setTimeout(() => {
            this.dismissLoader();
            this.dismiss();
        }, 1000);
    }

    render() {
        return (
            <Modal cancelable={false} ref={this.modal_ref}>
                <ModalHeader title={"Ajout d'un nouveau mouvement de dotation"} />
                <ModalContent>
                    <h3>Petit contenu pour la modal.</h3>
                    <Button color="primary" onClick={() => this.save()}>
                        ShowLoader
                    </Button>
                </ModalContent>
            </Modal>
        );
    }
}
