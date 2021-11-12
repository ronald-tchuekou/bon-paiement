import React from 'react';
import { IconButton } from '../../base/buttons';
import {
    CurrentMovementContext,
    CurrentDotationContext,
    CurrentDetailMovementContext,
    LangContext,
    MovementsContext,
    ShowAddMvtPupopContext,
} from '../../../src/context';
import { Lang } from '../../../src/lang';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../../src/base/section-list';
import Movement from '../../models/Movement';
import DetailMovement from '../../models/DetailMovement';
import { Modal, ModalContent, ModalHeader } from '../../base/modal';
import { AddMVTPopup } from './add_mvt_popup';

export const Movements = (props) => {
    const content_ref = React.useRef(null);
    const add_popup_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);

    const { show_add_mvt_popup } = React.useContext(ShowAddMvtPupopContext);
    const { movements, setMovements } = React.useContext(MovementsContext);
    const { currentMovement, setCurrentMovement } = React.useContext(CurrentMovementContext);
    const { currentDotation } = React.useContext(CurrentDotationContext);
    const { setCurrentDetailMovement } = React.useContext(CurrentDetailMovementContext);

    React.useEffect(() => {
        setMovements([]);
        if (currentDotation.code)
            setTimeout(() => {
                getMovements();
            }, 300);
    }, [currentDotation]);

    function getMovements() {
        content_ref.current.showLoader();
        new Movement().getAll({
            success: (content) => setMovements(content),
            error: (e) => console.error(e),
            final: () => content_ref.current.dismissLoader(),
        });
    }

    function handleItemClick(item) {
        setCurrentDetailMovement(new DetailMovement());
        setCurrentMovement(item);
    }

    return (
        <React.Fragment>
            <SectionList position="right" className="flex-1">
                <SectionListHeader
                    search
                    onChange={(value) => {}}
                    onValidate={(value) => alert(value)}
                    searchPlaceHolder={Lang.search_mvt[lang]}
                    title={Lang.mvt_list[lang]}
                >
                    <IconButton
                        onClick={() => show_add_mvt_popup()}
                        disabled={currentDotation.code === undefined || currentDotation.code === null}
                        color={'warning'}
                    >
                        <i className="fi fi-rr-plus-small t-30"></i>
                    </IconButton>
                </SectionListHeader>
                <SectionListContent ref={content_ref}>
                    {movements.map(
                        /**
                         * @param {Movement} item
                         * @returns any
                         */
                        (item) => (
                            <SectionListItem
                                withOptions
                                onDelete={() => alert('Deletion is not impelement!')}
                                onEdit={() => show_add_mvt_popup()}
                                selected={currentMovement.code === item.code}
                                key={item.code}
                            >
                                <div
                                    onClick={() => handleItemClick(item)}
                                    className="d-flex content-between items-center"
                                >
                                    <div>
                                        <div className="text-default_gray">{Lang.movement[lang] + ' ' + item.code}</div>
                                        <p className="text-bold t-14 ellipsize text-warning">
                                            <span>Charge: {item.charge_amount + ' XFA'}</span>
                                            <i className="fi fi-rr-minus-small"></i>
                                            <span>Avance: {item.avance_amount + ' XFA'}</span>
                                        </p>
                                        <small className="text-default">{item.date.toLocaleDateString()}</small>
                                    </div>
                                    {currentMovement.code === item.code ? (
                                        <div className="text-center text-primary">
                                            <i className="fi fi-rr-angle-small-right t-25"></i>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </SectionListItem>
                        )
                    )}
                </SectionListContent>
            </SectionList>
        </React.Fragment>
    );
};
