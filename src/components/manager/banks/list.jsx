import React from 'react';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../../base/section-list';
import { CurrentBanckContext, LangContext, BancksContext } from '../../../context';
import { Lang } from '../../../lang';
import { IconButton } from '../../../base/buttons';
import Banck from '../../../models/Banck';

export const BanckList = React.forwardRef(
    (props, ref) => {
        const content_ref = React.useRef(null);

        const { lang } = React.useContext(LangContext);

        const { bancks, setBancks } = React.useContext(BancksContext);
        const { currentBanck, setCurrentBanck } = React.useContext(CurrentBanckContext);

        React.useEffect(() => {
            setTimeout(() => {
                getBancks();
            }, 300);
        }, []);

        function getBancks() {
            content_ref.current.showLoader();
            new Banck().getAll({
                success: (content) => setBancks(content),
                error: (e) => console.error(e),
                final: () => content_ref.current.dismissLoader(),
            });
        }

        function handleItemClick(item) {
            setCurrentBanck(item);
        }

        React.useImperativeHandle(ref, () => ({
            getContent: getBancks,
        }));

        return (
            <SectionList position="right" className="flex-1">
                <SectionListHeader
                    search
                    onChange={(value) => {}}
                    onValidate={(value) => alert(value)}
                    searchPlaceHolder={Lang.search_bank[lang]}
                    title={Lang.banck_list[lang]}
                >
                    <IconButton onClick={() => setCurrentBanck(new Banck())} color={'warning'}>
                        <i className="fi fi-rr-plus-small t-30"></i>
                    </IconButton>
                </SectionListHeader>
                <SectionListContent ref={content_ref}>
                    {bancks.map(
                        /**
                         * @param {Banck} item
                         * @returns any
                         */
                        (item) => (
                            <SectionListItem
                                withOptions
                                onDelete={() => alert('Deletion is not impelement!')}
                                selected={currentBanck.code === item.code}
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
                                        <div className="text-default t-14">{item.email}</div>
                                        <small className="text-warning">
                                            {Lang.add_on[lang]}&nbsp;{item.date.toLocaleDateString()}
                                        </small>
                                    </div>
                                    {currentBanck.code === item.code ? (
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
    { displayNema: 'BanckList' }
);
