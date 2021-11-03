import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../base/buttons';
import { TextInput } from '../base/input_text';
import { LangContext } from '../context';
import { Lang } from '../lang';

export const ResetMail = (props) => {
    const { showLoader, hideLoader, backToLogin } = props;

    const { lang } = React.useContext(LangContext);

    const [reset_mail, setResetMail] = React.useState({
        value: '',
        error: false,
        helper: '',
    });

    /**
     * Fonction qui permet de faire la validation du formulaire.
     * @returns boolean
     */
    function formIsValid() {
        let validate = true;
        if (reset_mail.value.trim() === '') {
            validate = false;
            setResetMail((s) => ({ ...s, error: true, helper: Lang.set_reset_mail[lang] }));
        }
        return validate;
    }

    /**
     * Fonction qui permet de soumetre le formulaire.
     */
    function handleClick() {
        if (!formIsValid()) {
            return;
        }
        showLoader();
        setTimeout(() => {
            hideLoader();
            window.location = '/reset-password';
        }, 2000);
        // TODO
    }

    return (
        <div className="reset-pass__wrapper">
            <div className="d-flex items-center">
                <Button color={'white'} onClick={backToLogin}>
                    <i className="fi fi-rr-arrow-small-left t-20"></i>
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <h3 className="text-title">{Lang.password_recovery[lang]}</h3>
            </div>
            <div className="reset-pass-content">
                <div className="img">
                    <img src={'/img/undraw_forgot_password_re_hxwm.svg'} alt="reset password page" />
                </div>
                <div className="reset-pass-form">
                    <div className="text-default w-100 px-10">{Lang.forgot_your_pass[lang]}</div>
                    <div className="text-default px-10 mb-20">{Lang.no_pb_enter_tou[lang]}</div>
                    <TextInput
                        type={'email'}
                        placeholder={Lang.reset_mail[lang]}
                        value={reset_mail.value}
                        error={reset_mail.error}
                        helperText={reset_mail.helper}
                        className={'w-100'}
                        onValueChange={(val) =>
                            setResetMail({
                                value: val,
                                error: false,
                                helper: '',
                            })
                        }
                    >
                        <i className="fi fi-rr-envelope-marker"></i>
                    </TextInput>
                    <div className="d-flex content-end">
                        <Button onClick={handleClick} className="my-15" color={'primary'}>
                            {Lang.validate[lang]}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ResetMail.propTypes = {
    showLoader: PropTypes.func,
    hideLoader: PropTypes.func,
    backToLogin: PropTypes.func,
};
ResetMail.defaultProps = {
    showLoader: () => {},
    hideLoader: () => {},
    backToLogin: () => {},
};
