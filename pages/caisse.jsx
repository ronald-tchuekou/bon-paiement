import React from 'react';
import Head from 'next/head';
import {
    CurrentDetailMovementContext,
    CurrentMovementContext,
    DetailMovemenstContext,
    LangContext,
    MovementsContext,
} from '../src/context';
import { Lang } from '../src/lang';
import { MenuBar } from '../src/components/menu_bar';
import { HeaderBar } from '../src/components/header_bar';
import { CaisseBeneficiersDetails } from '../src/components/caisse/details';
import { CaisseBeneficiers } from '../src/components/caisse/beneficiers';
import { CaisseMovements } from '../src/components/caisse/movements';
import Movement from '../src/models/Movement';
import DetailMovement from '../src/models/DetailMovement';

export default function Caisse() {
    const [lang, setLang] = React.useState('fr');

    const [movements, setMovements] = React.useState([]);
    const [currentMovement, setCurrentMovement] = React.useState(new Movement());
    const [detailMovements, setDetailMovements] = React.useState([]);
    const [currentDetailMovement, setCurrentDetailMovement] = React.useState(new DetailMovement());

    const lang_context = React.useMemo(() => {
        return {
            lang: lang,
            setLang: setLang,
        };
    }, [lang, setLang]);

    const movements_context = React.useMemo(
        () => ({
            movements: movements,
            setMovements: setMovements,
        }),
        [movements, setMovements]
    );

    const current_movement_context = React.useMemo(
        () => ({
            currentMovement: currentMovement,
            setCurrentMovement,
            setCurrentMovement,
        }),
        [currentMovement, setCurrentMovement]
    );

    const movement_details_context = React.useMemo(
        () => ({
            detailMovements: detailMovements,
            setDetailMovements: setDetailMovements,
        }),
        [detailMovements, setDetailMovements]
    );

    const current_detail_movement_context = React.useMemo(
        () => ({
            currentDetailMovement: currentDetailMovement,
            setCurrentDetailMovement: setCurrentDetailMovement,
        }),
        [currentDetailMovement, setCurrentDetailMovement]
    );

    return (
        <MovementsContext.Provider value={movements_context}>
            <CurrentMovementContext.Provider value={current_movement_context}>
                <DetailMovemenstContext.Provider value={movement_details_context}>
                    <CurrentDetailMovementContext.Provider value={current_detail_movement_context}>
                        <LangContext.Provider value={lang_context}>
                            <Head>
                                <title>{Lang.app_name[lang]}</title>
                                <meta name="description" content="Application de gestion de bon de paiement" />
                                <link rel="icon" href="/favicon.ico" />
                            </Head>
                            <main className="main-container d-flex d-flex-r">
                                <MenuBar current={'caisse'} />
                                <div className="main-content">
                                    <HeaderBar current={Lang.caisse[lang]} />
                                    <div className="container">
                                        <div className="wrapper-content">
                                            <div className="col-4 h-100 p-0 m-0">
                                                <CaisseMovements />
                                            </div>
                                            <div className="col-3 h-100 p-0 m-0">
                                                <CaisseBeneficiers />
                                            </div>
                                            <div className="col-5 h-100 p-0 m-0">
                                                <CaisseBeneficiersDetails />
                                            </div>
                                        </div>
                                        <div className="text-default copyright">&copy;&nbsp;{Lang.copyright[lang]}</div>
                                    </div>
                                </div>
                            </main>
                        </LangContext.Provider>
                    </CurrentDetailMovementContext.Provider>
                </DetailMovemenstContext.Provider>
            </CurrentMovementContext.Provider>
        </MovementsContext.Provider>
    );
}
