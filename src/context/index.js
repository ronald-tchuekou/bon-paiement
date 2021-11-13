import React from 'react';
import Beneficier from '../models/Beneficier';
import DetailMovement from '../models/DetailMovement';
import Dotation from '../models/Dotation';
import Movement from '../models/Movement';
import SlipType from '../models/SlipType';

/**
 * @callback callback
 * @param {array<object>} list
 */

export const LangContext = React.createContext({
    lang: 'fr',
    setLang: () => {},
});

/**
 * @type React.Context<{
        slipTypes: [SlipType];
        setSlipTypes: callback;
    }>
 */
export const SlipTypesContext = React.createContext({
    slipTypes: [],
    setSlipTypes: () => {},
});

export const CurrentSlipTypeContext = React.createContext({
    currentSlipType: new SlipType(),
    setCurrentSlipType: () => {},
});

/**
 * @type React.Context<{
        dotations: [Dotation];
        setDotations: callback;
    }>
 */
export const DotationsContext = React.createContext({
    dotations: [],
    setDotations: () => {},
});

export const CurrentDotationContext = React.createContext({
    currentDotation: new Dotation(),
    setCurrentDotation: () => {},
});

/**
 * @type React.Context<{
        movements: [Movement];
        setMovements: callback;
    }>
 */
export const MovementsContext = React.createContext({
    movements: [],
    setMovements: () => {},
});

export const CurrentMovementContext = React.createContext({
    currentMovement: new Movement(),
    setCurrentMovement: () => {},
});

/**
 * @type React.Context<{
        detailMovements: [DetailMovement];
        setDetailMovements: callback;
    }>
 */
export const DetailMovemenstContext = React.createContext({
    detailMovements: [],
    setDetailMovements: () => {},
});

export const CurrentDetailMovementContext = React.createContext({
    currentDetailMovement: new DetailMovement(),
    setCurrentDetailMovement: () => {},
});

export const ShowAddMvtPupopContext = React.createContext({
    show_add_mvt_popup: () => {},
});