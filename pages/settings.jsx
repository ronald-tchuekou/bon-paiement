import React from 'react';
import Head from 'next/head';
import { LangContext } from '../src/context';
import { Lang } from '../src/lang';
import { MenuBar } from '../src/components/menu_bar';
import { HeaderBar } from '../src/components/header_bar';
import { Tab, TabContent, TabContentItem, TabHeader, TabHeaderItem } from '../src/base/tabs';
import { MyProfile } from '../src/components/settigns/my-profile';
import { Profiles } from '../src/components/settigns/profiles';
import { Users } from '../src/components/settigns/users';
import { Composants } from '../src/components/settigns/composants';

export default function Settings() {
    const my_profile_ref = React.useRef(null),
        profiles_ref = React.useRef(null),
        users_ref = React.useRef(null),
        components_ref = React.useRef(null);

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
                <MenuBar current={'settings'} />
                <div className="main-content">
                    <HeaderBar current={Lang.settings[lang]} />
                    <div className="container">
                        <div className="wrapper-content">
                            <Tab>
                                <TabHeader>
                                    <TabHeaderItem
                                        active={current_tab === 1}
                                        onClick={() => {
                                            if (current_tab !== 1) my_profile_ref.current.refreshContent();
                                            setCurrentTab(1);
                                        }}
                                        title={Lang.my_profile[lang]}
                                    >
                                        <i className="fi fi-rr-user"></i>
                                    </TabHeaderItem>
                                    <TabHeaderItem
                                        active={current_tab === 2}
                                        onClick={() => {
                                            if (current_tab !== 2) profiles_ref.current.refreshContent();
                                            setCurrentTab(2);
                                        }}
                                        title={Lang.profiles[lang]}
                                    >
                                        <i className="fi fi-rr-id-badge"></i>
                                    </TabHeaderItem>
                                    <TabHeaderItem
                                        active={current_tab === 3}
                                        onClick={() => {
                                            if (current_tab !== 3) users_ref.current.refreshContent();
                                            setCurrentTab(3);
                                        }}
                                        title={Lang.users[lang]}
                                    >
                                        <i className="fi fi-rr-mode-portrait"></i>
                                    </TabHeaderItem>
                                    <TabHeaderItem
                                        active={current_tab === 4}
                                        onClick={() => {
                                            if (current_tab !== 4) components_ref.current.refreshContent();
                                            setCurrentTab(4);
                                        }}
                                        title={Lang.components[lang]}
                                    >
                                        <i className="fi fi-rr-apps"></i>
                                    </TabHeaderItem>
                                </TabHeader>
                                <TabContent>
                                    <TabContentItem active={current_tab === 1}>
                                        <MyProfile ref={my_profile_ref} />
                                    </TabContentItem>
                                    <TabContentItem active={current_tab === 2}>
                                        <Profiles ref={profiles_ref} />
                                    </TabContentItem>
                                    <TabContentItem active={current_tab === 3}>
                                        <Users ref={users_ref} />
                                    </TabContentItem>
                                    <TabContentItem active={current_tab === 4}>
                                        <Composants ref={components_ref} />
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
