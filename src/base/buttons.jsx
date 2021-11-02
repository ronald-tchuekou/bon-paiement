import React from 'react';
import PropTypes from 'prop-types';

/**
 * Fonction qui permet de construire les simples boutons.
 * @param {object} props
 * @returns React.JSXElement
 */
export const Button = (props) => {
    const { color, children } = props;
    return (
        <button {...props} className={`btn contained-${color}`}>
            {children}
        </button>
    );
};
Button.defaultProps = {
    color: '',
};
Button.propTypes = {
    color: PropTypes.oneOf('primary', 'danger', 'warning', 'success', 'white'),
};

/**
 * Fonction qui permet de construire les boutons icons.
 * @param {object} props
 * @returns React.JSXElement
 */
export const IconButton = (props) => {
    const { color, children, size } = props;
    return (
        <button
            {...props}
            className={`btn icon-btn contained-${color} ${size}`}
        >
            {children}
        </button>
    );
};
IconButton.defaultProps = {
    ...Button.defaultProps,
    size: '',
};
IconButton.propTypes = {
    ...Button.propTypes,
    size: PropTypes.oneOf('mg', 'lg'),
};
