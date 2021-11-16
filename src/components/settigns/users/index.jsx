import React from 'react';
import { UsersContext, CurrentUserContext } from '../../../context';
import User from '../../../models/User';
import { UserForm } from './form';
import { UsersList } from './list';

export const Users = React.forwardRef(
    (props, ref) => {
        const list_ref = React.useRef(null);
        const form_ref = React.useRef(null);

        const [profiles, setUsers] = React.useState([]);
        const [currentUser, setCurrentUser] = React.useState(new User());

        const current_profile_context = React.useMemo(() => {
            return {
                currentUser: currentUser,
                setCurrentUser: setCurrentUser,
            };
        }, [currentUser, setCurrentUser]);

        const profiles_context = React.useMemo(() => {
            return {
                profiles: profiles,
                setUsers: setUsers,
            };
        }, [profiles, setUsers]);

        const initConten = () => {
            setCurrentUser(new User());
            setUsers([]);
            list_ref.current.getContent();
            form_ref.current.initContent();
        };

        React.useImperativeHandle(ref, () => ({
            refreshContent: initConten,
        }));

        return (
            <UsersContext.Provider value={profiles_context}>
                <CurrentUserContext.Provider value={current_profile_context}>
                    <div className="col-4 h-100 p-0 m-0">
                        <UsersList ref={list_ref} />
                    </div>
                    <div className="col-8 h-100 p-0 m-0">
                        <UserForm ref={form_ref} />
                    </div>
                </CurrentUserContext.Provider>
            </UsersContext.Provider>
        );
    },
    { displayName: 'Users' }
);
