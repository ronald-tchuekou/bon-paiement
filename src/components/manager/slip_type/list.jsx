import React from 'react';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../../base/section-list';
import { CurrentSlipTypeContext, LangContext, SlipTypesContext } from '../../../context';
import { Lang } from '../../../lang';
import { IconButton } from '../../../base/buttons';
import SlipType from '../../../models/SlipType';

export const SlipTypeList = React.forwardRef(
    (props, ref) => {
        const content_ref = React.useRef(null);

        const { lang } = React.useContext(LangContext);

        const { slipTypes, setSlipTypes } = React.useContext(SlipTypesContext);
        const { currentSlipType, setCurrentSlipType } = React.useContext(CurrentSlipTypeContext);

        React.useEffect(() => {
            setTimeout(() => {
                getSlipTypes();
            }, 300);
        }, []);

        function getSlipTypes() {
            content_ref.current.showLoader();
            new SlipType().getAll({
                success: (content) => setSlipTypes(content),
                error: (e) => console.error(e),
                final: () => content_ref.current.dismissLoader(),
            });
        }

        function handleItemClick(item) {
            setCurrentSlipType(item);
        }

        React.useImperativeHandle(ref, () => ({
            getContent: getSlipTypes,
        }));

        return (
            <SectionList position="right" className="flex-1">
                <SectionListHeader
                    search
                    onChange={(value) => {}}
                    onValidate={(value) => alert(value)}
                    searchPlaceHolder={Lang.search_bon_type[lang]}
                    title={Lang.bon_type_list[lang]}
                >
                    <IconButton onClick={() => setCurrentSlipType(new SlipType())} color={'warning'}>
                        <i className="fi fi-rr-plus-small t-30"></i>
                    </IconButton>
                </SectionListHeader>
                <SectionListContent ref={content_ref}>
                    {slipTypes.map(
                        /**
                         * @param {SlipType} item
                         * @returns any
                         */
                        (item) => (
                            <SectionListItem
                                withOptions
                                onDelete={() => alert('Deletion is not impelement!')}
                                selected={currentSlipType.code === item.code}
                                key={item.code}
                            >
                                <div
                                    onClick={() => handleItemClick(item)}
                                    className="d-flex content-between items-center"
                                >
                                    <div>
                                        <div className="text-default_gray">
                                            {item.libelle} <i className="fi fi-rr-minus-small"></i>
                                            {item.abreviation}
                                        </div>
                                        <small className="text-default">
                                            {Lang.add_on[lang]}&nbsp;{item.date.toLocaleDateString()}
                                        </small>
                                    </div>
                                    {currentSlipType.code === item.code ? (
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
    { displayNema: 'SlipTypeList' }
);
