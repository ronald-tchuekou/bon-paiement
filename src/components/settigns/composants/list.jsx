import React from 'react';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../../base/section-list';
import { CurrentComposantContext, LangContext, ComposantsContext } from '../../../context';
import { Lang } from '../../../lang';
import { IconButton } from '../../../base/buttons';
import Composant from '../../../models/Composant';

export const ComposantsList = React.forwardRef(
    (props, ref) => {
        const content_ref = React.useRef(null);

        const { lang } = React.useContext(LangContext);

        const { composants, setComposants } = React.useContext(ComposantsContext);
        const { currentComposant, setCurrentComposant } = React.useContext(CurrentComposantContext);

        function getComposants() {
            content_ref.current.showLoader();
            new Composant().getAll({
                success: (content) => setComposants(content),
                error: (e) => console.error(e),
                final: () => content_ref.current.dismissLoader(),
            });
        }

        function handleItemClick(item) {
            setCurrentComposant(item);
        }

        React.useImperativeHandle(ref, () => ({
            getContent: getComposants,
        }));

        return (
            <SectionList position="right" className="flex-1">
                <SectionListHeader
                    search
                    onChange={(value) => {}}
                    onValidate={(value) => alert(value)}
                    searchPlaceHolder={Lang.search_component[lang]}
                    title={Lang.component_list[lang]}
                >
                    <IconButton onClick={() => setCurrentComposant(new Composant())} color={'warning'}>
                        <i className="fi fi-rr-plus-small t-30"></i>
                    </IconButton>
                </SectionListHeader>
                <SectionListContent ref={content_ref}>
                    {composants.map(
                        /**
                         * @param {Composant} item
                         * @returns any
                         */
                        (item) => (
                            <SectionListItem
                                withOptions
                                onDelete={() => alert('Deletion is not impelement!')}
                                selected={currentComposant.code === item.code}
                                key={item.code}
                            >
                                <div
                                    onClick={() => handleItemClick(item)}
                                    className="d-flex content-between items-center"
                                >
                                    <div>
                                        <div className="text-default_gray">{item.libelle}</div>
                                        <div className="text-default t-14">{item.code}</div>
                                    </div>
                                    {currentComposant.code === item.code ? (
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
    { displayNema: 'ComposantsList' }
);
