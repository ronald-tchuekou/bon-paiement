import React from 'react';
import Head from 'next/head';
import { LangContext } from '../src/context';
import { Lang } from '../src/lang';
import { MenuBar } from '../src/components/menu_bar';
import { HeaderBar } from '../src/components/header_bar';
import { Modal, ModalContent, ModalHeader } from '../src/base/modal';
import { Button } from '../src/base/buttons';
import { RadioButton } from '../src/base/radio_buttons';

export default function Dashboard() {
    const [lang, setLang] = React.useState('fr');
    const [sex, setSex] = React.useState('F');

    const modal_ref = React.useRef(null);

    const lang_context = React.useMemo(() => {
        return {
            lang: lang,
            setLang: setLang,
        };
    }, [lang, setLang]);

    function showLoader() {
        modal_ref.current.showLoader();
        setTimeout(() => {
            modal_ref.current.dismissLoader();
        }, 2000);
    }

    return (
        <LangContext.Provider value={lang_context}>
            <Head>
                <title>{Lang.app_name[lang]}</title>
                <meta name="description" content="Application de gestion de bon de paiement" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="main-container d-flex d-flex-r">
                <MenuBar current={'dashboard'} />
                <div className="main-content">
                    <HeaderBar current={Lang.dashboard[lang]} />
                    <div className="container">
                        <RadioButton name="sex" label="Homme" checked={sex === 'H'} onClick={() => setSex('H')} />
                        <br />
                        <RadioButton name="sex" label="Femme" checked={sex === 'F'} onClick={() => setSex('F')} />
                    </div>
                </div>
            </main>
        </LangContext.Provider>
    );
}
