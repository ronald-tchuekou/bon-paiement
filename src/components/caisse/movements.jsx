import React from 'react';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../base/section-list';
import { CurrentDetailMovementContext, CurrentMovementContext, LangContext, MovementsContext } from '../../context';
import { Lang } from '../../lang';
import DetailMovement from '../../models/DetailMovement';
import Movement from '../../models/Movement';

export const CaisseMovements = (props) => {
    const content_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);
    const { movements, setMovements } = React.useContext(MovementsContext);
    const { currentMovement, setCurrentMovement } = React.useContext(CurrentMovementContext);
    const { setCurrentDetailMovement } = React.useContext(CurrentDetailMovementContext);

    React.useEffect(() => {
        setMovements([]);
        setTimeout(() => {
            getMovements();
        }, 300);
    }, []);

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
        <SectionList position="right" className="flex-1">
            <SectionListHeader
                search
                onChange={(value) => {}}
                onValidate={(value) => alert(value)}
                searchPlaceHolder={Lang.search_mvt[lang]}
                title={Lang.mvt_list[lang]}
            />
            <SectionListContent ref={content_ref}>
                {movements.map(
                    /**
                     * @param {Movement} item
                     * @returns any
                     */
                    (item) => (
                        <SectionListItem selected={currentMovement.code === item.code} key={item.code}>
                            <div onClick={() => handleItemClick(item)} className="d-flex content-between items-center">
                                <div>
                                    <div className="text-default_gray">{Lang.movement[lang] + ' ' + item.code}</div>
                                    <p className="text-bold t-12 ellipsize text-warning">
                                        <span>Charge: {item.charge_amount + ' XFA'}</span>
                                        <i className="fi fi-rr-minus-small"></i>
                                        <span>Avance: {item.avance_amount + ' XFA'}</span>
                                    </p>
                                    <small className="text-default t-11">{item.date.toLocaleDateString()}</small>
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
    );
};
