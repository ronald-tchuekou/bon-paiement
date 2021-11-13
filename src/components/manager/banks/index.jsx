import React from 'react';
import { CurrentBanckContext, BancksContext } from '../../../context';
import { BanckList } from './list';
import { BanckForm } from './form';
import Banck from '../../../models/Banck';

export const Banks = React.forwardRef(
    (props, ref) => {
        const list_ref = React.useRef(null);

        const [bancks, setBancks] = React.useState([]);
        const [currentBanck, setCurrentBanck] = React.useState(new Banck());

        const current_slip_type_context = React.useMemo(() => {
            return {
                currentBanck: currentBanck,
                setCurrentBanck: setCurrentBanck,
            };
        }, [currentBanck, setCurrentBanck]);

        const slip_type_context = React.useMemo(() => {
            return {
                bancks: bancks,
                setBancks: setBancks,
            };
        }, [bancks, setBancks]);

        const initConten = () => {
            setCurrentBanck(new Banck());
            setBancks([]);
            list_ref.current.getContent();
        };

        React.useImperativeHandle(ref, () => ({
            refreshContent: initConten,
        }));

        return (
            <BancksContext.Provider value={slip_type_context}>
                <CurrentBanckContext.Provider value={current_slip_type_context}>
                    <div className="col-6 h-100 p-0 m-0">
                        <BanckList ref={list_ref} />
                    </div>
                    <div className="col-6 h-100 p-0 m-0">
                        <BanckForm />
                    </div>
                </CurrentBanckContext.Provider>
            </BancksContext.Provider>
        );
    },
    { displayName: 'Banks' }
);
