import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../base/buttons';
import { TextInput } from '../base/input_text';
import { LangContext } from '../context';
import { Lang } from '../lang';

export const Login = (props) => {
    const { showLoader, hideLoader, passForgot } = props;

    const { lang } = React.useContext(LangContext);

    const [username, setUsername] = React.useState({
        value: '',
        error: false,
        helper: '',
    });
    const [password, setPassword] = React.useState({
        value: '',
        error: false,
        helper: '',
    });

    /**
     * Fonction qui peremt de faire la validation du formulaire
     * @returns boolean
     */
    function formIsValid() {
        let validate = true;
        if (username.value.trim() === '') {
            validate = false;
            setUsername((s) => ({ ...s, error: true, helper: Lang.set_username[lang] }));
        }
        if (password.value.trim() === '') {
            validate = false;
            setPassword((s) => ({ ...s, error: true, helper: Lang.set_password[lang] }));
        }
        return validate;
    }

    function handleConnectClick() {
        if (!formIsValid()) {
            return;
        }
        showLoader();
        setTimeout(() => {
            hideLoader();
        }, 2000);
        // TODO
    }

    return (
        <div className="login-content">
            <div className="img">
                <img src={'/img/undraw_secure_login_pdn4.svg'} alt="login page" />
            </div>
            <div className="login-form">
                <h1 className="text-title mb-30 mt-10">{'Login'}</h1>
                <TextInput
                    placeholder={Lang.username[lang]}
                    value={username.value}
                    error={username.error}
                    helperText={username.helper}
                    className={'w-100'}
                    onValueChange={(val) =>
                        setUsername({
                            value: val,
                            error: false,
                            helper: '',
                        })
                    }
                >
                    <i className="fi fi-rr-user"></i>
                </TextInput>
                <TextInput
                    placeholder={Lang.password[lang]}
                    value={password.value}
                    error={password.error}
                    className={'w-100'}
                    helperText={password.helper}
                    type={'password'}
                    onValueChange={(val) =>
                        setPassword({
                            value: val,
                            error: false,
                            helper: '',
                        })
                    }
                >
                    <i className="fi fi-rr-lock"></i>
                </TextInput>
                <div className="d-flex content-end">
                    <Button onClick={handleConnectClick} className="my-15" color={'primary'}>
                        {Lang.connect[lang]}
                    </Button>
                </div>
                <div className="d-flex content-start">
                    <div className="text-danger cursor-pointer" onClick={passForgot}>
                        {Lang.forgot_password[lang]}
                    </div>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    showLoader: PropTypes.func,
    hideLoader: PropTypes.func,
    passForgot: PropTypes.func,
};
Login.defaultProps = {
    showLoader: () => {},
    hideLoader: () => {},
    passForgot: () => {},
};
