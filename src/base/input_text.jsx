import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pour la gestion des champs d'édition.
 * @param {object} props
 * @returns JSXElement
 */
export const TextInput = (props) => {
    const input_ref = React.useRef(null);
    const pass_icon_ref = React.useRef(null);
    const { onValueChange, value, placeholder, label, type, disabled, error, helperText, className } = props;
    const [is_focus, setFocus] = React.useState(false);
    function handleViewPassClick() {
        if (input_ref.current.type === 'password') {
            input_ref.current.type = 'text';
            pass_icon_ref.current.classList.remove('fi-rr-eye');
            pass_icon_ref.current.classList.add('fi-rr-eye-crossed');
        } else {
            input_ref.current.type = 'password';
            pass_icon_ref.current.classList.add('fi-rr-eye');
            pass_icon_ref.current.classList.remove('fi-rr-eye-crossed');
        }
        input_ref.current.focus();
    }
    return (
        <div className={`text-input__wrapper ${disabled ? 'disabled' : ''} ${error ? 'error' : ''} ${className}`}>
            <div className={`input__content ${is_focus ? 'focus' : ''} `}>
                {props.children}
                <input
                    ref={input_ref}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={(e) => onValueChange(e.target.value)}
                    type={type}
                    placeholder={placeholder}
                    name={label}
                    value={value}
                    disabled={disabled}
                />
            </div>
            {error && helperText !== '' ? <div className="error_text">{helperText}</div> : <></>}
            {type === 'password' ? (
                <div onClick={handleViewPassClick} className="input_icon_indicator">
                    <i ref={pass_icon_ref} className="fi fi-rr-eye"></i>
                </div>
            ) : (
                <></>
            )}
            <div className="text-input_error"></div>
        </div>
    );
};
TextInput.propTypes = {
    onValueChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    helperText: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
};
TextInput.defaultProps = {
    onValueChange: () => {},
    value: '',
    placeholder: '',
    label: '',
    type: 'text',
    helperText: 'Error message',
    disabled: false,
    error: false,
};
