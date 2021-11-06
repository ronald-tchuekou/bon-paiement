import React from 'react';
import { CurrentDotationContext, CurrentMovementContext, DotationsContext, LangContext } from '../../../src/context';
import { Lang } from '../../../src/lang';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../../src/base/section-list';
import Dotation from '../../models/Dotation';
import Movement from '../../models/Movement';

export const DotationsList = (props) => {
    const content_ref = React.useRef(null);

    const { lang } = React.useContext(LangContext);

    const { dotations, setDotations } = React.useContext(DotationsContext);
    const { currentDotation, setCurrentDotation } = React.useContext(CurrentDotationContext);
    const { setCurrentMovement } = React.useContext(CurrentMovementContext);

    React.useEffect(() => {
        setTimeout(() => {
            getDotations();
        }, 300);
    }, []);

    function getDotations() {
        content_ref.current.showLoader();
        setDotations([]);
        new Dotation().getAll({
            success: (result) => {
                setDotations(result);
            },
            error: (e) => console.error(e),
            final: () => {
                content_ref.current.dismissLoader();
            },
        });
    }

    /**
     * @param {Dotation} item
     */
    function handleItemClick(item) {
        setCurrentDotation(item);
        setCurrentMovement(new Movement());
    }

    return (
        <SectionList position="right" className="flex-1">
            <SectionListHeader
                search
                onChange={(value) => {}}
                onValidate={(value) => alert(value)}
                searchPlaceHolder={Lang.search_dotation[lang]}
                title={Lang.dotation_list[lang]}
            ></SectionListHeader>
            <SectionListContent ref={content_ref}>
                {dotations.map(
                    /**
                     * @param {Dotation} item
                     * @returns {array}
                     */
                    (item) => (
                        <SectionListItem selected={currentDotation.code === item.code} key={item.code}>
                            <div onClick={() => handleItemClick(item)} className="d-flex content-between items-center">
                                <div>
                                    <div className="text-default_gray">
                                        {item.slipType.libelle} <i className="fi fi-rr-minus-small"></i>{' '}
                                        {item.slipType.abreviation}
                                    </div>
                                    <p className="text-primary text-bold t-14">{item.amount + ' XFA'}</p>
                                </div>
                                {currentDotation.code === item.code ? (
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
