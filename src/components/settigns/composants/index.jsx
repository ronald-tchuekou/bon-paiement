import React from 'react';
import { ComposantsContext, CurrentComposantContext } from '../../../context';
import Composant from '../../../models/Composant';
import { ComposantForm } from './form';
import { ComposantsList } from './list';

export const Composants = React.forwardRef(
    (props, ref) => {
        const list_ref = React.useRef(null);

        const [composants, setComposants] = React.useState([]);
        const [currentComposant, setCurrentComposant] = React.useState(new Composant());

        const current_composant_context = React.useMemo(() => {
            return {
                currentComposant: currentComposant,
                setCurrentComposant: setCurrentComposant,
            };
        }, [currentComposant, setCurrentComposant]);

        const composants_context = React.useMemo(() => {
            return {
                composants: composants,
                setComposants: setComposants,
            };
        }, [composants, setComposants]);

        const initConten = () => {
            setCurrentComposant(new Composant());
            setComposants([]);
            list_ref.current.getContent();
        };

        React.useImperativeHandle(ref, () => ({
            refreshContent: initConten,
        }));

        return (
            <ComposantsContext.Provider value={composants_context}>
                <CurrentComposantContext.Provider value={current_composant_context}>
                    <div className="col-6 h-100 p-0 m-0">
                        <ComposantsList ref={list_ref} />
                    </div>
                    <div className="col-6 h-100 p-0 m-0">
                        <ComposantForm />
                    </div>
                </CurrentComposantContext.Provider>
            </ComposantsContext.Provider>
        );
    },
    { displayName: 'Composants' }
);
