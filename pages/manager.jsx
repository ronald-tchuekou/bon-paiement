import React from 'react';
import Head from 'next/head';
import { LangContext } from '../src/context';
import { Lang } from '../src/lang';
import { MenuBar } from '../src/components/menu_bar';
import { HeaderBar } from '../src/components/header_bar';
import { Tab, TabContent, TabContentItem, TabHeader, TabHeaderItem } from '../src/base/tabs';
import { SlipTypes } from '../src/components/manager/slip_type';
import { Dotations } from '../src/components/manager/dotations';
import { Banks } from '../src/components/manager/Banks';

export default function Manager() {
    const slip_type_ref = React.useRef(null);

    const [lang, setLang] = React.useState('fr');
    const [current_tab, setCurrentTab] = React.useState(1);

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
                <MenuBar current={'manager'} />
                <div className="main-content">
                    <HeaderBar current={Lang.manager[lang]} />
                    <div className="container">
                        <div className="wrapper-content">
                            <Tab>
                                <TabHeader>
                                    <TabHeaderItem
                                        active={current_tab === 1}
                                        onClick={() => {
                                            if (current_tab !== 1) slip_type_ref.current.refreshContent();
                                            setCurrentTab(1);
                                        }}
                                        title={Lang.bon_type[lang]}
                                    >
                                        <i className="fi fi-rr-diploma"></i>
                                    </TabHeaderItem>
                                    <TabHeaderItem
                                        active={current_tab === 2}
                                        onClick={() => setCurrentTab(2)}
                                        title={Lang.dotation[lang]}
                                    >
                                        <i className="fi fi-rr-credit-card"></i>
                                    </TabHeaderItem>
                                    <TabHeaderItem
                                        active={current_tab === 3}
                                        onClick={() => setCurrentTab(3)}
                                        title={Lang.bank[lang]}
                                    >
                                        <i className="fi fi-rr-bank"></i>
                                    </TabHeaderItem>
                                </TabHeader>
                                <TabContent>
                                    <TabContentItem active={current_tab === 1}>
                                        <SlipTypes ref={slip_type_ref} />
                                    </TabContentItem>
                                    <TabContentItem active={current_tab === 2}>
                                        <Dotations />
                                    </TabContentItem>
                                    <TabContentItem active={current_tab === 3}>
                                        <Banks />
                                    </TabContentItem>
                                </TabContent>
                            </Tab>
                        </div>
                        <div className="text-default copyright">&copy;&nbsp;{Lang.copyright[lang]}</div>
                    </div>
                </div>
            </main>
        </LangContext.Provider>
    );
}
