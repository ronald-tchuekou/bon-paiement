import React from 'react';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../../base/section-list';
import { CurrentDotationContext, LangContext, DotationsContext } from '../../../context';
import { Lang } from '../../../lang';
import { IconButton } from '../../../base/buttons';
import Dotation from '../../../models/Dotation';

export const DotationList = React.forwardRef(
    (props, ref) => {
        const content_ref = React.useRef(null);

        const { lang } = React.useContext(LangContext);

        const { dotations, setDotations } = React.useContext(DotationsContext);
        const { currentDotation, setCurrentDotation } = React.useContext(CurrentDotationContext);

        function getDotations() {
            content_ref.current.showLoader();
            new Dotation().getAll({
                success: (content) => setDotations(content),
                error: (e) => console.error(e),
                final: () => content_ref.current.dismissLoader(),
            });
        }

        function handleItemClick(item) {
            setCurrentDotation(item);
        }

        React.useImperativeHandle(ref, () => ({
            getContent: getDotations,
        }));

        return (
            <SectionList position="right" className="flex-1">
                <SectionListHeader
                    search
                    onChange={(value) => {}}
                    onValidate={(value) => alert(value)}
                    searchPlaceHolder={Lang.search_dotation[lang]}
                    title={Lang.dotation_list[lang]}
                >
                    <IconButton onClick={() => setCurrentDotation(new Dotation())} color={'warning'}>
                        <i className="fi fi-rr-plus-small t-30"></i>
                    </IconButton>
                </SectionListHeader>
                <SectionListContent ref={content_ref}>
                    {dotations.map(
                        /**
                         * @param {Dotation} item
                         * @returns any
                         */
                        (item) => (
                            <SectionListItem
                                withOptions
                                onDelete={() => alert('Deletion is not impelement!')}
                                selected={currentDotation.code === item.code}
                                key={item.code}
                            >
                                <div
                                    onClick={() => handleItemClick(item)}
                                    className="d-flex content-between items-center"
                                >
                                    <div>
                                        <div className="text-default_gray">
                                            {item.slipType.libelle} <i className="fi fi-rr-minus-small"></i>
                                            {item.slipType.abreviation}
                                        </div>
                                        <div className="text-primary t-15">{item.amount}&nbsp;XFA</div>
                                        <small className="text-warning">
                                            {Lang.add_on[lang]}&nbsp;{item.date.toLocaleDateString()}
                                        </small>
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
    },
    { displayNema: 'DotationList' }
);
