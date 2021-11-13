import React from 'react';

export const Profiles = React.forwardRef(
    (props, ref) => {
        React.useImperativeHandle(ref, () => ({
            refreshContent: () => {},
        }));
        return (
            <div className="p-20 text-center">
                <h1 className="text-primary">Profiles</h1>
            </div>
        );
    },
    { displayName: 'Profiles' }
);
