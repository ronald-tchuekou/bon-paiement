import React from 'react';

export const MyProfile = React.forwardRef(
    (props, ref) => {
        React.useImperativeHandle(ref, () => ({
            refreshContent: () => {},
        }));
        return (
            <div className="p-20 text-center">
                <h1 className="text-primary">Mon Profile</h1>
            </div>
        );
    },
    { displayName: 'Profiles' }
);
