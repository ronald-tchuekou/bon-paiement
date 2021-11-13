import React from 'react';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../base/section-list';
import {
    CurrentDetailMovementContext,
    CurrentMovementContext,
    DetailMovemenstContext,
    LangContext,
} from '../../context';
import { Lang } from '../../lang';
import DetailMovement from '../../models/DetailMovement';

export const CaisseBeneficiers = (props) => {
    const content_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);
    const { currentMovement } = React.useContext(CurrentMovementContext);
    const { detailMovements, setDetailMovements } = React.useContext(DetailMovemenstContext);
    const { setCurrentDetailMovement, currentDetailMovement } = React.useContext(CurrentDetailMovementContext);

    React.useEffect(() => {
        setDetailMovements([]);
        setCurrentDetailMovement(new DetailMovement());
        if (currentMovement.code)
            setTimeout(() => {
                getBeneficiers();
            }, 200);
    }, [currentMovement]);

    function getBeneficiers() {
        content_ref.current.showLoader();
        setDetailMovements([]);
        new DetailMovement().getAll({
            success: (content) => setDetailMovements(content),
            error: (e) => console.error(e),
            final: () => content_ref.current.dismissLoader(),
        });
    }

    function handleItemClick(item) {
        setCurrentDetailMovement(item);
    }

    return (
        <SectionList position="right" className="flex-1">
            <SectionListHeader
                search
                onChange={(value) => {}}
                onValidate={(value) => alert(value)}
                searchPlaceHolder={Lang.search_beneficiers[lang]}
                title={Lang.beneficiers_of_mvt[lang]}
            />
            <SectionListContent ref={content_ref}>
                {detailMovements.map(
                    /**
                     * @param {DetailMovement} item
                     * @returns any
                     */
                    (item) => (
                        <SectionListItem selected={currentDetailMovement.code === item.code} key={item.code}>
                            <div onClick={() => handleItemClick(item)} className="d-flex content-between items-center">
                                <div>
                                    <div className="text-default_gray">
                                        {item.beneficier.name + ' ' + item.beneficier.first_name}
                                    </div>
                                    <p className="text-bold t-12 ellipsize text-warning">{item.pay_amount + ' XFA'}</p>
                                    <small className="text-default t-11">{item.date.toLocaleDateString()}</small>
                                </div>
                                {currentDetailMovement.code === item.code ? (
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
