import React from 'react';
import Head from 'next/head';
import { LangContext } from '../src/context';
import { Lang } from '../src/lang';
import { MenuBar } from '../src/components/menu_bar';
import { HeaderBar } from '../src/components/header_bar';

export default function Dashboard() {
    const [lang, setLang] = React.useState('fr');

    const lang_context = React.useMemo(() => {
        return {
            lang: lang,
            setLang: setLang,
        };
    }, [lang, setLang]);

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
                </div>
            </main>
        </LangContext.Provider>
    );
}
