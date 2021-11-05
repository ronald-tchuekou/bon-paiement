import React from 'react';
import Head from 'next/head';
import { LangContext } from '../src/context';
import { Lang } from '../src/lang';
import { MenuBar } from '../src/components/menu_bar';
import { HeaderBar } from '../src/components/header_bar';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../src/base/section-list';
import { DotationsList } from '../src/components/dotations_mvt/dotations_list';
import { Movements } from '../src/components/dotations_mvt/movements';
import { Beneficiers } from '../src/components/dotations_mvt/beneficiers';

export default function DotationMvt() {
    const [lang, setLang] = React.useState('fr');
    const [list, setList] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

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
                <MenuBar current={'dotation-mvt'} />
                <div className="main-content">
                    <HeaderBar current={Lang.dotation_mvt[lang]} />
                    <div className="container">
                        <div className="wrapper-content d-flex d-flex-r">
                            <DotationsList />
                            <Movements />
                            <Beneficiers />
                        </div>

                        <div className="text-default copyright">&copy;&nbsp;{Lang.copyright[lang]}</div>
                    </div>
                </div>
            </main>
        </LangContext.Provider>
    );
}
