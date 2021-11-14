import React from 'react';
import { ProfilesContext, CurrentProfileContext } from '../../../context';
import Profile from '../../../models/Profile';
import { ProfileForm } from './form';
import { ProfilesList } from './list';

export const Profiles = React.forwardRef(
    (props, ref) => {
        const list_ref = React.useRef(null);

        const [profiles, setProfiles] = React.useState([]);
        const [currentProfile, setCurrentProfile] = React.useState(new Profile());

        const current_profile_context = React.useMemo(() => {
            return {
                currentProfile: currentProfile,
                setCurrentProfile: setCurrentProfile,
            };
        }, [currentProfile, setCurrentProfile]);

        const profiles_context = React.useMemo(() => {
            return {
                profiles: profiles,
                setProfiles: setProfiles,
            };
        }, [profiles, setProfiles]);

        const initConten = () => {
            setCurrentProfile(new Profile());
            setProfiles([]);
            list_ref.current.getContent();
        };

        React.useImperativeHandle(ref, () => ({
            refreshContent: initConten,
        }));

        return (
            <ProfilesContext.Provider value={profiles_context}>
                <CurrentProfileContext.Provider value={current_profile_context}>
                    <div className="col-4 h-100 p-0 m-0">
                        <ProfilesList ref={list_ref} />
                    </div>
                    <div className="col-8 h-100 p-0 m-0">
                        <ProfileForm />
                    </div>
                </CurrentProfileContext.Provider>
            </ProfilesContext.Provider>
        );
    },
    { displayName: 'Profiles' }
);
