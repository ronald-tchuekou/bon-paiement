import React from 'react';
import Head from 'next/head';
import { LangContext } from '../src/context';
import { Lang } from '../src/lang';
import { TextInput } from '../src/base/input_text';
import { Button } from '../src/base/buttons';
import { AddLoader } from '../src/scripts/app';

export default function Home() {
    const loader_ref = React.useRef(null);

    const [lang, setLang] = React.useState('en');
    const [confirm_pass, setConfirPass] = React.useState({
        value: '',
        error: false,
        helper: '',
    });
    const [password, setPassword] = React.useState({
        value: '',
        error: false,
        helper: '',
    });
    const [loader, setLoader] = React.useState(undefined);
    const lang_context = React.useMemo(() => {
        return {
            lang: lang,
            setLang: setLang,
        };
    }, [lang, setLang]);

    React.useEffect(() => {
        setLoader(AddLoader(loader_ref.current));
    }, []);

    function showLoader() {
        if (loader) loader.show();
    }

    function hideLoader() {
        if (loader) loader.dismiss();
    }

    /**
     * Fonction qui peremt de faire la validation du formulaire
     * @returns boolean
     */
    function formIsValid() {
        let validate = true,
            pa = password.value.trim(),
            cp = confirm_pass.value.trim();
        if (pa === '') {
            validate = false;
            setPassword((s) => ({ ...s, error: true, helper: Lang.set_new_password[lang] }));
        }
        if (cp === '') {
            validate = false;
            setConfirPass((s) => ({ ...s, error: true, helper: Lang.set_confirm_password[lang] }));
        }
        if (pa !== '' && cp !== '' && pa !== cp) {
            validate = false;
            setConfirPass((s) => ({ ...s, error: true, helper: Lang.wrong_confirm_password[lang] }));
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
        <LangContext.Provider value={lang_context}>
            <Head>
                <title>{Lang.app_name[lang]}</title>
                <meta name="description" content="Application de gestion de bon de paiement" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="d-flex d-flex-c content-center items-center main-container">
                <div ref={loader_ref} className="login-container m-40">
                    <div className="reset-pass__wrapper">
                        <div className="d-flex content-center">
                            <h3 className="text-title">{Lang.reset_password[lang]}</h3>
                        </div>
                        <div className="reset-pass-content">
                            <div className="img">
                                <img src={'/img/undraw_secure_login_pdn4.svg'} alt="login page" />
                            </div>
                            <div className="login-form">
                                <div className="text-default my-10">{Lang.new_password[lang]}</div>
                                <TextInput
                                    placeholder={Lang.password[lang]}
                                    value={password.value}
                                    error={password.error}
                                    type={'password'}
                                    helperText={password.helper}
                                    className={'w-100'}
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
                                <TextInput
                                    placeholder={Lang.confirm_password[lang]}
                                    value={confirm_pass.value}
                                    error={confirm_pass.error}
                                    className={'w-100'}
                                    helperText={confirm_pass.helper}
                                    type={'password'}
                                    onValueChange={(val) =>
                                        setConfirPass({
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
                                        {Lang.validate[lang]}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-default copyright">&copy;&nbsp;{Lang.copyright[lang]}</div>
            </main>
        </LangContext.Provider>
    );
}
