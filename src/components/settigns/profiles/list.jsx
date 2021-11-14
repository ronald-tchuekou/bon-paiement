import React from 'react';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../../base/section-list';
import { CurrentProfileContext, LangContext, ProfilesContext } from '../../../context';
import { Lang } from '../../../lang';
import { IconButton } from '../../../base/buttons';
import Profile from '../../../models/Profile';

export const ProfilesList = React.forwardRef(
    (props, ref) => {
        const content_ref = React.useRef(null);

        const { lang } = React.useContext(LangContext);

        const { profiles, setProfiles } = React.useContext(ProfilesContext);
        const { currentProfile, setCurrentProfile } = React.useContext(CurrentProfileContext);

        function getProfiles() {
            content_ref.current.showLoader();
            new Profile().getAll({
                success: (content) => setProfiles(content),
                error: (e) => console.error(e),
                final: () => content_ref.current.dismissLoader(),
            });
        }

        function handleItemClick(item) {
            setCurrentProfile(item);
        }

        React.useImperativeHandle(ref, () => ({
            getContent: getProfiles,
        }));

        return (
            <SectionList position="right" className="flex-1">
                <SectionListHeader
                    search
                    onChange={(value) => {}}
                    onValidate={(value) => alert(value)}
                    searchPlaceHolder={Lang.search_profile[lang]}
                    title={Lang.profile_list[lang]}
                >
                    <IconButton onClick={() => setCurrentProfile(new Profile())} color={'warning'}>
                        <i className="fi fi-rr-plus-small t-30"></i>
                    </IconButton>
                </SectionListHeader>
                <SectionListContent ref={content_ref}>
                    {profiles.map(
                        /**
                         * @param {Profile} item
                         * @returns any
                         */
                        (item) => (
                            <SectionListItem
                                withOptions
                                onDelete={() => alert('Deletion is not impelement!')}
                                selected={currentProfile.code === item.code}
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
                                    {currentProfile.code === item.code ? (
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
    { displayNema: 'ProfilesList' }
);
