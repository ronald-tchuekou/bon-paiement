import React from 'react';
import PropTypes from 'prop-types';

/**
 * Fonction qui permet de construire les simples boutons.
 * @param {object} props
 * @returns React.JSXElement
 */
export const Button = (props) => {
    const { color, children, className } = props;
    return (
        <button {...props} className={`btn contained-${color} ${className}`}>
            {children}
        </button>
    );
};
Button.defaultProps = {
    color: '',
    className: '',
    onClick: () => {},
};
Button.propTypes = {
    color: PropTypes.oneOf(['', 'primary', 'danger', 'warning', 'success', 'white']),
    className: PropTypes.string,
    onClick: PropTypes.func,
};

/**
 * Fonction qui permet de construire les boutons icons.
 * @param {object} props
 * @returns React.JSXElement
 */
export const IconButton = (props) => {
    const { color, children, size, className } = props;
    return (
        <button {...props} className={`btn icon-btn contained-${color} ${size} ${className}`}>
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
    size: PropTypes.oneOf(['', 'mg', 'lg']),
};
