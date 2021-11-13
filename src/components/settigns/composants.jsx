import React from 'react';

export const Composants = React.forwardRef(
    (props, ref) => {
        React.useImperativeHandle(ref, () => ({
            refreshContent: () => {},
        }));
        return (
            <div className="p-20 text-center">
                <h1 className="text-primary">Composants</h1>
            </div>
        );
    },
    { displayName: 'Composants' }
);
