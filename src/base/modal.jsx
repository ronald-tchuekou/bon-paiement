import React from 'react';
import PropTypes from 'prop-types';
import { AddLoader, OnOutsideClickListener } from '../scripts/app';

/**
 * Pour gére les composants principaux des modales.
 */
export class Modal extends React.Component {
    content_ref = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            loader: undefined,
        };
        this.showLoader = this.showLoader.bind(this);
        this.dismissLoader = this.dismissLoader.bind(this);
        this.show = this.show.bind(this);
        this.dismiss = this.dismiss.bind(this);
    }

    componentDidMount() {
        this.setState({ loader: AddLoader(this.content_ref.current) });
        if (this.props.cancelable) {
            OnOutsideClickListener(this.content_ref.current, () => this.dismiss());
        }
    }

    /**
     * Fonction qui permet d'afficher le loader dans la popup.
     */
    showLoader() {
        if (this.state.loader) this.state.loader.show();
    }

    /**
     * Fonction qui permet de masquer le loader qui est afficher dans la pupop.
     */
    dismissLoader() {
        if (this.state.loader) this.state.loader.dismiss();
    }

    /**
     * Fonction qui permet d'afficher la modale.
     */
    show() {
        this.setState({ show: true });
        setTimeout(() => {
            this.content_ref.current.style.transform = 'none';
        }, 300);
    }

    /**
     * Fonction qui permet de masquer la modale.
     */
    dismiss() {
        this.setState({ show: false, change: true });
        this.content_ref.current.style.transform = '';
    }

    render() {
        return (
            <div className={`modal__wrapper ${this.state.show ? 'show' : ''}`}>
                <div ref={this.content_ref} className="modal">
                    <button onClick={this.dismiss} className="modal__close_btn">
                        <i className="fi fi-rr-cross"></i>
                    </button>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
Modal.propTypes = {
    cancelable: PropTypes.bool,
};
Modal.defaultProps = {
    cancelable: true,
};

/**
 * Pour la gestion des en-êtes des modals.
 * @param {object} props
 * @returns JSXElement
 */
export const ModalHeader = (props) => {
    const { title, onBack } = props;
    return (
        <div className="modal__header">
            {onBack ? (
                <button onClick={onBack} className={`modal__back_btn`}>
                    <i className="fi fi-rr-arrow-small-left"></i>
                </button>
            ) : (
                <></>
            )}
            <div className="title">{title}</div>
            {props.children}
        </div>
    );
};
ModalHeader.propTypes = {
    title: PropTypes.string,
    onBack: PropTypes.func,
};
ModalHeader.defaultProps = {
    title: '',
    onBack: undefined,
};

/**
 * Pour la gestion des contenu des modal.
 * @param {object} props
 * @returns JSXElement
 */
export const ModalContent = (props) => {
    return <div className="modal__content">{props.children}</div>;
};

/**
 * Pour la gestion des modals footers.
 * @param {object} props
 * @returns JSXElement
 */
export const ModalFooter = (props) => {
    return <div className="modal__footer">{props.children}</div>;
};
