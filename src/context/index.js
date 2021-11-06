import React from 'react';
import Beneficier from '../models/Beneficier';
import DetailMovement from '../models/DetailMovement';
import Dotation from '../models/Dotation';
import Movement from '../models/Movement';

export const LangContext = React.createContext({
    lang: 'fr',
    setLang: () => {},
});

/**
 * @type React.Context<{
        dotations: array<Dotation>;
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
        movements: array<Movement>;
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
        detailMovements: array<DetailMovement>;
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
