import React from 'react';
import { SectionList, SectionListContent, SectionListHeader, SectionListItem } from '../../../base/section-list';
import { CurrentUserContext, LangContext, UsersContext } from '../../../context';
import { Lang } from '../../../lang';
import { IconButton } from '../../../base/buttons';
import User from '../../../models/User';

export const UsersList = React.forwardRef(
    (props, ref) => {
        const content_ref = React.useRef(null);

        const { lang } = React.useContext(LangContext);

        const { profiles, setUsers } = React.useContext(UsersContext);
        const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);

        function getUsers() {
            content_ref.current.showLoader();
            new User().getAll({
                success: (content) => setUsers(content),
                error: (e) => console.error(e),
                final: () => content_ref.current.dismissLoader(),
            });
        }

        function handleItemClick(item) {
            setCurrentUser(item);
        }

        React.useImperativeHandle(ref, () => ({
            getContent: getUsers,
        }));

        return (
            <SectionList position="right" className="flex-1">
                <SectionListHeader
                    search
                    onChange={(value) => {}}
                    onValidate={(value) => alert(value)}
                    searchPlaceHolder={Lang.search_user[lang]}
                    title={Lang.users_list[lang]}
                >
                    <IconButton onClick={() => setCurrentUser(new User())} color={'warning'}>
                        <i className="fi fi-rr-plus-small t-30"></i>
                    </IconButton>
                </SectionListHeader>
                <SectionListContent ref={content_ref}>
                    {profiles.map(
                        /**
                         * @param {User} item
                         * @returns any
                         */
                        (item) => (
                            <SectionListItem
                                withOptions
                                onDelete={() => alert('Deletion is not impelement!')}
                                selected={currentUser.code === item.code}
                                key={item.code}
                            >
                                <div
                                    onClick={() => handleItemClick(item)}
                                    className="d-flex content-between items-center"
                                >
                                    <div>
                                        <div className="text-default_gray">
                                            {item.first_name} {item.name}
                                        </div>
                                        <div className="text-default t-14">{item.email}</div>
                                    </div>
                                    {currentUser.code === item.code ? (
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
    { displayNema: 'UsersList' }
);
