import React from 'react';
import Beneficier from '../models/Beneficier';
import DetailMovement from '../models/DetailMovement';
import Dotation from '../models/Dotation';
import Movement from '../models/Movement';
import SlipType from '../models/SlipType';
import Banck from '../models/Banck';
import Composant from '../models/Composant';
import Profile from '../models/Profile';

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
        bancks: [Banck];
        setBancks: callback;
    }>
 */
export const BancksContext = React.createContext({
    bancks: [],
    setBancks: () => {},
});

export const CurrentBanckContext = React.createContext({
    currentBanck: new Banck(),
    setCurrentBanck: () => {},
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

/**
 * @type React.Context<{
        composants: [Composant];
        setComposants: callback;
    }>
 */
export const ComposantsContext = React.createContext({
    composants: [],
    setComposants: () => {},
});

/**
 * @type React.Context<{
        currentComposant: Composant;
        setCurrentComposant: callback;
    }>
 */
export const CurrentComposantContext = React.createContext({
    currentComposant: new Composant(),
    setCurrentComposant: () => {},
});

/**
 * @type React.Context<{
        profiles: [Profile];
        setProfiles: callback;
    }>
 */
export const ProfilesContext = React.createContext({
    profiles: [],
    setProfiles: () => {},
});

/**
 * @type React.Context<{
        currentProfile: Profile;
        setCurrentProfile: callback;
    }>
 */
export const CurrentProfileContext = React.createContext({
    currentProfile: new Profile(),
    setCurrentProfile: () => {},
});

export const ShowAddMvtPupopContext = React.createContext({
    show_add_mvt_popup: () => {},
});