import React from 'react';

export const Users = React.forwardRef(
    (props, ref) => {
        React.useImperativeHandle(ref, () => ({
            refreshContent: () => {},
        }));
        return (
            <div className="p-20 text-center">
                <h1 className="text-primary">Users</h1>
            </div>
        );
    },
    { displayName: 'Users' }
);
