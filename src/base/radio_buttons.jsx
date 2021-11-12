import React from 'react';
import PropTypes from 'prop-types';

export const RadioButton = (props) => {
    const input_ref = React.useRef(null);
    const { label, onClick, checked } = props;
    return (
        <div className="radio-btn__wrapper">
            <input ref={input_ref} type="radio" checked={checked} />
            <div
                onClick={() => {
                    onClick();
                    input_ref.current.click();
                }}
                className="radio-content"
            >
                <div className="radio-state"></div>
                <div className="radio-label">{label}</div>
            </div>
        </div>
    );
};
RadioButton.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
};
RadioButton.defaultProps = {
    label: '',
    checked: false,
    onClick: () => {},
};
