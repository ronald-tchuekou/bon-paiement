import React from 'react';
import Head from 'next/head';
import { LangContext } from '../src/context';
import { Lang } from '../src/lang';
import { MenuBar } from '../src/components/menu_bar';
import { HeaderBar } from '../src/components/header_bar';
import { DashboardDotations } from '../src/components/dashboard/dotations';
import { DashboardRapport } from '../src/components/dashboard/mvt-raport';
import { DashboardLastActivities } from '../src/components/dashboard/last-activities';
import { DashboardUsers } from '../src/components/dashboard/users';
import { DashboardBanks } from '../src/components/dashboard/bank';

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
                    <div className="container p-0 m-0">
                        <div className="dasboard-content">
                            <div className="stats-content invisible-scroll">
                                <div className="row m-0 p-0">
                                    <div className="col-5 py-0 px-5 m-0">
                                        <DashboardDotations />
                                    </div>

                                    <div className="col-7 py-0 px-5 m-0">
                                        <DashboardRapport />
                                    </div>
                                </div>

                                <div className="row m-0 p-0">
                                    <div className="col-7 py-0 px-5 m-0">
                                        <DashboardUsers />
                                    </div>

                                    <div className="col-5 py-0 px-5 m-0">
                                        <DashboardBanks />
                                    </div>
                                </div>
                            </div>

                            <DashboardLastActivities />
                        </div>
                    </div>
                </div>
            </main>
        </LangContext.Provider>
    );
}
