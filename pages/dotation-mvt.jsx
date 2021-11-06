import React from 'react';
import Head from 'next/head';
import {
    DetailMovemenstContext,
    CurrentMovementContext,
    CurrentDotationContext,
    CurrentDetailMovementContext,
    DotationsContext,
    LangContext,
    MovementsContext,
} from '../src/context';
import { Lang } from '../src/lang';
import { MenuBar } from '../src/components/menu_bar';
import { HeaderBar } from '../src/components/header_bar';
import { DotationsList } from '../src/components/dotations_mvt/dotations_list';
import { Movements } from '../src/components/dotations_mvt/movements';
import Dotation from '../src/models/Dotation';
import DetailMovement from '../src/models/DetailMovement';
import { DetailsMovement } from '../src/components/dotations_mvt/details_movement';
import Movement from '../src/models/Movement';

export default function DotationMvt() {
    const [lang, setLang] = React.useState('fr');
    const [dotations, setDotations] = React.useState([]);
    const [currentDotation, setCurrentDotation] = React.useState(new Dotation());
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

    const dotations_context = React.useMemo(
        () => ({
            /**
             * @type array<Dotation>
             */
            dotations: dotations,
            setDotations: setDotations,
        }),
        [dotations, setDotations]
    );

    const current_dotation_context = React.useMemo(
        () => ({
            /**
             * @type Dotation
             */
            currentDotation: currentDotation,
            setCurrentDotation: setCurrentDotation,
        }),
        [currentDotation, setCurrentDotation]
    );

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
            setCurrentMovement: setCurrentMovement,
        }),
        [currentMovement, setCurrentMovement]
    );

    const detail_movements_context = React.useMemo(
        () => ({
            /**
             * @type array<DetailMovement>
             */
            detailMovements: detailMovements,
            setDetailMovements: setDetailMovements,
        }),
        [detailMovements, setDetailMovements]
    );

    const current_detail_mvt_context = React.useMemo(
        () => ({
            /**
             * @type DetailMovement
             */
            currentDetailMovement: currentDetailMovement,
            setCurrentDetailMovement: setCurrentDetailMovement,
        }),
        [currentDetailMovement, setCurrentDetailMovement]
    );

    return (
        <LangContext.Provider value={lang_context}>
            <DotationsContext.Provider value={dotations_context}>
                <CurrentDotationContext.Provider value={current_dotation_context}>
                    <MovementsContext.Provider value={movements_context}>
                        <CurrentMovementContext.Provider value={current_movement_context}>
                            <DetailMovemenstContext.Provider value={detail_movements_context}>
                                <CurrentDetailMovementContext.Provider value={current_detail_mvt_context}>
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
                                                <div className="wrapper-content">
                                                    <div className="col-3 h-100 p-0 m-0">
                                                        <DotationsList />
                                                    </div>
                                                    <div className="col-4 h-100 p-0 m-0">
                                                        <Movements />
                                                    </div>
                                                    <div className="col-5 h-100 p-0 m-0">
                                                        <DetailsMovement />
                                                    </div>
                                                </div>
                                                <div className="text-default copyright">
                                                    &copy;&nbsp;{Lang.copyright[lang]}
                                                </div>
                                            </div>
                                        </div>
                                    </main>
                                </CurrentDetailMovementContext.Provider>
                            </DetailMovemenstContext.Provider>
                        </CurrentMovementContext.Provider>
                    </MovementsContext.Provider>
                </CurrentDotationContext.Provider>
            </DotationsContext.Provider>
        </LangContext.Provider>
    );
}
