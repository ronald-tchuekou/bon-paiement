import React from 'react';
import Head from 'next/head';
import { LangContext } from '../src/context';
import { Lang } from '../src/lang';
import DrawerContent from '../src/scripts/drawerContent';
import { AddLoader } from '../src/scripts/app';
import { Login } from '../src/components/login';
import { ResetMail } from '../src/components/pass_forgot';

export default function Home() {
    const drawer_ref = React.useRef(null);

    const [lang, setLang] = React.useState('fr');

    const [drawer, setDrawer] = React.useState(undefined);
    const [loader, setLoader] = React.useState(undefined);

    const lang_context = React.useMemo(() => {
        return {
            lang: lang,
            setLang: setLang,
        };
    }, [lang, setLang]);

    React.useEffect(() => {
        let d = drawer_ref.current;
        if (drawer) drawer.gotToItem(0);
        else {
            setDrawer(new DrawerContent(d));
        }
        setLoader(AddLoader(drawer_ref.current));
    }, []);

    function showLoader() {
        if (loader) loader.show();
    }

    function hideLoader() {
        if (loader) loader.dismiss();
    }

    function passForgot() {
        if (drawer) drawer.next();
    }

    function backToLogin() {
        if (drawer) drawer.previous();
    }

    return (
        <LangContext.Provider value={lang_context}>
            <Head>
                <title>{Lang.app_name[lang]}</title>
                <meta name="description" content="Application de gestion de bon de paiement" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="d-flex d-flex-c content-center items-center main-container">
                <div ref={drawer_ref} className="login-container m-40">
                    <Login showLoader={showLoader} hideLoader={hideLoader} passForgot={passForgot} />
                    <ResetMail showLoader={showLoader} hideLoader={hideLoader} backToLogin={backToLogin} />
                </div>
                <div className="text-default copyright">&copy;&nbsp;{Lang.copyright[lang]}</div>
            </main>
        </LangContext.Provider>
    );
}
